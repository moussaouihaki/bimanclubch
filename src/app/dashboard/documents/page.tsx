"use client";
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DocumentsPage() {
    const { user, loading } = useAuth();
    const { t } = useI18n();

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>{t('common.loading')}</div>;


    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '150px', paddingBottom: '100px' }}>
            <div className="container-large">

                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h1 className="title-massive" style={{ fontSize: '3.5rem' }}>{t('docs.title')}</h1>
                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>{t('docs.subtitle')}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* Digital Forms Section */}
                    <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{t('docs.digital_forms')}</h2>
                    </div>

                    {[
                        { id: 'saillie', title: t('saillie.title'), description: t('saillie.subtitle'), icon: '📜', href: '/dashboard/saillie' },
                        { id: 'transfer', title: t('transfer.title'), description: t('transfer.subtitle'), icon: '🤝', href: '/dashboard/transfer' },
                        { id: 'pedigree', title: t('pedigree.title'), description: t('pedigree.subtitle'), icon: '📝', href: '/dashboard/pedigree' },
                        { id: 'affixe', title: t('affixe.title'), description: t('affixe.subtitle'), icon: '🏷️', href: '/dashboard/affixe' },
                    ].map((form, idx) => (
                        <motion.div
                            key={form.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-apple"
                            style={{ background: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid var(--clr-gold)' }}
                        >
                            <div style={{ fontSize: '2.5rem' }}>{form.icon}</div>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{form.title}</h3>
                                <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>{form.description}</p>
                            </div>
                            <Link href={form.href} className="btn-gold" style={{ marginTop: 'auto', width: 'fit-content', padding: '0.8rem 1.5rem', textDecoration: 'none' }}>
                                {t('docs.open_form')}
                            </Link>
                        </motion.div>
                    ))}

                    {/* PDF Downloads Section */}
                    <div style={{ gridColumn: '1 / -1', marginTop: '3rem', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{t('docs.pdf_docs')}</h2>
                    </div>

                    {[
                        { id: 'statuts', title: t('docs.statutes'), description: 'Version 2024 - PDF', icon: '📜' },
                        { id: 'reglement', title: t('docs.rules'), description: 'Directives d\'élevage FFH/CBS', icon: '⚖️' },
                    ].map((doc, idx) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-apple"
                            style={{ background: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            <div style={{ fontSize: '2.5rem' }}>{doc.icon}</div>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{doc.title}</h3>
                                <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>{doc.description}</p>
                            </div>
                            <button className="btn-outline" style={{ marginTop: 'auto', width: 'fit-content', padding: '0.8rem 1.5rem' }}>
                                {t('docs.download')}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="card-apple" style={{ marginTop: '4rem', background: 'var(--clr-sapphire)', color: 'white', padding: '4rem', textAlign: 'center' }}>
                    <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>{t('docs.need_other')}</h2>
                    <p style={{ opacity: 0.8, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        {t('docs.contact_sec')}
                    </p>
                    <a href="/dashboard/messages" style={{ color: 'white', textDecoration: 'underline', fontWeight: 600 }}>{t('dashboard.access_msg')}</a>
                </div>

            </div>
        </main>
    );
}
