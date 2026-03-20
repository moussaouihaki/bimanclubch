"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function EleveursPage() {
    const { t } = useI18n();
    const [breeders, setBreeders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCanton, setActiveCanton] = useState("Alle");

    const cantonsList = ["Alle", "AG", "AI", "AR", "BE", "BL", "BS", "FR", "GE", "GL", "GR", "JU", "LU", "NE", "NW", "OW", "SG", "SH", "SO", "SZ", "TG", "TI", "UR", "VD", "VS", "ZG", "ZH"];

    useEffect(() => {
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
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('breeder.tag')}
                    title={<>{t('breeder.title_main')} <span className="text-serif text-gold">{t('breeder.title_sub')}</span></>}
                    subtitle={t('breeder.subtitle')}
                />

                {/* Filter Bar */}
                <div className="filter-scroll-wrapper mb-12">
                    <div className="filter-container">
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
                    <div className="text-center" style={{ padding: '100px' }}>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="breeders-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredBreeders.length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ gridColumn: '1 / -1' }}
                                >
                                    <BirmanCard 
                                        description="Aucun éleveur répertorié pour ce canton pour le moment."
                                        variant="glass"
                                        className="text-center"
                                    />
                                </motion.div>
                            ) : (
                                filteredBreeders.map((breeder, i) => (
                                    <BirmanCard
                                        key={breeder.id}
                                        tag={breeder.canton}
                                        title={breeder.catteryName}
                                        subtitle={breeder.ownerName}
                                        delay={i * 0.05}
                                        description={
                                            <div className="flex flex-col gap-4 mt-4">
                                                <div className="flex items-center gap-4">
                                                    <span style={{ fontSize: '1.2rem' }}>📍</span>
                                                    <div>
                                                        <span className="section-tag" style={{ marginBottom: 0, fontSize: '0.65rem' }}>Localisation</span>
                                                        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{breeder.location}</span>
                                                    </div>
                                                </div>
                                                {breeder.phone && (
                                                    <div className="flex items-center gap-4">
                                                        <span style={{ fontSize: '1.2rem' }}>📞</span>
                                                        <div>
                                                            <span className="section-tag" style={{ marginBottom: 0, fontSize: '0.65rem' }}>Téléphone</span>
                                                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{breeder.phone}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                        footer={
                                            <div className="grid-cols-2 gap-4 flex w-full">
                                                <a href={`mailto:${breeder.email}`} className="btn-gold flex-1 text-center" style={{ padding: '0.8rem', fontSize: '0.85rem' }}>
                                                    Contact
                                                </a>
                                                {breeder.website && (
                                                    <a href={breeder.website} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 text-center" style={{ padding: '0.8rem', fontSize: '0.85rem' }}>
                                                        Site Web
                                                    </a>
                                                )}
                                            </div>
                                        }
                                    />
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </Section>

            <style jsx>{`
                .loader {
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid var(--clr-blue-vibrant);
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
                .filter-scroll-wrapper {
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding: 10px 0;
                }
                .filter-scroll-wrapper::-webkit-scrollbar { display: none; }
                .filter-container {
                    display: flex;
                    gap: 0.8rem;
                    min-width: max-content;
                    padding: 4px;
                }
                .filter-pill {
                    padding: 0.6rem 1.4rem;
                    border-radius: 100px;
                    border: 1px solid rgba(0,0,0,0.05);
                    background: white;
                    color: var(--clr-text-muted);
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .filter-pill:hover {
                    background: #f0f0f5;
                    color: var(--clr-text);
                }
                .filter-pill.active {
                    background: var(--clr-blue-vibrant);
                    color: white;
                    border-color: var(--clr-blue-vibrant);
                    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
                }
            `}</style>
        </main>
    );
}

