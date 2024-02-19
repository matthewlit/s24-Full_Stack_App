// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC60skFoUFCzOJD4cddIMgU1bl2FTY58dQ",
  authDomain: "tvtrackr-s24.firebaseapp.com",
  projectId: "tvtrackr-s24",
  storageBucket: "tvtrackr-s24.appspot.com",
  messagingSenderId: "279210074321",
  appId: "1:279210074321:web:92d935d5e58273d685a5f0",
  measurementId: "G-JYXPZWGWEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(app).addScope('email');
export default app;

