'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Customers', {
            fullName: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            customerId:{
                allowNull: false,
                primaryKey: true,
                type:Sequelize.INTEGER
            },
            phoneNumber: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            sex: {
                type: Sequelize.STRING
            },
            dept: {
                type: Sequelize.INTEGER
            },
            rank: {
                type: Sequelize.STRING
            },
            totalPurchaseValue: {
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
        await queryInterface.dropTable('Customers');
    }
};