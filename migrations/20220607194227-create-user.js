module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                type: Sequelize.DataTypes.UUID,
                unique: true,
                allowNull: false,
                primaryKey: true
            },
            login: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Users');
    }
};
