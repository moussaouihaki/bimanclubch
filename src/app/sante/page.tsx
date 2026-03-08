"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export default function SantePage() {
    const { t, language } = useI18n();

    const Content = {
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

    // @ts-ignore
    const l = Content[language];

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('health.tag')}</span>
                        <h1 className="title-massive">
                            {t('health.title_main')} <span className="text-serif text-gold">{t('health.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: '1.25rem', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('health.subtitle')}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gap: '4rem' }}>
                        {[{ id: 1, e: '🛁', t: l.t1, p1: l.p1_1, p2: l.p1_2 }, { id: 2, e: '🌿', t: l.t2, p1: l.p2_1, p2: l.p2_list }, { id: 3, e: '💉', t: l.t3, p1: l.p3_1, p2: l.p3_2 }].map(item => (
                            <motion.div key={item.id} className="card-apple" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.e}</div>
                                <h2 style={{ fontSize: '2.5rem', color: 'var(--clr-text)', marginBottom: '1.5rem' }}>{item.t}</h2>
                                <div style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    <p style={{ marginBottom: '1rem' }}>{item.p1}</p>
                                    <p>{item.p2}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
