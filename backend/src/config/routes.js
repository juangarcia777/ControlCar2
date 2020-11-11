const express = require('express');
const userRouter = require('../user/user.routes');
const carsRouter = require('../cars/cars.routes');
const apontsRouter = require('../aponts/aponts.routes');
//const addressRouter = require('../Adresses/address.router');


module.exports = (app) =>{
  //rotas da aula
  app.use('/user', userRouter);

  app.use('/cars', carsRouter);

  app.use('/aponts', apontsRouter);


  app.use('/', (req,res)=>{
    res.send('Bem vindo a nossa Api!'); 
  });

}