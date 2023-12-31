'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.createTable("userRoles", {
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

            await queryInterface.addConstraint('userRoles', {
                fields: ["name"],
                type: 'unique',
                transaction
            });

            await queryInterface.bulkInsert(
                'userRoles',
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
                        model: 'userRoles',
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
                phone: {
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
                [
                    {
                        userRoleId: 1,
                        firstName: "Boris",
                        lastName: "Marinov",
                        email: "boris.marinov99@gmail.com",
                        password: "$2b$12$kW4LxuNejhqcOxfg.lyy3exhVBdRbuqQiiy1O8JMq7rVafNtpVMbK",
                        phone: "0887107087",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        userRoleId: 1,
                        firstName: "Qnitsa",
                        lastName: "Zamtikova",
                        email: "qnitsa.zamtikova99@gmail.com",
                        password: "$2b$12$kW4LxuNejhqcOxfg.lyy3exhVBdRbuqQiiy1O8JMq7rVafNtpVMbK",
                        phone: "0887107087",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        userRoleId: 1,
                        firstName: "Bogdan",
                        lastName: "Zamtikov",
                        email: "bogdan.zamtikov99@gmail.com",
                        password: "$2b$12$kW4LxuNejhqcOxfg.lyy3exhVBdRbuqQiiy1O8JMq7rVafNtpVMbK",
                        phone: "0887107087",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                ],
                { transaction }
            );

            await queryInterface.createTable("staff", {
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
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            }, { transaction });

            await queryInterface.addConstraint('staff', {
                fields: ["userId"],
                type: 'unique',
                transaction
            });

            await queryInterface.bulkInsert(
                'staff',
                [
                    {
                        userId: 3,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        userId: 2,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                { transaction }
            );

            await queryInterface.createTable("userRefreshTokens", {
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
                token: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                expiresAt: {
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
        });
    },

    down: async (queryInterface, Sequelize) => {}
};
