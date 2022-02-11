const { Router } = require('express');
require('dotenv').config();
const { YOUR_API_KEY } = process.env;

const axios = require('axios');            //importo axios
const { Recipe, Diets } = require('../db');  //importo los modelos

const router = Router();




const getApiInfo = async () => {
    const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
    // console.log(apiURL, 'informacion de la api llego')
    const apiInfo = apiURL.data.results?.map(el => {  
        const { id, title, image, spoonacularScore, dishTypes, diets, summary, healthScore, analyzedInstructions}= el;
        return {
            id: id,                         
            name: title,
            image: image,
            score: spoonacularScore,
            dishTypes: dishTypes.map((d) => { return { name: d } }),   
            diets: diets.map((d) => { return { name: d } }),
            summary: summary,
            healthScore: healthScore,
            steps: analyzedInstructions
        }
    })
    return apiInfo   //me traigo la info de la api
    
}

const getDbInfo = async () => {
    
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],  //include el modelo Diet para que se genere la relacion 
            through: {
                attributes: [],   //mediente los atributos ->  me traeria todos en caso de que fueran más sin la comprobacion through
            },
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)

    return infoTotal
}



router.get('/', async (req, res) => {
    const name = req.query.name    // por nombre 
    const recipesTotal = await getAllRecipes()

    const dietsup = [
        "gluten free",
        "dairy free",
        "paleolithic",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "primal",
        "fodmap Friendly",
        "whole 30",
    ]
  
    if (name) {

        if ((dietsup.indexOf(name)) === -1 ){
            let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))  //si incluye el nombre que viene por query
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("La receta no existe")

        }else{
            let dietname= name;
            // console.log(dietname)
        let filterDiet= await recipesTotal.filter(recipe => recipe.diets.find(diet => {if (diet.name === dietname) { return recipe} }))     
        // console.log(filterDiet)        


        
            filterDiet.length ?
            res.status(200).send(filterDiet) :
            res.status(404).send("type of diet no exist")
    }
        
    } else {
        res.status(200).send(recipesTotal)
    }
})




router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    const rId = id.includes("-");
    if (rId) {   
        //[ search in DB all the Recipes by primary key & add genre - platform information ]
        try {
            const dbRecipe = await Recipe.findByPk(id,
                { include: Diets }
                );
            res.json(dbRecipe);
            console.log(dbRecipe) 
            //null - no se cargaron las dietas (types)
        } catch (err) {
            res.send("No se encuentra la receta con ese ID").next(err);
        }
    }
    //[if you dont have nothing in DB , search in API ]
    else {
        try {
            const apiRecipeID = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
            );
            let recipeApiID = apiRecipeID.data;
            // console.log(apiRecipeID,'Se recibio la info')

            let recipe = {
                id: recipeApiID.id,                         
                name: recipeApiID.title,
                image: recipeApiID.image,
                score: recipeApiID.spoonacularScore,
                dishTypes: recipeApiID.dishTypes.map((d) => { return { name: d } }),   
                diets: recipeApiID.diets.map((d) => { return { name: d } }),
                summary: recipeApiID.summary,
                healthScore: recipeApiID.healthScore,
                steps: recipeApiID.analyzedInstructions
            };
            //[ return a .js in my DB ]
            //console.log(recipe)
            return res.json(recipe);
            
        } catch (err) {
            res.json({ msg: "No recipe found with that id" });
            next(err);
        }
    }
});





    module.exports = router;