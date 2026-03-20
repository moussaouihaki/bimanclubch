"use client";
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function BirmanPage() {
    const { t } = useI18n();

    const VARIETIES = [
        { id: 'solid', title_key: 'birman.solid_title', desc_key: 'birman.solid_desc', img: "/images/cats/solid_point.png", colors_key: 'birman.points_list' },
        { id: 'tabby', title_key: 'birman.tabby_title', desc_key: 'birman.tabby_desc', img: "/images/cats/tabby_point.png", colors_key: 'birman.points_list' },
        { id: 'tortie', title_key: 'birman.tortie_title', desc_key: 'birman.tortie_desc', img: "/images/cats/tortie_point.png", colors_key: 'birman.points_list' },
        { id: 'torbie', title_key: 'birman.torbie_title', desc_key: 'birman.torbie_desc', img: "/images/cats/torbie_point.png", colors_key: 'birman.points_list' }
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
        <main className="mt-12">
            {/* HERO SECTION */}
            <Section>
                <PageHeader 
                    tag={t('birman.tag')}
                    title={<>{t('birman.title_main')} <span className="text-serif text-gold">{t('birman.title_sub')}</span></>}
                    subtitle={t('birman.subtitle')}
                />
            </Section>

            {/* LEGEND SECTION */}
            <Section style={{ paddingTop: '0' }}>
                <div className="legend-grid">
                    <div className="legend-image-wrapper">
                        <img src="/images/hero-birman.png" alt="Legendary Birman" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }} />
                    </div>
                    <div className="legend-content-wrapper">
                        <h2 className="legend-title">{t('birman.legend_title')}</h2>
                        <p className="legend-text">{t('birman.legend_text')}</p>
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
                <style jsx>{`
                    .legend-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 5rem; align-items: center; }
                    .legend-image-wrapper { position: relative; height: 600px; border-radius: 40px; overflow: hidden; box-shadow: var(--shadow-lg); }
                    .legend-title { font-size: 3rem; margin-bottom: 2.5rem; font-family: var(--font-serif); }
                    .legend-text { font-size: 1.25rem; line-height: 1.8; color: var(--clr-text-muted); margin-bottom: 3rem; }
                    .legend-stats { display: flex; gap: 2rem; }
                    .stat-card { background: white; padding: 1.5rem 2rem; border-radius: 24px; box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.02); }
                    .stat-value { font-size: 2.5rem; color: var(--clr-blue-vibrant); font-weight: 800; }
                    .stat-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: var(--clr-text-muted); }
                    @media (max-width: 1024px) {
                        .legend-grid { grid-template-columns: 1fr; gap: 3rem; }
                        .legend-image-wrapper { height: 400px; }
                        .legend-title { font-size: 2.5rem; text-align: center; }
                        .legend-text { text-align: center; }
                        .legend-stats { justify-content: center; }
                    }
                `}</style>
            </Section>

            {/* ANATOMICAL STANDARD SECTION */}
            <Section style={{ background: 'white' }}>
                <PageHeader title="Standard de la Race" subtitle="Les caractéristiques physiques essentielles du Sacré de Birmanie" />

                <div className="standard-container">
                    <div className="flex flex-col gap-8">
                        <div className="mx-auto" style={{ maxWidth: '800px', borderRadius: '40px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                            <img src="/images/cats/solid_point.png" alt="Birman Standard" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div className="grid-standard">
                            {[
                                { tag: 'OREILLES', text: t('birman.std_ears') },
                                { tag: 'YEUX', text: t('birman.std_eyes') },
                                { tag: 'PROFIL', text: t('birman.std_profile') },
                                { tag: 'CORPS', text: t('birman.std_body') },
                                { tag: 'PELAGE', text: t('birman.std_coat') },
                                { tag: 'QUEUE', text: t('birman.std_tail') },
                                { tag: 'ÉPERONS', text: t('birman.std_spurs') }
                            ].map((item, i) => (
                                <BirmanCard
                                    key={i}
                                    tag={item.tag}
                                    description={item.text}
                                    variant="glass"
                                    delay={i * 0.05}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .grid-standard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
                    @media (max-width: 1024px) {
                        .grid-standard { grid-template-columns: repeat(2, 1fr); }
                    }
                    @media (max-width: 640px) {
                        .grid-standard { grid-template-columns: 1fr; }
                    }
                `}</style>
            </Section>

            {/* CHARACTER & COAT INFO */}
            <Section style={{ background: 'var(--clr-silk)' }}>
                <div className="char-grid">
                    <BirmanCard
                        title={t('birman.char_title')}
                        description={
                            <div className="flex flex-col gap-4">
                                <p>{t('birman.char_detailed')}</p>
                                <div className="mt-4 p-8" style={{ background: 'rgba(0,122,255,0.05)', borderRadius: '24px', borderLeft: '4px solid var(--clr-blue-vibrant)', fontStyle: 'italic', fontWeight: 500 }}>
                                    "L'équilibre parfait entre le calme du Persan et la curiosité du Siamois."
                                </div>
                            </div>
                        }
                    />
                    <BirmanCard
                        title={t('birman.coat_title')}
                        description={
                            <div className="flex flex-col gap-4">
                                <p>{t('birman.coat_desc')}</p>
                                <div className="flex gap-4 mt-4">
                                    <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100">
                                        <div className="text-gold font-bold">{t('birman.gloves')}</div>
                                        <div className="text-xs mt-1">Blancs purs sur les 4 pattes.</div>
                                    </div>
                                    <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100">
                                        <div className="text-gold font-bold">{t('birman.spurs')}</div>
                                        <div className="text-xs mt-1">Forme de V renversé (Keil).</div>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
                <style jsx>{`
                    .char-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
                    @media (max-width: 1024px) { .char-grid { grid-template-columns: 1fr; } }
                `}</style>
            </Section>

            {/* COLORS GALLERY */}
            <Section>
                <PageHeader title={t('birman.colors_title')} subtitle={t('birman.colors_subtitle')} />
                <div className="varieties-grid">
                    {VARIETIES.map((v, idx) => (
                        <BirmanCard
                            key={v.id}
                            image={v.img}
                            title={t(v.title_key)}
                            tag={t(v.colors_key)}
                            description={t(v.desc_key)}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>
                <style jsx>{`
                    .varieties-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; }
                    @media (max-width: 1024px) { .varieties-grid { grid-template-columns: 1fr; } }
                `}</style>
            </Section>

            {/* MEMBER EXAMPLES GRID */}
            <Section style={{ background: 'white' }}>
                <PageHeader title={t('birman.member_examples')} />
                <div className="cats-grid">
                    {MEMBER_CATS.map((cat, idx) => (
                        <BirmanCard
                            key={idx}
                            image={cat.img}
                            title={cat.name}
                            subtitle={cat.variety}
                            description={<span className="text-xs opacity-60">{cat.code}</span>}
                            delay={(idx % 4) * 0.05}
                            className="cat-card-small"
                        />
                    ))}
                </div>
                <style jsx>{`
                    .cats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
                    @media (max-width: 1200px) { .cats-grid { grid-template-columns: repeat(3, 1fr); } }
                    @media (max-width: 900px) { .cats-grid { grid-template-columns: repeat(2, 1fr); } }
                    @media (max-width: 500px) { .cats-grid { grid-template-columns: 1fr; } }
                `}</style>
            </Section>

            {/* HISTORY SECTION */}
            <Section dark>
                <PageHeader title="La Légende de la Sainte Birmanie" centered />
                <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                    <BirmanCard
                        title="Origine"
                        description={t('birman.history_full')}
                        variant="glass"
                    />
                    <BirmanCard
                        title="La Légende"
                        description={
                            <div className="flex flex-col gap-8">
                                <p>{t('birman.legend_full')}</p>
                                <div className="text-right italic opacity-60 text-sm border-t border-white/10 pt-4">
                                    Source : "Mon grand livre des chats" David Taylor, Weltbildverlag 1989
                                </div>
                            </div>
                        }
                        variant="glass"
                    />
                </div>
            </Section>
        </main>
    );
}

