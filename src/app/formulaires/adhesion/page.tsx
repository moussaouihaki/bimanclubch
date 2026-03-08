"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdhesionFormPage() {
    const { t } = useI18n();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        membershipType: 'einzel',
        fullName: '',
        address: '',
        city: '',
        phone: '',
        email: '',
        secondPerson: '',
        isBreeder: false,
        catteryName: '',
        homepage: '',
        ffhSection: '',
        catsCount: '',
        studsCount: '',
        privacy: 'all',
        agreed: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("Veuillez accepter la déclaration pour continuer.");
            return;
        }

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'memberships'), {
                ...formData,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            setSuccess(true);
        } catch (err) {
            console.error("Error submitting adhesion:", err);
            alert("Une erreur est survenue lors de l'envoi du formulaire.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <main style={{ paddingTop: '200px', minHeight: '100vh', background: 'var(--clr-silk)', textAlign: 'center' }}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '5rem', borderRadius: '40px', maxWidth: '600px', margin: '0 auto', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('form.success_title')}</h1>
                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>{t('form.success_text')}</p>
                    <button onClick={() => window.location.href = '/'} className="btn-gold">OK</button>
                </motion.div>
            </main>
        );
    }

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="title-massive" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>{t('form.adhesion_title')}</h1>
                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem' }}>{t('form.adhesion_subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="card-apple" style={{ background: 'white' }}>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 600, color: 'var(--clr-seal)' }}>{t('form.step1')}</h3>
                                <div style={{ display: 'grid', gap: '1.2rem' }}>
                                    {[
                                        { key: 'einzel', label: t('form.type_einzel') },
                                        { key: 'doppel', label: t('form.type_doppel') },
                                        { key: 'gonner', label: t('form.type_gonner') }
                                    ].map((type) => (
                                        <label key={type.key} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '20px', border: formData.membershipType === type.key ? '2px solid var(--clr-gold)' : '1px solid rgba(0,0,0,0.08)', background: formData.membershipType === type.key ? 'rgba(184,134,11,0.04)' : 'transparent', cursor: 'pointer' }}>
                                            <input type="radio" checked={formData.membershipType === type.key} onChange={() => setFormData({ ...formData, membershipType: type.key })} style={{ width: '22px', height: '22px', accentColor: 'var(--clr-gold)' }} />
                                            <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{type.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="button" onClick={() => setStep(2)} className="btn-gold">{t('common.next')}</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', color: 'var(--clr-seal)' }}>{t('form.step2')}</h3>
                                <div style={{ display: 'grid', gap: '1.8rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <label className="form-label">{t('form.field_name')}</label>
                                            <input required type="text" className="input-premium" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="form-label">{t('form.field_email')}</label>
                                            <input required type="email" className="input-premium" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label">{t('form.field_address')}</label>
                                        <input required type="text" className="input-premium" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <label className="form-label">{t('form.field_city')}</label>
                                            <input required type="text" className="input-premium" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="form-label">{t('form.field_phone')}</label>
                                            <input required type="tel" className="input-premium" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    {formData.membershipType === 'doppel' && (
                                        <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.8rem', borderRadius: '18px' }}>
                                            <label className="form-label">{t('form.field_second_person')}</label>
                                            <input required type="text" className="input-premium" value={formData.secondPerson} onChange={e => setFormData({ ...formData, secondPerson: e.target.value })} style={{ background: 'white' }} />
                                        </div>
                                    )}
                                </div>
                                <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" onClick={() => setStep(1)} className="btn-outline">{t('common.back')}</button>
                                    <button type="button" onClick={() => setStep(3)} className="btn-gold">{t('common.next')}</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', color: 'var(--clr-seal)' }}>{t('form.step3')}</h3>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', cursor: 'pointer', marginBottom: '2.5rem', padding: '1.8rem', background: 'rgba(184,134,11,0.05)', borderRadius: '22px' }}>
                                    <input type="checkbox" checked={formData.isBreeder} onChange={e => setFormData({ ...formData, isBreeder: e.target.checked })} style={{ width: '24px', height: '24px' }} />
                                    <span style={{ fontWeight: 600 }}>{t('form.field_breeder_check')}</span>
                                </label>

                                {formData.isBreeder && (
                                    <div style={{ display: 'grid', gap: '1.8rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                            <div>
                                                <label className="form-label">{t('form.field_cattery')}</label>
                                                <input type="text" className="input-premium" value={formData.catteryName} onChange={e => setFormData({ ...formData, catteryName: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="form-label">{t('form.field_website')}</label>
                                                <input type="text" className="input-premium" value={formData.homepage} onChange={e => setFormData({ ...formData, homepage: e.target.value })} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                            <div>
                                                <label className="form-label">{t('form.field_cats')}</label>
                                                <input type="number" className="input-premium" value={formData.catsCount} onChange={e => setFormData({ ...formData, catsCount: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="form-label">{t('form.field_studs')}</label>
                                                <input type="number" className="input-premium" value={formData.studsCount} onChange={e => setFormData({ ...formData, studsCount: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" onClick={() => setStep(2)} className="btn-outline">{t('common.back')}</button>
                                    <button type="button" onClick={() => setStep(4)} className="btn-gold">{t('common.next')}</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', color: 'var(--clr-seal)' }}>{t('form.step4')}</h3>
                                <div style={{ marginBottom: '2.5rem' }}>
                                    <p style={{ fontWeight: 600, marginBottom: '1.5rem' }}>{t('form.privacy_title')}</p>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {[
                                            { key: 'all', label: t('form.privacy_all') },
                                            { key: 'nameOnly', label: t('form.privacy_name') },
                                            { key: 'none', label: t('form.privacy_none') }
                                        ].map(opt => (
                                            <label key={opt.key} style={{ display: 'flex', gap: '1rem', cursor: 'pointer' }}>
                                                <input type="radio" checked={formData.privacy === opt.key} onChange={() => setFormData({ ...formData, privacy: opt.key })} />
                                                <span>{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(184,134,11,0.06)', padding: '2rem', borderRadius: '24px' }}>
                                    <label style={{ display: 'flex', gap: '1.2rem', cursor: 'pointer' }}>
                                        <input required type="checkbox" checked={formData.agreed} onChange={e => setFormData({ ...formData, agreed: e.target.checked })} style={{ width: '24px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.95rem' }}>{t('form.declaration')}</span>
                                    </label>
                                </div>

                                <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" onClick={() => setStep(3)} className="btn-outline">{t('common.back')}</button>
                                    <button type="submit" disabled={isSubmitting} className="btn-gold">
                                        {isSubmitting ? '...' : t('common.submit')}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </form>
            </div>
            <style jsx>{`
                .form-label { display: block; margin-bottom: 0.6rem; font-size: 0.9rem; font-weight: 500; color: var(--clr-text-muted); }
                .input-premium { width: 100%; padding: 1.2rem; border-radius: 14px; border: 1px solid #e0e0e0; outline: none; font-size: 1rem; transition: border 0.2s; }
                .input-premium:focus { border-color: var(--clr-gold); }
            `}</style>
        </main>
    );
}
