import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOBHRtCOci1LFTVNnS7CJJQloGJ2rp_lE",
  authDomain: "house-marketplace-app-921e7.firebaseapp.com",
  projectId: "house-marketplace-app-921e7",
  storageBucket: "house-marketplace-app-921e7.appspot.com",
  messagingSenderId: "890691139761",
  appId: "1:890691139761:web:815a5b51728a581c1cca90"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
