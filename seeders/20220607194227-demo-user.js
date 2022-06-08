'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            id: '00000000-0000-0000-0000-000000000002',
            login: 'John',
            password: 'Doe',
            age: 12,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
