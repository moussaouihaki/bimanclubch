"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    User,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    profile: any | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                // Fetch profile from Firestore
                const profileDoc = await getDoc(doc(db, 'users', user.uid));
                if (profileDoc.exists()) {
                    setProfile(profileDoc.data());
                } else {
                    // Create default profile if it doesn't exist
                    const defaultProfile = {
                        email: user.email,
                        role: 'member',
                        createdAt: new Date().toISOString(),
                    };
                    await setDoc(doc(db, 'users', user.uid), defaultProfile);
                    setProfile(defaultProfile);
                }
            } else {
                setProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
