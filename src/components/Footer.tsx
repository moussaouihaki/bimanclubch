"use client";
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nContext';
import { motion } from 'framer-motion';

const Footer = () => {
    const { t } = useI18n();

    return (
        <footer className="footer-silk" style={{ background: '#02040a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '10rem 0 4rem 0', color: 'white', position: 'relative', overflow: 'hidden' }}>

            {/* Subtle Gradient Accent */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0, 51, 153, 0.3), transparent)' }} />

            <div className="container-large">
                <div className="footer-grid" style={{ marginBottom: '10rem' }}>

                    {/* Brand Section */}
                    <div className="footer-brand-col">
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>
                                CLUB BIRMAN <span style={{ color: 'var(--clr-gold)', display: 'block', fontSize: '1rem', marginTop: '0.2rem' }}>SCHWEIZ · SUISSE · SVIZZERA</span>
                            </h3>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '300px' }}>
                            {t('footer.desc')}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <FooterSocial link="#" icon="FB" />
                            <FooterSocial link="#" icon="IG" />
                        </div>
                    </div>

                    {/* Links Section 1 */}
                    <div>
                        <h4 className="footer-title">{t('footer.association')}</h4>
                        <ul className="footer-list">
                            <FooterLink href="/club" label={t('footer.history')} />
                            <FooterLink href="/club#comite" label={t('footer.comite')} />
                            <FooterLink href="/formulaires/adhesion" label={t('footer.member')} />
                            <FooterLink href="/club#documents" label={t('footer.docs')} />
                        </ul>
                    </div>

                    {/* Links Section 2 */}
                    <div>
                        <h4 className="footer-title">{t('footer.breeding')}</h4>
                        <ul className="footer-list">
                            <FooterLink href="/eleveurs" label={t('footer.directory')} />
                            <FooterLink href="/chatons" label={t('footer.kittens')} />
                            <FooterLink href="/birman" label={t('footer.standard')} />
                            <FooterLink href="/zuchtplaner" label="Topaze Breed Planner" />
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="footer-title">{t('footer.contact')}</h4>
                        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '2rem', fontSize: '1rem' }}>{t('footer.question')}</p>
                        <Link href="/contact" className="footer-btn">
                            {t('footer.write')}
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
                        {t('footer.rights')}
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                        <Link href="/mentions" style={{ color: 'rgba(255,255,255,0.2)', transition: '0.3s' }}>{t('footer.privacy')}</Link>
                        <Link href="/mentions" style={{ color: 'rgba(255,255,255,0.2)', transition: '0.3s' }}>{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .footer-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6rem; }
                .footer-brand-col { grid-column: span 1; }
                .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 4rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
                
                @media (max-width: 1024px) {
                    .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 4rem; }
                    .footer-brand-col { grid-column: span 2; }
                }

                @media (max-width: 600px) {
                    .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .footer-brand-col { grid-column: span 1; }
                    .footer-bottom { flex-direction: column; align-items: flex-start; }
                }

                .footer-title {
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: rgba(255,255,255,0.25);
                    margin-bottom: 2.5rem;
                }
                .footer-list {
                    list-style: none;
                    padding: 0;
                    display: grid;
                    gap: 1.2rem;
                }
                .footer-btn {
                    display: inline-flex;
                    padding: 1rem 2rem;
                    background: rgba(255,255,255,0.05);
                    color: white;
                    border-radius: 12px;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .footer-btn:hover {
                    background: var(--clr-gold);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 51, 153, 0.3);
                }
            `}</style>
        </footer>
    );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <li>
        <Link href={href} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '1rem', transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block' }}>
            <span className="hover-underline">{label}</span>
        </Link>
        <style jsx>{`
            li :global(a:hover) {
                color: white !important;
                transform: translateX(5px);
            }
        `}</style>
    </li>
);

const FooterSocial = ({ link, icon }: { link: string; icon: string }) => (
    <a href={link} style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)', fontSize: '0.8rem', fontWeight: 700 }}>
        {icon}
        <style jsx>{`
            a:hover {
                background: white !important;
                color: black !important;
                transform: translateY(-3px) scale(1.1);
            }
        `}</style>
    </a>
);

export default Footer;
