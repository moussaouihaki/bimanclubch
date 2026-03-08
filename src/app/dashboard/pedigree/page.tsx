"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

export default function PedigreeRequestPage() {
    const { user } = useAuth();
    const { t } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [litterInfo, setLitterInfo] = useState({
        affixe: '',
        fatherName: '',
        motherName: '',
        matingDate: '',
        birthDate: '',
        initialLetter: ''
    });

    const [kittens, setKittens] = useState([
        { id: 1, name: '', sex: 'male', color: '', microchip: '' }
    ]);

    const addKitten = () => {
        if (kittens.length < 12) {
            setKittens([...kittens, { id: Date.now(), name: '', sex: 'male', color: '', microchip: '' }]);
        }
    };

    const removeKitten = (id: number) => {
        if (kittens.length > 1) {
            setKittens(kittens.filter(k => k.id !== id));
        }
    };

    const updateKitten = (id: number, field: string, value: string) => {
        setKittens(kittens.map(k => k.id === id ? { ...k, [field]: value } : k));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'pedigree_requests'), {
                litterInfo,
                kittens,
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
                    <h2 style={{ fontSize: '3rem' }}>📜</h2>
                    <h3>{t('pedigree.title')}</h3>
                    <p style={{ color: 'var(--clr-text-muted)', margin: '1rem 0 2rem' }}>{t('form.success_text')}</p>
                    <button onClick={() => window.location.href = '/dashboard'} className="btn-gold">{t('common.back')} Dashboard</button>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '150px', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <h1 className="title-massive" style={{ textAlign: 'center', marginBottom: '4rem' }}>{t('pedigree.title')}</h1>

                <form onSubmit={handleSubmit}>
                    {/* Litter Info */}
                    <div className="card-apple" style={{ background: 'white', padding: '3rem', marginBottom: '3rem' }}>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--clr-gold)' }}>{t('pedigree.litter_info')}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <label className="form-label">Affixe (Cattery)</label>
                                <input required className="input-premium" value={litterInfo.affixe} onChange={e => setLitterInfo({ ...litterInfo, affixe: e.target.value })} />
                            </div>
                            <div>
                                <label className="form-label">Lettre de l'année</label>
                                <input required className="input-premium" maxLength={1} style={{ textAlign: 'center' }} value={litterInfo.initialLetter} onChange={e => setLitterInfo({ ...litterInfo, initialLetter: e.target.value.toUpperCase() })} />
                            </div>
                            <div>
                                <label className="form-label">{t('birth.father')}</label>
                                <input required className="input-premium" value={litterInfo.fatherName} onChange={e => setLitterInfo({ ...litterInfo, fatherName: e.target.value })} />
                            </div>
                            <div>
                                <label className="form-label">{t('birth.mother')}</label>
                                <input required className="input-premium" value={litterInfo.motherName} onChange={e => setLitterInfo({ ...litterInfo, motherName: e.target.value })} />
                            </div>
                            <div>
                                <label className="form-label">Date Saillie</label>
                                <input required type="date" className="input-premium" value={litterInfo.matingDate} onChange={e => setLitterInfo({ ...litterInfo, matingDate: e.target.value })} />
                            </div>
                            <div>
                                <label className="form-label">Date Mise-bas</label>
                                <input required type="date" className="input-premium" value={litterInfo.birthDate} onChange={e => setLitterInfo({ ...litterInfo, birthDate: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Kittens List */}
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <h3 style={{ marginLeft: '1rem' }}>Chatons de la portée ({kittens.length})</h3>
                        <AnimatePresence>
                            {kittens.map((k, index) => (
                                <motion.div
                                    key={k.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="card-apple"
                                    style={{ background: 'white', padding: '2rem', display: 'grid', gridTemplateColumns: '30px 1fr 100px 1fr 200px 40px', gap: '1.5rem', alignItems: 'center' }}
                                >
                                    <div style={{ fontWeight: 800, color: 'var(--clr-gold)' }}>#{index + 1}</div>
                                    <input required placeholder="Nom du chaton" className="input-premium" value={k.name} onChange={e => updateKitten(k.id, 'name', e.target.value)} />
                                    <select className="input-premium" value={k.sex} onChange={e => updateKitten(k.id, 'sex', e.target.value)}>
                                        <option value="male">M</option>
                                        <option value="female">F</option>
                                    </select>
                                    <input required placeholder="Couleur EMS" className="input-premium" value={k.color} onChange={e => updateKitten(k.id, 'color', e.target.value)} />
                                    <input required placeholder="Microchip" className="input-premium" value={k.microchip} onChange={e => updateKitten(k.id, 'microchip', e.target.value)} />
                                    <button type="button" onClick={() => removeKitten(k.id)} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <button type="button" onClick={addKitten} className="btn-outline" style={{ padding: '1.5rem', border: '2px dashed #ccc', background: 'transparent' }}>
                            {t('pedigree.add_kitten')}
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button disabled={isSubmitting} type="submit" className="btn-gold" style={{ padding: '1.2rem 5rem' }}>
                            {isSubmitting ? '...' : t('common.submit')}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .form-label { display: block; margin-bottom: 0.8rem; font-size: 0.7rem; font-weight: 700; color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
                .input-premium { width: 100%; padding: 1rem; border-radius: 10px; border: 1px solid #e0e0e0; background: #fafafa; font-size: 0.9rem; transition: 0.2s; }
                .input-premium:focus { border-color: var(--clr-gold); background: white; outline: none; }
            `}</style>
        </main>
    );
}
