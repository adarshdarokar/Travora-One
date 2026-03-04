// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUO_p7m2TSyNxZUCYcBiuOO8lyWQWO09Q",
  authDomain: "travora-one.firebaseapp.com",
  projectId: "travora-one",
  storageBucket: "travora-one.firebasestorage.app",
  messagingSenderId: "1094089967565",
  appId: "1:1094089967565:web:ba3b7739a8a1e59daee684",
  measurementId: "G-4NVPFM3RGZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
