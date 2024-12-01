// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3QS9ULxBtIGOq1LLFj3I61ufIHNGfegE",
  authDomain: "notion-clone-fc69b.firebaseapp.com",
  projectId: "notion-clone-fc69b",
  storageBucket: "notion-clone-fc69b.firebasestorage.app",
  messagingSenderId: "826541724659",
  appId: "1:826541724659:web:1441d72bf11171e2543886"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
