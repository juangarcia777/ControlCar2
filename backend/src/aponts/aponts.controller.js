const connection = require("../config/db");
const requestStatus = require("../utils/requestStatus");
//let User = require('./user.model');

exports.getAponts = async (req, res) => {
  try {
    connection.getConnection((error, tempCont) => {
      if (!!error) {
        tempCont.release();
        return res
          .status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco" });
      } else {
        console.log("Conected! 🚀 ");

        tempCont.query("SELECT * FROM cars", (error, rows, fields) => {
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


exports.getApontsById = async (req, res) => {
  try {
    connection.getConnection((error, tempCont) => {
      if (!!error) {
        tempCont.release();
        return res
          .status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco" });
      } else {
        console.log("Conected! 🚀 ");

        var id_user= req.params.id_user;
        var id_car= req.params.id_car;

        tempCont.query(`SELECT * FROM apontamentos WHERE id_user='${id_user}' AND id_car='${id_car}'`, (error, rows, fields) => {
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


exports.createAponts = async (req, res)=>{
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
            await tempCont.query(`INSERT INTO cars (carro, placa, cor, foto ) VALUES ('${value.carro}', '${value.placa}','${value.cor}','${value.foto}')`, (error, rows, fields)=>{})
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

  


