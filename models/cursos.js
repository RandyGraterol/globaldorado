	// peliculas.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class Cursos extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement:true,
          primaryKey:true,
        },
        portada:{
          type: DataTypes.STRING,
          allowNull:false,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        descripcion: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        UrlFile: { // Aquí se corrigió el nombre de la propiedad
          type: DataTypes.STRING,
          allowNull:false,
        },
        categoria:{ // Aquí se corrigió el nombre de la propiedad
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        tableName: 'cursos',
      }
    );
  }
}

Cursos.init(sequelize, DataTypes);

module.exports = Cursos;