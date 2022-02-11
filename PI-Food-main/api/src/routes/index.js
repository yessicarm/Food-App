const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRutes = require('./recipes');
const recipePost = require('./recipe');
const typesOfDiets= require('./types');
const getRecibesDb= require('./recipesDb')






const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRutes)
router.use('/recipesdb', getRecibesDb)
router.use('/recipe', recipePost)

router.use('/types', typesOfDiets)





//promesas
    // router.post('/', async (req, res, next) => {
    //     const{ name , image, score, summary, healthScore, steps} = req.body;
        
        
    //         const newRecipe= await Recipe.create(
    //             { name, image, score, summary,healthScore, steps})
    //            .then((newRecipe)=>{
    //             res.json(newRecipe);
    //            } )
    //            .catch((error)=>{
    //             next(error)
               
    //            })
            
            
    //         });
    


module.exports = router;
