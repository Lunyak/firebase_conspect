import "./styles.css";
// import { useAuth, logout, login, signup } from "./firebase";
import { useEffect, useState } from "react";
import db from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AddUser } from "./AddUser";
import { NameItem } from "./NameItem";
import { hendleQueryDelete, login, logout, signup, useAuth } from "./untils";

export default function App() {
  const currentUser = useAuth();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  //----------  логика авторизации -------------

  // создание профиля
  async function hendleSingUp() {
    try {
      setLoader(true);
      // метод из БД
      await signup(email, password);
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  }

  // создание выйти из прфоиля
  async function hendleLogOut() {
    try {
      setLoader(true);
      await logout();
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  }

  // авторизация профиля
  async function hendleLogIn() {
    try {
      setLoader(true);
      await login(email, password);
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  }

  // получение данных из ФБ БД для отрисовки или хранения в стейте.
  // + получение хеша ID bp длкумента сущности. без привязки ко времени создания
  // useEffect(
  //   () =>
  //     onSnapshot(collection(db, "test"), (snapshot) => {
  //       setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     }),
  //   []
  // );

  // тоже что и выше. но с привязкой по времени
  useEffect(() => {
    const collectionRef = collection(db, "test");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  }, []);

  return (
    <div className="App">
      <h1>Тут тестовый стенд firebase</h1>
      <h2>Попробуй залогиниться</h2>
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
        />
      </div>

      <div>{currentUser?.email}</div>

      <button disabled={loader || currentUser} onClick={hendleSingUp}>
        create account
      </button>
      <button disabled={loader || !currentUser} onClick={hendleLogOut}>
        log out
      </button>
      <button disabled={loader || currentUser} onClick={hendleLogIn}>
        log in
      </button>

      <div>
        <h2>Данные с сервака FB</h2>
        <h3>нажми на имя</h3>

        {data.map((n) => (
          <NameItem key={n.id} id={n.id} name={n.name} />
        ))}
      </div>

      <AddUser />

      <h2> Удалить имена по ключу</h2>
      <button onClick={hendleQueryDelete}>GO</button>
    </div>
  );
}
