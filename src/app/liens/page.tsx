"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

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
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('links.tag') || "RESSOURCES"}
                    title={t('links.title_main') || "Liens Utiles"}
                    subtitle={t('links.subtitle') || "Une sélection de sites officiels et partenaires de confiance."}
                />

                <div className="links-grid">
                    {LINKS_DATA.map((link, i) => (
                        <BirmanCard
                            key={i}
                            delay={i * 0.1}
                            tag={(link.type as any)[language]}
                            title={link.name}
                            variant="glass"
                            footer={
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="btn-outline w-fit mt-4">
                                    {t('links.visit') || "Visiter le site"}
                                </a>
                            }
                        />
                    ))}
                </div>
            </Section>

            <style jsx>{`
                .links-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 3rem; }
            `}</style>
        </main>
    );
}

