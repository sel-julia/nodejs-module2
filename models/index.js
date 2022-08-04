import Sequelize from 'sequelize';
import 'dotenv/config';

import getUserModel from './User';
import getGroupModel from './Group';

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT
    }
);

const userModel = getUserModel(sequelize, Sequelize);
const groupModel = getGroupModel(sequelize, Sequelize);
const models = {
    User: userModel,
    Group: groupModel
};

const UserGroup = sequelize.define('UserGroup', {}, { timestamps: false });
userModel.belongsToMany(groupModel, { through: UserGroup });
groupModel.belongsToMany(userModel, { through: UserGroup });

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;
