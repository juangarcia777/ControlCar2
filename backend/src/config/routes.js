const express = require('express');
const userRouter = require('../user/user.router');
const carsRouter = require('../cars/cars.routes');
//const addressRouter = require('../Adresses/address.router');


module.exports = (app) =>{
  //rotas da aula
  app.use('/user', userRouter);

  app.use('/cars', carsRouter);
 


  app.use('/', (req,res)=>{
    res.send('Bem vindo a nossa Api!');
  });

}