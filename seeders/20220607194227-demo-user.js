module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('Users', [{
            id: '00000000-0000-0000-0000-000000000001',
            login: 'John',
            password: 'Doe',
            age: 12,
            isDeleted: false
        }, {
            id: '00000000-0000-0000-0000-000000000002',
            login: 'kate',
            password: 'dorn',
            age: 13,
            isDeleted: false
        }, {
            id: '00000000-0000-0000-0000-000000000003',
            login: 'Ilon',
            password: 'Hops',
            age: 123,
            isDeleted: false
        }]);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
