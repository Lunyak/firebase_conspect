import {
  setDoc,
  addDoc,
  doc,
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import db from "./firebase";
import { useEffect, useState } from "react";

// -------------- Работа с БД ФБ --------------
const auth = getAuth();

// функция для создания пользователя
export function signup(email, passward) {
  return createUserWithEmailAndPassword(auth, email, passward);
}

// функция для логирования пользователя
export function login(email, passward) {
  return signInWithEmailAndPassword(auth, email, passward);
}

// функция для разлогирвоания пользователя
export function logout() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// -------------- Работа с БД ФБ --------------

// CREATE создаем сущность указывая ID вручную
export const handleNewNamewithOwnId = async (name) => {
  // создает в бд сущность с указанным ай ди
  const docRef = doc(db, "test", "test001");
  const payload = { name: name, timestamp: serverTimestamp() };
  setDoc(docRef, payload);
};

// CREATE WITH ID создаем сущность и геерируем ID
export const handleNewNameWithHashId = async (name) => {
  const collectionRef = collection(db, "test");
  const payload = { name: name, timestamp: serverTimestamp() };
  await addDoc(collectionRef, payload);
};

// UPDATE обновляем сущность в БД ФБ
export const hendleEddit = async (id, changename) => {
  // id - полученная id при подтягивании данных с ФБ
  // тупо валью из инпута. какое имя хочешь создать к примеру
  const docRef = doc(db, "test", id);
  const payload = { name: changename };
  updateDoc(docRef, payload);
};

// DELETE удаляем сущность в БД ФБ
export const hendleDelete = async (id) => {
  const docRef = doc(db, "test", id);
  deleteDoc(docRef);
};

// DELETE BY KEY удаляем без нахождения хеша ID по ключу
export const hendleQueryDelete = async () => {
  const userInpitName = prompt("кто тут лишний?");

  const collectionRef = collection(db, "test");
  const q = query(collectionRef, where("name", "==", userInpitName));
  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  results.forEach(async (result) => {
    const docRef = doc(db, "test", result.id);
    await deleteDoc(docRef);
  });
};
