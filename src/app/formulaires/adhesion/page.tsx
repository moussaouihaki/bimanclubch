"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

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
            <main className="mt-12">
                <Section>
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            className="max-w-xl"
                        >
                            <div className="text-6xl mb-8">✨</div>
                            <h1 className="title-massive mb-6">{t('form.success_title')}</h1>
                            <p className="section-subtitle mb-12">{t('form.success_text')}</p>
                            <button onClick={() => window.location.href = '/'} className="btn-gold px-12 py-4">
                                {t('common.back_home') || "Retour à l'accueil"}
                            </button>
                        </motion.div>
                    </div>
                </Section>
            </main>
        );
    }

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    title={t('form.adhesion_title')}
                    subtitle={t('form.adhesion_subtitle')}
                />

                <div className="max-w-3xl mx-auto">
                    <BirmanCard
                        className="p-4 sm:p-12 mb-12"
                        description={
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between items-center mb-12">
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(s => (
                                            <div 
                                                key={s} 
                                                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-gold' : 'bg-black/5'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted">Étape {step} sur 4</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h3 className="text-2xl font-serif mb-8 text-blue-deep">{t('form.step1')}</h3>
                                            <div className="flex flex-col gap-4">
                                                {[
                                                    { key: 'einzel', label: t('form.type_einzel') },
                                                    { key: 'doppel', label: t('form.type_doppel') },
                                                    { key: 'gonner', label: t('form.type_gonner') }
                                                ].map((type) => (
                                                    <label key={type.key} className={`flex items-center gap-6 p-6 rounded-3xl border-2 transition-all cursor-pointer ${formData.membershipType === type.key ? 'border-gold bg-gold/5' : 'border-black/5 hover:border-black/10'}`}>
                                                        <input type="radio" checked={formData.membershipType === type.key} onChange={() => setFormData({ ...formData, membershipType: type.key })} className="w-6 h-6 accent-gold" />
                                                        <span className="text-lg font-medium">{type.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <div className="mt-12 flex justify-end">
                                                <button type="button" onClick={() => setStep(2)} className="btn-gold px-10">{t('common.next')}</button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h3 className="text-2xl font-serif mb-8 text-blue-deep">{t('form.step2')}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">{t('form.field_name')}</label>
                                                    <input required type="text" className="input-premium" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">{t('form.field_email')}</label>
                                                    <input required type="email" className="input-premium" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                                </div>
                                                <div className="sm:col-span-2 flex flex-col gap-2">
                                                    <label className="form-label">{t('form.field_address')}</label>
                                                    <input required type="text" className="input-premium" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">{t('form.field_city')}</label>
                                                    <input required type="text" className="input-premium" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">{t('form.field_phone')}</label>
                                                    <input required type="tel" className="input-premium" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                                </div>
                                                {formData.membershipType === 'doppel' && (
                                                    <div className="sm:col-span-2 p-6 bg-black/2 rounded-2xl flex flex-col gap-2 border border-black/5">
                                                        <label className="form-label">{t('form.field_second_person')}</label>
                                                        <input required type="text" className="input-premium bg-white" value={formData.secondPerson} onChange={e => setFormData({ ...formData, secondPerson: e.target.value })} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex justify-between mt-12">
                                                <button type="button" onClick={() => setStep(1)} className="btn-outline px-10">{t('common.back')}</button>
                                                <button type="button" onClick={() => setStep(3)} className="btn-gold px-10">{t('common.next')}</button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h3 className="text-2xl font-serif mb-8 text-blue-deep">{t('form.step3')}</h3>
                                            <label className={`flex items-center gap-6 p-8 rounded-3xl border-2 transition-all cursor-pointer mb-8 ${formData.isBreeder ? 'border-gold bg-gold/5' : 'border-black/5 bg-black/2'}`}>
                                                <input type="checkbox" checked={formData.isBreeder} onChange={e => setFormData({ ...formData, isBreeder: e.target.checked })} className="w-8 h-8 accent-gold" />
                                                <span className="text-lg font-bold">{t('form.field_breeder_check')}</span>
                                            </label>

                                            {formData.isBreeder && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="flex flex-col gap-2">
                                                        <label className="form-label">{t('form.field_cattery')}</label>
                                                        <input type="text" className="input-premium" value={formData.catteryName} onChange={e => setFormData({ ...formData, catteryName: e.target.value })} />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="form-label">{t('form.field_website')}</label>
                                                        <input type="text" className="input-premium" value={formData.homepage} onChange={e => setFormData({ ...formData, homepage: e.target.value })} />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="form-label">{t('form.field_cats')}</label>
                                                        <input type="number" className="input-premium" value={formData.catsCount} onChange={e => setFormData({ ...formData, catsCount: e.target.value })} />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="form-label">{t('form.field_studs')}</label>
                                                        <input type="number" className="input-premium" value={formData.studsCount} onChange={e => setFormData({ ...formData, studsCount: e.target.value })} />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex justify-between mt-12">
                                                <button type="button" onClick={() => setStep(2)} className="btn-outline px-10">{t('common.back')}</button>
                                                <button type="button" onClick={() => setStep(4)} className="btn-gold px-10">{t('common.next')}</button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h3 className="text-2xl font-serif mb-8 text-blue-deep">{t('form.step4')}</h3>
                                            <div className="mb-12">
                                                <p className="font-bold mb-6 text-muted uppercase tracking-widest text-xs">{t('form.privacy_title')}</p>
                                                <div className="grid gap-3">
                                                    {[
                                                        { key: 'all', label: t('form.privacy_all') },
                                                        { key: 'nameOnly', label: t('form.privacy_name') },
                                                        { key: 'none', label: t('form.privacy_none') }
                                                    ].map(opt => (
                                                        <label key={opt.key} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${formData.privacy === opt.key ? 'border-gold bg-gold/5' : 'border-black/5 hover:border-black/10'}`}>
                                                            <input type="radio" checked={formData.privacy === opt.key} onChange={() => setFormData({ ...formData, privacy: opt.key })} className="w-5 h-5 accent-gold" />
                                                            <span className="font-medium">{opt.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-8 bg-gold/10 rounded-3xl border border-gold/20 mb-12">
                                                <label className="flex gap-6 cursor-pointer">
                                                    <input required type="checkbox" checked={formData.agreed} onChange={e => setFormData({ ...formData, agreed: e.target.checked })} className="w-8 h-8 flex-shrink-0 mt-1 accent-gold" />
                                                    <span className="text-md leading-relaxed font-medium">{t('form.declaration')}</span>
                                                </label>
                                            </div>

                                            <div className="flex justify-between">
                                                <button type="button" onClick={() => setStep(3)} className="btn-outline px-10">{t('common.back')}</button>
                                                <button type="submit" disabled={isSubmitting} className="btn-gold px-12">
                                                    {isSubmitting ? '...' : t('common.submit')}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        }
                    />
                </div>
            </Section>

            <style jsx>{`
                .form-label { font-size: 0.75rem; font-weight: 700; color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
                .input-premium { width: 100%; padding: 1.2rem; border-radius: 14px; border: 1px solid rgba(0,0,0,0.05); background: #fbfbfb; outline: none; font-size: 1rem; font-weight: 500; transition: 0.3s; }
                .input-premium:focus { border-color: var(--clr-blue-vibrant); background: white; box-shadow: 0 0 0 4px rgba(0, 51, 153, 0.05); }
            `}</style>
        </main>
    );
}

