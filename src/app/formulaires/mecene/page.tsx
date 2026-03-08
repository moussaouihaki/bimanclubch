"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export default function MecenePage() {
    const { t } = useI18n();

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section">
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('donator.subtitle')}</span>
                    <h1 className="title-massive" style={{ marginBottom: '4rem' }}>
                        {t('donator.title')}
                    </h1>

                    <div style={{ textAlign: 'left', display: 'grid', gap: '4rem' }}>

                        <motion.div className="card-apple" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <h2 style={{ fontSize: '2.5rem', color: 'var(--clr-seal)', marginBottom: '2rem' }}>{t('donator.privileges')}</h2>
                            <p style={{ fontSize: '1.25rem', color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {t('donator.intro')}
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem', color: 'var(--clr-text)' }}>
                                    <span style={{ color: 'var(--clr-gold)' }}>✔</span> {t('donator.p1')}
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem', color: 'var(--clr-text)' }}>
                                    <span style={{ color: 'var(--clr-gold)' }}>✔</span> {t('donator.p2')}
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem', color: 'var(--clr-text)' }}>
                                    <span style={{ color: 'var(--clr-gold)' }}>✔</span> {t('donator.p3')}
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div className="card-apple" style={{ background: 'var(--clr-silk)', border: 'none' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <h3 style={{ fontSize: '2rem', color: 'var(--clr-seal)', marginBottom: '2rem', textAlign: 'center' }}>{t('donator.bank_title')}</h3>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
                                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--clr-sapphire)', letterSpacing: '0.05em', marginBottom: '1rem' }}>CH12 0000 0000 0000 0000 0</p>
                                <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem' }}>{t('donator.bank_name')}</p>
                            </div>
                            <p style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--clr-gold)', fontWeight: 600, fontSize: '1.2rem' }}>
                                Merci pour votre générosité !
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>
        </main>
    );
}
