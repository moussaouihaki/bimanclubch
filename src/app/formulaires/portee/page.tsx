"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

export default function PorteeFormPage() {
    const { t } = useI18n();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        catteryName: '',
        breederEmail: '',
        damName: '',
        sireName: '',
        matingDate: '',
        birthDate: '',
        kittenCount: 0,
        males: 0,
        females: 0,
        colorsExpected: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'portee',
                    payload: formData
                })
            });
            if (res.ok) {
                setSuccess(true);
            }
        } catch (err) {
            console.error(err);
        }

        setIsSubmitting(false);
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
                            <div className="text-6xl mb-8">😻</div>
                            <h1 className="title-massive mb-6">Déclaration Envoyée</h1>
                            <p className="section-subtitle mb-12">
                                Félicitations pour vos chatons ! Le comité et le responsable de la médiation prendront connaissance de ces naissances pour mise à jour sur le site.
                            </p>
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
                    tag="DÉMARCHES 100% DIGITALES"
                    title={<span>Annonce de <span className="text-gold italic">Portée</span></span>}
                    subtitle="Remplace les formulaires PDF de saillie et de naissances pour une gestion simplifiée."
                />

                <div className="max-w-3xl mx-auto">
                    <BirmanCard
                        className="p-4 sm:p-12 mb-12"
                        description={
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between items-center mb-12">
                                    <div className="flex gap-2">
                                        {[1, 2].map(s => (
                                            <div 
                                                key={s} 
                                                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-gold' : 'bg-black/5'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted">Étape {step} sur 2</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h3 className="text-2xl font-serif mb-8 text-blue-deep">1. Élevage & Parents</h3>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Nom de la Chatterie *</label>
                                                    <input required type="text" value={formData.catteryName} onChange={e => setFormData({ ...formData, catteryName: e.target.value })} className="input-premium" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Email responsable *</label>
                                                    <input required type="email" value={formData.breederEmail} onChange={e => setFormData({ ...formData, breederEmail: e.target.value })} className="input-premium" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Mère (Dam) *</label>
                                                    <input required type="text" placeholder="Nom complet avec Affixe" value={formData.damName} onChange={e => setFormData({ ...formData, damName: e.target.value })} className="input-premium" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Père (Sire) *</label>
                                                    <input required type="text" placeholder="Nom complet avec Affixe" value={formData.sireName} onChange={e => setFormData({ ...formData, sireName: e.target.value })} className="input-premium" />
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button type="button" onClick={() => setStep(2)} className="btn-gold px-10">Continuer</button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <h3 className="text-2xl font-serif mb-8 text-blue-deep">2. Détails de la Portée</h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Date de Saillie</label>
                                                    <input required type="date" value={formData.matingDate} onChange={e => setFormData({ ...formData, matingDate: e.target.value })} className="input-premium" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Date de Naissance *</label>
                                                    <input required type="date" value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} className="input-premium" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Total Chatons *</label>
                                                    <input required type="number" min="0" max="15" value={formData.kittenCount} onChange={e => setFormData({ ...formData, kittenCount: parseInt(e.target.value) })} className="input-premium" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="form-label">Mâles / Femelles</label>
                                                    <div className="flex gap-4">
                                                        <input type="number" placeholder="M" min="0" max="15" value={formData.males} onChange={e => setFormData({ ...formData, males: parseInt(e.target.value) })} className="input-premium" />
                                                        <input type="number" placeholder="F" min="0" max="15" value={formData.females} onChange={e => setFormData({ ...formData, females: parseInt(e.target.value) })} className="input-premium" />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2 flex flex-col gap-2">
                                                    <label className="form-label">Couleurs Attendues / Constatées</label>
                                                    <input type="text" placeholder="Ex: Seal Point, Blue Point..." value={formData.colorsExpected} onChange={e => setFormData({ ...formData, colorsExpected: e.target.value })} className="input-premium" />
                                                </div>
                                            </div>

                                            <div className="p-8 bg-blue-deep/5 rounded-3xl border border-blue-deep/10 text-sm italic text-muted mb-12">
                                                <strong>✅ Info:</strong> Si vous n'avez pas encore les noms des chatons, l'administrateur vous recontactera automatiquement pour finaliser les pédigrées FFH.
                                            </div>

                                            <div className="flex justify-between">
                                                <button type="button" onClick={() => setStep(1)} className="btn-outline px-10">Retour</button>
                                                <button type="submit" disabled={isSubmitting} className="btn-gold px-12">
                                                    {isSubmitting ? 'Envoi...' : 'Déclarer la portée'}
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

