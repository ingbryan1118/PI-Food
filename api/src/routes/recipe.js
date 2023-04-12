const { Router } = require('express');
const axios = require('axios');
const { getApiById, getAllRecipes, getDbById} = require('../controllers/recipeController');
const { Recipe, Diet } = require('../db');
const { API_KEY} = process.env;


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        
        let allRecipes = await getAllRecipes()    
        //console.log(allRecipes)
        if (name) {
            let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
            //console.log(recipeByName)
            if (recipeByName.length) {
                let recipes = recipeByName.map(e => {
                    return {
                        id: e.id,
                        image: e.image,
                        name: e.name,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                        summary:e.summary,
                        healthScore: e.healthScore,
                        dishTypes: e.dishTypes,
                        steps:e.steps
                    }
                })
                return res.status(200).send(recipes); 
            }  
            return res.status(404).send('Sorry, recipe not found')
        } else {
            let recipes = allRecipes.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    image: e.image,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                    summary: e.summary,
                    healthScore: e.healthScore,
                    dishTypes: e.dishTypes,
                    steps:e.steps
                    
                }
            })
            return res.status(200).send(recipes);
        }
    } catch {
       return res.status(400).send('invalid input');
    }
});

router.get('/:id', async (req, res, next) => {    
    const { id } = req.params  
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let dbRecipesById = await getDbById(id);  
            console.log("por aqui---------------------")
            console.log(dbRecipesById) 
             let recipeDetails = {
                name: dbRecipesById.name,
                image:dbRecipesById.image,
                summary:dbRecipesById.summary,
                diets: dbRecipesById.diets.map(e => e.name),
                healthScore: dbRecipesById.healthScore,
                steps:dbRecipesById.steps

             }
            //console.log(dbRecipesById.diets.map(e => e.name))        
            //return res.status(200).json(dbRecipesById)
            return res.status(200).send(recipeDetails);
        } else { 
            apiRecipesById = await getApiById(id)
          //  console.log("por aqui");
           // console.log(apiRecipesById)
            if (apiRecipesById.data.id) {
                let recipeDetails =  {                    
                    image: apiRecipesById.data.image,
                    name: apiRecipesById.data.title,
                    dishTypes: apiRecipesById.data.dishTypes,
                    diets: apiRecipesById.data.diets,
                    summary: apiRecipesById.data.summary,
                    healthScore: apiRecipesById.data.healthScore,
                    steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).send(recipeDetails); 
            }
        } 
    } catch {
        return res.status(404).send('Recipe not found')
    }
});

//https://www.shutterstock.com/image-photo/chicken-fillet-salad-healthy-food-260nw-1721943142.jpg
router.post('/', async (req, res) => {
    try {
        const { name, summary, healthScore, steps, image, diets } = req.body;
            
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image,
        });

        const dietDB = await Diet.findAll({
            where: { name: diets }
        });
        // console.log("aquii");
        // console.log(dietDB);
        // console.log("fin aquii---------------------");
        if (!name) return res.status(400).send('La receta debe tener un Nombre');
        if (!summary) return res.status(400).send('La receta debe tener un resumen')

        newRecipe.addDiet(dietDB);
        res.status(200).send(newRecipe)

    } catch (error) {
        console.log(error)
    }
});


    
    
module.exports = router;