// src/firebase.tsx
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOSnSRkGh1iaUteCRFH0oWLDdkMo4VscU",
  authDomain: "final-pt-ca076.firebaseapp.com",
  projectId: "final-pt-ca076",
  storageBucket: "final-pt-ca076.appspot.com",
  messagingSenderId: "499241492973",
  appId: "1:499241492973:web:0d119705e200ed287607e4",
  measurementId: "G-9645PJR9CQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Auth and Firestore instances
