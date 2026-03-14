import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUO_p7m2TSyNxZUCYcBiuOO8lyWQWO09Q",
  authDomain: "travora-one.firebaseapp.com",
  projectId: "travora-one",
  storageBucket: "travora-one.firebasestorage.app",
  messagingSenderId: "1094089967565",
  appId: "1:1094089967565:web:ba3b7739a8a1e59daee684",
  measurementId: "G-4NVPFM3RGZ"
};

const app = initializeApp(firebaseConfig);

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };