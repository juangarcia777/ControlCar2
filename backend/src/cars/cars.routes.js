const express = require('express');

const router = express.Router();

const  userController = require('./cars.controller');

router.get('/getall', userController.getCars);

router.get('/getall/:id', userController.getCarsById);

router.post('/add', userController.createCars);


module.exports = router;