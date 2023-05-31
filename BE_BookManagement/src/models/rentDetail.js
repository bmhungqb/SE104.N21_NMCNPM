'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RentDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            RentDetail.belongsTo(models.Rent,{foreignKey:'rentDetailId',targetKey:'rentDetailId'})
            RentDetail.hasMany(models.Book,{foreignKey:'bookId',sourceKey:'bookId'})
        }
    };
    RentDetail.init({
        rentDetailId:{
            type: DataTypes.INTEGER,
            // primaryKey: true
        },
        bookId:DataTypes.INTEGER,
        quantity:DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'RentDetail',
    });
    return RentDetail;
};