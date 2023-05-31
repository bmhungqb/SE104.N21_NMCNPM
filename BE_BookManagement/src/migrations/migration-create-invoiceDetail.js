'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('InvoiceDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            invoiceDetailId:{
                type: Sequelize.INTEGER,
                // primaryKey: true
            },
            quantity:{
                type: Sequelize.INTEGER,
            },
            bookId:Sequelize.INTEGER,
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
        await queryInterface.dropTable('InvoiceDetails');
    }
};