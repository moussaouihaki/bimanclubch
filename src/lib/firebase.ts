import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration Firebase officielle du Club Birman Suisse
const firebaseConfig = {
    apiKey: "AIzaSyCl_gNhmgPI2d7ygcoOWfPzXG8hXKB2hiw",
    authDomain: "clubbirmansuisse-193c2.firebaseapp.com",
    projectId: "clubbirmansuisse-193c2",
    storageBucket: "clubbirmansuisse-193c2.firebasestorage.app",
    messagingSenderId: "597016671751",
    appId: "1:597016671751:web:3c9066f3895b2dbbbf5ca2",
    measurementId: "G-Z37SVZNCDG"
};

// Initialisation sécurisée (évite les doubles initialisations en mode dev)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
