import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpa3RDkJV3CPwGUXwD7s4wYAV1ddtVvU0",
  authDomain: "lightgram-mod.firebaseapp.com",
  projectId: "lightgram-mod",
  storageBucket: "lightgram-mod.appspot.com",
  messagingSenderId: "255138188045",
  appId: "1:255138188045:web:e7e90c99b73724a1233e44"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const store = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth , provider, db, store};