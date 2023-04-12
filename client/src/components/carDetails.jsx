import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../store/actions/index";
import { Link, useParams } from "react-router-dom";
import style from "../css/carDetails.module.css";

export default function CardDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state?.recipesDetails);
  //console.log(recipe)

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  if (recipe.length === 0) {
    return (
      <div className={style.contenedor}>
        <Link to="/recipe">Recipe</Link>
        <h1>Cargando....</h1>
      </div>
    );
  } else {
    return (
      <div className={style.contenedor}>
        <div className={style.contenedorLink}>
              <div className={style.contenedorLink1}>
                <Link to="/" className={style.link}> Landing </Link>
              </div>
              <div className={style.contenedorLink1}>
                <Link to="/recipe" className={style.link}> Recetas </Link>
              </div>
              
              <div className={style.contenedorLink1}>
                <Link to="/create" className={style.link}> Crea una Receta </Link>
            </div>
        </div>
        <div className={style.name}>
          <h1 className={style.h1}>{recipe.name}</h1>
        </div>
       
        <div className={style.detalle}>
          <div className={style.summary}>
          <img className={style.img} src={recipe.image} alt="imagen" />

          </div>

          

          <div className={style.summary}>
              <div className={style.summaryDerecho}>
                <p className={style.p}>{recipe.summary && recipe.summary.replace(/<[^>]+>/g, "")}</p>
                <label className={style.p}>healthScore</label> 
                <p className={style.p}>{recipe.healthScore}</p>
                <br></br>
                <p className={style.p}>Diets:</p>
                {recipe.diets?.map((r, i) => {
                  return <p className={style.p} key={i}>{r.charAt(0).toUpperCase() + r.slice(1)}</p>;
                })} 
              </div>
              
          </div>
        </div>
        
          
        <div className={style.steps}>
        <div className={style.name}>
          <h1 className={style.h1}>Steps</h1>
        
        </div>
      </div>
      <div className={style.steps}>
        <div>
            <ul>
          {Array.isArray(recipe.steps) ? (
            recipe.steps.map((e) => {
              return <li className={style.label} key={e.number}>- {e.step}</li>;
            })
          ) : (
            <li className={style.label}>{recipe.steps}</li>
          )}
        </ul>
        </div>
      </div>
      </div>
    );
  }
}
