// lib/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, UserCredential } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgm4NsgHKd3LXjsab63x2-mmJRESAa_Bs",
  authDomain: "trackme-dbd1a.firebaseapp.com",
  projectId: "trackme-dbd1a",
  storageBucket: "trackme-dbd1a.appspot.com",
  messagingSenderId: "744711539779",
  appId: "1:744711539779:web:d0087f872699e8f7ab18f6",
  measurementId: "G-E7CP7LZGWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Google sign-in method
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); // Returns a UserCredential
};
// Function to sign out
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

// Export the auth and db instances along with signIn and logout functions
export { auth, db, };


