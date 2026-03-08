"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AffixeFormPage() {
    const { user } = useAuth();
    const { t } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        choice1: '',
        choice2: '',
        choice3: '',
        breederName: '',
        address: '',
        email: '',
        phone: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'affixe_requests'), {
                ...formData,
                userId: user.uid,
                userEmail: user.email,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <main style={{ paddingTop: '200px', textAlign: 'center' }}>
                <div className="card-apple" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem' }}>
                    <h2 style={{ fontSize: '3rem' }}>🏷️</h2>
                    <h3>{t('affixe.title')}</h3>
                    <p style={{ color: 'var(--clr-text-muted)', margin: '1rem 0 2rem' }}>{t('form.success_text')}</p>
                    <button onClick={() => window.location.href = '/dashboard'} className="btn-gold">{t('common.back')} Dashboard</button>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '150px', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 className="title-massive" style={{ textAlign: 'center', marginBottom: '4rem' }}>{t('affixe.title')}</h1>

                <form onSubmit={handleSubmit} className="card-apple" style={{ background: 'white', padding: '4rem' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>

                        <div style={{ background: '#f9f9fb', padding: '2rem', borderRadius: '20px' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>{t('affixe.subtitle')}</h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label className="form-label">{t('affixe.name_choice1')}</label>
                                    <input required className="input-premium" value={formData.choice1} onChange={e => setFormData({ ...formData, choice1: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">{t('affixe.name_choice2')}</label>
                                    <input required className="input-premium" value={formData.choice2} onChange={e => setFormData({ ...formData, choice2: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">{t('affixe.name_choice3')}</label>
                                    <input required className="input-premium" value={formData.choice3} onChange={e => setFormData({ ...formData, choice3: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Infos Éleveur</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <input required placeholder="Nom complet" className="input-premium" value={formData.breederName} onChange={e => setFormData({ ...formData, breederName: e.target.value })} />
                                <textarea required placeholder="Adresse complète" className="input-premium" rows={3} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <input required placeholder="Email" className="input-premium" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    <input required placeholder="Téléphone" className="input-premium" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <button disabled={isSubmitting} type="submit" className="btn-gold" style={{ marginTop: '2rem', padding: '1.2rem' }}>
                            {isSubmitting ? '...' : t('common.submit')}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .form-label { display: block; margin-bottom: 0.8rem; font-size: 0.8rem; font-weight: 700; color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
                .input-premium { width: 100%; padding: 1.2rem; border-radius: 12px; border: 1px solid #e0e0e0; background: #fafafa; font-size: 1rem; transition: 0.2s; }
                .input-premium:focus { border-color: var(--clr-gold); background: white; outline: none; }
            `}</style>
        </main>
    );
}
