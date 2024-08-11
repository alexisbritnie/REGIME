import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkXVtt6zIYELAiq_GLPxjMsYDj41z8DyE",
  authDomain: "capstone-4da05.firebaseapp.com",
  projectId: "capstone-4da05",
  storageBucket: "capstone-4da05.appspot.com",
  messagingSenderId: "590634789995",
  appId: "1:590634789995:web:c8f9ad7e4724accba4552e",
  measurementId: "G-2TGR83T3ZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export initialized services for use in your app
export { db, auth };