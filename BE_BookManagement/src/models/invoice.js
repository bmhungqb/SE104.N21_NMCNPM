'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Invoice.hasMany(models.Discount,{foreignKey:'discountId',sourceKey:'discountId'});
            Invoice.hasMany(models.Customer,{foreignKey:'customerId',sourceKey:'customerId'});
            Invoice.hasMany(models.InvoiceDetail,{foreignKey:'invoiceDetailId',sourceKey:'invoiceDetailId'})
        }
    };
    Invoice.init({
        invoiceId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true, 
        },
        customerId:DataTypes.INTEGER,
        discountId:DataTypes.INTEGER,
        invoiceDetailId:DataTypes.INTEGER,
        initialPrice:DataTypes.INTEGER,
        discountPrice:DataTypes.INTEGER,
        totalPrice:DataTypes.INTEGER,
        customerPay:DataTypes.INTEGER,
        changePrice:DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Invoice',
    });

    return Invoice;
};