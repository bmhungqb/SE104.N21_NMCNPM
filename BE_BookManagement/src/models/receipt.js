'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Receipt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Receipt.hasMany(models.Customer,{foreignKey:'customerId',sourceKey:'customerId'});
        }
    };
    Receipt.init({
        receiptId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true, 
        },
        customerId:DataTypes.INTEGER,
        invoiceId:DataTypes.INTEGER,
        amountReceived:DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Receipt',
    });
    return Receipt;
};