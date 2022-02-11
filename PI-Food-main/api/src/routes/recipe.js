const { Router } = require('express');
const { Recipe, Diets } = require('../db');  //importo los modelos
const router = Router();



router.post('/', async (req, res) => {
    // console.log("NO CREA", req.body)
    let { name, summary, score, healthScore, steps, diets, image, dishTypes } = req.body

    let diet = await Diets.findAll({ where: { name: diets } }); 

    let recipeCreated = await Recipe.create({ 
        
        name,
        summary,
        score,
        healthScore,
        dishTypes,
        steps,
        image,
                             
    })             

        recipeCreated.addDiet(diet)        //metodo de sql
    
        res.json(recipeCreated);
        // res.send("Receta creada con éxito")
    // console.log(diet)
    // console.log(recipeCreated)
})





    

module.exports = router;