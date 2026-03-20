"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';
import Link from 'next/link';

export default function ClubPage() {
    const { t, language } = useI18n();

    const COMITE = [
        { role: language === 'FR' ? "Présidente" : language === 'IT' ? "Presidente" : language === 'EN' ? "President" : "Präsidentin", name: "Stefanie Burkard", email: "burkardstefanie@bluewin.ch" },
        { role: language === 'FR' ? "Vice-Présidente" : language === 'IT' ? "Vice Presidente" : language === 'EN' ? "Vice President" : "Vize Präsidentin", name: "Pia Schweizer", email: "pia-schweizer@bluewin.ch" },
        { role: language === 'FR' ? "Caissier" : language === 'IT' ? "Cassiere" : language === 'EN' ? "Treasurer" : "Kassier", name: "Thomas Burkard", email: "burkardstefanie@bluewin.ch" },
        { role: "Revisor", name: "Franz Wildhaber", email: "franz.wildhaber@sunrise.ch" },
        { role: "Stv. Revisorin", name: "Sabine Volk", email: "vos@hispeed.ch" },
        { role: language === 'FR' ? "Membre du Comité" : language === 'IT' ? "Membro del Comitato" : language === 'EN' ? "Committee Member" : "Vorstandsmitglied", name: "Jana Vollenweider", email: "jvollenweider@outlook.com" }
    ];

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('club.tag') || "NOTRE CLUB"}
                    title={t('club.title_main') || "Le Club Birman"}
                    subtitle={t('club.subtitle') || "Une communauté passionnée au service du Sacré de Birmanie depuis des années."}
                />

                <div className="flex flex-col gap-24">
                    {/* HISTOIRE SECTION */}
                    <div className="max-w-4xl mx-auto w-full">
                        <BirmanCard
                            title={t('club.history_title') || "Notre Histoire"}
                            description={
                                <div className="flex flex-col gap-8 mt-4">
                                    <p className="text-muted leading-relaxed text-lg">
                                        {t('club.history_text')}
                                    </p>
                                    <div className="flex gap-4 flex-wrap">
                                        <button className="btn-outline">{t('club.statutes_btn') || "Statuts du Club"}</button>
                                        <button className="btn-outline">{t('club.agm_btn') || "Procès-verbal de l'AG"}</button>
                                    </div>
                                </div>
                            }
                        />
                    </div>

                    {/* COMITE SECTION */}
                    <div className="w-full">
                        <h2 className="section-tag mb-12 text-center" style={{ fontSize: '1rem', letterSpacing: '0.3em' }}>{t('club.comite_title') || "LE COMITÉ"}</h2>
                        <div className="comite-grid">
                            {COMITE.map((member, i) => (
                                <BirmanCard
                                    key={i}
                                    delay={i * 0.05}
                                    variant="glass"
                                    tag={member.role}
                                    title={member.name}
                                    description={
                                        <a href={`mailto:${member.email}`} className="text-muted hover:text-blue-vibrant transition-colors text-sm break-all font-medium">
                                            {member.email}
                                        </a>
                                    }
                                    className="text-center"
                                />
                            ))}
                        </div>
                    </div>

                    {/* ACTIONS / FORMULAIRES */}
                    <Section dark className="rounded-[40px] overflow-hidden">
                        <div className="max-w-4xl mx-auto text-center py-12">
                            <PageHeader 
                                centered
                                theme="dark"
                                tag={t('club.simplified_tag') || "REJOINDRE LE CLUB"}
                                title={t('club.simplified_title') || "Devenez membre ou parrain"}
                                subtitle={t('club.simplified_desc') || "Accédez à des services exclusifs et soutenez le développement de la race en Suisse."}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
                                <Link href="/formulaires/adhesion" className="form-card group">
                                    <h4 className="text-white text-lg font-serif mb-6 group-hover:text-gold transition-colors">{t('club.form_adhesion') || "Demande d'adhésion"}</h4>
                                    <span className="btn-gold-small">{t('club.form_btn') || "Remplir le formulaire"}</span>
                                </Link>

                                <Link href="/formulaires/adhesion" className="form-card group">
                                    <h4 className="text-white text-lg font-serif mb-6 group-hover:text-gold transition-colors">{t('club.form_litter') || "Déclaration de portée"}</h4>
                                    <span className="btn-gold-small">{t('club.form_btn') || "Remplir le formulaire"}</span>
                                </Link>

                                <div className="form-card opacity-50 cursor-not-allowed">
                                    <h4 className="text-white text-lg font-serif mb-6">{t('club.form_affixe') || "Demande d'affixe"}</h4>
                                    <span className="text-xs uppercase tracking-widest text-white/50 font-bold">{t('club.form_soon') || "Bientôt disponible"}</span>
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
            </Section>

            <style jsx>{`
                .comite-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
                .form-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 2.5rem; border-radius: 30px; transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); display: flex; flex-direction: column; justify-content: space-between; }
                .form-card:hover:not(.opacity-50) { background: rgba(255,255,255,0.08); transform: translateY(-8px); border-color: var(--clr-gold-real); }
                .btn-gold-small { display: inline-block; padding: 0.6rem 1.2rem; background: var(--gold-gradient); border-radius: 100px; color: white; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
                
                @media (max-width: 1024px) {
                    .comite-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 640px) {
                    .comite-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </main>
    );
}

