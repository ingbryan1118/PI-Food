const { Router } = require('express');
const { getAllDiets } = require('../controllers/dietController')
const db = require("../db");
const { Recipe, Diet } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
    
    try {
        let diets = await getAllDiets();
        res.status(200).send(diets);

    } catch (error) {
        console.log(error)
    }
})



module.exports = router;