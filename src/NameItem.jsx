import { useState } from "react";
import { hendleEddit, hendleDelete } from "./untils";

export const NameItem = ({ name, id }) => {
  const [isEddit, setIsEddit] = useState(false);
  const [changename, setChangename] = useState("");

  const edditName = (id, changename) => {
    if (!changename && isEddit) {
      hendleDelete(id);
      return;
    }

    hendleEddit(id, changename);
    setIsEddit(false);
  };

  const deleteName = (id) => {
    hendleDelete(id);
    setIsEddit(false);
  };

  return (
    <div>
      {isEddit ? (
        <input
          onChange={(e) => {
            setChangename(e.target.value);
          }}
          type="text"
          value={changename}
        />
      ) : (
        <span onClick={() => setIsEddit(true)}>{name}</span>
      )}
      <button
        onClick={() => {
          edditName(id, changename);
        }}
      >
        изменить
      </button>
      <button onClick={() => deleteName(id)}>X</button>
    </div>
  );
};
