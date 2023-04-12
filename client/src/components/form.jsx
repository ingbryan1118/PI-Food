import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllRecipe,getAllDiet, cleanRecipes, createRecipe } from "../store/actions/index";
import swal from "sweetalert";

import style from "../css/form.module.css"

export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allRecipes = useSelector((state) => state.allRecipes);
    const allDiets = useSelector((state) => state.allDiets);
    const [errors, setErrors] = useState({});
  

    const [input, setInput] = useState({
      name: "",
      summary: "",
      healthScore: "",
      steps: "",
      image: "",
      diets: [],
    });
  
    
    const handleChange = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    //   setErrors(
    //     validate({
    //       ...input,
    //       [e.target.name]: e.target.value,
    //     })
    //   );
    };
  
    // SELECCIONAR DIETA:
    const handleCheckDiet = (e) => {
      if (e.target.checked && !input.diets.includes(e.target.value)) {
        setInput({
          ...input,
          diets: [...input.diets, e.target.value],
        });
      } else if (!e.target.checked) {
        setInput({
          ...input,
          diets: input.diets.filter((d) => d !== e.target.value),
        });
      }
    };
  
    // REVISIÓN DEL FORMULARIO --------------------------------------
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (Object.keys(errors).length !== 0) {
        swal("Ojo", "Completa el Formulario!", "error");
      } else if (!input.name.length) {
        swal("El nombre es requerido");
      } else if (!input.diets.length) {
        swal("Seleccione una dieta");
      } else if (
        allRecipes.find(
          (r) => r.name.toLowerCase() === input.name.toLowerCase()
        )
      ) {
        swal("Incorrecto", `El ${input.name} Existe`, "error");
      } else {
        dispatch(createRecipe(input));
        console.log(input)
        swal("Success", "¡Receta Creada!", "success");
        setInput({
          name: "",
          summary: "",
          healthScore: "",
          steps: "",
          image: "",
          diets: [],
        });
        //history.push("/home");
        dispatch(cleanRecipes());
        dispatch(getAllRecipe());
      }
    };
  
    useEffect(() => {
      dispatch(getAllDiet());
      dispatch(getAllRecipe());
    }, [dispatch]);
  
    
    return (
      <div className={style.contenedor}>
        <div className={style.contenedorLink}>
              <div className={style.contenedorLink1}>
                <Link to="/" className={style.link}> Landing </Link>
              </div>
              <div className={style.contenedorLink1}>
                <Link to="/recipe" className={style.link}> Recetas </Link>
              </div>
              
        </div>
        
        <div className={style.formulario}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              {/* <label className={style.label}>Nombre de la Receta: </label> */}
              <input className={style.input} type="text" name="name" placeholder="Nombre de la Receta" autoComplete="off"value={input.name}
                onChange={(e) => handleChange(e)} ></input>
                <br></br>

              {errors.name && <p>{errors.name}</p>}

              {/* <label className={style.label}>Summary: </label> */}
              <textarea className={style.textarea} type="text" name="summary" maxLength="1000" placeholder="Resumen de la receta"
                autoComplete="off" value={input.summary} onChange={(e) => handleChange(e)}></textarea>

              {errors.summary && <p>{errors.summary}</p>}

              {/* <label>Steps: </label> */}
              <textarea className={style.textarea} type="text" name="steps" placeholder="Pasos de la receta" autoComplete="off"
                value={input.instructions} onChange={(e) => handleChange(e)}></textarea>

              {errors.steps && <p>{errors.steps}</p>}
                <br></br>
              <label className={style.label}>Health Score: </label>
              <input className={style.score} type="number" min="0" max="100" name="healthScore" placeholder="1"value={input.healthScore}
                onChange={(e) => handleChange(e)}></input>
            
              {errors.healthScore && (<p>{errors.healthScore}</p>)}
              <br></br>
              <br></br>
              <input className={style.image} type="url" name="image" placeholder="Ingresar URL de imagen" autoComplete="off"
                value={input.image} onChange={(e) => handleChange(e)}></input>

              {errors.image && <p>{errors.image}</p>}

              {/* <button>Crear Receta</button> */}
            </div>
            <div>
              <label className={style.labelD}> Seleccione la Dieta: </label>
              {allDiets?.map((d) => {
                return (
                  <ul className={style.diets} key={d.id}>
                        <input  type="checkbox" name={d.name} value={d.name}onChange={(e) => handleCheckDiet(e)} />
                    {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                  </ul>
                );
              })}
            </div>
            <button className={style.boton}>Crear Receta</button>
          </form>
        </div>
        
      </div>
    );

}