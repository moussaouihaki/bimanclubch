"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nContext';

const MOCK_IMAGES = [
    { id: 1, src: "/images/cats/seal_point.jpg", title: { DE: "Seal Point", FR: "Seal Point", IT: "Seal Point", EN: "Seal Point" } },
    { id: 2, src: "/images/cats/blue_point.jpg", title: { DE: "Blue Point", FR: "Blue Point", IT: "Blue Point", EN: "Blue Point" } },
    { id: 3, src: "/images/cats/choc_point.jpg", title: { DE: "Chocolate Point", FR: "Chocolat Point", IT: "Chocolate Point", EN: "Chocolate Point" } },
    { id: 4, src: "/images/cats/seal_tabby.jpg", title: { DE: "Seal Tabby Point", FR: "Seal Tabby Point", IT: "Seal Tabby Point", EN: "Seal Tabby Point" } },
    { id: 5, src: "/images/hero-zenith.png", title: { DE: "Ausstellung", FR: "Exposition", IT: "Esposizione", EN: "Exhibition" } },
    { id: 6, src: "/images/hero-zenith.png", title: { DE: "Archiv", FR: "Archives", IT: "Archivio", EN: "Archives" } }
];

export default function GaleriePage() {
    const { t, language } = useI18n();

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <section className="section">
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{t('gallery.tag')}</span>
                        <h1 className="title-massive">
                            {t('gallery.title_main')}<span className="text-serif text-gold">{t('gallery.title_sub')}</span>
                        </h1>
                        <p style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto', fontSize: '1.25rem', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                            {t('gallery.subtitle')}
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gridAutoRows: 'minmax(250px, auto)',
                        gap: '2rem'
                    }}>
                        {MOCK_IMAGES.map((img, i) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="card-apple"
                                style={{
                                    padding: '0',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    minHeight: '300px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Image
                                    src={img.src}
                                    /* @ts-ignore */
                                    alt={img.title[language]}
                                    fill
                                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    className="gallery-img"
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0, left: 0, right: 0,
                                    padding: '2rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    color: 'white'
                                }}>
                                    {/* @ts-ignore */}
                                    <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 400 }}>{img.title[language]}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
