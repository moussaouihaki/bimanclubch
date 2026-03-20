"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function SantePage() {
    const { t, language } = useI18n();

    interface ContentType {
        t1: string; p1_1: string; p1_2: string;
        t2: string; p2_1: string; p2_list: string;
        t3: string; p3_1: string; p3_2: string;
    }

    const Content: Record<string, ContentType> = {
        DE: {
            t1: "Fellpflege",
            p1_1: "Das Fell der Birma ist halblang, seidig und dank fehlender Unterwolle kaum knotenanfällig. Regelmäßiges Bürsten (1-2 Mal pro Woche) reicht meist aus.",
            p1_2: "Während des Fellwechsels ist tägliches Bürsten empfohlen, um Haarballen zu vermeiden.",
            t2: "Ungiftige Pflanzen",
            p2_1: "Viele Zimmerpflanzen können für Katzen tödlich sein. Es ist wichtig sicherzustellen, dass Ihr Zuhause sicher ist.",
            p2_list: "Sicher: Katzengras, Bambus, Orchideen, Grünlilie. Giftig: Lilien (tödlich!), Maiglöckchen, Oleander.",
            t3: "Impfungen",
            p3_1: "Eine korrekte Impfung ist der wichtigste Schutz Ihres Birmas gegen schwere Infektionskrankheiten.",
            p3_2: "Katzenschnupfen und Katzenseuche sind für alle Katzen obligatorisch (auch für reine Wohnungskatzen)."
        },
        FR: {
            t1: "Le Toilettage",
            p1_1: "Le pelage du Birman est mi-long, soyeux et exceptionnellement peu sujet aux nœuds grâce à l'absence de sous-poil abondant.",
            p1_2: "Durant les périodes de mue, un brossage quotidien est recommandé pour éviter les boules de poils.",
            t2: "Plantes Non Toxiques",
            p2_1: "De nombreuses plantes d'intérieur communes peuvent être mortelles pour les félins.",
            p2_list: "Sûres: Herbe à chat, Papyrus, Bambou, Orchidées. Toxiques: Lys (mortel!), Muguet, Laurier Rose.",
            t3: "Vaccinations",
            p3_1: "Une vaccination correcte est le bouclier principal de votre Birman contre les maladies infectieuses.",
            p3_2: "Coryza et Typhus sont obligatoires pour tous les chats, même ceux vivant uniquement à l'intérieur."
        },
        IT: {
            t1: "Cura del mantello",
            p1_1: "Il mantello del Birmano è semilungo e setoso. Grazie alla mancanza di sottopelo, non si annoda facilmente. Spazzolare 1-2 volte a settimana.",
            p1_2: "Durante la muta è consigliata una spazzolatura quotidiana per evitare boli di pelo.",
            t2: "Piante non tossiche",
            p2_1: "Molte piante comuni sono letali per i gatti. Proteggi il tuo ambiente domestico.",
            p2_list: "Sicure: Erba gatta, Bambù, Orchidee. Tossiche: Giglio (mortale!), Mughetto, Oleandro.",
            t3: "Vaccinazioni",
            p3_1: "La vaccinazione è fondamentale per proteggere il Birmano da malattie gravi.",
            p3_2: "Coryza e Tifo sono obbligatori per tutti i gatti, anche quelli che vivono in appartamento."
        },
        EN: {
            t1: "Grooming",
            p1_1: "The Birman's coat is semi-long and silky. With little undercoat, it's remarkably easy to maintain. Brush 1-2 times a week.",
            p1_2: "During shedding seasons, daily brushing is recommended to prevent hairballs.",
            t2: "Non-Toxic Plants",
            p2_1: "Many common houseplants can be deadly to cats. Ensure your home is a safe environment.",
            p2_list: "Safe: Cat grass, Bamboo, Orchids. Toxic: Lilies (deadly!), Lily of the Valley, Oleander.",
            t3: "Vaccinations",
            p3_1: "Correct vaccination is your Birman's main shield against dangerous infectious diseases.",
            p3_2: "Cat Flu and Enteritis are mandatory for all cats (even indoor only)."
        }
    };

    const l = Content[language] || Content.FR;

    const topics = [
        { id: 1, e: '🛁', t: l.t1, p1: l.p1_1, p2: l.p1_2, tag: "SANTÉ" },
        { id: 2, e: '🌿', t: l.t2, p1: l.p2_1, p2: l.p2_list, tag: "SÉCURITÉ" },
        { id: 3, e: '💉', t: l.t3, p1: l.p3_1, p2: l.p3_2, tag: "PRÉVENTION" }
    ];

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('health.tag') || "BIEN-ÊTRE"}
                    title={t('health.title_main') || "Santé et Soins"}
                    subtitle={t('health.subtitle') || "Conseils pratiques pour garder votre compagnon en pleine forme."}
                />

                <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                    {topics.map((item, i) => (
                        <BirmanCard
                            key={item.id}
                            delay={i * 0.1}
                            tag={item.tag}
                            title={item.t}
                            description={
                                <div className="flex items-start gap-8 mt-4">
                                    <div className="hidden sm:block text-5xl opacity-40 grayscale-[0.5] hover:grayscale-0 transition-all">
                                        {item.e}
                                    </div>
                                    <div className="flex flex-col gap-4 text-muted leading-relaxed text-lg">
                                        <p>{item.p1}</p>
                                        <p className="p-4 bg-gray-50 rounded-2xl border border-gray-100 italic">
                                            {item.p2}
                                        </p>
                                    </div>
                                </div>
                            }
                        />
                    ))}
                </div>
            </Section>
        </main>
    );
}

