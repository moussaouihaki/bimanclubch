"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export default function DashboardPage() {
    const { user, profile, loading, signOut } = useAuth();
    const { t, language } = useI18n();
    const router = useRouter();

    const [stats, setStats] = useState({ births: 0, ads: 0, pedigrees: 0, saillies: 0, transfers: 0 });
    const [hasNewMessage, setHasNewMessage] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    // Real-time stats
    useEffect(() => {
        if (!user) return;

        const qBirths = query(collection(db, 'birth_declarations'), where('userId', '==', user.uid));
        const unsubBirths = onSnapshot(qBirths, s => setStats(prev => ({ ...prev, births: s.size })));

        const qAds = query(collection(db, 'kittens'), where('userId', '==', user.uid));
        const unsubAds = onSnapshot(qAds, s => setStats(prev => ({ ...prev, ads: s.size })));

        const qPeds = query(collection(db, 'pedigree_requests'), where('userId', '==', user.uid));
        const unsubPeds = onSnapshot(qPeds, s => setStats(prev => ({ ...prev, pedigrees: s.size })));

        const qSaillies = query(collection(db, 'mating_certificates'), where('userId', '==', user.uid));
        const unsubSaillies = onSnapshot(qSaillies, s => setStats(prev => ({ ...prev, saillies: s.size })));

        const qTrans = query(collection(db, 'transfers'), where('userId', '==', user.uid));
        const unsubTrans = onSnapshot(qTrans, s => setStats(prev => ({ ...prev, transfers: s.size })));

        const qMsgs = query(collection(db, 'messages'), where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
        const unsubMsgs = onSnapshot(qMsgs, s => {
            const lastMsg = s.docs[0]?.data();
            setHasNewMessage(lastMsg?.senderRole === 'admin');
        });

        return () => { unsubBirths(); unsubAds(); unsubPeds(); unsubSaillies(); unsubTrans(); unsubMsgs(); };
    }, [user]);

    if (loading || !user) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t('common.loading')}</div>;
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container-large">

                {/* Header Dashboard */}
                <div className="dash-header">
                    <div>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 700 as const }}>
                            {t('auth.member_space')}
                        </span>
                        <h1 className="dash-h1">
                            {t('nav.home')}, <span className="text-serif text-gold">{user.email?.split('@')[0]}</span>
                        </h1>
                    </div>
                    <div className="dash-header-actions">
                        {profile?.role === 'admin' && (
                            <Link href="/admin" className="btn-outline" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', color: 'var(--clr-sapphire)', border: '1px solid var(--clr-sapphire)' }}>
                                {t('dashboard.admin_panel')}
                            </Link>
                        )}
                        <button onClick={() => signOut()} className="btn-gold" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', background: '#FEE2E2', color: '#991B1B', boxShadow: 'none' }}>
                            {t('dashboard.logout')}
                        </button>
                    </div>
                </div>


                <div className="dashboard-layout">

                    {/* Sidebar / Profile Card */}
                    <div style={{ display: 'grid', gap: '2rem', height: 'fit-content' }}>
                        <div className="card-apple dashboard-card" style={{ background: 'white' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--clr-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
                                👤
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('dashboard.my_profile')}</h3>
                            <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t('dashboard.member_since')}: {new Date(profile?.createdAt).toLocaleDateString()}</p>

                            <div style={{ borderTop: '1px solid #eee', pt: '2rem', mt: 'auto' } as any}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--clr-text-muted)', fontWeight: 700 }}>{t('dashboard.role')}</label>
                                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>{profile?.role === 'admin' ? t('dashboard.role_admin') : t('dashboard.role_member')}</div>
                                </div>
                                {profile?.role !== 'admin' && (
                                    <button
                                        onClick={async () => {
                                            if (confirm("Devenir Administrateur (Dev Mode) ?")) {
                                                await updateDoc(doc(db, 'users', user.uid), { role: 'admin' });
                                                window.location.reload();
                                            }
                                        }}
                                        style={{ marginTop: '1rem', width: '100%', padding: '0.8rem', fontSize: '0.8rem', background: '#f5f5f7', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}
                                    >
                                        🛠 {language === 'FR' ? "Devenir Admin (Test)" : "Become Admin (Test)"}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="card-apple dashboard-card" style={{ background: 'var(--clr-sapphire)', color: 'white', position: 'relative' }}>
                            {hasNewMessage && (
                                <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#EF4444', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, animation: 'pulse 2s infinite' }}>
                                    {t('dashboard.new')}
                                </div>
                            )}
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>{t('msg.title')}</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>{t('dashboard.msg_desc')}</p>
                            <Link href="/dashboard/messages" style={{ color: 'white', fontWeight: 600, display: 'inline-block', padding: '0.8rem 1.5rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '10px', textDecoration: 'none' }}>
                                {t('dashboard.access_msg')}
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={{ display: 'grid', gap: '2.5rem' }}>

                        {/* Quick Stats / Actions */}
                        <div className="stats-grid">
                            <Link href="/dashboard/naissance" className="card-apple" style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid #f0f0f5', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🐾</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.births}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('dashboard.litters')}</div>
                            </Link>
                            <Link href="/dashboard/pedigree" className="card-apple" style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid #f0f0f5', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📜</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.pedigrees}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('dashboard.pedigrees')}</div>
                            </Link>
                            <Link href="/dashboard/saillie" className="card-apple" style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid #f0f0f5', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>❤️</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.saillies}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('dashboard.matings')}</div>
                            </Link>
                            <Link href="/dashboard/annonces" className="card-apple" style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid #f0f0f5', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📢</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.ads}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('dashboard.ads')}</div>
                            </Link>
                        </div>

                        {/* Recent Activity / Next Steps */}
                        <div className="card-apple dashboard-card" style={{ background: 'white' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>{t('dashboard.quick_actions')}</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                                <Link href="/dashboard/naissance" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🍼</div>
                                        <h4>{t('birth.title')}</h4>
                                        <p>{t('dashboard.decl_litter')}</p>
                                    </div>
                                </Link>
                                <Link href="/dashboard/pedigree" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📜</div>
                                        <h4>{t('dashboard.req_pedigrees')}</h4>
                                        <p>{t('dashboard.req_pedigrees_desc')}</p>
                                    </div>
                                </Link>
                                <Link href="/dashboard/saillie" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>❤️</div>
                                        <h4>{t('dashboard.mating_cert')}</h4>
                                        <p>{t('dashboard.mating_cert_desc')}</p>
                                    </div>
                                </Link>
                                <Link href="/dashboard/transfer" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🤝</div>
                                        <h4>{t('dashboard.transfer_prop')}</h4>
                                        <p>{t('dashboard.transfer_prop_desc')}</p>
                                    </div>
                                </Link>
                                <Link href="/dashboard/affixe" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🏷️</div>
                                        <h4>{t('dashboard.req_affixe')}</h4>
                                        <p>{t('dashboard.req_affixe_desc')}</p>
                                    </div>
                                </Link>
                                <Link href="/dashboard/annonces" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📢</div>
                                        <h4>{t('ads.title')}</h4>
                                        <p>{t('dashboard.manage_ads')}</p>
                                    </div>
                                </Link>
                                <Link href="/dashboard/profil" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>👤</div>
                                        <h4>{t('dashboard.my_profile')}</h4>
                                        <p>{t('dashboard.update_info')}</p>
                                    </div>
                                </Link>
                                <Link href="/dashboard/documents" style={{ textDecoration: 'none' }}>
                                    <div className="action-card">
                                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📂</div>
                                        <h4>{t('dashboard.doc_space')}</h4>
                                        <p>{t('dashboard.doc_space_desc')}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* My Ads Management */}
                        <div className="card-apple dashboard-card" style={{ background: 'white' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>{t('mgmt.my_ads')}</h2>

                            <MyAdsList user={user} t={t} />
                        </div>

                    </div>
                </div>

            </div>

            <style jsx>{`
                .action-card {
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 1px solid #f0f0f5;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    background: white;
                    height: 100%;
                }
                .action-card {
                    padding: 2.5rem;
                    border: 1px solid #f0f0f5;
                    border-radius: 20px;
                    text-decoration: none;
                    display: block;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    background: white;
                    height: 100%;
                }
                .action-card:hover {
                    background: #f8faff;
                    border-color: var(--clr-gold);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                }
                .action-card h4 { font-size: 1.2rem; margin-bottom: 0.8rem; font-weight: 700; color: #1d1d1f; }
                .action-card p { font-size: 0.9rem; color: var(--clr-text-muted); line-height: 1.5; }

                .card-apple {
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .card-apple:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.08);
                    border-color: var(--clr-gold) !important;
                }

                .dashboard-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; }
                .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
                .dashboard-card { padding: 4rem; }
                .dash-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }
                .dash-header h1 { font-size: 3.5rem; margin-top: 1rem; }
                .dash-header-actions { display: flex; gap: 1rem; align-items: center; }

                @media (max-width: 1024px) {
                    .dashboard-layout { grid-template-columns: 1fr; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .dashboard-card { padding: 2.5rem; }
                }

                @media (max-width: 600px) {
                    .dash-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; margin-bottom: 2.5rem; }
                    .dash-header h1 { font-size: 2.2rem; margin-top: 0.5rem; }
                    .dash-header-actions { width: 100%; }
                    .dash-header-actions a, .dash-header-actions button { flex: 1; text-align: center; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
                    .dashboard-card { padding: 1.5rem; }
                    .action-card { padding: 1.5rem; }
                }
            `}</style>
        </main >
    );
}

function MyAdsList({ user, t }: { user: any, t: any }) {
    const [ads, setAds] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'kittens'), where('userId', '==', user.uid));
        return onSnapshot(q, (s) => setAds(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    }, [user]);

    const handleMarkSold = async (id: string) => {
        try {
            await updateDoc(doc(db, 'kittens', id), { status: 'sold' });
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t('mgmt.confirm_delete'))) return;
        try {
            // In a real app, you'd also delete the images from Storage here.
            await deleteDoc(doc(db, 'kittens', id));
        } catch (err) { console.error(err); }
    };

    if (ads.length === 0) return <p style={{ color: 'var(--clr-text-muted)' }}>{t('dashboard.no_ads')}</p>;

    return (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
            {ads.map(ad => (
                <div key={ad.id} className="ad-item">
                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#f5f5f7' }}>
                        {ad.images?.[0] ? <img src={ad.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🐱'}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{ad.name}</h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                            <span style={{ color: 'var(--clr-gold)', fontWeight: 700, textTransform: 'uppercase' }}>{ad.status}</span>
                            <span style={{ color: 'var(--clr-text-muted)' }}>{ad.price} CHF</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {ad.status !== 'sold' && (
                            <button onClick={() => handleMarkSold(ad.id)} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                                {t('mgmt.mark_sold')}
                            </button>
                        )}
                        <button onClick={() => handleDelete(ad.id)} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#991B1B', borderColor: '#FEE2E2' }}>
                            {t('mgmt.delete')}
                        </button>
                    </div>
                </div>
            ))}
            <style jsx>{`
                .ad-item { display: flex; gap: 2rem; padding: 2rem; border: 1px solid #eee; border-radius: 20px; align-items: center; }
                @media (max-width: 600px) {
                    .ad-item { flex-direction: column; text-align: center; gap: 1rem; padding: 1.5rem; }
                }
            `}</style>
        </div>
    );
}
