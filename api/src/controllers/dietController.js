const axios = require("axios");
const { Diet } = require("../db.js");
const getAllDiets = async () => {
  try {
    // si ya  cargada mi db no hago nada
    const preDiets = await Diet.findAll();
    if (preDiets.length) {
      return preDiets;
    }

    const typesDiets = [
      "gluten free",
      "dairy free",
      "ketogenic",
      "lacto ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
    ];

    typesDiets.forEach((diet) => {
      Diet.findOrCreate({
        where: { name: diet },
      });
    });

    let diets = await Diet.findAll();
    return diets;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllDiets,
};
