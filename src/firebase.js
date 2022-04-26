import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHESlN6qMnzNQduMxgTNhMo_tLzpxnFVw",
  authDomain: "test-502fe.firebaseapp.com",
  databaseURL: "https://test-502fe-default-rtdb.firebaseio.com",
  projectId: "test-502fe",
  storageBucket: "test-502fe.appspot.com",
  messagingSenderId: "2171718242",
  appId: "1:2171718242:web:7621c41c5c04b1fae19f3b"
};

//инициализация ФБ
const app = initializeApp(firebaseConfig);
export default getFirestore();
