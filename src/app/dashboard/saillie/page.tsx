"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function SaillieFormPage() {
    const { user } = useAuth();
    const { t } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        matingDate: '',
        sireName: '',
        sireReg: '',
        sireChip: '',
        sireOwner: '',
        damName: '',
        damReg: '',
        damChip: '',
        damOwner: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'mating_certificates'), {
                ...formData,
                userId: user.uid,
                userEmail: user.email,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'envoi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <main style={{ paddingTop: '200px', textAlign: 'center' }}>
                <div className="card-apple" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem' }}>
                    <h2 style={{ fontSize: '3rem' }}>📜</h2>
                    <h3>{t('saillie.title')}</h3>
                    <p style={{ color: 'var(--clr-text-muted)', margin: '1rem 0 2rem' }}>{t('form.success_text')}</p>
                    <button onClick={() => window.location.href = '/dashboard'} className="btn-gold">{t('common.back')} Dashboard</button>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '150px', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="title-massive">{t('saillie.title')}</h1>
                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>{t('saillie.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

                        {/* Sire */}
                        <div className="card-apple" style={{ background: 'white', padding: '3rem' }}>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ background: 'var(--clr-gold)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>♂</span>
                                {t('saillie.sire')}
                            </h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <label className="form-label">{t('ads.name')}</label>
                                    <input required className="input-premium" value={formData.sireName} onChange={e => setFormData({ ...formData, sireName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">{t('saillie.reg_no')}</label>
                                    <input required className="input-premium" value={formData.sireReg} onChange={e => setFormData({ ...formData, sireReg: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">Microchip</label>
                                    <input required className="input-premium" value={formData.sireChip} onChange={e => setFormData({ ...formData, sireChip: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">{t('saillie.owner_info')}</label>
                                    <input required className="input-premium" placeholder="Nom et Club" value={formData.sireOwner} onChange={e => setFormData({ ...formData, sireOwner: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Dam */}
                        <div className="card-apple" style={{ background: 'white', padding: '3rem' }}>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ background: '#EC4899', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>♀</span>
                                {t('saillie.dam')}
                            </h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <label className="form-label">{t('ads.name')}</label>
                                    <input required className="input-premium" value={formData.damName} onChange={e => setFormData({ ...formData, damName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">{t('saillie.reg_no')}</label>
                                    <input required className="input-premium" value={formData.damReg} onChange={e => setFormData({ ...formData, damReg: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">Microchip</label>
                                    <input required className="input-premium" value={formData.damChip} onChange={e => setFormData({ ...formData, damChip: e.target.value })} />
                                </div>
                                <div>
                                    <label className="form-label">{t('saillie.owner_info')}</label>
                                    <input required className="input-premium" placeholder="Nom et Club" value={formData.damOwner} onChange={e => setFormData({ ...formData, damOwner: e.target.value })} />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="card-apple" style={{ marginTop: '3rem', background: 'white', padding: '3rem', textAlign: 'center' }}>
                        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <label className="form-label" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>{t('saillie.date')}</label>
                            <input required type="date" className="input-premium" style={{ textAlign: 'center' }} value={formData.matingDate} onChange={e => setFormData({ ...formData, matingDate: e.target.value })} />
                        </div>
                        <button disabled={isSubmitting} type="submit" className="btn-gold" style={{ marginTop: '3rem', width: '100%', maxWidth: '400px', padding: '1.2rem' }}>
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
