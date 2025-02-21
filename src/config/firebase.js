// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7qmPkl65bH6RSVNT0yNBTQwKRW9mfjdY",
  authDomain: "vite-contacts-77ea7.firebaseapp.com",
  projectId: "vite-contacts-77ea7",
  storageBucket: "vite-contacts-77ea7.firebasestorage.app",
  messagingSenderId: "628503641143",
  appId: "1:628503641143:web:6c9ebedd1a98df86d053b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);