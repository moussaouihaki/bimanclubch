"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export default function EvenementsPage() {
    const { t, language } = useI18n();

    const EVENTS_DATA = [
        {
            id: 1,
            date: { DE: "Nov 2026", FR: "Nov 2026", IT: "Nov 2026", EN: "Nov 2026" },
            title: {
                DE: "Internationale Katzenausstellung - Genf",
                FR: "Exposition Féline Internationale - Genève",
                IT: "Esposizione Felina Internazionale - Ginevra",
                EN: "International Cat Show - Geneva"
            },
            desc: {
                DE: "Das unumgängliche Jahresend-Event für Birman-Fans in der Westschweiz.",
                FR: "Le rendez-vous de fin d'année incontournable pour les amateurs de Birmans.",
                IT: "L'evento imperdibile di fine anno per gli amanti del Birmano.",
                EN: "The must-attend end-of-year event for Birman fans in French-speaking Switzerland."
            },
            type: "Expo"
        }
    ];

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('events.tag')}</span>
                        <h1 className="title-massive">
                            {t('events.title_main')} <span className="text-serif text-gold">{t('events.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: '1.25rem', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('events.subtitle')}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {EVENTS_DATA.map((ev, i) => (
                            <motion.div
                                key={ev.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card-apple"
                                style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}
                            >
                                <div style={{ textAlign: 'center', minWidth: '150px' }}>
                                    {/* @ts-ignore */}
                                    <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--clr-text)', lineHeight: 1 }}>{ev.date[language]}</div>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <span style={{ display: 'inline-block', background: ev.type === 'Expo' ? 'var(--clr-gold)' : 'var(--clr-sapphire)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
                                        {ev.type}
                                    </span>
                                    {/* @ts-ignore */}
                                    <h3 style={{ fontSize: '2rem', color: 'var(--clr-text)', marginBottom: '0.5rem' }}>{ev.title[language]}</h3>
                                    {/* @ts-ignore */}
                                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>{ev.desc[language]}</p>
                                </div>

                                <div>
                                    <button className="btn-outline">{t('events.details')}</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
