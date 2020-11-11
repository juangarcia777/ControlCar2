const express = require('express');

const router = express.Router();

const  userController = require('./user.controller');

router.get('/getall', userController.getFuncionarios);

router.post('/add', userController.createUser);


module.exports = router;