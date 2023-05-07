'use strict';
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
            // define association here
        }
    };
    Book.init({
        bookTitle: DataTypes.STRING,
        genre: DataTypes.STRING,
        authorName: DataTypes.STRING,
        publisherName: DataTypes.STRING,
        costPrice: DataTypes.STRING,
        sellingPrice: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Book',
    });
    return Book;
};