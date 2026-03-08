"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useI18n } from '@/i18n/I18nContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CreateAdPage() {
    const { user, loading } = useAuth();
    const { t } = useI18n();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        color: '',
        sex: 'male',
        status: 'available',
        price: '',
        description: ''
    });
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            // 1. Upload Images
            const imageUrls = [];
            for (const image of images) {
                const storageRef = ref(storage, `kittens/${user.uid}/${Date.now()}_${image.name}`);
                const snapshot = await uploadBytes(storageRef, image);
                const url = await getDownloadURL(snapshot.ref);
                imageUrls.push(url);
            }

            // 2. Save Data to Firestore
            await addDoc(collection(db, 'kittens'), {
                userId: user.uid,
                ...formData,
                images: imageUrls,
                createdAt: serverTimestamp()
            });

            setSuccess(true);
            setTimeout(() => router.push('/dashboard'), 3000);
        } catch (err: any) {
            console.error("Error creating ad:", err);
            alert(t('msg.error_send') + ": " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !user) return null;

    if (success) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-bg)' }}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>📢</div>
                    <h1 style={{ marginBottom: '1rem' }}>{t('ads.success')}</h1>
                    <p style={{ color: 'var(--clr-text-muted)' }}>{t('common.redirect_dash')}</p>
                </motion.div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                <div style={{ marginBottom: '4rem' }}>
                    <Link href="/dashboard" style={{ color: 'var(--clr-gold)', fontWeight: 600, textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
                        {t('common.dashboard_back')}
                    </Link>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{t('ads.title')}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-muted)' }}>{t('ads.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="card-apple" style={{ background: 'white', padding: '4rem', display: 'grid', gap: '2.5rem' }}>

                    <div>
                        <label className="field-label">{t('ads.name')}</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="ex: Simba du Sacré Coeur" className="form-input" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label className="field-label">{t('ads.color')}</label>
                            <input type="text" name="color" required value={formData.color} onChange={handleChange} placeholder="ex: Seal Point" className="form-input" />
                        </div>
                        <div>
                            <label className="field-label">{t('ads.price')}</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="ex: 1200" className="form-input" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label className="field-label">{t('ads.sex')}</label>
                            <select name="sex" value={formData.sex} onChange={handleChange} className="form-input">
                                <option value="male">{t('ads.male')}</option>
                                <option value="female">{t('ads.female')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="field-label">{t('ads.status')}</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                                <option value="available">{t('ads.available')}</option>
                                <option value="reserved">{t('ads.reserved')}</option>
                                <option value="sold">{t('ads.sold')}</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="field-label">{t('ads.images')}</label>
                        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="form-input" style={{ padding: '1rem' }} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginTop: '0.5rem' }}>{t('ads.quality_tip')}</p>
                    </div>

                    <div>
                        <label className="field-label">{t('ads.description')}</label>
                        <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="form-input" style={{ resize: 'vertical' }} placeholder={t('ads.desc_placeholder')}></textarea>
                    </div>

                    <div style={{ paddingTop: '2rem', borderTop: '1px solid #f0f0f5' }}>
                        <button type="submit" disabled={isSubmitting} className="btn-gold" style={{ width: '100%', padding: '1.4rem' }}>
                            {isSubmitting ? t('common.loading') : t('ads.submit')}
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
