"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useI18n } from '@/i18n/I18nContext';

export default function LoginPage() {
    const { t } = useI18n();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push('/dashboard');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError('Veuillez entrer votre email d\'abord');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Email de réinitialisation envoyé !');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <main style={{ minHeight: '100vh', display: 'flex', background: 'var(--clr-bg)' }}>

            {/* Left Side: Visual/Background */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }} className="auth-hero">
                <img
                    src="/images/hero-birman.png"
                    alt="Sacred Birman"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(1, 43, 124, 0.4), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', color: 'white', maxWidth: '400px' }}>
                    <h2 className="text-serif" style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>{t('auth.member_space')}</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Accédez à votre espace exclusif dédié à l'excellence du Sacré de Birmanie.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-apple"
                    style={{ width: '100%', maxWidth: '450px', padding: '4rem', background: 'white' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <Link href="/">
                            <img src="/images/logo.png" alt="Logo" style={{ width: '60px', marginBottom: '2rem' }} />
                        </Link>
                        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            {isLogin ? t('auth.login_title') : t('auth.signup_title')}
                        </h1>
                        <p style={{ color: 'var(--clr-text-muted)' }}>{t('footer.desc')}</p>
                    </div>

                    {error && (
                        <div style={{ padding: '1rem', background: '#FEF2F2', color: '#991B1B', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <form style={{ display: 'grid', gap: '1.5rem' }} onSubmit={handleSubmit}>
                        <div>
                            <label className="auth-label">{t('auth.email')}</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@club-birman.ch"
                                className="auth-input"
                            />
                        </div>
                        <div>
                            <label className="auth-label">{t('auth.password')}</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="auth-input"
                            />
                        </div>

                        {isLogin && (
                            <div style={{ textAlign: 'right' }}>
                                <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    style={{ background: 'none', border: 'none', fontSize: '0.85rem', color: 'var(--clr-gold)', textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    {t('auth.forgot_password')}
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-gold"
                            style={{ width: '100%', padding: '1.2rem', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? t('common.loading') : (isLogin ? t('auth.btn_login') : t('auth.btn_signup'))}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
                                {isLogin ? t('auth.no_account') : t('auth.has_account')}{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                    }}
                                    style={{ background: 'none', border: 'none', color: 'var(--clr-gold)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    {isLogin ? t('auth.btn_signup') : t('auth.btn_login')}
                                </button>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>

            <style jsx>{`
                .auth-label { display: block; margin-bottom: 0.6rem; font-size: 0.85rem; font-weight: 600; color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
                .auth-input { width: 100%; padding: 1.2rem; border-radius: 12px; border: 1px solid #E5E5E7; background: #FBFBFD; font-size: 1rem; transition: all 0.3s; }
                .auth-input:focus { border-color: var(--clr-gold); background: white; outline: none; box-shadow: 0 0 0 4px rgba(0, 51, 153, 0.05); }
                
                @media (max-width: 1024px) {
                    .auth-hero { display: none !important; }
                }
            `}</style>
        </main>
    );
}
