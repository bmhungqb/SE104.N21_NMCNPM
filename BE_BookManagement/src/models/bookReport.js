'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookReport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            BookReport.hasMany(models.Book,{foreignKey:'bookId',sourceKey:'bookId'})
        }
    };  
    BookReport.init({
        bookId:{
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
        },
        beginningStock:DataTypes.INTEGER,
        endingStock:DataTypes.INTEGER,
        phatSinh:DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'BookReport',
    });
    return BookReport;
};