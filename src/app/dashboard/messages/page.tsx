"use client";
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';
import { useI18n } from '@/i18n/I18nContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MessagesPage() {
    const { user, loading } = useAuth();
    const { t } = useI18n();
    const router = useRouter();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    // Real-time messages listener
    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'messages'),
            where('userId', '==', user.uid),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
            // Scroll to bottom
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        return () => unsubscribe();
    }, [user]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        setSending(true);
        try {
            await addDoc(collection(db, 'messages'), {
                userId: user.uid,
                text: newMessage,
                senderRole: 'member',
                timestamp: serverTimestamp()
            });
            setNewMessage('');
        } catch (err) {
            console.error("Error sending message:", err);
            alert(t('msg.error_send'));
        } finally {
            setSending(false);
        }
    };

    if (loading || !user) return null;

    return (
        <main style={{ minHeight: '100vh', background: 'var(--clr-bg)', paddingTop: '120px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                {/* Header Navigation */}
                <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/dashboard" style={{ textDecoration: 'none', color: 'var(--clr-gold)', fontWeight: 600 }}>
                        {t('common.dashboard_back')}
                    </Link>
                    <h1 style={{ fontSize: '2.5rem' }}>{t('msg.title')}</h1>
                </div>

                <div className="card-apple" style={{ background: 'white', display: 'flex', flexDirection: 'column', height: '70vh', overflow: 'hidden', padding: 0 }}>

                    {/* Inbox Area */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {messages.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'var(--clr-text-muted)', marginTop: '4rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                                <p>{t('msg.no_messages')}</p>
                                <p style={{ fontSize: '0.9rem' }}>{t('msg.first_question')}</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        alignSelf: msg.senderRole === 'member' ? 'flex-end' : 'flex-start',
                                        maxWidth: '70% shadow-sm'
                                    } as any}
                                >
                                    <div style={{
                                        padding: '1.2rem 1.8rem',
                                        borderRadius: msg.senderRole === 'member' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                                        background: msg.senderRole === 'member' ? 'var(--clr-gold)' : '#F5F5F7',
                                        color: msg.senderRole === 'member' ? 'white' : 'var(--clr-text)',
                                        fontSize: '1rem',
                                        lineHeight: 1.5,
                                        boxShadow: 'var(--shadow-sm)'
                                    }}>
                                        {msg.text}
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--clr-text-muted)',
                                        marginTop: '0.5rem',
                                        textAlign: msg.senderRole === 'member' ? 'right' : 'left'
                                    }}>
                                        {msg.senderRole === 'admin' ? t('msg.admin_reply') : t('msg.you')}
                                        {msg.timestamp && ` · ${new Date(msg.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={scrollRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '2rem 3rem', background: '#FBFBFD', borderTop: '1px solid #eee' }}>
                        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={t('msg.placeholder')}
                                className="chat-input"
                                disabled={sending}
                            />
                            <button type="submit" className="btn-gold" style={{ padding: '0 2rem', borderRadius: '14px' }} disabled={sending || !newMessage.trim()}>
                                {t('msg.send')}
                            </button>
                        </form>
                    </div>
                </div>

            </div>

            <style jsx>{`
                .chat-input {
                    flex: 1;
                    padding: 1.2rem 1.8rem;
                    border-radius: 14px;
                    border: 1px solid #E5E5E7;
                    background: white;
                    font-size: 1rem;
                    transition: 0.3s;
                }
                .chat-input:focus {
                    outline: none;
                    border-color: var(--clr-gold);
                    box-shadow: 0 0 0 4px rgba(0, 51, 153, 0.05);
                }
            `}</style>
        </main>
    );
}
