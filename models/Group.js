const getGroupModel = (sequelize, { DataTypes }) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.ENUM({
                values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            }))
        }
    }, {
        timestamps: false
    });

    return Group;
};

export default getGroupModel;
