import express from 'express';
import bodyParser from 'body-parser';
import usersRoute from './routes/users';
import groupsRoute from './routes/groups';
import { sequelize } from './models';
import appLogger from './middlewars/AppLogger';
import errorLoger from './middlewars/ErrorLogger';
import logger from './logger/Logger';

const app = express();

process
    .on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    })
    .on('uncaughtException', (err) => {
        sequelize.close();
        logger.error('Uncaught Exception thrown:');
        logger.error(err);
        process.exit(1);
    });

sequelize.sync().then(() => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(appLogger);

    app.use('/users', usersRoute);
    app.use('/groups', groupsRoute);

    app.use(errorLoger);

    app.listen(3400, () => {
        console.log('Server is listening on port 3400');
    });
});

module.exports = app;
