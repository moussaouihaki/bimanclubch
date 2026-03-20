"use client";
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

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
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('gallery.tag') || "SOUVENIRS"}
                    title={t('gallery.title_main') || "Galerie Photos"}
                    subtitle={t('gallery.subtitle') || "Les plus beaux spécimens et moments forts du club en images."}
                />

                <div className="gallery-grid">
                    {MOCK_IMAGES.map((img, i) => (
                        <BirmanCard
                            key={img.id}
                            delay={i * 0.05}
                            image={img.src}
                            title={(img.title as any)[language]}
                            className="gallery-item-card"
                            variant="glass"
                            style={{ minHeight: '400px' }}
                        />
                    ))}
                </div>
            </Section>

            <style jsx>{`
                .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem; }
            `}</style>
        </main>
    );
}

