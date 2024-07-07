	// peliculas.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class Puntuaciones extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement:true,
          primaryKey:true,
        },
        user:{
          type: DataTypes.STRING,
          allowNull:false,
        },
        puntuacion: {
          type: DataTypes.INTEGER,
          allowNull:false,
        },
      },
      {
        sequelize,
        tableName: 'puntuaciones',
      }
    );
  }
}

Puntuaciones.init(sequelize, DataTypes);

module.exports = Puntuaciones;