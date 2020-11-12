const Realm = require('realm');

// Define your models and their properties
const CarSchema = {
  name: 'Cars',
  properties: {
    carro:  'string',
    placa: 'string',
    cor: 'string',
    foto: 'string'
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
      id: 'int',
      nome: 'string',
      usuario: 'string',
      senha: 'string',
      id_carro: 'int',
      carro: 'string',
      placa: 'string',
      cor: 'string',
      foto: 'string'
  }
};
const ApontsSchema = {
    name: 'Aponts',
    properties: {
      id_user: 'int',
      id_car: 'int',
      km_inicial: 'int',
      km_final: 'int',
      data: 'date',
      local: 'string'
    }
  };

  const AccessSchema = {
    name: 'Access',
    properties: {
      acesso: 'int',
    }
  };

  export {CarSchema, PersonSchema, ApontsSchema, AccessSchema};
