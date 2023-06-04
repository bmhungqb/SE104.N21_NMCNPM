'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Discounts', {
            discountId: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.STRING
            },
            start: {
                type: Sequelize.STRING
            },
            end: {
                type: Sequelize.STRING
            },
            percentage: {
                type: Sequelize.INTEGER
            },
            state: {
                type: Sequelize.STRING
            },
            customerRank: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Discounts');
    }
};