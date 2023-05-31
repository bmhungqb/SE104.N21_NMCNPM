'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BookReports', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            bookId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.INTEGER
            },
            beginningStock: {
                type: Sequelize.INTEGER
            },
            endingStock: {
                type: Sequelize.INTEGER
            },
            phatSinh: {
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
        await queryInterface.dropTable('BookReports');
    }
};