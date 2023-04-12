const axios = require("axios");
const db = require("../db");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;

// Controller functions:
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=a8fb9f2a47204a8fa65a0bf857851b22&addRecipeInformation=true&number=100`
  );
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      name: e.title,
      dietTypes: e.diets,
      summary: e.summary,
      healthScore: e.healthScore,
      dishTypes: e.dishTypes,
      steps:
        e.analyzedInstructions[0] && e.analyzedInstructions[0].steps
          ? e.analyzedInstructions[0].steps.map((e) => e.step).join("| ")
          : "No hay pasos",
    };
  });
  //console.log(apiInfo)
  return apiInfo;
};

const getDBInfoP = async () => {
  try {
    const dbInfo = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    var dato = JSON.parse(JSON.stringify(dbInfo, null, 2));
    dato.forEach((e) => (e.diets = e.diets.map((d) => d.name)));
    return dato;
  } catch (error) {
    console.log(error);
  }
};

const getDBInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}


// todas las recetas
const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDBInfo();
  const totalInfo = apiInfo.concat(dbInfo);

  return totalInfo;
};
// buscar por ID   17ffa75d177646069c950067edc51260
const getApiById = async (id) => {
  //https://api.spoonacular.com/recipes/complexSearch?apiKey=17ffa75d177646069c950067edc51260&addRecipeInformation=true&number=100
  //https://api.spoonacular.com/recipes/{id}/information
  //https://api.spoonacular.com/recipes/${id}/information?apiKey=a8fb9f2a47204a8fa65a0bf857851b22
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=a8fb9f2a47204a8fa65a0bf857851b22`
  );
};

const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = {
  getApiInfo,
  getDBInfo,
  getAllRecipes,
  getDbById,
  getApiById,
};
