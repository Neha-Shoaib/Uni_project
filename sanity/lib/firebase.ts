import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAURomxGy7yejOfwKGOQ_Ns7MsYTzSDbx8",
  authDomain: "avion-f3a12.firebaseapp.com",
  projectId: "avion-f3a12",
  storageBucket: "avion-f3a12.firebasestorage.app",
  messagingSenderId: "980854535230",
  appId: "1:980854535230:web:802013496f6a5225e00d6f"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);