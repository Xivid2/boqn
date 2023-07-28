'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.createTable("services", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                type: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                imgSrc: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                goal: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                duration: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                price: {
                    type: Sequelize.NUMERIC(20, 2),
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

            await queryInterface.addConstraint('services', {
                fields: ["type", "name"],
                type: 'unique',
                transaction
            });

            await queryInterface.bulkInsert(
                'services',
                [
                    {
                        type: "MASSAGE",
                        name: "Класически",
                        goal: "Премахване на умората и стреса",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Класическият масаж отпуска напрежението в мускулите и засилва обменните процеси, повишава циркулацията на кръвта.",
                        duration: 60,
                        price: '75.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Релаксиращ",
                        goal: "Премахване на стреса, успокояване на нервната система",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Помага за подобряването на съня, облекчава схванатите мускули, елиминира депресията, подобрява метаболизма, повишава доброто настроение.",
                        duration: 60,
                        price: '75.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Възстановителен",
                        goal: "Облекчаване на болката, освобождаване на мускулно напрежение",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Облекчаване на болките, изчистване на токсините, премахване на стреса, нормализиране на обмяната на веществата. Възвръща свежестта и тонуса.",
                        duration: 60,
                        price: '75.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Регенериращ",
                        goal: "Ефективно детоксикиране, възстановяване на силите и пълен рестарт на тялото. Специално внимание върху съединителната тъкан и фасцилията",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Този масаж е леко по-силен, но ще подобри циркулацията на енергията, кръвоносната и лимфната система, ще освободи тялото Ви от блокажите в меридианите и ще премахне напрежението, стреса и болката.",
                        duration: 60,
                        price: '80.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Дълбокотъканен",
                        goal: "Релаксация на мускули, стажи и сухожилия",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Балансира нервната система и подобрява лимфопотока. Ефективен при хронично стегнати или болезнени мускули, възстановяване след контузии, постурални проблеми.",
                        duration: 60,
                        price: '80.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Спортен",
                        goal: "Подобряване на обмяната, премахване на напрежението. Подготвителен, интензивен, възстановителен",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Силен, интензивен масаж - премахва умората, намалява напрежението, подобрява гъвкавостта на мускули, стави, сухожилия. Подобрява кръвообръщението.",
                        duration: 60,
                        price: '80.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Специализиран терапевтичен при болки в краката и стъпалата",
                        goal: "Свободно движение на и лекота, без болка и напрежение в краката и стъпалата",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Елиминира болката, премахва тежестта, компресията, напрежението и сковаността. Подобрява лимфния поток, мобилността и обхвата на движение. Облекчава състояние на болка при плоскостъпие - дюстабан, подагра, плантарен фасциит, синдром на тежки крака, травми.",
                        duration: 60,
                        price: '80.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Терапия с вендузи",
                        goal: "Изчиства от токсини, освобождава блокажите в тялото",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Подходящ при настинка, бронхит, главоболие, болки в гърба, проблеми с кръста, болки във врата, рамената, плексит, неврит, напрежение, безсъние.",
                        duration: 60,
                        price: '80.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Шиацу масаж",
                        goal: "Балансиране на енергията, освобождаване на напрежението, успокояване на съзнанието",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Шиацу елиминира сковаността и хроничното напрежение. Облекчава болките в мускулите и подобрява тяхната еластичност. Облекчава болките в кръста, врата и раменете. Повлиява благоприятно болките в ставите и увеличава обхвата на движение. Подобрява координацията.",
                        duration: 60,
                        price: '75.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Бюти терапия",
                        goal: "Цялостна грижа от пръстите на краката до върха на главата. Масаж на цяло тяло, масаж на стъпалата и масаж на лице. Подмладява, освежава, стяга и изглажда кожата на тялото и лицето",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Кадифена грижа за кожата на тялото и лицето с анти-бръчки ефект за стягане, подмладяване, хидратиране.",
                        duration: 90,
                        price: '150.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Масаж на лице, шия, доколте и ръце",
                        goal: "Кожата на деколтето, шията и лицето е по-нежна и податлива на влияния, затова има нужда от по-внимателна и постоянна грижа, за да изглежда млада, сияйна и красива",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Приятен и тонизиращ масаж на лице, шия и деколте. Козметичният масаж на лицето тонизира и разкрасява кожата, карайки я да засияе отново в най-добрия си вид.",
                        duration: 60,
                        price: '85.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Масаж на стъпала",
                        goal: "Цялостна грижа за тонуса на стъпалата",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Подобряване на работата на вътрешните органи. Премахване на отложените натрупвания и токсини в стъпалата. Работа върху втвърдявания и натрупана млечна киселина. Стимулира вътрешната енергия и премахва блокажите",
                        duration: 30,
                        price: '60.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        type: "MASSAGE",
                        name: "Частичен масаж",
                        goal: "Премахване локално болката и схванатите мускули",
                        imgSrc: 'http://i.imgur.com/0tRMhmx.png',
                        description: "Видове масажи: частичен масаж на гръб, масажна яка, масажен сегмент - горни крайници, масажен сегмент - долни крайници, локален масаж - корем (и гърди).",
                        duration: 30,
                        price: '50.00',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                { transaction }
            );
        });
    },

    down: async (queryInterface, Sequelize) => { }
};
