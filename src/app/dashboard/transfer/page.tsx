"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function TransferFormPage() {
    const { user } = useAuth();
    const { t } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        catName: '',
        regNo: '',
        microchip: '',
        sellerName: '',
        sellerAddress: '',
        buyerName: '',
        buyerAddress: '',
        buyerPhone: '',
        transferDate: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'transfers'), {
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
                    <h2 style={{ fontSize: '3rem' }}>🤝</h2>
                    <h3>{t('transfer.title')}</h3>
                    <p style={{ color: 'var(--clr-text-muted)', margin: '1rem 0 2rem' }}>{t('form.success_text')}</p>
                    <button onClick={() => window.location.href = '/dashboard'} className="btn-gold">{t('common.back')} Dashboard</button>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '150px', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <h1 className="title-massive" style={{ textAlign: 'center', marginBottom: '4rem' }}>{t('transfer.title')}</h1>

                <form onSubmit={handleSubmit} className="card-apple" style={{ background: 'white', padding: '4rem' }}>
                    <div style={{ display: 'grid', gap: '3rem' }}>

                        {/* Cat Info */}
                        <div style={{ borderBottom: '1px solid #f0f0f5', paddingBottom: '3rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--clr-gold)' }}>{t('pedigree.kitten_info')}</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <label className="form-label">{t('transfer.cat_name')}</label>
                                    <input required className="input-premium" value={formData.catName} onChange={e => setFormData({ ...formData, catName: e.target.value })} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label className="form-label">No LOH/RIEX</label>
                                        <input required className="input-premium" value={formData.regNo} onChange={e => setFormData({ ...formData, regNo: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="form-label">Microchip</label>
                                        <input required className="input-premium" value={formData.microchip} onChange={e => setFormData({ ...formData, microchip: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seller / Buyer Split */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                            <div>
                                <h3 style={{ marginBottom: '1.5rem' }}>{t('transfer.seller')}</h3>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <input required placeholder="Nom complet" className="input-premium" value={formData.sellerName} onChange={e => setFormData({ ...formData, sellerName: e.target.value })} />
                                    <textarea required placeholder="Adresse complète" className="input-premium" rows={3} value={formData.sellerAddress} onChange={e => setFormData({ ...formData, sellerAddress: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '1.5rem' }}>{t('transfer.buyer')}</h3>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <input required placeholder="Nom complet" className="input-premium" value={formData.buyerName} onChange={e => setFormData({ ...formData, buyerName: e.target.value })} />
                                    <textarea required placeholder="Adresse complète" className="input-premium" rows={3} value={formData.buyerAddress} onChange={e => setFormData({ ...formData, buyerAddress: e.target.value })} />
                                    <input required placeholder="Téléphone" className="input-premium" value={formData.buyerPhone} onChange={e => setFormData({ ...formData, buyerPhone: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid #f0f0f5' }}>
                            <button disabled={isSubmitting} type="submit" className="btn-gold" style={{ padding: '1.2rem 4rem' }}>
                                {isSubmitting ? '...' : t('common.submit')}
                            </button>
                        </div>

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
