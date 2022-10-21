// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from '../firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJbhEt2uUEZ3I1Vbiom8g6FoFkoVceNR4",
  authDomain: "jb-expense-tracker.firebaseapp.com",
  projectId: "jb-expense-tracker",
  storageBucket: "jb-expense-tracker.appspot.com",
  messagingSenderId: "810375717665",
  appId: "1:810375717665:web:954389922c9c4804a59460",
  measurementId: "G-1RZGY21HY9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
