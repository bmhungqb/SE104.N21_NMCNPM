'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class InvoiceDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            InvoiceDetail.belongsTo(models.Invoice,{foreignKey:'invoiceDetailId',targetKey:'invoiceDetailId'})
            InvoiceDetail.hasMany(models.Book,{foreignKey:'bookId',sourceKey:'bookId'})
        }
    };
    InvoiceDetail.init({
        invoiceDetailId:{
            type: DataTypes.INTEGER,
            // primaryKey: true
        },
        bookId:DataTypes.INTEGER,
        quantity:DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'InvoiceDetail',
    });
    return InvoiceDetail;
};