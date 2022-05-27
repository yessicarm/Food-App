
import {
  GET_RECIPES,
  GET_RECIPES_DB,
  GET_DIETS,
  GET_RECIPE_DETAILS,
  CLEAR_RECIPE_DETAILS,
  GET_NAME_RECIPE,
  POST_NEW_RECIPE,
  FILTER_BY_SCORE,
  FILTER_BY_NAME,
  FILTER_BY_DIET,
} from "./actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  recipeDetails: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
      };

    case GET_RECIPES_DB:
      return {
        ...state,
        getrecipesdb: payload,
      };

    case GET_NAME_RECIPE:
      return {
        ...state,
        recipes: payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: payload,
      };

    case GET_RECIPE_DETAILS:
      return {
        ...state,
        recipeDetails: payload,
      };
    case CLEAR_RECIPE_DETAILS:
      return {
        ...state,
        recipeDetails: {},
      };
    case POST_NEW_RECIPE:
      return {
        ...state,
      };

    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes; //copia del estado
      const dietsFilter =
        payload === "All"
          ? state.allRecipes
          : allRecipes.filter((recipe) =>
              recipe.diets.find((diet) => {
                //console.log(diet)
                if (diet.name === payload) {
                  return recipe;
                }
              })
            );
      return {
        ...state,
        recipes: dietsFilter,
      };

    case FILTER_BY_NAME:
      let orderName =
        payload === "asc"
          ? state.recipes.sort(function (a, b) {
              //sort-> compara y ordena izq o der d
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0; //si son iguales
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderName,
      };

    case FILTER_BY_SCORE:
      let orderhealthScore =
        payload === "high"
          ? state.recipes.sort(function (a, b) {
              return b.healthScore - a.healthScore;
            })
          : state.recipes.sort(function (a, b) {
              return a.healthScore - b.healthScore;
            });

      return {
        ...state,
        recipes: orderhealthScore,
      };

    default:
      return state;
  }
};

export default rootReducer;