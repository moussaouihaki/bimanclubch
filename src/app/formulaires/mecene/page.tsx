"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function MecenePage() {
    const { t } = useI18n();

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('donator.subtitle') || "SOUTIEN"}
                    title={t('donator.title') || "Devenir Mécène"}
                    subtitle={t('donator.intro') || "Soutenez nos actions et contribuez au rayonnement du Sacré de Birmanie."}
                />

                <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                    <BirmanCard
                        title={t('donator.privileges') || "Vos Privilèges"}
                        description={
                            <ul className="flex flex-col gap-6 mt-6">
                                {[t('donator.p1'), t('donator.p2'), t('donator.p3')].map((p, i) => (
                                    <li key={i} className="flex gap-4 items-start text-lg text-muted leading-relaxed italic">
                                        <span className="text-gold font-bold">✔</span> {p}
                                    </li>
                                ))}
                            </ul>
                        }
                    />

                    <BirmanCard
                        variant="glass"
                        title={t('donator.bank_title') || "Informations de Paiement"}
                        className="text-center"
                        description={
                            <div className="flex flex-col items-center gap-8 mt-8">
                                <div className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-gold/10 w-full">
                                    <p className="text-2xl font-bold text-blue-deep tracking-wider mb-2">CH12 0000 0000 0000 0000 0</p>
                                    <p className="text-muted font-medium uppercase tracking-widest text-xs">{t('donator.bank_name') || "BANQUE CANTONALE"}</p>
                                </div>
                                <p className="text-xl font-serif text-gold italic">
                                    Merci pour votre générosité !
                                </p>
                            </div>
                        }
                    />
                </div>
            </Section>
        </main>
    );
}

