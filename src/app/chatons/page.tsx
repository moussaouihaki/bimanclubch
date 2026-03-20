"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function ChatonsPage() {
    const { t } = useI18n();
    const [ads, setAds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'kittens'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedAds = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAds(fetchedAds);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('kitten.tag')}
                    title={<>{t('kitten.title_main')}<span className="text-serif text-gold">{t('kitten.title_sub')}</span></>}
                    subtitle={t('kitten.subtitle')}
                />

                {loading ? (
                    <div className="text-center" style={{ padding: '100px' }}>
                        <div className="loader"></div>
                        <p className="mt-4 text-gold">{t('common.loading')}</p>
                    </div>
                ) : (
                    <div className="breeders-grid">
                        <AnimatePresence mode="popLayout">
                            {ads.length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ gridColumn: '1 / -1' }}
                                >
                                    <BirmanCard 
                                        description="Aucune annonce active pour le moment. Revenez bientôt !"
                                        variant="glass"
                                        className="text-center"
                                    />
                                </motion.div>
                            ) : (
                                ads.map((ad, i) => (
                                    <BirmanCard
                                        key={ad.id}
                                        image={ad.images && ad.images.length > 0 ? ad.images[0] : undefined}
                                        tag={ad.status === 'available' ? t('ads.available') : ad.status === 'reserved' ? t('ads.reserved') : t('ads.sold')}
                                        title={ad.name}
                                        subtitle={`${ad.price} CHF`}
                                        delay={i * 0.1}
                                        description={
                                            <div className="flex flex-col gap-4">
                                                <div className="flex gap-8 mb-4">
                                                    <div>
                                                        <span className="section-tag" style={{ marginBottom: 0, fontSize: '0.65rem' }}>Couleur</span>
                                                        <span style={{ fontSize: '14px', fontWeight: 500 }}>{ad.color}</span>
                                                    </div>
                                                    <div>
                                                        <span className="section-tag" style={{ marginBottom: 0, fontSize: '0.65rem' }}>Sexe</span>
                                                        <span style={{ fontSize: '14px', fontWeight: 500 }}>{ad.sex === 'male' ? t('ads.male') : t('ads.female')}</span>
                                                    </div>
                                                </div>
                                                <p style={{ fontSize: '0.95rem', color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>
                                                    {ad.description}
                                                </p>
                                            </div>
                                        }
                                        footer={
                                            <button className="btn-gold w-full" style={{ padding: '0.8rem', fontSize: '0.9rem' }}>
                                                Contacter l'éleveur
                                            </button>
                                        }
                                    />
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <div className="mt-12">
                    <BirmanCard
                        title={t('kitten.cta_title')}
                        description={t('kitten.cta_desc')}
                        className="text-center"
                        style={{ border: '2px solid var(--clr-blue-vibrant)', background: 'var(--clr-cream-bg)' }}
                        footer={<button className="btn-outline" style={{ padding: '1rem 3rem' }}>{t('kitten.cta_btn')}</button>}
                    />
                </div>
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
            `}</style>
        </main>
    );
}

