import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_RECIPE_NAME,
  GET_RECIPE_DETAILS,
  CREATE_RECIPE,
  FILTER_DIETS,
  ORDER_NAME,
  ORDER_SCORE,
  CLEAN_RECIPES,
  CLEAN_DETAILS,
  CHANGE_PAGE,
} from "../actions";
const initialState = {
  recipes: [],
  allRecipes: [],
  recipesDetails: {},
  allDiets: [],

  recipesPerPage: 9,
  currentPage: 1,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // all recipes
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    // all diets
    case GET_ALL_DIETS:
      return {
        ...state,
        allDiets: action.payload,
      };
      // busqueda por nombre
      case GET_RECIPE_NAME:
        return {
            ...state,
            recipes: action.payload,
            currentPage: 1
        };
    // recipe details
    case GET_RECIPE_DETAILS:
      return {
        ...state,
        recipesDetails: action.payload,
      };

    case CLEAN_DETAILS:
      return {
        ...state,
        recipesDetails: action.payload,
      };
    // pagination
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: Number(action.payload)
          ? parseInt(action.payload)
          : action.payload === "Next"
          ? parseInt(state.currentPage) + 1
          : parseInt(state.currentPage) - 1,
      };

    case FILTER_DIETS:
      let copyAll = state.allRecipes;
      let filterDiets =
        action.payload === "all"
          ? copyAll
          : copyAll.filter((r) => r.dietTypes.includes(action.payload));
      return {
        ...state,
        recipes: filterDiets,
        currentPage: 1,
      };
    case ORDER_NAME:
      let sortTitle =
        action.payload === "ASC"
          ? state.recipes.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.recipes.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        recipes: sortTitle,
        currentPage: 1,
      };
    case ORDER_SCORE:
      let sortScore =
        action.payload === "MAX"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore < b.healthScore) {
                return 1;
              }
              if (b.healthScore < a.healthScore) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.recipes.sort((a, b) => {
              if (a.healthScore < b.healthScore) {
                return -1;
              }
              if (b.healthScore < a.healthScore) {
                return 1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        recipes: sortScore,
        currentPage: 1,
      };
    case CLEAN_RECIPES:
      return {
        ...state,
        recipes: [],
      };

    case CREATE_RECIPE:
      return {
        ...state
      }

    default: {
      return state;
    }
  }
}
