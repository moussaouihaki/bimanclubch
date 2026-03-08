"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useI18n } from '@/i18n/I18nContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BirthDeclarationPage() {
    const { user, loading } = useAuth();
    const { t } = useI18n();
    const router = useRouter();

    const [formData, setFormData] = useState({
        birthDate: '',
        males: 0,
        females: 0,
        father: '',
        mother: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'birth_declarations'), {
                userId: user.uid,
                ...formData,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            setSuccess(true);
            setTimeout(() => router.push('/dashboard'), 3000);
        } catch (err) {
            console.error("Error submitting declaration:", err);
            alert("Une erreur est survenue lors de la soumission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !user) return null;

    if (success) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-bg)' }}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎉</div>
                    <h1 style={{ marginBottom: '1rem' }}>{t('birth.success')}</h1>
                    <p style={{ color: 'var(--clr-text-muted)' }}>Redirection vers le tableau de bord...</p>
                </motion.div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                <div style={{ marginBottom: '4rem' }}>
                    <Link href="/dashboard" style={{ color: 'var(--clr-gold)', fontWeight: 600, textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
                        ← Dashboard
                    </Link>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{t('birth.title')}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)' }}>{t('birth.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="card-apple" style={{ background: 'white', padding: '4rem', display: 'grid', gap: '2.5rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label className="field-label">{t('birth.date')}</label>
                            <input type="date" name="birthDate" required value={formData.birthDate} onChange={handleChange} className="form-input" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label className="field-label">{t('birth.males')}</label>
                            <input type="number" min="0" name="males" value={formData.males} onChange={handleChange} className="form-input" />
                        </div>
                        <div>
                            <label className="field-label">{t('birth.females')}</label>
                            <input type="number" min="0" name="females" value={formData.females} onChange={handleChange} className="form-input" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div>
                            <label className="field-label">{t('birth.father')}</label>
                            <input type="text" name="father" required placeholder="ex: CH. Zenith de l'Opaline (LOFE 12345)" value={formData.father} onChange={handleChange} className="form-input" />
                        </div>
                        <div>
                            <label className="field-label">{t('birth.mother')}</label>
                            <input type="text" name="mother" required placeholder="ex: Beauty of Silk (SHK 67890)" value={formData.mother} onChange={handleChange} className="form-input" />
                        </div>
                    </div>

                    <div>
                        <label className="field-label">Notes ou commentaires (Optionnel)</label>
                        <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} className="form-input" style={{ resize: 'vertical' }}></textarea>
                    </div>

                    <div style={{ paddingTop: '2rem', borderTop: '1px solid #f0f0f5' }}>
                        <button type="submit" disabled={isSubmitting} className="btn-gold" style={{ width: '100%', padding: '1.4rem' }}>
                            {isSubmitting ? t('common.loading') : t('birth.submit')}
                        </button>
                    </div>

                </form>

            </div>

            <style jsx>{`
                .field-label { display: block; margin-bottom: 0.8rem; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-text-muted); }
                .form-input { width: 100%; padding: 1.2rem; border-radius: 12px; border: 1px solid #E5E5E7; background: #FBFBFD; font-size: 1rem; transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                .form-input:focus { border-color: var(--clr-gold); background: white; outline: none; box-shadow: 0 0 0 4px rgba(0, 51, 153, 0.05); }
            `}</style>
        </main>
    );
}
