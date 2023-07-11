'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.createTable("g_userRoles", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
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

            await queryInterface.addConstraint('g_userRoles', {
                fields: ["name"],
                type: 'unique',
                transaction
            });

            await queryInterface.bulkInsert(
                'g_userRoles',
                [
                    {
                        name: "admin",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        name: "customer",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                { transaction }
            );

            await queryInterface.createTable("users", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                userRoleId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'g_userRoles',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                },
                firstName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                lastName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
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

            await queryInterface.addConstraint('users', {
                fields: ["email"],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(
                "users",
                {
                    fields: ["userRoleId"],
                    transaction,
                },
            );

            await queryInterface.bulkInsert(
                'users',
                [{
                    userRoleId: 1,
                    firstName: "Boris",
                    lastName: "Marinov",
                    email: "boris.marinov99@gmail.com",
                    password: "$2b$12$kW4LxuNejhqcOxfg.lyy3exhVBdRbuqQiiy1O8JMq7rVafNtpVMbK",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }],
                { transaction }
            );
        });
    },

    down: async (queryInterface, Sequelize) => {}
};
