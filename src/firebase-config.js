// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDyfXSR4PLJEQnsJngT_-TFS8aLKbTMBGI",
    authDomain: "demonstration-25ef9.firebaseapp.com",
    projectId: "demonstration-25ef9",
    storageBucket: "demonstration-25ef9.firebasestorage.app",
    messagingSenderId: "279147157700",
    appId: "1:279147157700:web:7098685aa9631c41585191"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Storage instance

export { auth, db , storage };
