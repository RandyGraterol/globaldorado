const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/database.js');

class Contacto extends Model{

	static init(sequelize,DataTypes){
        
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
         email:{
          type: DataTypes.STRING,
          allowNull: false,
        },
         mensaje:{
          type: DataTypes.STRING,
          allowNull: false,
        }
		}
		,
			{
			sequelize,
			tableName:'contacto',
			}	
		);

	}
}

Contacto.init(sequelize, DataTypes);

module.exports = Contacto;