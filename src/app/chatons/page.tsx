"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function ChatonsPage() {
    const { t, language } = useI18n();
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
        <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 'var(--section-pad)', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section" style={{ padding: 'var(--section-pad) 0' }}>
                <div className="container-large">

                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 6rem)' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('kitten.tag')}</span>
                        <h1 className="title-massive">
                            {t('kitten.title_main')}<span className="text-serif text-gold">{t('kitten.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('kitten.subtitle')}
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px' }}>
                            <div className="loader"></div>
                            <p style={{ marginTop: '20px', color: 'var(--clr-gold)' }}>{t('common.loading')}</p>
                        </div>
                    ) : (
                        <div className="breeders-grid">
                            {ads.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--section-pad)', background: 'white', borderRadius: '40px' }}>
                                    <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)' }}>Aucune annonce active pour le moment. Revenez bientôt !</p>
                                </div>
                            ) : (
                                ads.map((ad, i) => (
                                    <motion.div
                                        key={ad.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="card-apple"
                                        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, height: '100%' }}
                                    >
                                        {/* Image Gallery / Header */}
                                        <div style={{ height: '240px', background: '#f5f5f7', position: 'relative' }}>
                                            {ad.images && ad.images.length > 0 ? (
                                                <img
                                                    src={ad.images[0]}
                                                    alt={ad.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '3rem' }}>🐱</div>
                                            )}
                                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '10px', fontWeight: 800, color: 'var(--clr-gold)', textTransform: 'uppercase' }}>
                                                {ad.status === 'available' ? t('ads.available') : ad.status === 'reserved' ? t('ads.reserved') : t('ads.sold')}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div style={{ padding: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <h3 style={{ fontSize: '1.5rem', color: 'var(--clr-seal)', fontFamily: 'var(--font-serif)' }}>{ad.name}</h3>
                                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--clr-gold)' }}>{ad.price} CHF</span>
                                            </div>

                                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                <div>
                                                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Couleur</span>
                                                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{ad.color}</span>
                                                </div>
                                                <div>
                                                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Sexe</span>
                                                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{ad.sex === 'male' ? t('ads.male') : t('ads.female')}</span>
                                                </div>
                                            </div>

                                            <p style={{ fontSize: '0.95rem', color: 'var(--clr-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                                                {ad.description}
                                            </p>

                                            <button className="btn-gold" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem' }}>
                                                Contacter l'éleveur
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    )}

                    <div className="card-apple" style={{ marginTop: 'clamp(4rem, 12vw, 8rem)', textAlign: 'center', border: '2px solid var(--clr-gold)', padding: 'clamp(2rem, 8vw, 4rem)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--clr-text)', marginBottom: '1.5rem' }}>{t('kitten.cta_title')}</h2>
                        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--clr-text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
                            {t('kitten.cta_desc')}
                        </p>
                        <button className="btn-outline" style={{ padding: '1rem 2rem' }}>{t('kitten.cta_btn')}</button>
                    </div>

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
