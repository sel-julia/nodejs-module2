import Sequelize from 'sequelize';

import getUserModel from './User';

const sequelize = new Sequelize(
    'nodejs-training', null, null,
    {
        dialect: 'postgres'
    }
);

const models = {
    User: getUserModel(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;
