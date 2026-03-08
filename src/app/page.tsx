"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nContext';

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
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.85))' }} />
        </div>

        <div className="container" style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <span style={{ color: 'white' }}>{t('hero.title')}</span> <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-serif"
                style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--clr-gold)', textShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
              >
                {t('hero.subtitle')}
              </motion.span>
            </h1>
            <p className="hero-text" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
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
          .hero-title { font-size: clamp(3rem, 8vw, 6.5rem); font-weight: 700; letter-spacing: -0.04em; margin-bottom: 1rem; line-height: 1.1; }
          .hero-text { max-width: 800px; margin: 2rem auto 3rem auto; font-size: 1.4rem; color: rgba(255,255,255,0.95); text-shadow: 0 2px 15px rgba(0,0,0,0.5); fontWeight: 500; }
          .hero-actions { display: flex; gap: 2rem; justifyContent: center; }
          .hero-btn { fontSize: 1.1rem; padding: 1.2rem 3.5rem; }
          .contrast-btn { background: rgba(255,255,255,0.9); color: var(--clr-sapphire); border: none; }

          @media (max-width: 768px) {
            .hero-title { font-size: 3.5rem; }
            .hero-text { font-size: 1.1rem; line-height: 1.6; }
            .hero-actions { flex-direction: column; gap: 1rem; align-items: center; }
            .hero-btn { width: 100%; max-width: 300px; padding: 1rem 2rem; font-size: 1rem; }
          }
        `}</style>
      </section>

      {/* FEATURES SECTION */}
      <section className="section" style={{ background: 'var(--clr-bg)', padding: 'var(--section-pad) 0' }}>
        <div className="container-large">
          <div className="features-grid">
            {/* FEATURE 1 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-apple" style={{ background: 'white' }}>
              <span className="tag">{t('hero.feature1.tag')}</span>
              <h2 className="feat-title">{t('hero.feature1.title')}</h2>
              <p className="feat-desc">{t('hero.feature1.desc')}</p>
              <Link href="/birman" className="btn-outline">{t('hero.feature1.btn')}</Link>
            </motion.div>

            {/* FEATURE 2 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-apple" style={{ background: 'var(--clr-sapphire)', color: 'white', border: 'none' }}>
              <span className="tag" style={{ color: 'white', opacity: 0.7 }}>{t('hero.feature2.tag')}</span>
              <h2 className="feat-title" style={{ color: 'white' }}>{t('hero.feature2.title')}</h2>
              <p className="feat-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('hero.feature2.desc')}</p>
              <Link href="/eleveurs" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>{t('hero.feature2.btn')}</Link>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; }
          .tag { color: var(--clr-gold); letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.85rem; font-weight: 600; }
          .feat-title { font-size: 3rem; margin: 1.5rem 0; color: var(--clr-seal); line-height: 1.1; }
          .feat-desc { font-size: 1.2rem; color: var(--clr-text-muted); line-height: 1.8; marginBottom: 2.5rem; }

          @media (max-width: 1024px) {
            .features-grid { grid-template-columns: 1fr; gap: 2rem; }
            .feat-title { font-size: 2.2rem; }
            .card-apple { padding: 2.5rem; }
          }
        `}</style>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section className="section" style={{ background: 'var(--clr-silk)', padding: 'var(--section-pad) 0' }}>
        <div className="container-large" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 700 }}>{t('member.tag')}</span>
            <h2 className="title-massive responsive-h2" style={{ margin: '2rem 0 6rem 0' }}>{t('member.title')}</h2>
          </motion.div>

          <div className="members-grid">
            {/* CARDS HERE */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-apple member-card">
              <div className="price-tag">{t('member.card1.price1')} / {t('member.card1.price2')}</div>
              <h3 className="card-title">{t('member.card1.title')}</h3>
              <p className="card-desc">{t('member.card1.desc')}</p>
              <Link href="/formulaires/adhesion" className="btn-gold" style={{ width: '100%', textAlign: 'center' }}>{t('member.card1.btn')}</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-apple member-card" style={{ background: 'var(--clr-opal)' }}>
              <div className="price-tag">{t('member.card2.price')}</div>
              <h3 className="card-title">{t('member.card2.title')}</h3>
              <p className="card-desc">{t('member.card2.desc')}</p>
              <Link href="/formulaires/mecene" className="btn-outline" style={{ width: '100%', textAlign: 'center' }}>{t('member.card2.btn')}</Link>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          .members-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; }
          .price-tag { position: absolute; top: 2rem; right: 3rem; background: rgba(184,134,11,0.05); color: var(--clr-gold); fontWeight: 700; padding: 0.5rem 1.2rem; borderRadius: 100px; fontSize: 0.8rem; }
          .card-title { font-size: 2.5rem; marginBottom: 1.5rem; color: var(--clr-seal); }
          .card-desc { font-size: 1.1rem; color: var(--clr-text-muted); line-height: 1.7; marginBottom: 3rem; min-height: 100px; text-align: left; }
          
          @media (max-width: 1024px) {
            .members-grid { grid-template-columns: 1fr; gap: 2rem; }
            .responsive-h2 { font-size: 3rem; margin-bottom: 3rem !important; }
            .card-title { font-size: 2rem; }
            .price-tag { position: static; display: inline-block; margin-bottom: 1rem; }
            .member-card { text-align: left; padding: 2.5rem; }
          }
        `}</style>
      </section>
    </main>
  );
}
