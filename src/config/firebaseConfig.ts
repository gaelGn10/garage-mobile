// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBasA0UITeZHMAhriAJPnnIXvjk8FQ-j9Q",
  authDomain: "garage-4415e.firebaseapp.com",
  projectId: "garage-4415e",
  storageBucket: "garage-4415e.firebasestorage.app",
  messagingSenderId: "619731200823",
  appId: "1:619731200823:web:18e859f2b0456f57c348b2",
  measurementId: "G-5QDSGWZLGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { analytics, app, auth, firestore };

