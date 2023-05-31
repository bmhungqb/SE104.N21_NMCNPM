'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Rents', {
            id:{
                type: Sequelize.INTEGER
            },
            rentId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            rentDetailId: {
                type: Sequelize.INTEGER,
            },
            customerId: {
                type: Sequelize.INTEGER,
            },
            dayRent: {
                type: Sequelize.INTEGER
            },
            dateReturn: {
                type: Sequelize.DATE
            },
            rentPrice: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Rents');
    }
};