'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DeptReport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DeptReport.hasMany(models.Customer,{foreignKey:'customerId',sourceKey:'customerId'})
        }
    };  
    DeptReport.init({
        customerId:{
            type: DataTypes.INTEGER,
        },
        beginningDept:DataTypes.INTEGER,
        endingDept:DataTypes.INTEGER,
        phatSinh:DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'DeptReport',
    });
    return DeptReport;
};