// FirebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6AVCElsoG9UT3qcTt62fds5q5-MmGA2U",
  authDomain: "auto-pooling-f1a78.firebaseapp.com",
  projectId: "auto-pooling-f1a78",
  storageBucket: "auto-pooling-f1a78.appspot.com",
  messagingSenderId: "38805776080",
  appId: "1:38805776080:web:3453b8d2dff7f8ead420d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
export default app;
