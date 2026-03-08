"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nContext';

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
        <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 'var(--section-pad)', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section" style={{ padding: 'var(--section-pad) 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('club.tag')}</span>
                    <h1 className="title-massive" style={{ marginBottom: 'clamp(2rem, 8vw, 4rem)' }}>
                        {t('club.title_main')} <span className="text-serif text-gold">{t('club.title_sub')}</span>
                    </h1>

                    <div style={{ display: 'grid', gap: 'clamp(3rem, 10vw, 6rem)', textAlign: 'left' }}>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="card-apple">
                                <h3 style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: 'var(--clr-text)', marginBottom: '1.5rem' }}>{t('club.history_title')}</h3>
                                <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                    {t('club.history_text')}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <button className="btn-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>{t('club.statutes_btn')}</button>
                                    <button className="btn-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>{t('club.agm_btn')}</button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: 'var(--clr-text)', marginBottom: '2.5rem', textAlign: 'center' }}>{t('club.comite_title')}</h2>
                            <div className="breeders-grid">
                                {COMITE.map((member, i) => (
                                    <div key={i} className="card-apple" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--clr-gold), var(--clr-sapphire))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.5rem', fontWeight: 700 }}>{member.name.charAt(0)}</div>
                                        <span style={{ color: 'var(--clr-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.role}</span>
                                        <h3 style={{ fontSize: '1.5rem', color: 'var(--clr-text)', margin: '0.8rem 0' }}>{member.name}</h3>
                                        <a href={`mailto:${member.email}`} style={{ color: 'var(--clr-text-muted)', textDecoration: 'none', fontSize: '0.9rem', wordBreak: 'break-all' }}>{member.email}</a>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="card-apple" style={{ background: 'var(--clr-sapphire)', border: 'none', color: 'white', textAlign: 'center', padding: 'clamp(2rem, 8vw, 4rem)' }}>
                                <span style={{ color: 'var(--clr-gold)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('club.simplified_tag')}</span>
                                <h3 style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', margin: '1.5rem 0', color: 'white' }}>{t('club.simplified_title')}</h3>
                                <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                                    {t('club.simplified_desc')}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
                                    <Link href="/formulaires/adhesion" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '24px', display: 'block' }}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)', color: 'white' }}>{t('club.form_adhesion')}</h4>
                                        <span className="btn-gold" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }}>{t('club.form_btn')}</span>
                                    </Link>

                                    <Link href="/formulaires/adhesion" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '24px', display: 'block' }}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)', color: 'white' }}>{t('club.form_litter')}</h4>
                                        <span className="btn-gold" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }}>{t('club.form_btn')}</span>
                                    </Link>

                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '24px', opacity: 0.5 }}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)', color: 'white' }}>{t('club.form_affixe')}</h4>
                                        <button disabled className="btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.5)' }}>{t('club.form_soon')}</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </main>
    );
}
