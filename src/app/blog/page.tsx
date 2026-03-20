"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

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
            IT: "Quali piante non sono tossiche? Une domanda frequente per chi ha gatti.",
            EN: "Which plants are non-toxic? A common question for cat owners."
        },
        tags: ["Home", "Safety"]
    }
];

export default function BlogPage() {
    const { t, language } = useI18n();

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('blog.tag') || "ACTUALITÉS"}
                    title={t('blog.title_main') || "Le Blog du Club"}
                    subtitle={t('blog.subtitle') || "Découvrez les dernières nouvelles et conseils sur le Sacré de Birmanie."}
                />

                <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                    {BLOG_POSTS.map((post, i) => (
                        <BirmanCard
                            key={post.id}
                            delay={i * 0.1}
                            tag={post.date}
                            title={(post.title as any)[language]}
                            description={
                                <div className="flex flex-col gap-6 mt-4">
                                    <p className="text-muted leading-relaxed text-lg">
                                        {(post.excerpt as any)[language]}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="tag-pill">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            }
                            footer={
                                <button className="btn-outline w-fit mt-4">
                                    {t('blog.read_more') || "Lire la suite"}
                                </button>
                            }
                        />
                    ))}
                </div>
            </Section>

            <style jsx>{`
                .tag-pill { background: rgba(0,0,0,0.04); padding: 0.4rem 1.2rem; border-radius: 100px; font-size: 0.75rem; font-weight: 600; color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
            `}</style>
        </main>
    );
}
