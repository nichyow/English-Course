// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRdtRF_yGx6C8t0Vcco56x8rnYakgqVUA",
  authDomain: "englishcourse-89251.firebaseapp.com",
  projectId: "englishcourse-89251",
  storageBucket: "englishcourse-89251.firebasestorage.app",
  messagingSenderId: "831359513794",
  appId: "1:831359513794:web:4119937fe733f1cd03375b",
  measurementId: "G-02FNF9KXHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore Database