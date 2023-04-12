import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllRecipe,getAllDiet,filterDiets,orderName,orderHealthScore,cleanRecipes} from "../store/actions/index";
import style from "../css/order.module.css";

export default function Order({ setOrder }) {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.allDiets);

  // FILTROS
  const handleFilterDietTypes = (e) => {
    e.preventDefault();
    dispatch(filterDiets(e.target.value));
  };

  // ORDENAR
  const handleOrderTitle = (e) => {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setOrder(e.target.value);
  };

  const handleOrderScore = (e) => {
    e.preventDefault();
    dispatch(orderHealthScore(e.target.value));
    setOrder(e.target.value);
  };

  // LIMPIAR FILTROS
  const handleLimpiar = (e) => {
    e.preventDefault();
    dispatch(cleanRecipes());
    dispatch(getAllRecipe());
  };


  useEffect(() => {
    dispatch(getAllDiet());
  }, [dispatch]);

  return (
    <div>
      <button className={style.boton} onClick={(e) => handleLimpiar(e)}>Recargar</button>
      <select className={style.select} onChange={(e) => handleFilterDietTypes(e)}>
        <option value="all">Selecccione Tipo de Dieta</option>
        {allDiets?.map((d) => {
          return (
            <option key={d.id} value={d.name}>
              {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
            </option>
          );
        })}
      </select>
      <select className={style.select} onChange={(e) => handleOrderTitle(e)}>
        <option value="ALL">Ordenar</option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
      <select className={style.select} onChange={(e) => handleOrderScore(e)}>
        <option value="ALL">Comida Saludable</option>
        <option value="MIN">Menor Comida Saludable</option>
        <option value="MAX">Mayor Comida Saludable</option>
      </select>
    </div>
  );
}
