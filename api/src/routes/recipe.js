const { Router } = require("express");
const { Recipe, Diets } = require("../db"); //importo los modelos
const router = Router();

router.post("/", async (req, res) => {
  let {
    name,
    summary,
    pricePerServing,
    healthScore,
    steps,
    diets,
    image,
    dishTypes,
  } = req.body;

  let diet = await Diets.findAll({ where: { name: diets } });

  let recipeCreated = await Recipe.create({
    name,
    summary,
    pricePerServing,
    healthScore,
    dishTypes,
    steps,
    image,
  });

  recipeCreated.addDiet(diet); //metodo de sql

  res.json(recipeCreated);
});

module.exports = router;
