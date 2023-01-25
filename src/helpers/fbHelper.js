import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signOut as fbSignOut,
  updatePassword,
  browserLocalPersistence,
  browserSessionPersistence,
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


/**
 * Sign in user via email & password.
 *
 * @param {string} email
 * @param {string} password
 * @param {boolean} remember
 * @returns Firebase User
 */
export function signIn(email, password, remember) {
  const persistence = remember === true ? browserLocalPersistence : browserSessionPersistence;
  return setPersistence(auth, persistence).then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  });
}


/**
 * Sign out the current user.
 */
export function signOut() {
  return fbSignOut(auth);
}

/**
 * Create a new user.
 *
 * @param {string} email
 * @param {string} password
 * @returns Firebase User
 */
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Get the current user.
 *
 * @returns Firebase User
 */
export function getUser() {
  return auth?.currentUser
}

/**
 * Get the current user ID.
 *
 * @returns {string}
 */
export function getUserID() {
  return getUser()?.uid;
}

/**
 * Get teh current user email.
 *
 * @returns {string}
 */
export function getUserEmail() {
  return getUser()?.email;
}

/**
 * Send email verification to the current user.
 *
 * @return undefined
 */
export function verifyEmail() {
  const user = getUser();
  if (user) {
    sendEmailVerification(user);
  }
}

/**
 * Send password reset email to the specified user.
 *
 * @param {string} email
 */
export function resetPassword(email) {
  if (email) {
    sendPasswordResetEmail(auth, email);
  }
}

/**
 * Change the password for the current user.
 *
 * @param {string} current current password
 * @param {string} newPassword new password
 */
export async function changePassword(current, newPassword) {
  const email = getUserEmail();
  if (!email || !current || !newPassword) {
    throw new Error('Missing params');
  }

  try {
    await signInWithEmailAndPassword(auth, email, current);
  } catch (ex) {
    throw ex;
  }

  try {
    await updatePassword(getUser(), newPassword);
  } catch (ex) {
    throw ex;
  }
}
