"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

const LINKS_DATA = [
    {
        name: "Fédération Féline Helvétique (FFH)", url: "https://ffh.ch",
        type: { DE: "Nationaler Verband", FR: "Fédération Nationale", IT: "Federazione Nazionale", EN: "National Federation" }
    },
    {
        name: "Fédération Internationale Féline (FIFe)", url: "https://fifeweb.org",
        type: { DE: "Internationaler Verband", FR: "Fédération Internationale", IT: "Federazione Internazionale", EN: "International Federation" }
    },
    {
        name: "ANFI Italia", url: "https://anfitalia.it",
        type: { DE: "Partner-Club", FR: "Club Partenaire", IT: "Club Partner", EN: "Partner Club" }
    },
    {
        name: "SCFF France", url: "https://scff.fr",
        type: { DE: "Partner-Club", FR: "Club Partenaire", IT: "Club Partner", EN: "Partner Club" }
    },
];

export default function LiensPage() {
    const { t, language } = useI18n();

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('links.tag')}</span>
                        <h1 className="title-massive">
                            {t('links.title_main')} <span className="text-serif text-gold">{t('links.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: '1.25rem', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('links.subtitle')}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
                        {LINKS_DATA.map((link, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card-apple"
                            >
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(0, 51, 153, 0.05)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--clr-sapphire)' }}>
                                        {/* @ts-ignore */}
                                        {link.type[language]}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-text)', marginBottom: '2rem' }}>{link.name}</h3>

                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', padding: '0.8rem 2rem' }}>
                                    {t('links.visit')}
                                </a>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
