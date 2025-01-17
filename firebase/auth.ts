// firebase/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc } from 'firebase/firestore';

// Fungsi Sign Up
export const signUp = async (email: string, password: string, username: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Simpan data tambahan pengguna di Firestore
  await setDoc(doc(db, 'users', user.uid), {
    username,
    email,
    createdAt: new Date().toISOString(),
  });

  return user;
};

// Fungsi Login
export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
