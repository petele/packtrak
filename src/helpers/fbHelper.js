import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut as fbSignOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDRUxI1aaoNiOw-Pz0Qp1srsahwfmgKvNg",
  authDomain: "petele-packtrak.firebaseapp.com",
  projectId: "petele-packtrak",
  storageBucket: "petele-packtrak.appspot.com",
  messagingSenderId: "368164758142",
  appId: "1:368164758142:web:417fafae7b5fce4811ee2f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

let fbUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(`fbAuth: true (${user.uid})`);
    fbUser = user;
    window.localStorage.setItem('pktk_uid', user.uid);
  } else {
    console.log(`fbAuth: false`);
    fbUser = null;
    window.localStorage.removeItem('pktk_uid');
  }
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  fbSignOut(auth);
}

export function getUser() {
  return fbUser;
}

export function getUserID() {
  return fbUser?.uid;
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function verifyEmail(fbUser) {
  return sendEmailVerification(fbUser);
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function getCurrentUser() {
  return auth.currentUser;
}
