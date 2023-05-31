'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('RentDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            rentDetailId:{
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('RentDetails');
    }
};