"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export default function BirmanPage() {
    const { t } = useI18n();

    const VARIETIES = [
        {
            id: 'solid',
            title_key: 'birman.solid_title',
            desc_key: 'birman.solid_desc',
            img: "/images/cats/solid_point.png",
            colors_key: 'birman.points_list'
        },
        {
            id: 'tabby',
            title_key: 'birman.tabby_title',
            desc_key: 'birman.tabby_desc',
            img: "/images/cats/tabby_point.png",
            colors_key: 'birman.points_list'
        },
        {
            id: 'tortie',
            title_key: 'birman.tortie_title',
            desc_key: 'birman.tortie_desc',
            img: "/images/cats/tortie_point.png",
            colors_key: 'birman.points_list'
        },
        {
            id: 'torbie',
            title_key: 'birman.torbie_title',
            desc_key: 'birman.torbie_desc',
            img: "/images/cats/torbie_point.png",
            colors_key: 'birman.points_list'
        }
    ];

    const MEMBER_CATS = [
        { name: "Haribeau vom Schlaraffenland", variety: "Seal-Point", code: "SBI n", img: "/images/cats/sbi_n.jpg" },
        { name: "Art of Feline Kiss Me", variety: "Blue-Point", code: "SBI a", img: "/images/cats/sbi_a.jpg" },
        { name: "Fairy Eyes Giulie", variety: "Chocolate-Point", code: "SBI b", img: "/images/cats/sbi_b.jpg" },
        { name: "AtBlueSight's Purple Rain", variety: "Lilac-Point", code: "SBI c", img: "/images/cats/sbi_c.jpg" },
        { name: "Baghira vom Schlaraffenland", variety: "Red-Point", code: "SBI d", img: "/images/cats/sbi_d.jpg" },
        { name: "Buddy vom Schlaraffenland", variety: "Cream-Point", code: "SBI e", img: "/images/cats/sbi_e.jpg" },
        { name: "Fancy Mathilda vom Schlaraffenland", variety: "Seal-Tabby-Point", code: "SBI n 21", img: "/images/cats/sbi_n21.jpg" },
        { name: "Honeybee vom Schlaraffenland", variety: "Blue-Tabby-Point", code: "SBI a 21", img: "/images/cats/sbi_a21.jpg" },
        { name: "Wehnert's Cinderella", variety: "Chocolate-Tabby-Point", code: "SBI b 21", img: "/images/cats/sbi_b21.jpg" },
        { name: "Blue Balou Perle d'Ananda", variety: "Lilac-Tabby-Point", code: "SBI c 21", img: "/images/cats/sbi_c21.jpg" },
        { name: "Vesuvio Manju", variety: "Red-Tabby-Point", code: "SBI d 21", img: "/images/cats/sbi_d21.jpg" },
        { name: "Bärli vom Schlaraffenland", variety: "Cream-Tabby-Point", code: "SBI e 21", img: "/images/cats/sbi_e21.jpg" },
        { name: "Jelly Bean White Gardenias", variety: "Seal-Tortie-Point", code: "SBI f", img: "/images/cats/sbi_f.jpg" },
        { name: "Evayne White Gardenias", variety: "Blue-Tortie-Tabby-Point", code: "SBI g 21", img: "/images/cats/sbi_g21.jpg" },
    ];

    return (
        <main style={{ background: 'var(--clr-bg)', minHeight: '100vh', paddingTop: '120px' }}>

            {/* HERO SECTION */}
            <section className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', display: 'block' }}>
                            {t('birman.tag')}
                        </span>
                        <h1 className="title-massive" style={{ marginBottom: '1.5rem' }}>
                            {t('birman.title_main')} <span className="text-serif text-gold">{t('birman.title_sub')}</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--clr-text-muted)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
                            {t('birman.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* LEGEND SECTION */}
            <section className="section" style={{ paddingTop: '0' }}>
                <div className="container-large">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', height: '600px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                            <img
                                src="/images/hero-birman.png"
                                alt="Legendary Birman"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }} />
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <h2 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'var(--font-serif)' }}>{t('birman.legend_title')}</h2>
                            <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: 'var(--clr-text-muted)', marginBottom: '3rem' }}>
                                {t('birman.legend_text')}
                            </p>
                            <div style={{ display: 'flex', gap: '3rem' }}>
                                <div style={{ background: 'white', padding: '1.5rem 2rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontSize: '2.5rem', color: 'var(--clr-gold)', fontWeight: 700 }}>100%</div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--clr-text-muted)' }}>{t('birman.gloves')}</div>
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem 2rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontSize: '2.5rem', color: 'var(--clr-gold)', fontWeight: 700 }}>~20</div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--clr-text-muted)' }}>Variétés</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ANATOMICAL STANDARD SECTION */}
            <section className="section" style={{ background: 'white', padding: '10rem 0' }}>
                <div className="container-large">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Standard de la Race</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)' }}>Les caractéristiques physiques essentielles du Sacré de Birmanie</p>
                    </div>

                    <div className="standard-container">
                        {/* Desktop Diagram (Hidden on Mobile) */}
                        <div className="desktop-only" style={{ position: 'relative', height: '850px' }}>
                            {/* Central Image */}
                            <div className="central-cat-wrapper">
                                <img
                                    src="/images/cats/solid_point.png"
                                    alt="Birman Standard Diagram"
                                    className="cat-image"
                                />
                            </div>

                            {/* Labels positioned as before for desktop */}
                            <div style={{ position: 'absolute', top: '100px', left: '20px', width: '220px', zIndex: 10 }}>
                                <div className="std-label left">
                                    <p>{t('birman.std_ears')}</p>
                                </div>
                            </div>

                            <div style={{ position: 'absolute', top: '320px', left: '20px', width: '220px', zIndex: 10 }}>
                                <div className="std-label left">
                                    <p>{t('birman.std_profile')}</p>
                                </div>
                            </div>

                            <div style={{ position: 'absolute', top: '580px', left: '20px', width: '220px', zIndex: 10 }}>
                                <div className="std-label left">
                                    <p>{t('birman.std_coat')}</p>
                                </div>
                            </div>

                            <div style={{ position: 'absolute', bottom: '20px', left: '140px', width: '220px', zIndex: 10 }}>
                                <div className="std-label left">
                                    <p>{t('birman.std_tail')}</p>
                                </div>
                            </div>

                            {/* RIGHT LABELS */}
                            <div style={{ position: 'absolute', top: '140px', right: '20px', width: '220px', zIndex: 10 }}>
                                <div className="std-label right">
                                    <p>{t('birman.std_eyes')}</p>
                                </div>
                            </div>

                            <div style={{ position: 'absolute', top: '420px', right: '20px', width: '220px', zIndex: 10 }}>
                                <div className="std-label right">
                                    <p>{t('birman.std_body')}</p>
                                </div>
                            </div>

                            <div style={{ position: 'absolute', bottom: '50px', right: '20px', width: '220px', zIndex: 10 }}>
                                <div className="std-label right">
                                    <p>{t('birman.std_spurs')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Diagram (Stacked list) */}
                        <div className="mobile-only">
                            <div className="mobile-cat-image">
                                <img src="/images/cats/solid_point.png" alt="Birman Standard" />
                            </div>
                            <div className="mobile-labels">
                                {[
                                    { tag: 'OREILLES', text: t('birman.std_ears') },
                                    { tag: 'YEUX', text: t('birman.std_eyes') },
                                    { tag: 'PROFIL', text: t('birman.std_profile') },
                                    { tag: 'CORPS', text: t('birman.std_body') },
                                    { tag: 'PELAGE', text: t('birman.std_coat') },
                                    { tag: 'QUEUE', text: t('birman.std_tail') },
                                    { tag: 'ÉPERONS', text: t('birman.std_spurs') }
                                ].map((item, i) => (
                                    <div key={i} className="mobile-label-card">
                                        <span className="mobile-tag">{item.tag}</span>
                                        <p>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
                        .standard-container { max-width: 1000px; margin: 0 auto; }
                        .central-cat-wrapper { 
                            position: absolute; top: 52%; left: 50%; 
                            transform: translate(-50%, -50%); width: 60%;
                            border-radius: 40px; overflow: hidden; 
                            box-shadow: 0 30px 60px rgba(0,0,0,0.1); 
                        }
                        .cat-image { width: 100%; height: auto; display: block; }
                        .std-label { background: white; padding: 1rem; border-radius: 15px; box-shadow: var(--shadow-lg); font-size: 0.8rem; font-weight: 500; }
                        .std-label.left { border-left: 4px solid var(--clr-gold); }
                        .std-label.right { border-right: 4px solid var(--clr-gold); }
                        
                        .mobile-only { display: none; }

                        @media (max-width: 900px) {
                            .desktop-only { display: none; }
                            .mobile-only { display: flex; flex-direction: column; gap: 3rem; }
                            .mobile-cat-image { width: 100%; border-radius: 20px; overflow: hidden; }
                            .mobile-cat-image img { width: 100%; height: auto; }
                            .mobile-labels { display: grid; grid-template-columns: 1fr; gap: 1rem; }
                            .mobile-label-card { background: white; padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--clr-gold); box-shadow: var(--shadow-sm); }
                            .mobile-tag { display: block; font-size: 0.7rem; font-weight: 700; color: var(--clr-gold); letter-spacing: 0.1em; margin-bottom: 0.5rem; }
                            .mobile-label-card p { font-size: 0.9rem; line-height: 1.5; margin: 0; color: var(--clr-text); }
                        }
                    `}</style>
                </div>
            </section>

            {/* CHARACTER & COAT INFO */}
            <section className="section" style={{ background: 'white', padding: '8rem 0', borderTop: '1px solid var(--clr-bg)' }}>
                <div className="container-large">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6rem' }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--clr-seal)' }}>{t('birman.char_title')}</h2>
                            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {t('birman.char_detailed')}
                            </p>
                            <div style={{ padding: '2rem', background: 'var(--clr-bg)', borderRadius: '24px', fontSize: '1.1rem', color: 'var(--clr-seal)', fontWeight: 600, borderLeft: '5px solid var(--clr-gold)' }}>
                                "L'équilibre parfait entre le calme du Persan et la curiosité du Siamois."
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--clr-seal)' }}>{t('birman.coat_title')}</h2>
                            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {t('birman.coat_desc')}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ background: 'var(--clr-silk)', padding: '1.5rem', borderRadius: '20px' }}>
                                    <div style={{ fontWeight: 800, color: 'var(--clr-gold)', fontSize: '1.2rem' }}>{t('birman.gloves')}</div>
                                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Blancs purs sur les 4 pattes.</div>
                                </div>
                                <div style={{ background: 'var(--clr-silk)', padding: '1.5rem', borderRadius: '20px' }}>
                                    <div style={{ fontWeight: 800, color: 'var(--clr-gold)', fontSize: '1.2rem' }}>{t('birman.spurs')}</div>
                                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Forme de V renversé (Keil).</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* COLORS GALLERY (CATEGORIES) */}
            <section className="section" style={{ padding: '10rem 0', background: 'var(--clr-bg)' }}>
                <div className="container-large">
                    <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                        <h2 style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>{t('birman.colors_title')}</h2>
                        <p style={{ fontSize: '1.5rem', color: 'var(--clr-text-muted)' }}>{t('birman.colors_subtitle')}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6rem' }}>
                        {VARIETIES.map((v, idx) => (
                            <motion.div
                                key={v.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '3rem', alignItems: 'center' }}
                            >
                                <div style={{ position: 'relative', borderRadius: '35px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.08)', aspectRatio: '1/1' }}>
                                    <img
                                        src={v.img}
                                        alt={t(v.title_key)}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--clr-gold)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {t(v.title_key)}
                                    </h3>
                                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                        {t(v.desc_key)}
                                    </p>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--clr-text)', fontWeight: 700, padding: '0.8rem 1.2rem', background: 'white', borderRadius: '12px', display: 'inline-block', boxShadow: 'var(--shadow-sm)' }}>
                                        {t(v.colors_key)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MEMBER EXAMPLES GRID */}
            <section className="section" style={{ padding: '8rem 0', background: 'white' }}>
                <div className="container-large">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{t('birman.member_examples')}</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem' }}>
                        {MEMBER_CATS.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx % 4) * 0.1 }}
                                style={{ textAlign: 'center', background: 'var(--clr-bg)', padding: '1.5rem', borderRadius: '24px' }}
                            >
                                <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: '1.2rem', aspectRatio: '4/3' }}>
                                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', fontWeight: 700, minHeight: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cat.name}</h4>
                                <div style={{ fontSize: '0.8rem', color: 'var(--clr-gold)', fontWeight: 600 }}>{cat.variety}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>{cat.code}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LEGEND & HISTORY FULL SECTIONS */}
            <section className="section" style={{ background: 'var(--clr-bg)', padding: '10rem 0' }}>
                <div className="container-large">
                    <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                        <h2 style={{ fontSize: '3rem', color: 'var(--clr-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'var(--font-serif)' }}>
                            La Légende de la Sainte Birmanie
                        </h2>
                    </div>

                    <div className="card-apple" style={{ background: 'white', padding: '5rem', maxWidth: '1100px', margin: '0 auto', marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '2rem', color: '#1a4a8e', marginBottom: '2rem', borderBottom: '2px solid #1a4a8e', paddingBottom: '1rem', display: 'inline-block' }}>
                            Origine
                        </h3>
                        <p style={{ fontSize: '1.25rem', lineHeight: 1.9, color: 'var(--clr-text)', marginBottom: '3rem' }}>
                            {t('birman.history_full')}
                        </p>
                    </div>

                    <div className="card-apple" style={{ background: 'white', padding: '5rem', maxWidth: '1100px', margin: '0 auto' }}>
                        <h3 style={{ fontSize: '2rem', color: '#1a4a8e', marginBottom: '2rem', borderBottom: '2px solid #1a4a8e', paddingBottom: '1rem', display: 'inline-block' }}>
                            Origine
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.9, color: 'var(--clr-text)' }}>
                                {t('birman.legend_full')}
                            </p>
                            <div style={{ fontSize: '1rem', color: 'var(--clr-text-muted)', fontStyle: 'italic', textAlign: 'right', borderTop: '1px solid var(--clr-bg)', paddingTop: '1.5rem' }}>
                                Source : "Mon grand livre des chats" David Taylor, Weltbildverlag 1989
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
