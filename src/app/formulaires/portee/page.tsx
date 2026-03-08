"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PorteeFormPage() {
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

    const handleSubmit = async (e: any) => {
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
            <main style={{ paddingTop: '200px', minHeight: '100vh', background: 'var(--clr-silk)', textAlign: 'center' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'var(--clr-opal)', padding: '5rem', borderRadius: '40px', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😻</div>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--clr-seal)', marginBottom: '1rem' }}>Déclaration Envoyée</h2>
                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Félicitations pour vos chatons ! Le comité et le responsable de la médiation prendront connaissance de ces naissances pour mise à jour sur le site.
                    </p>
                    <button onClick={() => window.location.href = '/'} className="btn-gold">Retour à l'accueil</button>
                </motion.div>
            </main>
        );
    }

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-silk)' }}>
            <section className="section">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--clr-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Démarches 100% Digitales</span>
                        <h1 className="title-massive" style={{ fontSize: '4rem' }}>
                            Annonce de <span className="text-gold" style={{ fontStyle: 'italic' }}>Portée</span>
                        </h1>
                        <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>Remplace les formulaires PDF de saillie et de naissances.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ background: 'var(--clr-opal)', padding: '4rem', borderRadius: '40px', boxShadow: 'var(--shadow-soft)' }}>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-seal)', marginBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>1. Informations Élevage</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Nom de la Chatterie *</label>
                                            <input required type="text" value={formData.catteryName} onChange={e => setFormData({ ...formData, catteryName: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Email responsable *</label>
                                            <input required type="email" value={formData.breederEmail} onChange={e => setFormData({ ...formData, breederEmail: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-seal)', marginBottom: '2rem', marginTop: '3rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>2. Les Parents</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Mère (Dam) *</label>
                                            <input required type="text" placeholder="Nom complet avec Affixe" value={formData.damName} onChange={e => setFormData({ ...formData, damName: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Père (Sire) *</label>
                                            <input required type="text" placeholder="Nom complet avec Affixe" value={formData.sireName} onChange={e => setFormData({ ...formData, sireName: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                                        <button type="button" onClick={() => setStep(2)} className="btn-gold">Continuer ➔</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-seal)', marginBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>3. Détails de la Portée</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Date de Saillie</label>
                                            <input required type="date" value={formData.matingDate} onChange={e => setFormData({ ...formData, matingDate: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white', color: 'var(--clr-seal)' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Date de Naissance *</label>
                                            <input required type="date" value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white', color: 'var(--clr-seal)' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Total Chatons *</label>
                                            <input required type="number" min="0" max="15" value={formData.kittenCount} onChange={e => setFormData({ ...formData, kittenCount: parseInt(e.target.value) })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Mâles</label>
                                            <input type="number" min="0" max="15" value={formData.males} onChange={e => setFormData({ ...formData, males: parseInt(e.target.value) })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Femelles</label>
                                            <input type="number" min="0" max="15" value={formData.females} onChange={e => setFormData({ ...formData, females: parseInt(e.target.value) })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '3rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Couleurs Attendues / Constatées</label>
                                        <input type="text" placeholder="Ex: Seal Point, Blue Point..." value={formData.colorsExpected} onChange={e => setFormData({ ...formData, colorsExpected: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: 'white' }} />
                                    </div>

                                    <div style={{ padding: '2rem', background: 'rgba(197, 160, 89, 0.1)', borderRadius: '24px', color: 'var(--clr-seal)', fontSize: '0.95rem', marginBottom: '3rem' }}>
                                        <strong>✅ Info:</strong> Si vous n'avez pas encore les noms des chatons, l'administrateur vous recontactera automatiquement pour finaliser les pédigrées FFeh.
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button type="button" onClick={() => setStep(1)} className="btn-outline">⬅ Retour</button>
                                        <button type="submit" disabled={isSubmitting} className="btn-gold">{isSubmitting ? 'Envoi...' : 'Déclarer la portée'}</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </form>

                </div>
            </section>
        </main>
    );
}
