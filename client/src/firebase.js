// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogsite-fa26a.firebaseapp.com",
  projectId: "blogsite-fa26a",
  storageBucket: "blogsite-fa26a.firebasestorage.app",
  messagingSenderId: "955867074554",
  appId: "1:955867074554:web:896d4da459a1efdb131e43",
  measurementId: "G-W0KFJWV8LE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);