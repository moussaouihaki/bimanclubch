"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function ContactPage() {
    const { t } = useI18n();

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('contact.tag') || "NOUS CONTACTER"}
                    title={t('contact.title_main') || "Une Question ?"}
                    subtitle={t('contact.subtitle') || "Notre équipe est à votre écoute pour vous renseigner sur la race et le club."}
                />

                <div className="contact-grid">
                    <div className="flex flex-col gap-8">
                        <BirmanCard
                            variant="glass"
                            tag={t('nav.club') || "LE CLUB"}
                            title="Birma Club Schweiz"
                            description={
                                <div className="flex flex-col gap-6 mt-4">
                                    <div>
                                        <p className="section-tag mb-1 text-[0.6rem]">{t('form.field_email') || "EMAIL"}</p>
                                        <a href="mailto:info@club-birman.ch" className="text-lg font-medium hover:text-blue-vibrant transition-colors">info@club-birman.ch</a>
                                    </div>
                                    <div>
                                        <p className="section-tag mb-1 text-[0.6rem]">SECTION FFH</p>
                                        <p className="text-lg font-medium">Birma Club Schweiz (BCS)</p>
                                    </div>
                                </div>
                            }
                        />
                    </div>

                    <BirmanCard
                        title="Envoyez un message"
                        className="h-full"
                        description={
                            <form className="flex flex-col gap-6 mt-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="form-label">{t('form.field_name') || "Votre Nom"}</label>
                                        <input type="text" className="input-premium" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="form-label">{t('form.field_email') || "Votre Email"}</label>
                                        <input type="email" className="input-premium" required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="form-label">{t('contact.field_subject') || "Sujet"}</label>
                                    <input type="text" className="input-premium" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="form-label">{t('contact.field_message') || "Votre Message"}</label>
                                    <textarea className="input-premium" style={{ minHeight: '150px', resize: 'vertical' as const }} required></textarea>
                                </div>
                                <button type="submit" className="btn-gold w-full mt-4">
                                    {t('contact.send') || "Envoyer le message"}
                                </button>
                            </form>
                        }
                    />
                </div>
            </Section>

            <style jsx>{`
                .contact-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; max-width: 1000px; margin: 0 auto; align-items: stretch; }
                .form-label { font-size: 0.75rem; font-weight: 700; color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
                .input-premium { width: 100%; padding: 1.2rem; border-radius: 14px; border: 1px solid rgba(0,0,0,0.05); background: #fbfbfb; outline: none; font-size: 1rem; font-weight: 500; transition: 0.3s; }
                .input-premium:focus { border-color: var(--clr-blue-vibrant); background: white; box-shadow: 0 0 0 4px rgba(0, 51, 153, 0.05); }

                @media (max-width: 900px) {
                    .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
                }
            `}</style>
        </main>
    );
}

