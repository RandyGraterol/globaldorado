const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/database.js');

class Ethereum extends Model{

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
        email:{
          type: DataTypes.STRING,
          allowNull: false,
        },
         ranking:{
          type: DataTypes.STRING,
          allowNull: false,
        },
         message:{
          type: DataTypes.STRING,
          allowNull: false,
        }
		}
		,
			{
			sequelize,
			tableName:'ethereum',
			}	
		);

	}
}

Ethereum.init(sequelize, DataTypes);

module.exports = Ethereum;