'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Invoices', {
            invoiceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            invoiceDetailId: {
                type: Sequelize.INTEGER
            },
            customerId: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: 'Customers',
                //     key: 'customerId',
                // }
            },
            discountId: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: 'Discounts',
                //     key: 'discountId',
                // }
            },
            initialPrice: {
                type: Sequelize.INTEGER
            },
            discountPrice: {
                type: Sequelize.INTEGER
            },
            totalPrice: {
                type: Sequelize.INTEGER
            },
            remaining: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.INTEGER
            },
            customerPay: {
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
        await queryInterface.dropTable('Invoices');
    }
};