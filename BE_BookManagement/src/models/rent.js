'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Rent.hasMany(models.Customer, { foreignKey: 'customerId', sourceKey: 'customerId' })
            Rent.hasMany(models.RentDetail, { foreignKey: 'rentDetailId', sourceKey: 'rentDetailId' })
        }
    };
    Rent.init({
        rentId: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        rentDetailId: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER,
        dayRent: DataTypes.INTEGER,
        dateReturn: DataTypes.DATE,
        rentPrice: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Rent',
    });
    return Rent;
};