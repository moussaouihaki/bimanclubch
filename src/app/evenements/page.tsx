"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

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
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('events.tag') || "AGENDA"}
                    title={t('events.title_main') || "Événements"}
                    subtitle={t('events.subtitle') || "Ne manquez aucun rendez-vous de la communauté du Sacré de Birmanie."}
                />

                <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                    {EVENTS_DATA.map((ev, i) => (
                        <BirmanCard
                            key={ev.id}
                            delay={i * 0.1}
                            tag={ev.type}
                            title={(ev.title as any)[language]}
                            description={
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="text-3xl font-serif text-blue-deep mb-2">
                                        {(ev.date as any)[language]}
                                    </div>
                                    <p className="text-muted leading-relaxed text-lg">
                                        {(ev.desc as any)[language]}
                                    </p>
                                </div>
                            }
                            footer={
                                <button className="btn-outline w-fit mt-6">
                                    {t('events.details') || "Voir les détails"}
                                </button>
                            }
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
}

