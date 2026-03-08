"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

import { useState } from "react";

export function Navbar() {
    const { t, language, setLanguage } = useI18n();
    const { user, profile } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <nav className={`nav-luxury ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="nav-container">
                <Link href="/" className="nav-brand">
                    <Image src="/images/logo.png" alt="CBS Logo" width={32} height={32} style={{ objectFit: 'contain' }} />
                    <div className="brand-text">
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
                                    <Link key={link.href} href={link.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Mobile Only Extras */}
                    <div className="mobile-extras">
                        <div className="mobile-divider" />
                        <div className="lang-switcher-mobile">
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
                            <Link href="/dashboard" className="btn btn-primary mobile-nav-btn" onClick={() => setIsMenuOpen(false)}>
                                {t('auth.member_space')}
                            </Link>
                        ) : (
                            <Link href="/login" className="btn btn-primary mobile-nav-btn" onClick={() => setIsMenuOpen(false)}>
                                {t('nav.login')}
                            </Link>
                        )}
                    </div>
                </div>

                <div className="nav-actions">
                    <div className="lang-switcher-desktop">
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
                        <Link href="/dashboard" className="btn btn-primary desktop-nav-btn">
                            {t('auth.member_space')}
                        </Link>
                    ) : (
                        <Link href="/login" className="btn btn-primary desktop-nav-btn">
                            {t('nav.login')}
                        </Link>
                    )}

                    <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .nav-luxury { height: 80px; }
                .brand-text { display: flex; flexDirection: column; lineHeight: 1.1; }
                .nav-actions { display: flex; gap: 1.5rem; alignItems: center; }
                .lang-switcher-desktop { display: flex; background: rgba(0,0,0,0.04); padding: 3px; borderRadius: 100px; }
                .desktop-nav-btn { fontSize: 0.8rem; padding: 0.7rem 1.8rem; fontWeight: 600; letterSpacing: 0.02em; }
                .hamburger { display: none; background: none; border: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 10px; }
                .bar { width: 22px; height: 2px; background: var(--clr-text); transition: 0.3s; }
                .mobile-extras { display: none; flex-direction: column; gap: 1.5rem; margin-top: 1rem; }
                .mobile-divider { height: 1px; background: rgba(0,0,0,0.05); width: 100%; }
                .lang-pill { padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; border: 1px solid transparent; }
                .lang-pill.active { background: var(--clr-gold); color: white; }
                .lang-switcher-mobile { display: flex; gap: 8px; justify-content: center; background: rgba(0,0,0,0.03); padding: 8px; border-radius: 100px; }
                .mobile-nav-btn { width: 100%; text-align: center; padding: 1rem; }

                @media (max-width: 1150px) {
                    .nav-links {
                        position: fixed;
                        top: 80px;
                        left: 0;
                        width: 100%;
                        height: calc(100vh - 80px);
                        background: white;
                        flex-direction: column;
                        padding: 2rem;
                        gap: 1.5rem;
                        transform: translateX(100%);
                        transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                        overflow-y: auto;
                        display: flex;
                        z-index: 999;
                    }
                    .menu-open .nav-links { transform: translateX(0); }
                    .nav-group { width: 100%; flex-direction: column; align-items: flex-start; }
                    .nav-dropdown { position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none; padding: 10px 0 0 15px; border-radius: 0; border: none; }
                    .hamburger { display: flex; z-index: 1001; }
                    .lang-switcher-desktop { display: none; }
                    .desktop-nav-btn { display: none; }
                    .mobile-extras { display: flex; }
                    .brand-text { font-size: 13px; }
                    .menu-open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
                    .menu-open .bar:nth-child(2) { opacity: 0; }
                    .menu-open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
                }
            `}</style>
        </nav >
    );
}
