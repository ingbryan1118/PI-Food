/* eslint-disable no-unreachable */
import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const CLEAN_DETAILS = "CLEAN_DETAILS";

export const FILTER_DIETS = "FILTER_DIETS";

export const ORDER_NAME = "ORDER_NAME";
export const ORDER_SCORE = "ORDER_SCORE";
export const CLEAN_RECIPES = "CLEAN_RECIPES";
export const ORDENAR_ALFABETICO = "ORDENAR_ALFABETICO";

export const CREATE_RECIPE = 'CREATE_RECIPE';

export const getAllRecipe = () => {
  return async (dispatch) => {
    try {
      let infoAll = await axios.get("http://localhost:3001/api/recipe");
      dispatch({ type: GET_ALL_RECIPES, payload: infoAll.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getAllDiet() {
  return async function (dispatch) {
    let json = await fetch("http://localhost:3001/api/diet").then((response) =>
      response.json()
    );
    return dispatch({ type: GET_ALL_DIETS, payload: json });
  };
}

export function getDetail(id) {
  return function (dispatch) {
    try {
      if (id) {
        return fetch(`http://localhost:3001/api/recipe/${id}`)
          .then((response) => response.json())
          .then((json) => {
            dispatch({ type: GET_RECIPE_DETAILS, payload: json });
          })
          .catch((err) => {
            dispatch({ type: GET_RECIPE_DETAILS, payload: err });
          });
      } else {
        dispatch({ type: GET_RECIPE_DETAILS, payload: id });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// Limpiar Detalles
export const cleanDetail = (payload) => {
  return {
    type: CLEAN_DETAILS,
    payload,
  };
};

// PAGINADO 
export const changePagina = (payload) => {
  return {
    type: CHANGE_PAGE,
    payload,
  };
};

// Filtrados y Ordenamientos 
// Filtrar por DIETS:
export const filterDiets = (payload) => {
  return {
    type: FILTER_DIETS,
    payload,
  };
};

// Ordenar por Nombre
export const orderName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};

// Ordenar por HealthScore:
export const orderHealthScore = (payload) => {
  return {
    type: ORDER_SCORE,
    payload,
  };
};

// Limpiar 
export const cleanRecipes = () => {
  return {
    type: CLEAN_RECIPES,
  };
};

export function organizeByAlphabet(opcionAlphabet) {
  return { type: ORDENAR_ALFABETICO, payload: opcionAlphabet };
}

// Receta por Nombre
export const getRecipeName = (name) => {
  return async (dispatch) => {
      try {
          let infoName = await axios.get(`http://localhost:3001/api/recipe?name=${name}`);
          dispatch({ type: GET_RECIPE_NAME, payload: infoName.data });

      } catch (error) {
          console.log(error);
      }
  };
};

// Crear recipes

export const createRecipe = (payload) => {
    try {
      return async () => {
        let newRecipe = await axios.post('http://localhost:3001/api/recipe', payload);
        return newRecipe;
    };
        } catch (error) {
      console.log(error)
        }
};
