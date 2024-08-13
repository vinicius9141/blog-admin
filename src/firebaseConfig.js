import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm489cllrXaJu7RbCiFuaewKmfdy052sM",
  authDomain: "dball-d96c5.firebaseapp.com",
  databaseURL: "https://dball-d96c5-default-rtdb.firebaseio.com",
  projectId: "dball-d96c5",
  storageBucket: "dball-d96c5.appspot.com",
  messagingSenderId: "93264723664",
  appId: "1:93264723664:web:89132a42cf571a782728d5",
  measurementId: "G-989WEBGN8H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
