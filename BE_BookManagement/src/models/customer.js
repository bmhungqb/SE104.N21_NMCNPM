'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Customer.belongsTo(models.Rent,{foreignKey:'customerId',targetKey:'customerId'})
            Customer.belongsTo(models.Invoice,{foreignKey:'customerId',targetKey:'customerId'})
            Customer.belongsTo(models.Receipt,{foreignKey:'customerId',targetKey:'customerId'})
            Customer.belongsTo(models.DeptReport,{foreignKey:'customerId',targetKey:'customerId'})
        }
    };
    Customer.init({
        fullName: DataTypes.STRING,
        address: DataTypes.STRING,
        customerId:{
            type: DataTypes.INTEGER,
            primaryKey: true, 
        },
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        sex: DataTypes.STRING,
        dept:DataTypes.INTEGER,
        rank:DataTypes.STRING,
        totalPurchaseValue:DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
};