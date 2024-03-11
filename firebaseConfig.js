// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-EiYlkXphZFDADKr9dXe_HiPPQ2A7v64",
  authDomain: "boxwood-chassis-365308.firebaseapp.com",
  projectId: "boxwood-chassis-365308",
  storageBucket: "boxwood-chassis-365308.appspot.com",
  messagingSenderId: "840784533100",
  appId: "1:840784533100:web:2140ac93fae5230dbd6a49",
  measurementId: "G-HYZCV7L0PB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);