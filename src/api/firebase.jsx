// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdXNuPISNgcUkbYwvM_GrXIJfRLXbwXqk",
  authDomain: "rean-9afba.firebaseapp.com",
  projectId: "rean-9afba",
  storageBucket: "rean-9afba.appspot.com",
  messagingSenderId: "28441661464",
  appId: "1:28441661464:web:d4ba317c338046ef66736d",
  measurementId: "G-2YJLD07MXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const store = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth , provider, db, store};