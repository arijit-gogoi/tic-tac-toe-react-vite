import { useState } from "react";

export default function Player({
  initialname,
  sign,
  isActive,
  handleNameChange,
}) {
  const [name, setPlayerName] = useState(initialname);
  const [isEditing, setIsEditing] = useState(false);
  function handleChange(e) {
    e.preventDefault();
    setPlayerName(e.target.value);
  }
  function handleIsEditing() {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) {
      handleNameChange(sign, name);
    }
  }

  let pName = <span className="player-name">{name}</span>;
  let editOrSave = "Edit";
  if (isEditing) {
    pName = (
      <input
        name="player-name"
        type="text"
        required
        value={name}
        onChange={handleChange}
      />
    );
    editOrSave = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {pName}
        <span className="player-symbol">{sign}</span>
      </span>
      <button onClick={handleIsEditing}>{editOrSave}</button>
    </li>
  );
}
