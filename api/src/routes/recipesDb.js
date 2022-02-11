const { Router } = require('express');
const { Recipe, Diets } = require('../db');  //importo los modelos

const router = Router();

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

router.get('/', async (req, res) => {
    const recipesDb= await getDbInfo()

  try{
            res.status(200).send(recipesDb) 
            
    }catch(err){
        res.status(404).send("Create recipes no found")
    }  
   console.log (recipesDb)
})

module.exports = router;