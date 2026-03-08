"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useI18n } from '@/i18n/I18nContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, profile, loading } = useAuth();
    const { t } = useI18n();
    const router = useRouter();

    const [formData, setFormData] = useState({
        catteryName: '',
        ownerName: '',
        canton: 'AG',
        location: '',
        phone: '',
        website: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
        if (profile) {
            setFormData({
                catteryName: profile.catteryName || '',
                ownerName: profile.ownerName || '',
                canton: profile.canton || 'AG',
                location: profile.location || '',
                phone: profile.phone || '',
                website: profile.website || ''
            });
        }
    }, [user, profile, loading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                ...formData,
                updatedAt: new Date().toISOString()
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Erreur lors de la mise à jour.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !user) return null;

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                <div style={{ marginBottom: '4rem' }}>
                    <Link href="/dashboard" style={{ color: 'var(--clr-gold)', fontWeight: 600, textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
                        ← Dashboard
                    </Link>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{t('profile.title')}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)' }}>{t('profile.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="card-apple" style={{ background: 'white', padding: '4rem', display: 'grid', gap: '2.5rem' }}>

                    {success && (
                        <div style={{ padding: '1.5rem', background: '#DCFCE7', color: '#166534', borderRadius: '12px', fontSize: '1rem', textAlign: 'center' }}>
                            {t('profile.success')}
                        </div>
                    )}

                    <div>
                        <label className="field-label">{t('profile.cattery')}</label>
                        <input type="text" name="catteryName" value={formData.catteryName} onChange={handleChange} placeholder="ex: De la Perle d'Ananda" className="form-input" />
                    </div>

                    <div>
                        <label className="field-label">{t('profile.owner')}</label>
                        <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="ex: Jean Dupont" className="form-input" />
                    </div>

                    <div className="form-grid">
                        <div>
                            <label className="field-label">Canton</label>
                            <select name="canton" value={formData.canton} onChange={handleChange} className="form-input">
                                {["AG", "AI", "AR", "BE", "BL", "BS", "FR", "GE", "GL", "GR", "JU", "LU", "NE", "NW", "OW", "SG", "SH", "SO", "SZ", "TG", "TI", "UR", "VD", "VS", "ZG", "ZH"].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="field-label">{t('profile.location')}</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="ex: Lausanne" className="form-input" />
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div>
                            <label className="field-label">{t('profile.phone')}</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="ex: +41 79 123 45 67" className="form-input" />
                        </div>
                        <div>
                            <label className="field-label">{t('profile.website')}</label>
                            <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="form-input" />
                        </div>
                    </div>

                    <div style={{ paddingTop: '2rem', borderTop: '1px solid #f0f0f5' }}>
                        <button type="submit" disabled={isSubmitting} className="btn-gold" style={{ width: '100%', padding: '1.4rem' }}>
                            {isSubmitting ? t('common.loading') : t('profile.save')}
                        </button>
                    </div>

                </form>

            </div>

            <style jsx>{`
                .field-label { display: block; margin-bottom: 0.8rem; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-text-muted); }
                .form-input { width: 100%; padding: 1.2rem; border-radius: 12px; border: 1px solid #E5E5E7; background: #FBFBFD; font-size: 1rem; transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                .form-input:focus { border-color: var(--clr-gold); background: white; outline: none; box-shadow: 0 0 0 4px rgba(0, 51, 153, 0.05); }
                .form-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; }
                .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                
                @media (max-width: 600px) {
                    .form-grid, .form-grid-2 { grid-template-columns: 1fr; gap: 1.5rem; }
                    .card-apple { padding: 2rem !important; }
                    h1 { font-size: 2.5rem !important; }
                }
            `}</style>
        </main>
    );
}
