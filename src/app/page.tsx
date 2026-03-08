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
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))' }} />
        </div>

        <div className="section" style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="title-massive" style={{ color: 'white', textShadow: '0 15px 45px rgba(0,0,0,0.6)' }}>
              {t('hero.title')} <br />
              <span className="text-serif" style={{ fontStyle: 'italic', fontWeight: 300 }}>{t('hero.subtitle')}</span>
            </h1>
            <p style={{ maxWidth: '800px', margin: '2rem auto 3rem auto', fontSize: '1.4rem', color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 15px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              {t('hero.text')}
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <Link href="/birman" className="btn-gold" style={{ fontSize: '1.1rem', padding: '1.2rem 3rem' }}>
                {t('hero.feature1.btn')}
              </Link>
              <Link href="/eleveurs" className="btn-outline" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--clr-sapphire)', border: 'none', fontSize: '1.1rem', padding: '1.2rem 3rem' }}>
                {t('hero.feature2.btn')}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="scroll-indicator" />
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section" style={{ background: 'var(--clr-bg)', padding: '10rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '5rem' }}>

            {/* FEATURE 1 */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-apple" style={{ background: 'white' }}>
              <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('hero.feature1.tag')}</span>
              <h2 style={{ fontSize: '3rem', margin: '1.5rem 0', color: 'var(--clr-seal)' }}>{t('hero.feature1.title')}</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {t('hero.feature1.desc')}
              </p>
              <Link href="/birman" className="btn-outline">{t('hero.feature1.btn')}</Link>
            </motion.div>

            {/* FEATURE 2 */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-apple" style={{ background: 'var(--clr-sapphire)', color: 'white', border: 'none' }}>
              <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('hero.feature2.tag')}</span>
              <h2 style={{ fontSize: '3rem', margin: '1.5rem 0', color: 'white' }}>{t('hero.feature2.title')}</h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {t('hero.feature2.desc')}
              </p>
              <Link href="/eleveurs" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>{t('hero.feature2.btn')}</Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section className="section" style={{ background: 'var(--clr-silk)', padding: '10rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 700 }}>{t('member.tag')}</span>
            <h2 className="title-massive" style={{ margin: '2rem 0 6rem 0' }}>{t('member.title')}</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem' }}>

            {/* MEMBER CARD */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-apple" style={{ position: 'relative', padding: '5rem 4rem' }}>
              <div style={{ position: 'absolute', top: '2rem', right: '3rem', background: 'rgba(184,134,11,0.05)', color: 'var(--clr-gold)', fontWeight: 700, padding: '0.5rem 1.2rem', borderRadius: '100px', fontSize: '0.8rem' }}>
                {t('member.card1.price1')} / {t('member.card1.price2')}
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--clr-seal)' }}>{t('member.card1.title')}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
                {t('member.card1.desc')}
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', opacity: 0.6, fontSize: '1rem', fontWeight: 600 }}>
                <span>• {t('member.card1.type1')}</span>
                <span>• {t('member.card1.type2')}</span>
              </div>
              <Link href="/formulaires/adhesion" className="btn-gold" style={{ width: '100%', textAlign: 'center' }}>{t('member.card1.btn')}</Link>
            </motion.div>

            {/* PATRON CARD */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-apple" style={{ background: 'var(--clr-opal)', padding: '5rem 4rem' }}>
              <div style={{ position: 'absolute', top: '2rem', right: '3rem', background: 'rgba(0,0,0,0.05)', color: 'var(--clr-seal)', fontWeight: 700, padding: '0.5rem 1.2rem', borderRadius: '100px', fontSize: '0.8rem' }}>
                {t('member.card2.price')}
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--clr-seal)' }}>{t('member.card2.title')}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
                {t('member.card2.desc')}
              </p>
              <div style={{ marginBottom: '4rem', opacity: 0.6, fontSize: '1rem', fontWeight: 600 }}>
                <span>• {t('member.card2.type')}</span>
              </div>
              <Link href="/formulaires/mecene" className="btn-outline" style={{ width: '100%', textAlign: 'center' }}>{t('member.card2.btn')}</Link>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
