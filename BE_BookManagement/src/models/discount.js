'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Discount.belongsTo(models.Invoice, { foreignKey: 'discountId', targetKey: 'discountId' })

        }
    };
    Discount.init({
        discountId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        state: DataTypes.STRING,
        start: DataTypes.STRING,
        end: DataTypes.STRING,
        percentage: DataTypes.INTEGER,
        state: DataTypes.STRING,
        customerRank: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Discount',
    });
    return Discount;
};