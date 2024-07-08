const Sequelize = require('sequelize');

const sequelize = new Sequelize('globaldorado','administrador','k_hoA!qQBM2k/@e]', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports=sequelize;