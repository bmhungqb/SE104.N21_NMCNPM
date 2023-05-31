'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Regulation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            
        }
    };  
    Regulation.init({
        regulationId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
        },
        name:DataTypes.STRING,
        minimumInput:DataTypes.INTEGER,
        minimumStock:DataTypes.INTEGER,
        maximumDept:DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Regulation',
    });
    return Regulation;
};