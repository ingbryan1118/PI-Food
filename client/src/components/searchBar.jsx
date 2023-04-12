import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../store/actions/index";
import style from "../css/searchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipeName(name));
    setName("");
  }

  return (
    <div className={style.contenedor}>
      <input
        type="search"
        placeholder="Buscar Recetas por Nombre"
        value={name}
        onChange={(e) => handleName(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={style.boton}
      >
        Buscar{" "}
      </button>
    </div>
  );
}
