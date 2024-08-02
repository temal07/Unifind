// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "unifind-b1050.firebaseapp.com",
  projectId: "unifind-b1050",
  storageBucket: "unifind-b1050.appspot.com",
  messagingSenderId: "1039924091050",
  appId: "1:1039924091050:web:2ba0ef8449f8897fd598d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);