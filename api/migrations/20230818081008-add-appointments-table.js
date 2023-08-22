'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.createTable("appointments", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                },
                staffId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'staff',
                        key: 'id',
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                },
                serviceId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'services',
                        key: 'id',
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                },
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            }, { transaction });

            await queryInterface.addConstraint('appointments', {
                fields: ["staffId", "date"],
                type: 'unique',
                transaction
            });
        });
    },

    down: async (queryInterface, Sequelize) => { }
};
