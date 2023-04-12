const { Router } = require('express');



const typesRouter = require('./diet');
const recipeRouter = require('./recipe');


const router = Router();

// Configuración de rutas
router.use('/diet', typesRouter);
router.use('/recipe', recipeRouter);


module.exports = router;