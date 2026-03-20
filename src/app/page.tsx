"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function Home() {
  const { t } = useI18n();

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <Image
            src="/images/hero-birman.png"
            alt="Sacred Birman Hero"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.95) 100%)', backdropFilter: 'blur(4px)' }} />
        </div>

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              <span className="title-main">{t('hero.title')}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-serif subtitle-gold"
              >
                {t('hero.subtitle')}
              </motion.span>
            </h1>
            <p className="hero-text">
              {t('hero.text')}
            </p>
            <div className="hero-actions">
              <Link href="/birman" className="btn-gold hero-btn">
                {t('hero.feature1.btn')}
              </Link>
              <Link href="/eleveurs" className="btn-outline hero-btn contrast-btn">
                {t('hero.feature2.btn')}
              </Link>
            </div>
          </motion.div>
        </div>

        <style jsx>{`
          .hero-title { 
            font-size: clamp(3rem, 10vw, 7.5rem); 
            font-weight: 800; 
            letter-spacing: -0.04em; 
            line-height: 1; 
            color: var(--clr-text);
          }
          .title-main { display: block; color: var(--clr-text); }
          .subtitle-gold { 
            font-style: italic; 
            font-weight: 300; 
            color: var(--clr-blue-vibrant); 
            display: block; 
            margin-top: 0.5rem; 
          }
          .hero-text { 
            max-width: 800px; 
            margin: 2.5rem auto 3.5rem auto; 
            font-size: 1.3rem; 
            color: var(--clr-text-muted); 
            font-weight: 500; 
            line-height: 1.6;
          }
          .hero-actions { display: flex; gap: 2rem; justify-content: center; }
          .hero-btn { font-size: 1.1rem; padding: 1.2rem 3.5rem; border-radius: 100px; font-weight: 600; text-decoration: none; transition: 0.3s; }
          .btn-gold { background: var(--clr-blue-vibrant); color: white; border: none; }
          .contrast-btn { background: rgba(0,0,0,0.04); color: var(--clr-sapphire); border: 1px solid rgba(0,0,0,0.08); }
          .contrast-btn:hover { background: rgba(0,0,0,0.08); }

          @media (max-width: 768px) {
            .hero-title { font-size: 3.5rem; }
            .hero-text { font-size: 1.1rem; margin: 1.5rem auto 2.5rem auto; padding: 0 10px; }
            .hero-actions { flex-direction: column; gap: 1rem; align-items: center; width: 100%; }
            .hero-btn { width: 100%; max-width: 300px; padding: 1rem; font-size: 1rem; }
          }
        `}</style>
      </section>

      {/* FEATURES SECTION */}
      <Section style={{ background: 'var(--clr-bg)' }}>
        <div className="features-grid">
          <BirmanCard
            tag={t('hero.feature1.tag')}
            title={t('hero.feature1.title')}
            description={t('hero.feature1.desc')}
            footer={<Link href="/birman" className="btn-outline w-full">{t('hero.feature1.btn')}</Link>}
            delay={0.1}
          />
          <BirmanCard
            tag={t('hero.feature2.tag')}
            title={t('hero.feature2.title')}
            description={t('hero.feature2.desc')}
            variant="sapphire"
            footer={<Link href="/eleveurs" className="btn-outline w-full" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>{t('hero.feature2.btn')}</Link>}
            delay={0.2}
          />
        </div>
        <style jsx>{`
          .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; }
          @media (max-width: 1024px) {
            .features-grid { grid-template-columns: 1fr; gap: 2rem; }
          }
        `}</style>
      </Section>

      {/* MEMBERSHIP SECTION */}
      <Section style={{ background: 'var(--clr-silk)' }}>
        <PageHeader 
          tag={t('member.tag')}
          title={t('member.title')}
        />

        <div className="members-grid">
          <BirmanCard
            tag={`${t('member.card1.price1')} / ${t('member.card1.price2')}`}
            title={t('member.card1.title')}
            description={t('member.card1.desc')}
            footer={<Link href="/formulaires/adhesion" className="btn-gold w-full">{t('member.card1.btn')}</Link>}
            delay={0.1}
          />
          <BirmanCard
            tag={t('member.card2.price')}
            title={t('member.card2.title')}
            description={t('member.card2.desc')}
            variant="glass"
            footer={<Link href="/formulaires/mecene" className="btn-outline w-full">{t('member.card2.btn')}</Link>}
            delay={0.2}
          />
        </div>
        <style jsx>{`
          .members-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; }
          @media (max-width: 1024px) {
            .members-grid { grid-template-columns: 1fr; gap: 2rem; }
          }
        `}</style>
      </Section>
    </main>
  );
}

