'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bookTitle: {
                type: Sequelize.STRING
            },
            genre: {
                type: Sequelize.STRING
            },
            authorName: {
                type: Sequelize.STRING
            },
            publisherName: {
                type: Sequelize.STRING
            },
            costPrice: {
                type: Sequelize.STRING
            },
            sellingPrice: {
                type: Sequelize.STRING
            },
            quantity: {
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
        await queryInterface.dropTable('Books');
    }
};