const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 50,
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    password: '', // A senha do usuário. Ex: user123
    database: 'projetox' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

module.exports = connection;
