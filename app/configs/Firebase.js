// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKc_yBmuQ9mr8YE5gZbHC6eoVLk6Ubc84",
  authDomain: "bet365-dce26.firebaseapp.com",
  projectId: "bet365-dce26",
  storageBucket: "bet365-dce26.firebasestorage.app",
  messagingSenderId: "459682798325",
  appId: "1:459682798325:web:ae6f61cb4fae8767ba43bc",
  measurementId: "G-YCGW3E90G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);