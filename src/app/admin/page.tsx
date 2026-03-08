"use client";
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    addDoc,
    serverTimestamp,
    where,
    getDocs
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nContext';

export default function AdminDashboard() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const { t } = useI18n();
    const [tab, setTab] = useState<'memberships' | 'births' | 'messages' | 'users' | 'pedigrees' | 'saillies' | 'transfers' | 'affixes'>('memberships');

    const [memberships, setMemberships] = useState<any[]>([]);
    const [births, setBirths] = useState<any[]>([]);
    const [pedigrees, setPedigrees] = useState<any[]>([]);
    const [saillies, setSaillies] = useState<any[]>([]);
    const [transfers, setTransfers] = useState<any[]>([]);
    const [affixes, setAffixes] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);

    const [usersWithMessages, setUsersWithMessages] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [replyText, setReplyText] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loading && (!user || profile?.role !== 'admin')) {
            // Redirection or locked UI
        }
    }, [user, profile, loading]);

    // Fetch All Data
    useEffect(() => {
        if (!user || profile?.role !== 'admin') return;

        const queryOpts = orderBy('createdAt', 'desc');
        const unsubMem = onSnapshot(query(collection(db, 'memberships'), queryOpts), s => setMemberships(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const unsubBirths = onSnapshot(query(collection(db, 'birth_declarations'), queryOpts), s => setBirths(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const unsubPeds = onSnapshot(query(collection(db, 'pedigree_requests'), queryOpts), s => setPedigrees(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const unsubSaillies = onSnapshot(query(collection(db, 'mating_certificates'), queryOpts), s => setSaillies(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const unsubTrans = onSnapshot(query(collection(db, 'transfers'), queryOpts), s => setTransfers(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const unsubAfffixes = onSnapshot(query(collection(db, 'affixe_requests'), queryOpts), s => setAffixes(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const unsubUsers = onSnapshot(query(collection(db, 'users'), queryOpts), s => setAllUsers(s.docs.map(d => ({ id: d.id, ...d.data() }))));

        return () => {
            unsubMem(); unsubBirths(); unsubPeds(); unsubSaillies(); unsubTrans(); unsubAfffixes(); unsubUsers();
        };
    }, [user, profile]);

    // Fetch Unique Users who sent messages
    useEffect(() => {
        if (!user || profile?.role !== 'admin') return;
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const usersMap = new Map();
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                if (!usersMap.has(data.userId)) {
                    usersMap.set(data.userId, { userId: data.userId, lastMsg: data.text, timestamp: data.timestamp });
                }
            });
            setUsersWithMessages(Array.from(usersMap.values()));
        });
    }, []);

    // Fetch Messages for Selected User
    useEffect(() => {
        if (!selectedUser) return;
        const q = query(
            collection(db, 'messages'),
            where('userId', '==', selectedUser.userId),
            orderBy('timestamp', 'asc')
        );
        return onSnapshot(q, (s) => {
            setMessages(s.docs.map(d => ({ id: d.id, ...d.data() })));
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });
    }, [selectedUser]);

    const getUserDisplay = (uid: string) => {
        const u = allUsers.find(x => x.id === uid);
        return u?.email || uid;
    };

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim() || !selectedUser) return;

        try {
            await addDoc(collection(db, 'messages'), {
                userId: selectedUser.userId,
                text: replyText,
                senderRole: 'admin',
                timestamp: serverTimestamp()
            });
            setReplyText('');
        } catch (err) {
            console.error("Error replying:", err);
        }
    };

    const handleApproveMember = async (id: string, email: string) => {
        if (!confirm(t('admin.confirm_approve').replace('{email}', email))) return;
        try {
            await updateDoc(doc(db, 'memberships', id), { status: 'approved' });
            alert(t('admin.status_approved'));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSetRole = async (userId: string, newRole: string) => {
        try {
            await updateDoc(doc(db, 'users', userId), { role: newRole });
            alert(`${t('dashboard.role')} : ${newRole}`);
        } catch (err) { console.error(err); }
    };

    const handleImportBreeders = async () => {
        if (!confirm("Importer les 40+ éleveurs de l'ancien site ? (Doublons vérifiés par email)")) return;

        const breedersData = [
            {
                "ownerName": "Monnet Danièle et Jules-Maurice",
                "catteryName": "Chatterie de la Rose",
                "website": "http://www.de-la-rose.ch/",
                "email": "danielemonnet@netplus.ch",
                "phone": "+41 (0)79 605 32 19",
                "location": "3960 Sierre",
                "canton": "VS",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.274Z"
            },
            {
                "ownerName": "Correvon Mireille et Georges",
                "catteryName": "Chatterie de Noeland",
                "website": "",
                "email": "mireille.correvon@gmail.com",
                "phone": "+41 (0)79 254 19 05",
                "location": "1400 Yverdon-les-Bains",
                "canton": "VD",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.280Z"
            },
            {
                "ownerName": "Coico Inès",
                "catteryName": "Chatterie de Kawthoung",
                "website": "http://www.kawthoung.ch",
                "email": "ines.coico@admin.vs.ch",
                "phone": "+41 (0)78 756 77 62",
                "location": "3972 Miège",
                "canton": "VS",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Sandon Cristiano Federico",
                "catteryName": "Allev. delle Ninfe del Lago",
                "website": "http://www.ninfedellago.com/",
                "email": "ilgiardinodelleninfe@libero.it",
                "phone": "+ 39 0332 77 21 39",
                "location": "Cardana di Besozzo",
                "canton": "TI",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Ballaman Liliane",
                "catteryName": "Chatterie d'Anouchat",
                "website": "http://www.anouchat.ch/",
                "email": "l.ballaman@bluewin.ch",
                "phone": "+ 41 (0)76 209 19 19",
                "location": "2604 La Heutte",
                "canton": "BE",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Nissen Aase",
                "catteryName": "Shengo's",
                "website": "http://www.shengo.dk",
                "email": "aase.nissen@shengo.dk",
                "phone": "+ 45 21 29 41 33",
                "location": "Kalvehave (DK)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Sabina Di Battista & Aristide Imundi",
                "catteryName": "Cuore d`Havanna",
                "website": "http://www.mondobirma.ch",
                "email": "info@mondobirma.ch",
                "phone": "+ 41 (0)41 450 39 64",
                "location": "6038 Gisikon",
                "canton": "LU",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Cereghetti Gabriella",
                "catteryName": "di Casa Pantera",
                "website": "http://www.dicasapantera.ch",
                "email": "cereghettiw@ticino.com",
                "phone": "+41 (0)91 825 59 10",
                "location": "6500 Bellinzona",
                "canton": "TI",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Wittek-Kubli Suzanne",
                "catteryName": "Havasupai's",
                "website": "http://www.havasupais.ch",
                "email": "suzyw@bluewin.ch",
                "phone": "+41 (0)21 701 37 27",
                "location": "1302 Vufflens-la-Ville",
                "canton": "VD",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Burkard Stefanie",
                "catteryName": "vom Schlaraffenland",
                "website": "http://www.dieburkards.ch",
                "email": "burkardstefanie@bluewin.ch",
                "phone": "+41 (0)56 622 28 53",
                "location": "5622 Waltenschwil",
                "canton": "AG",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "MM Belot-Coutodier",
                "catteryName": "Chatterie de Ruvelisaya",
                "website": "http://chatterie.ruvelisaya.voila.net/",
                "email": "ruvelisaya.b@orange.fr",
                "phone": "+33 (0)4 78 28 93 43",
                "location": "Grezieu la Varenne (FR)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Bellanca Daniela",
                "catteryName": "di Sole & Azzurro",
                "website": "http://www.disoleeazzurro.ch",
                "email": "daniela.bellanca@gmail.com",
                "phone": "+41 (0)91 859 08 91",
                "location": "6516 Cugnasco",
                "canton": "TI",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Humair Khiria",
                "catteryName": "Birmalicious",
                "website": "http://www.chatssacresdebirmanie.ch",
                "email": "khiria.humair@gmail.com",
                "phone": "+41 (0)78 790 91 84",
                "location": "6900 Massagno",
                "canton": "TI",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Savioz Ludivine",
                "catteryName": "Millésime Bleu",
                "website": "http://www.millesimebleu.ch",
                "email": "ludivine@millesimebleu.ch",
                "phone": "+41 (0)79 293 84 70",
                "location": "3961 Grimentz",
                "canton": "VS",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Geiser Mireille et Philippe",
                "catteryName": "Chatterie de Beausite",
                "website": "",
                "email": "mireillegeiser@bluewin.ch",
                "phone": "+41 (0)78 767 21 79",
                "location": "2605 Sonceboz",
                "canton": "BE",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Parrat Marie-France",
                "catteryName": "Chatterie My Balahe",
                "website": "http://www.mybalahe.com/",
                "email": "mf.parrat@bluewin.ch",
                "phone": "+41 (0)78 853 08 27",
                "location": "2523 Lignières",
                "canton": "NE",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Frii Claire-Anne",
                "catteryName": "Tuamotu",
                "website": "",
                "email": "hangoroa@hotmail.com",
                "phone": "+41 (0)32 753 15 54",
                "location": "2525 Le Landeron",
                "canton": "NE",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Thiévent Ivana",
                "catteryName": "von Rhodania A",
                "website": "http://www.thieventaraber.ch",
                "email": "thievent@bluewin.ch",
                "phone": "+41 (0)62 876 18 49",
                "location": "5076 Bözen",
                "canton": "AG",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Soumaille Janine",
                "catteryName": "du Prasmel",
                "website": "http://www.leprasmel.com",
                "email": "soumaille.janine@wanadoo.fr",
                "phone": "+33 (0)4 74 79 52 55",
                "location": "Vienne (FR)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Szymczak Marilyne",
                "catteryName": "de Kesar de Ling",
                "website": "http://kesar-de-ling.eklablog.com",
                "email": "eclyspe43@free.fr",
                "phone": "+33 (0)6 50 26 33 59",
                "location": "Rive de Gier (FR)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Gauthé Sandrine",
                "catteryName": "Les Beaux Masques",
                "website": "http://lesbeauxmasques.voila.net",
                "email": "lesbeauxmasques@hotmail.fr",
                "phone": "+33 (0)6 68 68 71 29",
                "location": "Arandon (FR)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Lamcha-Mühlheim Monika",
                "catteryName": "Excellence Birma",
                "website": "",
                "email": "mlamcha@bluewin.ch",
                "phone": "+41 (0)32 373 33 88",
                "location": "2556 Schwadernau",
                "canton": "BE",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Christen Sabine",
                "catteryName": "Pearl of Nahla",
                "website": "http://www.pearl-of-nahla.ch",
                "email": "s.merkle@hotmail.com",
                "phone": "+41 (0)41 850 12 07",
                "location": "6403 Küssnacht",
                "canton": "SZ",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Chiaramonte Maria Rosa",
                "catteryName": "Sogno Scaligero",
                "website": "http://www.birmani.biz",
                "email": "sognoscaligero@libero.it",
                "phone": "+39 045 875 32 50",
                "location": "San Giovanni Lupatoto (IT)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Formaggioni Bruna",
                "catteryName": "Tallulah Belle",
                "website": "http://www.ilgattosacrobirmania.com",
                "email": "bformag@tin.it",
                "phone": "+39 340 627 69 43",
                "location": "Assenza di Brenzone (IT)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Ramelli Romina",
                "catteryName": "Sweet Icetears",
                "website": "http://www.sweeticetears.com",
                "email": "dolcecanadesina@hotmail.com",
                "phone": "+ 41 (0)76 575 41 51",
                "location": "6516 Cugnasco",
                "canton": "TI",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Dressel Eva",
                "catteryName": "vom Dürrleberg",
                "website": "http://www.duerrleberg.de",
                "email": "edfleur@aol.com",
                "phone": "+49 (0)7 664 18 98",
                "location": "79112 Freiburg (DE)",
                "canton": "CH",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Müller Gertrud",
                "catteryName": "vom Wolfshof",
                "website": "http://www.heiligebirma-wolfshof.ch",
                "email": "trudi.mueller-lux@bluewin.ch",
                "phone": "+41 (0)41 850 36 33",
                "location": "6403 Küssnacht",
                "canton": "SZ",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            },
            {
                "ownerName": "Padlina-Sciaroni Elena",
                "catteryName": "Krima's Reef",
                "website": "",
                "email": "elenasciaroni@hotmail.com",
                "phone": "+41 (0)91-966 85 94",
                "location": "6932 Breganzona",
                "canton": "TI",
                "role": "breeder",
                "createdAt": "2026-03-07T21:21:32.281Z"
            }
        ];

        let count = 0;
        for (const b of breedersData) {
            // Check if exists
            const existing = allUsers.find(u => u.email === b.email);
            if (!existing) {
                await addDoc(collection(db, 'users'), b);
                count++;
            }
        }
        alert(`${count} éleveurs importés avec succès !`);
    };

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>{t('common.loading')}</div>;

    const isAdmin = profile?.role === 'admin';

    return (
        <main style={{ minHeight: '100vh', background: '#F5F5F7', paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', color: '#1d1d1f' }}>{t('admin.title')}</h1>
                        <p style={{ color: '#86868b' }}>{t('admin.subtitle')}</p>
                    </div>
                    {!isAdmin && (
                        <div style={{ background: '#FEF3C7', color: '#92400E', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600 }}>
                            {t('admin.demo_mode')}
                        </div>
                    )}
                </div>

                <div className="admin-layout">

                    {/* Sidebar */}
                    <aside>
                        <div className="card-apple admin-sidebar">
                            <button onClick={() => setTab('memberships')} className={`admin-nav-btn ${tab === 'memberships' ? 'active' : ''}`}>
                                👥 {t('admin.tab_memberships')} ({memberships.length})
                            </button>
                            <button onClick={() => setTab('users')} className={`admin-nav-btn ${tab === 'users' ? 'active' : ''}`}>
                                👤 {t('admin.tab_users')} ({allUsers.length})
                            </button>
                            <button onClick={() => setTab('births')} className={`admin-nav-btn ${tab === 'births' ? 'active' : ''}`}>
                                🍼 {t('admin.tab_births')} ({births.length})
                            </button>
                            <button onClick={() => setTab('pedigrees')} className={`admin-nav-btn ${tab === 'pedigrees' ? 'active' : ''}`}>
                                📜 {t('admin.tab_pedigrees')} ({pedigrees.length})
                            </button>
                            <button onClick={() => setTab('saillies')} className={`admin-nav-btn ${tab === 'saillies' ? 'active' : ''}`}>
                                ❤️ {t('admin.tab_saillies')} ({saillies.length})
                            </button>
                            <button onClick={() => setTab('transfers')} className={`admin-nav-btn ${tab === 'transfers' ? 'active' : ''}`}>
                                🤝 {t('admin.tab_transfers')} ({transfers.length})
                            </button>
                            <button onClick={() => setTab('affixes')} className={`admin-nav-btn ${tab === 'affixes' ? 'active' : ''}`}>
                                🏷️ {t('admin.tab_affixes')} ({affixes.length})
                            </button>
                            <button onClick={() => setTab('messages')} className={`admin-nav-btn ${tab === 'messages' ? 'active' : ''}`}>
                                💬 {t('msg.title')} ({usersWithMessages.length})
                            </button>
                            <Link href="/dashboard" className="admin-nav-btn" style={{ marginTop: '2rem', textDecoration: 'none', textAlign: 'center', border: '1px solid #eee' }}>
                                {t('common.dashboard_back')}
                            </Link>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="card-apple" style={{ background: 'white', minHeight: '700px', padding: '0', overflow: 'hidden' }}>

                        {tab === 'memberships' && (
                            <div style={{ padding: '3rem' }}>
                                <h2 style={{ marginBottom: '2rem' }}>{t('admin.members_title')}</h2>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {memberships.length === 0 ? <p>{t('admin.no_data')}</p> : memberships.map(m => (
                                        <div key={m.id} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: m.status === 'approved' ? '#f0fdf4' : 'white' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                    <h4 style={{ fontSize: '1.2rem' }}>{m.fullName}</h4>
                                                    <span style={{ fontSize: '0.7rem', background: m.status === 'approved' ? '#dcfce7' : '#eee', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                                                        {m.status?.toUpperCase() === 'APPROVED' ? t('admin.status_approved') : t('admin.status_pending')}
                                                    </span>
                                                </div>
                                                <p style={{ color: '#86868b' }}>{m.email} • {m.membershipType} • {m.city}</p>
                                                {m.isBreeder && <span style={{ fontSize: '0.6rem', color: 'var(--clr-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('admin.role_breeder')}</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                {m.status !== 'approved' && (
                                                    <button onClick={() => handleApproveMember(m.id, m.email)} className="btn-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                                                        {t('admin.btn_approve')}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'users' && (
                            <div style={{ padding: '3rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ margin: 0 }}>{t('admin.users_title')}</h2>
                                    <button
                                        onClick={handleImportBreeders}
                                        className="btn-outline"
                                        style={{ background: 'var(--clr-gold-light)', borderColor: 'var(--clr-gold)', color: 'var(--clr-seal)', fontWeight: 700 }}
                                    >
                                        📥 Importer les éleveurs (Old Site)
                                    </button>
                                </div>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {allUsers.map(u => (
                                        <div key={u.id} className="card-apple" style={{ background: 'white', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--clr-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                                    {u.role === 'admin' ? '🛡️' : (u.role === 'breeder' ? '🐾' : '👤')}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{u.email}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#86868b', marginTop: '0.2rem' }}>
                                                        {t('dashboard.role')}: <span style={{
                                                            padding: '2px 8px',
                                                            borderRadius: '100px',
                                                            background: u.role === 'admin' ? '#FEE2E2' : (u.role === 'breeder' ? '#FEF3C7' : '#E5E7EB'),
                                                            color: u.role === 'admin' ? '#991B1B' : (u.role === 'breeder' ? '#92400E' : '#374151'),
                                                            fontWeight: 700,
                                                            fontSize: '0.7rem',
                                                            marginLeft: '0.5rem'
                                                        }}>
                                                            {u.role?.toUpperCase() || 'USER'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                <button
                                                    onClick={() => { setTab('messages'); setSelectedUser({ userId: u.id, email: u.email }); }}
                                                    className="btn-outline"
                                                    style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem', borderColor: '#eee' }}
                                                >
                                                    💬 {t('admin.btn_contact')}
                                                </button>

                                                <div style={{ display: 'flex', background: '#F5F5F7', padding: '0.3rem', borderRadius: '10px' }}>
                                                    <button
                                                        onClick={() => handleSetRole(u.id, 'breeder')}
                                                        style={{
                                                            border: 'none',
                                                            background: u.role === 'breeder' ? 'white' : 'transparent',
                                                            padding: '0.4rem 0.8rem',
                                                            fontSize: '0.7rem',
                                                            borderRadius: '8px',
                                                            fontWeight: 600,
                                                            boxShadow: u.role === 'breeder' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {t('admin.role_breeder')}
                                                    </button>
                                                    <button
                                                        onClick={() => handleSetRole(u.id, 'member')}
                                                        style={{
                                                            border: 'none',
                                                            background: u.role === 'member' ? 'white' : 'transparent',
                                                            padding: '0.4rem 0.8rem',
                                                            fontSize: '0.7rem',
                                                            borderRadius: '8px',
                                                            fontWeight: 600,
                                                            boxShadow: u.role === 'member' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Membre
                                                    </button>
                                                    <button
                                                        onClick={() => handleSetRole(u.id, 'admin')}
                                                        style={{
                                                            border: 'none',
                                                            background: u.role === 'admin' ? 'white' : 'transparent',
                                                            padding: '0.4rem 0.8rem',
                                                            fontSize: '0.7rem',
                                                            borderRadius: '8px',
                                                            fontWeight: 600,
                                                            boxShadow: u.role === 'admin' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                                                            cursor: 'pointer',
                                                            color: u.role === 'admin' ? '#991B1B' : 'inherit'
                                                        }}
                                                    >
                                                        Admin
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'births' && (
                            <div style={{ padding: '3rem' }}>
                                <h2 style={{ marginBottom: '2rem' }}>{t('admin.births_title')}</h2>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {births.length === 0 ? <p>{t('admin.no_data')}</p> : births.map(b => (
                                        <div key={b.id} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <h4 style={{ fontSize: '1.2rem' }}>{t('admin.litter_of')} {new Date(b.birthDate).toLocaleDateString()}</h4>
                                                <span style={{ fontWeight: 700, color: 'var(--clr-gold)' }}>{parseInt(b.males) + parseInt(b.females)} {t('admin.kittens_count')}</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', color: '#86868b', fontSize: '0.9rem' }}>
                                                <div><strong>{t('admin.dam')}:</strong> {b.mother}</div>
                                                <div><strong>{t('admin.sire')}:</strong> {b.father}</div>
                                            </div>
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>{t('admin.declared_by')}: {b.userEmail || b.userId}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'pedigrees' && (
                            <div style={{ padding: '3rem' }}>
                                <h2 style={{ marginBottom: '2rem' }}>{t('admin.peds_title')}</h2>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {pedigrees.length === 0 ? <p>{t('admin.no_data')}</p> : pedigrees.map(p => (
                                        <div key={p.id} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <h4 style={{ fontSize: '1.2rem' }}>Chaton: {p.kittenName}</h4>
                                                <span style={{ fontWeight: 700, color: 'var(--clr-sapphire)' }}>{p.color} - {p.sex}</span>
                                            </div>
                                            <p style={{ color: '#86868b', fontSize: '0.9rem' }}>{t('admin.microchip')}: {p.microchip}</p>
                                            <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>{t('admin.role_breeder')}: {p.userEmail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'saillies' && (
                            <div style={{ padding: '3rem' }}>
                                <h2 style={{ marginBottom: '2rem' }}>{t('admin.saillies_title')}</h2>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {saillies.length === 0 ? <p>{t('admin.no_data')}</p> : saillies.map(s => (
                                        <div key={s.id} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <h4 style={{ fontSize: '1.2rem' }}>{t('admin.saillies_title')} {s.matingDate}</h4>
                                                <div style={{ fontSize: '0.8rem', background: '#eee', padding: '4px 8px', borderRadius: '4px' }}>{t('admin.status_pending')}</div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontSize: '0.9rem' }}>
                                                <div><strong>{t('admin.sire')}:</strong> {s.sireName} ({s.sireReg})</div>
                                                <div><strong>{t('admin.dam')}:</strong> {s.damName} ({s.damReg})</div>
                                            </div>
                                            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#86868b' }}>{t('admin.dam_owner')}: {s.damOwner}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'transfers' && (
                            <div style={{ padding: '3rem' }}>
                                <h2 style={{ marginBottom: '2rem' }}>{t('admin.transfers_title')}</h2>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {transfers.length === 0 ? <p>{t('admin.no_data')}</p> : transfers.map(t => (
                                        <div key={t.id} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '20px' }}>
                                            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{t.catName}</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontSize: '0.9rem' }}>
                                                <div>
                                                    <div style={{ color: '#86868b' }}>{t('admin.seller')}</div>
                                                    <strong>{t.sellerName}</strong>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#86868b' }}>{t('admin.buyer')}</div>
                                                    <strong>{t.buyerName}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'affixes' && (
                            <div style={{ padding: '3rem' }}>
                                <h2 style={{ marginBottom: '2rem' }}>{t('admin.affixes_title')}</h2>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {affixes.length === 0 ? <p>{t('admin.no_data')}</p> : affixes.map(a => (
                                        <div key={a.id} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <h4 style={{ fontSize: '1.2rem' }}>{t('admin.request_from')} {a.breederName}</h4>
                                                <div style={{ fontSize: '0.8rem', background: 'var(--clr-gold)', color: 'white', padding: '4px 10px', borderRadius: '4px' }}>{t('dashboard.new')}</div>
                                            </div>
                                            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '1rem' }}>
                                                <div style={{ color: 'var(--clr-gold)', fontWeight: 700 }}>1. {a.choice1}</div>
                                                <div style={{ opacity: 0.7 }}>2. {a.choice2}</div>
                                                <div style={{ opacity: 0.7 }}>3. {a.choice3}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'messages' && (
                            <div className="chat-layout">
                                {/* User List */}
                                <div style={{ borderRight: '1px solid #eee', overflowY: 'auto', background: '#FBFBFD' }}>
                                    <div style={{ padding: '2rem', borderBottom: '1px solid #eee', background: 'white' }}>
                                        <h3 style={{ fontSize: '1.2rem' }}>{t('msg.inbox')}</h3>
                                    </div>
                                    {usersWithMessages.map(u => (
                                        <div
                                            key={u.userId}
                                            onClick={() => setSelectedUser(u)}
                                            style={{
                                                padding: '1.5rem 2rem',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #f0f0f5',
                                                background: selectedUser?.userId === u.userId ? '#F5F5F7' : 'transparent',
                                                transition: '0.2s',
                                                display: 'flex',
                                                gap: '1rem',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee', fontSize: '1.2rem' }}>
                                                👤
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1d1d1f' }}>{getUserDisplay(u.userId)}</div>
                                                <p style={{ fontSize: '0.8rem', color: '#86868b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>{u.lastMsg}</p>
                                            </div>
                                            {selectedUser?.userId === u.userId && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--clr-gold)' }}></div>}
                                        </div>
                                    ))}
                                </div>

                                {/* Chat Window */}
                                <div style={{ display: 'flex', flexDirection: 'column', background: 'white' }}>
                                    {selectedUser ? (
                                        <>
                                            <div style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--clr-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>👤</div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selectedUser.email || getUserDisplay(selectedUser.userId)}</div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--clr-gold)', fontWeight: 700 }}>EN LIGNE</div>
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#F8F9FA' }}>
                                                {messages.map(m => (
                                                    <div key={m.id} style={{ alignSelf: m.senderRole === 'admin' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                                                        <div style={{
                                                            padding: '1rem 1.5rem',
                                                            borderRadius: m.senderRole === 'admin' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                                            background: m.senderRole === 'admin' ? 'var(--clr-gold)' : 'white',
                                                            color: m.senderRole === 'admin' ? 'white' : '#1d1d1f',
                                                            fontSize: '0.95rem',
                                                            lineHeight: 1.5,
                                                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                                                        }}>
                                                            {m.text}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '0.65rem',
                                                            color: '#86868b',
                                                            marginTop: '0.5rem',
                                                            textAlign: m.senderRole === 'admin' ? 'right' : 'left',
                                                            fontWeight: 600
                                                        }}>
                                                            {m.timestamp ? new Date(m.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div ref={scrollRef} style={{ height: '1px' }} />
                                            </div>

                                            <form onSubmit={handleSendReply} style={{ padding: '2rem 2.5rem', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '1rem' }}>
                                                <input
                                                    type="text"
                                                    value={replyText}
                                                    onChange={e => setReplyText(e.target.value)}
                                                    placeholder={t('admin.msg_placeholder')}
                                                    style={{ flex: 1, padding: '1.2rem', borderRadius: '15px', border: '1px solid #E5E5E7', background: '#F5F5F7', fontSize: '1rem', outline: 'none' }}
                                                />
                                                <button type="submit" className="btn-gold" style={{ padding: '0 2rem', borderRadius: '15px' }}>
                                                    {t('msg.send')}
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#86868b', gap: '1rem' }}>
                                            <div style={{ fontSize: '4rem' }}>💬</div>
                                            <p style={{ fontWeight: 500 }}>{t('admin.chat_select_user')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>

            <style jsx>{`
                .admin-nav-btn {
                    width: 100%;
                    text-align: left;
                    padding: 1.2rem;
                    border: none;
                    background: transparent;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: 0.2s;
                    color: #1d1d1f;
                }
                .admin-nav-btn:hover {
                    background: #F5F5F7;
                }
                .admin-nav-btn.active {
                    background: var(--clr-gold);
                    color: white;
                }
                .admin-layout { display: grid; grid-template-columns: 280px 1fr; gap: 3rem; }
                .admin-sidebar { background: white; padding: 1rem; display: grid; gap: 0.5rem; position: sticky; top: 140px; }
                .chat-layout { display: grid; grid-template-columns: 380px 1fr; height: 80vh; background: white; border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-lg); }
                
                @media (max-width: 1024px) {
                    .admin-layout { grid-template-columns: 1fr; gap: 2rem; }
                    .admin-sidebar { position: static; display: flex; overflow-x: auto; white-space: nowrap; padding-bottom: 1rem; border-radius: 16px; margin-bottom: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                    .admin-nav-btn { width: auto; font-size: 0.9rem; padding: 0.8rem 1.2rem; flex-shrink: 0; }
                    .chat-layout { grid-template-columns: 1fr; height: 85vh; display: flex; flex-direction: column; }
                }
            `}</style>
        </main>
    );
}
