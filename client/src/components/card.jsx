import React from "react";
import { Link } from "react-router-dom";
import style from "../css/card.module.css"

export default function Card({ id, image, name, diets }) {
  return (
    <div className={style.card}>
      <Link to={`/recipe/${id}`} className={style.link}>
        <img src={image} alt="imagen" width="250" height="250" />
        <h3>{name}</h3>
        <label>Diets: </label>
        {diets?.map((d) => (
          <p key={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</p>
        ))}
      </Link>
    </div>
  );
}
