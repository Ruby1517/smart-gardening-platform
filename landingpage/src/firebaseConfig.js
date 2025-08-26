// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwGFdk65UvYu-bHqSuJYcURIvzeF8Ixpo",
  authDomain: "gh-inspection.firebaseapp.com",
  projectId: "gh-inspection",
  storageBucket: "gh-inspection.appspot.com",
  messagingSenderId: "1007749855309",
  appId: "1:1007749855309:web:698c1c768060d690bc4404",
  measurementId: "G-5HMY63L8TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
