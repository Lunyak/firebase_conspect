import { useState } from "react";
import { handleNewNameWithHashId } from "./untils";

export const AddUser = () => {
  const [name, setName] = useState("");

  const addName = () => {
    handleNewNameWithHashId(name);
    setName("");
  };

  return (
    <div>
      <h2>Добавить имя</h2>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
      />
      {name}
      <button onClick={addName}>создать</button>
    </div>
  );
};
