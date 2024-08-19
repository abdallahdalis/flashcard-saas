import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};*/


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMkYTyLCdfw8Sp_V6f9NE_J_Tf0qeaqrU",
  authDomain: "flashcard-saas-b8074.firebaseapp.com",
  projectId: "flashcard-saas-b8074",
  storageBucket: "flashcard-saas-b8074.appspot.com",
  messagingSenderId: "952397030823",
  appId: "1:952397030823:web:f02e08cdcca79ed7b50282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };