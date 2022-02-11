
const getDiets = require("./getDiets");


const { Router } = require('express');


const router = Router();

router.get('/',getDiets);




module.exports = router;