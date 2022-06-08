const getUserModel = (sequelize, { DataTypes }) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return User;
};

export default getUserModel;
