import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePagina } from "../../src/store/actions/index";
import style from "../css/pagination.module.css"

export default function Pagination() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const currentPage = useSelector((state) => state.currentPage); // trae 1
  const recipesPorPagina = useSelector((state) => state.recipesPerPage); // trae 9

  const pageNumbers = [];
  const allRecipes = recipes.length; // numero de elementos
  //console.log(allRecipes)
  // entero mayor o igual mas proximo a un numero dado
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPorPagina); i++) {
    pageNumbers.push(i);
  }

  const handleChangePagina = (e) => {
    dispatch(changePagina(e.target.value));
  };

  return (
    <div>
      <ul>
        {pageNumbers && currentPage > 1 ? (
          <button className={style.ul} value="Prev" onClick={handleChangePagina}>
            {"<"}
          </button>
        ) : null}
        {pageNumbers?.map((number) => (
          <button className={style.ul} key={number} value={number} onClick={handleChangePagina}>
            {number}
          </button>
        ))}
        {pageNumbers && currentPage < pageNumbers.length ? (
          <button className={style.ul} onClick={handleChangePagina}>{">"}</button>
        ) : null}
      </ul>
    </div>
  );
}
