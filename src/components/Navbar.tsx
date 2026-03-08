"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

export function Navbar() {
    const { t, language, setLanguage } = useI18n();
    const { user, profile } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add scroll listener for transparent-to-solid transition
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) setScrolled(true);
            else setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <nav className={`nav-luxury ${isMenuOpen ? 'menu-open' : ''} ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Link href="/" className="nav-brand" onClick={() => setIsMenuOpen(false)}>
                    <div style={{ position: 'relative', width: '38px', height: '38px', flexShrink: 0 }}>
                        <Image src="/images/logo.png" alt="CBS Logo" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div className="brand-text">
                        <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(15px, 4vw, 20px)', color: scrolled ? 'var(--clr-text)' : 'white', whiteSpace: 'nowrap' }}>
                            CLUB BIRMAN
                        </span>
                        <span className="brand-subtitle" style={{ fontWeight: 600, letterSpacing: '0.15em', fontSize: 'clamp(8px, 2vw, 10px)', color: 'var(--clr-blue-vibrant)', whiteSpace: 'nowrap', opacity: 1 }}>
                            SCHWEIZ · <span style={{ color: 'var(--clr-blue-vibrant)' }}>SUISSE</span> · SVIZZERA
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
                .nav-luxury { 
                    height: 80px; 
                    width: 100%; 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    z-index: 2000; 
                    background: transparent;
                    transition: all 0.4s ease;
                }
                .nav-luxury.scrolled { 
                    background: rgba(255, 255, 255, 0.85); 
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .menu-open.nav-luxury { background: white; }
                
                .nav-container { height: 100%; display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto; padding: 0 40px; }
                .brand-text { display: flex; flex-direction: column; line-height: 1.1; margin-left: 10px; }
                .nav-actions { display: flex; gap: 1.5rem; align-items: center; }
                .lang-switcher-desktop { display: flex; background: rgba(0,0,0,0.04); padding: 3px; border-radius: 100px; }
                .hamburger { display: none; background: none; border: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 10px; z-index: 2100; }
                .bar { width: 22px; height: 1.5px; background: ${scrolled || isMenuOpen ? 'var(--clr-text)' : 'white'}; transition: 0.3s; border-radius: 10px; }
                .mobile-extras { display: none; flex-direction: column; gap: 2rem; margin-top: 2rem; width: 100%; }
                .mobile-divider { height: 1px; background: rgba(0,0,0,0.08); width: 100%; }
                .lang-switcher-mobile { display: flex; gap: 10px; justify-content: center; background: #f5f5f7; padding: 12px; border-radius: 100px; }
                .mobile-nav-btn { width: 100%; text-align: center; padding: 1.2rem; font-weight: 600; border-radius: 16px; font-size: 1rem; text-decoration: none; }

                @media (max-width: 1150px) {
                    .nav-container { padding: 0 20px; }
                    .nav-links {
                        position: fixed;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100vh;
                        background: white;
                        flex-direction: column;
                        padding: 100px 30px 40px 30px;
                        gap: 1.2rem;
                        transform: translateX(100%);
                        visibility: hidden;
                        pointer-events: none;
                        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                        overflow-y: auto;
                        display: flex;
                        z-index: 1500;
                    }
                    .menu-open .nav-links { 
                        transform: translateX(0); 
                        visibility: visible;
                        pointer-events: auto;
                    }
                    .nav-group { width: 100%; border-bottom: 1px solid #f5f5f7; padding: 15px 0; align-items: flex-start; flex-direction: column; gap: 12px; }
                    .nav-dropdown { position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none; padding: 5px 0 10px 15px; border: none; width: 100%; }
                    .nav-dropdown .nav-link { font-size: 15px; text-align: left; padding: 10px 12px; }
                    .nav-link { font-size: 17px; }
                    .hamburger { display: flex; }
                    .mobile-extras { display: flex; }
                    
                    .brand-text span:first-child { font-size: 16px !important; letter-spacing: -0.01em !important; }
                    .brand-subtitle { font-size: 7px !important; letter-spacing: 0.05em !important; opacity: 0.7; margin-top: 1px; }
                    
                    .menu-open .bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
                    .menu-open .bar:nth-child(2) { opacity: 0; }
                    .menu-open .bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
                    
                    .menu-open .nav-brand { z-index: 2000; position: relative; }
                }

                @media (max-width: 400px) {
                    .brand-subtitle { display: none; }
                }
            `}</style>
        </nav >
    );
}
