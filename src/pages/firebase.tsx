// src/firebase.tsx
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2MnRUYZza_nizKBUbyhpe4KFbadHtrYs",
    authDomain: "final-pt-bd524.firebaseapp.com",
    projectId: "final-pt-bd524",
    storageBucket: "final-pt-bd524.appspot.com",
    messagingSenderId: "894052516739",
    appId: "1:894052516739:web:a05d999f00f51ac9306cb6",
    measurementId: "G-XGX56KHRM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Auth and Firestore instances
