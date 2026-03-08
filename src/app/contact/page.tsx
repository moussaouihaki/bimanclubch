"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export default function ContactPage() {
    const { t } = useI18n();

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('contact.tag')}</span>
                        <h1 className="title-massive">
                            {t('contact.title_main')} <span className="text-serif text-gold">{t('contact.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: '1.25rem', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    <div className="contact-grid">

                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-apple" style={{ background: 'var(--clr-silk)', height: 'fit-content' }}>
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-seal)', marginBottom: '2rem' }}>{t('nav.club')}</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--clr-gold)' }}>Email</p>
                                    <p style={{ fontSize: '1.1rem' }}>info@club-birman.ch</p>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--clr-gold)' }}>FFH Section</p>
                                    <p style={{ fontSize: '1.1rem' }}>Birma Club Schweiz (BCS)</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-apple" style={{ background: 'white', display: 'grid', gap: '2rem' }}>
                            <div className="contact-name-grid">
                                <div>
                                    <label className="form-label">{t('form.field_name')}</label>
                                    <input type="text" className="input-premium" required />
                                </div>
                                <div>
                                    <label className="form-label">{t('form.field_email')}</label>
                                    <input type="email" className="input-premium" required />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">{t('contact.field_subject')}</label>
                                <input type="text" className="input-premium" required />
                            </div>
                            <div>
                                <label className="form-label">{t('contact.field_message')}</label>
                                <textarea className="input-premium" style={{ minHeight: '150px', resize: 'vertical' as const }} required></textarea>
                            </div>
                            <button type="submit" className="btn-gold">
                                {t('contact.send')}
                            </button>
                        </motion.form>

                    </div>
                </div>
            </section>
            <style jsx>{`
                .form-label { display: block; margin-bottom: 0.6rem; font-size: 0.9rem; font-weight: 500; color: var(--clr-text-muted); }
                .input-premium { width: 100%; padding: 1.2rem; border-radius: 14px; border: 1px solid #e0e0e0; outline: none; font-size: 1rem; transition: border 0.3s; }
                .input-premium:focus { border-color: var(--clr-gold); }
                .contact-grid { display: grid; grid-template-columns: minmax(300px, 1fr) 2fr; gap: 4rem; }
                .contact-name-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

                @media (max-width: 768px) {
                    .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
                }
                @media (max-width: 480px) {
                    .contact-name-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </main>
    );
}
