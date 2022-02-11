import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_DB = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPE_DETAILS= "GET_RECIPE_DETAILS";
export const CLEAR_RECIPE_DETAILS="CLEAR_RECIPE_DETAILS ";
export const GET_NAME_RECIPE= "GET_NAME_RECIPE"; 
export const POST_NEW_RECIPE= "POST_NEW_RECIPE";
export const FILTER_BY_SCORE= "FILTER_BY_SCORE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_NAME ="FILTER_BY_NAME"



export const getRecipes = () => {
    return async function (dispatch) {
        try{
        const recipes = await axios.get('http://localhost:3001/recipes');
        dispatch({ type: GET_RECIPES, payload: recipes.data });
        // console.log(recipes.data)
    }catch(err){
    console.log(err)
}
}};

export const getRecipesDb = () => {
    return async function (dispatch) {
        try{
        const recipesdb = await axios.get('http://localhost:3001/recipesdb');
        dispatch({ type: GET_RECIPES_DB, payload: recipesdb.data });
        // console.log(recipes.data)
    }catch(err){
    console.log(err)
}
}};


export const getDiets = () => {
    return async function (dispatch) {
        try{
        const diets = await axios.get('http://localhost:3001/types');
        dispatch({ type: GET_DIETS, payload: diets.data });
        console.log(diets.data)
    }catch(err){
    console.log(err)
}
}};



export const postNewRecipe = (payload) => {
    return async function (dispatch) {
        try{
        const post = await axios.post('http://localhost:3001/recipe', payload);
        
        console.log(post)
        return post;
    }catch(err){
    console.log(err)
}
}};



export const getRecipeDetail= (id)=>{
    return async (dispatch) => {
        try{
            const recipe= await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({type: GET_RECIPE_DETAILS, payload: recipe.data})
        }catch(err){
            console.log(err)
        }
    }
}



export const clearRecipesDetail=()=>{

    return({ type: CLEAR_RECIPE_DETAILS })
}


export const getNameRecipe=(name)=>{
return async function(dispatch){
    try{
        var byname= await axios.get("http://localhost:3001/recipes?name=" + name );
        console.log(byname)
        return dispatch({type: GET_NAME_RECIPE, payload: byname.data})
    }catch(err){
        console.log(err)
    }

}}


export function filterRecipesByDiet(payload) {
    return {
      type: FILTER_BY_DIET,
      payload,
    }
  }
  
  
  
  export function filterByName(payload) {  
    return {
      type: FILTER_BY_NAME,
      payload,
    }
  }
  
  export function filterByScore(payload) {
    return {
      type: FILTER_BY_SCORE,
      payload,
    }
  }