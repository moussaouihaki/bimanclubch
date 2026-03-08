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
                    <div className="legend-grid">
                        <div className="legend-image-wrapper">
                            <img
                                src="/images/hero-birman.png"
                                alt="Legendary Birman"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }} />
                        </div>
                        <div className="legend-content-wrapper">
                            <h2 className="legend-title">{t('birman.legend_title')}</h2>
                            <p className="legend-text">
                                {t('birman.legend_text')}
                            </p>
                            <div className="legend-stats">
                                <div className="stat-card">
                                    <div className="stat-value">100%</div>
                                    <div className="stat-label">{t('birman.gloves')}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-value">~20</div>
                                    <div className="stat-label">Variétés</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .legend-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 5rem; align-items: center; }
                    .legend-image-wrapper { position: relative; height: 600px; border-radius: 40px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
                    .legend-content-wrapper { padding: 1rem; }
                    .legend-title { font-size: 3rem; marginBottom: 2.5rem; font-family: var(--font-serif); }
                    .legend-text { font-size: 1.3rem; line-height: 1.8; color: var(--clr-text-muted); marginBottom: 3rem; }
                    .legend-stats { display: flex; gap: 3rem; }
                    .stat-card { background: white; padding: 1.5rem 2rem; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                    .stat-value { fontSize: 2.5rem; color: var(--clr-gold); fontWeight: 700; }
                    .stat-label { fontSize: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; fontWeight: 700; color: var(--clr-text-muted); }

                    @media (max-width: 1024px) {
                        .legend-grid { grid-template-columns: 1fr; gap: 3rem; }
                        .legend-image-wrapper { height: 400px; border-radius: 24px; }
                        .legend-title { font-size: 2.5rem; text-align: center; }
                        .legend-text { font-size: 1.1rem; text-align: center; }
                        .legend-stats { justify-content: center; gap: 1.5rem; }
                    }
                    @media (max-width: 480px) {
                        .legend-image-wrapper { height: 280px; }
                        .legend-title { font-size: 2.2rem; }
                        .stat-card { padding: 1.2rem; flex: 1; text-align: center; }
                        .stat-value { font-size: 2rem; }
                    }
                `}</style>
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
                            .mobile-label-card { background: white; padding: 2rem; border-radius: 16px; border-left: 5px solid var(--clr-gold); box-shadow: var(--shadow-sm); }
                            .mobile-tag { display: block; font-size: 0.7rem; font-weight: 700; color: var(--clr-gold); letter-spacing: 0.1em; margin-bottom: 0.5rem; }
                            .mobile-label-card p { font-size: 0.9rem; line-height: 1.5; margin: 0; color: var(--clr-text); }
                        }
                    `}</style>
                </div>
            </section>

            {/* CHARACTER & COAT INFO */}
            <section className="section" style={{ background: 'white', padding: '8rem 0', borderTop: '1px solid var(--clr-bg)' }}>
                <div className="container-large">
                    <div className="char-grid">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: 'var(--clr-seal)' }}>{t('birman.char_title')}</h2>
                            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {t('birman.char_detailed')}
                            </p>
                            <div style={{ padding: '2rem', background: 'var(--clr-bg)', borderRadius: '24px', fontSize: '1rem', color: 'var(--clr-seal)', fontWeight: 600, borderLeft: '5px solid var(--clr-gold)' }}>
                                "L'équilibre parfait entre le calme du Persan et la curiosité du Siamois."
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: 'var(--clr-seal)' }}>{t('birman.coat_title')}</h2>
                            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {t('birman.coat_desc')}
                            </p>
                            <div className="coat-details">
                                <div className="coat-feature">
                                    <div className="coat-tag">{t('birman.gloves')}</div>
                                    <div className="coat-desc-small">Blancs purs sur les 4 pattes.</div>
                                </div>
                                <div className="coat-feature">
                                    <div className="coat-tag">{t('birman.spurs')}</div>
                                    <div className="coat-desc-small">Forme de V renversé (Keil).</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <style jsx>{`
                    .coat-details { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                    .coat-feature { background: var(--clr-silk); padding: 1.5rem; border-radius: 20px; }
                    .coat-tag { font-weight: 800; color: var(--clr-gold); font-size: 1.1rem; }
                    .coat-desc-small { font-size: 0.85rem; margin-top: 0.4rem; }

                    @media (max-width: 480px) {
                        .coat-details { grid-template-columns: 1fr; }
                    }
                `}</style>
                <style jsx>{`
                    .char-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5rem; }
                    @media (max-width: 1024px) { .char-grid { grid-template-columns: 1fr; gap: 4rem; } }
                `}</style>
            </section>

            {/* COLORS GALLERY (CATEGORIES) */}
            <section className="section" style={{ padding: '10rem 0', background: 'var(--clr-bg)' }}>
                <div className="container-large">
                    <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                        <h2 style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>{t('birman.colors_title')}</h2>
                        <p style={{ fontSize: '1.5rem', color: 'var(--clr-text-muted)' }}>{t('birman.colors_subtitle')}</p>
                    </div>

                    <div className="varieties-grid">
                        {VARIETIES.map((v, idx) => (
                            <motion.div
                                key={v.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="variety-item"
                            >
                                <div className="variety-img">
                                    <img src={v.img} alt={t(v.title_key)} />
                                </div>
                                <div>
                                    <h3>{t(v.title_key)}</h3>
                                    <p>{t(v.desc_key)}</p>
                                    <div className="variety-tag">{t(v.colors_key)}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <style jsx>{`
                    .varieties-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5rem; }
                    .variety-item { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 3rem; align-items: center; }
                    .variety-img { position: relative; borderRadius: 35px; overflow: hidden; boxShadow: 0 15px 40px rgba(0,0,0,0.08); aspect-ratio: 1/1; }
                    .variety-img img { width: 100%; height: 100%; object-fit: cover; }
                    .variety-item h3 { fontSize: 2rem; color: var(--clr-gold); marginBottom: 1rem; textTransform: uppercase; letterSpacing: 0.05em; }
                    .variety-item p { color: var(--clr-text-muted); fontSize: 1.1rem; lineHeight: 1.7; marginBottom: 1.5rem; }
                    .variety-tag { fontSize: 0.9rem; color: var(--clr-text); fontWeight: 700; padding: 0.8rem 1.2rem; background: white; borderRadius: 12px; display: inline-block; boxShadow: var(--shadow-sm); }
                    
                    @media (max-width: 1200px) {
                        .varieties-grid { gap: 3rem; }
                        .variety-item { grid-template-columns: 1fr; text-align: center; }
                        .variety-img { width: 60%; margin: 0 auto; }
                    }
                    @media (max-width: 768px) {
                        .varieties-grid { grid-template-columns: 1fr; gap: 4rem; }
                        .variety-img { width: 80%; }
                    }
                `}</style>
            </section>

            {/* MEMBER EXAMPLES GRID */}
            <section className="section" style={{ padding: '8rem 0', background: 'white' }}>
                <div className="container-large">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{t('birman.member_examples')}</h2>
                    </div>

                    <div className="members-grid">
                        {MEMBER_CATS.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx % 4) * 0.1 }}
                                style={{ textAlign: 'center', background: 'var(--clr-bg)', padding: '1.2rem', borderRadius: '24px' }}
                            >
                                <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: '1rem', aspectRatio: '4/3' }}>
                                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 700, minHeight: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cat.name}</h4>
                                <div style={{ fontSize: '0.75rem', color: 'var(--clr-gold)', fontWeight: 600 }}>{cat.variety}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)' }}>{cat.code}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <style jsx>{`
                    .members-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem; }
                    @media (max-width: 1200px) { .members-grid { grid-template-columns: repeat(3, 1fr); } }
                    @media (max-width: 900px) { .members-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; } }
                    @media (max-width: 500px) { .members-grid { grid-template-columns: 1fr; } }
                `}</style>
            </section>

            {/* LEGEND & HISTORY FULL SECTIONS */}
            <section className="section" style={{ background: 'var(--clr-bg)', padding: 'var(--section-pad) 0' }}>
                <div className="container-large">
                    <div className="history-header">
                        <h2 className="history-title-main">
                            La Légende de la Sainte Birmanie
                        </h2>
                    </div>

                    <div className="card-apple history-card">
                        <h3 className="history-sub">Origine</h3>
                        <p className="history-text-full">
                            {t('birman.history_full')}
                        </p>
                    </div>

                    <div className="card-apple history-card">
                        <h3 className="history-sub">Origine</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                            <p className="history-text-full">
                                {t('birman.legend_full')}
                            </p>
                            <div className="history-source">
                                Source : "Mon grand livre des chats" David Taylor, Weltbildverlag 1989
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .history-header { text-align: center; margin-bottom: 6rem; }
                    .history-title-main { font-size: 3rem; color: var(--clr-gold); text-transform: uppercase; letter-spacing: 0.2em; font-family: var(--font-serif); line-height: 1.2; }
                    .history-card { background: white; padding: 5rem; max-width: 1100px; margin: 0 auto 4rem auto; }
                    .history-sub { font-size: 2rem; color: #1a4a8e; margin-bottom: 2rem; border-bottom: 2px solid #1a4a8e; padding-bottom: 1rem; display: inline-block; }
                    .history-text-full { font-size: 1.25rem; line-height: 1.9; color: var(--clr-text); }
                    .history-source { font-size: 1rem; color: var(--clr-text-muted); font-style: italic; text-align: right; border-top: 1px solid var(--clr-bg); padding-top: 1.5rem; }

                    @media (max-width: 1024px) {
                        .history-header { margin-bottom: 4rem; }
                        .history-title-main { font-size: 2.22rem; padding: 0 1rem; }
                        .history-card { padding: 2.5rem 1.5rem; margin-bottom: 2rem; }
                        .history-sub { font-size: 1.6rem; margin-bottom: 1.5rem; }
                        .history-text-full { font-size: 1.1rem; line-height: 1.7; }
                    }
                `}</style>
            </section>
        </main>
    );
}
