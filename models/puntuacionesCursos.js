	// peliculas.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class PuntuacionesCursos extends Model {
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
        tableName: 'PuntuacionesCursos',
      }
    );
  }
}

PuntuacionesCursos.init(sequelize, DataTypes);

module.exports = PuntuacionesCursos;