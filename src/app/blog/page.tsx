"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

const BLOG_POSTS = [
    {
        id: 1,
        date: "19.11.2024",
        title: {
            DE: "Gewichtskurven - Heilige Birmakatze",
            FR: "Courbes de poids - Sacré de Birmanie",
            IT: "Curve di peso - Sacro di Birmania",
            EN: "Weight Charts - Sacred Birman"
        },
        excerpt: {
            DE: "Das Royal Canin Handbuch von 2024 zeigt die Gewichtsentwicklung von der Geburt bis zum 2. Monat.",
            FR: "Le manuel Royal Canin 2024 présente l'évolution du poids de la naissance jusqu'au 2ème mois.",
            IT: "Il manuale Royal Canin 2024 mostra l'evoluzione del peso dalla nascita al 2° mese.",
            EN: "The 2024 Royal Canin manual shows weight development from birth to 2 months."
        },
        tags: ["Gesundheit", "Kitten"]
    },
    {
        id: 2,
        date: "25.09.2024",
        title: {
            DE: "Ungiftige Pflanzen",
            FR: "Plantes non-toxiques",
            IT: "Piante non tossiche",
            EN: "Non-toxic Plants"
        },
        excerpt: {
            DE: "Welche Pflanzen sind ungiftig? Eine sehr häufige Frage für Katzenbesitzer.",
            FR: "Quelles plantes sont non-toxiques ? Une question fréquente pour les propriétaires de chats.",
            IT: "Quali piante non sono tossiche? Una domanda frequente per chi ha gatti.",
            EN: "Which plants are non-toxic? A common question for cat owners."
        },
        tags: ["Home", "Safety"]
    }
];

export default function BlogPage() {
    const { t, language } = useI18n();

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('blog.tag')}</span>
                        <h1 className="title-massive">
                            {t('blog.title_main')}<span className="text-serif text-gold">{t('blog.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: '1.25rem', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('blog.subtitle')}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gap: '4rem' }}>
                        {BLOG_POSTS.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card-apple"
                            >
                                <div style={{ borderBottom: '1px solid var(--clr-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--clr-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>{post.date}</span>
                                    {/* @ts-ignore */}
                                    <h2 style={{ fontSize: '2.5rem', color: 'var(--clr-text)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{post.title[language]}</h2>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {post.tags.map(tag => (
                                            <span key={tag} style={{ background: 'rgba(0,0,0,0.03)', padding: '0.3rem 1rem', borderRadius: '100px', fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                    {/* @ts-ignore */}
                                    {post.excerpt[language]}
                                </p>

                                <div>
                                    <button className="btn-outline">{t('blog.read_more')}</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
