const express = require('express');

const router = express.Router();

const  apontController = require('./aponts.controller');

router.get('/get', apontController.getAponts);

router.get('/get/:id_user/:id_car', apontController.getApontsById);

router.post('/add', apontController.createAponts);


module.exports = router;