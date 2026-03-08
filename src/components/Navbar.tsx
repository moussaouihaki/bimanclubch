"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export function Navbar() {
    const { t, language, setLanguage } = useI18n();
    const { user, profile } = useAuth();

    // Grouping links for a cleaner look
    const groups = [
        {
            label: t('nav.race'),
            links: [
                { href: '/birman', label: t('nav.birman') },
                { href: '/eleveurs', label: t('nav.breeders') },
                { href: '/chatons', label: t('nav.kittens') },
                { href: '/zuchtplaner', label: t('nav.genetics') },
            ]
        },
        {
            label: t('nav.health_info'),
            links: [
                { href: '/blog', label: t('nav.news') },
                { href: '/sante', label: t('nav.health') },
                { href: '/evenements', label: t('nav.events') },
            ]
        },
        {
            label: t('nav.club_cat'),
            links: [
                { href: '/club', label: t('nav.club') },
                { href: '/galerie', label: t('nav.gallery') },
                { href: '/liens', label: t('nav.links') },
            ]
        }
    ];

    return (
        <nav className="nav-luxury">
            <div className="nav-container">
                <Link href="/" className="nav-brand">
                    <Image src="/images/logo.png" alt="CBS Logo" width={32} height={32} style={{ objectFit: 'contain' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                        <span style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: '15px', color: 'var(--clr-text)' }}>
                            CLUB BIRMAN
                        </span>
                        <span style={{ fontWeight: 400, letterSpacing: '0.2em', fontSize: '9px', color: 'var(--clr-gold)' }}>
                            SCHWEIZ · SUISSE · SVIZZERA
                        </span>
                    </div>
                </Link>

                <div className="nav-links">
                    {groups.map((group, idx) => (
                        <div key={idx} className="nav-group">
                            <span className="nav-link" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {group.label}
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5 }}>
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <div className="nav-dropdown">
                                {group.links.map((link) => (
                                    <Link key={link.href} href={link.href} className="nav-link">
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.04)', padding: '3px', borderRadius: '100px' }}>
                        {["DE", "FR", "IT", "EN"].map((lang) => (
                            <div
                                key={lang}
                                onClick={() => setLanguage(lang as "DE" | "FR" | "IT" | "EN")}
                                className={`lang-pill ${language === lang ? 'active' : ''}`}
                            >
                                {lang}
                            </div>
                        ))}
                    </div>

                    {user ? (
                        <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.7rem 1.8rem', fontWeight: 600, letterSpacing: '0.02em', boxShadow: '0 8px 16px rgba(1, 43, 124, 0.1)' }}>
                            {t('auth.member_space')}
                        </Link>
                    ) : (
                        <Link href="/login" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.7rem 1.8rem', fontWeight: 600, letterSpacing: '0.02em', boxShadow: '0 8px 16px rgba(1, 43, 124, 0.1)' }}>
                            {t('nav.login')}
                        </Link>
                    )}
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 1150px) {
                    .nav-links { display: none; }
                }
            `}</style>
        </nav>
    );
}
