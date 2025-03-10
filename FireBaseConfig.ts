// FirebaseConfig.ts
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyB6AVCElsoG9UT3qcTt62fds5q5-MmGA2U",
  authDomain: "auto-pooling-f1a78.firebaseapp.com",
  projectId: "auto-pooling-f1a78",
  storageBucket: "auto-pooling-f1a78.appspot.com",
  messagingSenderId: "38805776080",
  appId: "1:38805776080:web:3453b8d2dff7f8ead420d5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
