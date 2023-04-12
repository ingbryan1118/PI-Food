import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllRecipe } from "../store/actions/index";
import Card from "./card";
import Order from "./order";
import Pagination from "./pagination";
import SearchBar from "./searchBar";

import style from "../css/home.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state?.recipes);
  //console.log(allRecipes)

  // PAGINADO ---------------------------------------------------------
  const [order, setOrder] = useState("");
  const currentPage = useSelector((state) => state.currentPage);
  const recipesPerPage = useSelector((state) => state.recipesPerPage);
  const indexOfLastRecipes = currentPage * recipesPerPage;
  const indexOfFirsRecipes = indexOfLastRecipes - recipesPerPage;

  const currentRecipes = allRecipes?.slice(
    indexOfFirsRecipes,
    indexOfLastRecipes
  );

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(getAllRecipe());
    }
  }, [dispatch, allRecipes]);

  return (
    <div className={style.contenedor}>
      <div>
        <div className={style.contenedorLink}>
              <div className={style.contenedorLink1}>
                <Link to="/" className={style.link}> Landing </Link>
              </div>
              
              <div className={style.contenedorLink1}>
                <Link to="/create" className={style.link}> Crea una Receta </Link>
            </div>
        </div>
            <SearchBar />
            <Order setOrder={setOrder} />
          
          <div>
            <Pagination />
          </div>
          <div className={style.grid}>
          {currentRecipes?.length < 1 ? (
            <h1>Cargando...</h1>
          ) : (
            currentRecipes?.map((r, i) => {
              return (
                <div className={style.cards} key={i}>
                  <Card key={r.id} id={r.id} image={r.image} name={r.name} diets={r.dietTypes}/>

                </div>
              
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
