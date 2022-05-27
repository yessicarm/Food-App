const { Diets } = require("../db"); //importo los modelos

const getDiets = async (_req, res) => {
  const diets = [
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
  ];

  try {
    diets.forEach((el) => {
      Diets.findOrCreate({
        where: { name: el }, //por cada tipo de dieta
      });
    });

    const allTypes = await Diets.findAll();
    res.json(allTypes);
  } catch (error) {
    console.log(error, "no se cargaron las dietas");
  }
};

module.exports = getDiets;
