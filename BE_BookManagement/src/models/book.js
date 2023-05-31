'use strict';
import db from '../models/index'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Book.belongsTo(models.InvoiceDetail,{ foreignKey: 'bookId',targetKey:'bookId' })
            Book.belongsTo(models.BookReport,{ foreignKey: 'bookId',targetKey:'bookId' })
            Book.belongsTo(models.RentDetail,{ foreignKey: 'bookId',targetKey:'bookId' })
        }
    };
    Book.init({
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Define the primary key
          },
        bookTitle: DataTypes.STRING,
        genre: DataTypes.STRING,
        authorName: DataTypes.STRING,
        costPrice: DataTypes.INTEGER,
        sellingPrice: DataTypes.INTEGER,
        stock: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Book',
    });  

    return Book;
};