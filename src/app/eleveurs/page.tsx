"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function EleveursPage() {
    const { t } = useI18n();
    const [breeders, setBreeders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCanton, setActiveCanton] = useState("Alle");

    const cantonsList = ["Alle", "AG", "AI", "AR", "BE", "BL", "BS", "FR", "GE", "GL", "GR", "JU", "LU", "NE", "NW", "OW", "SG", "SH", "SO", "SZ", "TG", "TI", "UR", "VD", "VS", "ZG", "ZH"];

    useEffect(() => {
        // Fetch users who have a breeder role
        const q = query(collection(db, 'users'), where('role', '==', 'breeder'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedBreeders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBreeders(fetchedBreeders);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredBreeders = breeders.filter(
        b => activeCanton === "Alle" || b.canton === activeCanton
    );

    return (
        <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 'var(--section-pad)', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section" style={{ padding: 'var(--section-pad) 0' }}>
                <div className="container-large">

                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 6rem)' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('breeder.tag')}</span>
                        <h1 className="title-massive">
                            {t('breeder.title_main')} <span className="text-serif text-gold">{t('breeder.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('breeder.subtitle')}
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="filter-scroll-wrapper" style={{ overflowX: 'auto', paddingBottom: '2rem', marginBottom: '2rem', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                        <div style={{ display: 'flex', gap: '0.8rem', minWidth: 'max-content' }}>
                            {cantonsList.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setActiveCanton(c)}
                                    className={`filter-pill ${activeCanton === c ? 'active' : ''}`}
                                >
                                    {c === "Alle" ? t('breeder.filter_all') : c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px' }}>
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <div className="breeders-grid">
                            {filteredBreeders.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--section-pad)', background: 'white', borderRadius: '40px' }}>
                                    <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)' }}>Aucun éleveur répertorié pour ce canton pour le moment.</p>
                                </div>
                            ) : (
                                filteredBreeders.map((breeder, i) => (
                                    <motion.div
                                        key={breeder.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="card-apple"
                                        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-gold)', fontWeight: 800 }}>
                                                {t('breeder.card_cattery')}
                                            </span>
                                            <div style={{ background: 'rgba(0, 51, 153, 0.05)', color: 'var(--clr-sapphire)', fontWeight: 700, fontSize: '0.8rem', padding: '0.4rem 1.2rem', borderRadius: '100px' }}>
                                                {breeder.canton}
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', marginBottom: '0.5rem', color: 'var(--clr-seal)', fontFamily: 'var(--font-serif)' }}>
                                            {breeder.catteryName}
                                        </h3>
                                        <p style={{ fontSize: '1.1rem', color: 'var(--clr-text)', fontWeight: 500, marginBottom: '2rem', opacity: 0.8 }}>
                                            {breeder.ownerName}
                                        </p>

                                        <div style={{ flex: 1, borderTop: '1px solid #f0f0f5', paddingTop: '1.5rem' }}>
                                            <div style={{ display: 'grid', gap: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                                    <span style={{ fontSize: '1.2rem' }}>📍</span>
                                                    <div>
                                                        <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--clr-text-muted)', fontWeight: 700 }}>Localisation</span>
                                                        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{breeder.location}</span>
                                                    </div>
                                                </div>
                                                {breeder.phone && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                                        <span style={{ fontSize: '1.2rem' }}>📞</span>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--clr-text-muted)', fontWeight: 700 }}>Téléphone</span>
                                                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{breeder.phone}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.8rem', marginTop: '2.5rem' }}>
                                            <a href={`mailto:${breeder.email}`} className="btn-gold" style={{ padding: '0.8rem', fontSize: '0.85rem', borderRadius: '12px', width: '100%' }}>
                                                Contact
                                            </a>
                                            {breeder.website && (
                                                <a href={breeder.website} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.8rem', fontSize: '0.85rem', borderRadius: '12px', textAlign: 'center', width: '100%' }}>
                                                    Site Web
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    )}

                </div>
            </section>

            <style jsx>{`
                .loader {
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid var(--clr-gold);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    );
}
