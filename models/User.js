const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id:{
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        telefono:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        correo:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        contrasena:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        token:{
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        tableName:'usuarios',
      }
    );
  }
}

User.init(sequelize,DataTypes);

// Puedes usar el modelo User para realizar operaciones con la base de datos
module.exports=User;