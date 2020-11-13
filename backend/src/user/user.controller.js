const connection = require("../config/db");
const requestStatus = require("../utils/requestStatus");
//let User = require('./user.model');

exports.login = async (req, res) => {
  try {
    connection.getConnection((error, tempCont) => {
      if (error) {
        tempCont.release();
        return res
          .status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco" });
      } else {
        console.log("Conected! 🚀 ");

        var user= req.params.user; 
        var senha= req.params.senha;

        tempCont.query(`SELECT * FROM users WHERE usuario='${user}' AND senha='${senha}'`, (error, rows, fields) => {
          //tempCont.release();
          if (!!error) {
            return res
              .status(requestStatus.BAD_REQUEST)
              .json({ message: "Erro ao tentar buscar no banco" });
          } else {

              res.status(requestStatus.OK).json(rows);

          }
          
        });
      }
    });
  } catch (error) {
    return res.status(requestStatus.BAD_REQUEST).json(error);
  }
};

exports.getFuncionarios = async (req, res) => {
  try {
    connection.getConnection((error, tempCont) => {
      if (!!error) {
        tempCont.release();
        return res
          .status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco" });
      } else {
        console.log("Conected! 🚀 ");

        tempCont.query("SELECT * FROM users", (error, rows, fields) => {
          //tempCont.release();
          if (!!error) {
            return res
              .status(requestStatus.BAD_REQUEST)
              .json({ message: "Erro ao tentar buscar no banco" });
          } else {
            return res.status(requestStatus.OK).json(rows);
          }
        });
      }
    });
  } catch (error) {
    return res.status(requestStatus.BAD_REQUEST).json(error);
  }
};


exports.createUser = async (req, res)=>{
  try {

    const recebe = req.body;

    connection.getConnection((error, tempCont)=>{
      if(!!error){
        tempCont.release();
        return res
          .status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco" });
      }else{
        console.log('Conected!  🚀');
        //console.log('Dentro do else', recebe);
        try {
          recebe.map(async(value) => {
            await tempCont.query(`INSERT INTO users (nome, usuario, senha) VALUES ('${value.nome}', '${value.usuario}','${value.senha}')`, (error, rows, fields)=>{})
           });

          res.status(requestStatus.CREATED_STATUS).json({"MESSAGE":"Gravado com Sucesso !"});

          tempCont.release();
        } catch (error) {
          return res.status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco try" });
        } 

      }
});

  } catch (error) {
    return res.status(400).json(error);
  }
}

  


