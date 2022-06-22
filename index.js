import express from 'express';
import bodyParser from 'body-parser';
import usersRoute from './routes/users';
import { sequelize } from './models';
const app = express();

sequelize.sync().then(() => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/users', usersRoute);

    app.use((error, req, res) => {
        return res.status(500)
            .json({ error: error.toString() });
    });

    app.listen(3400, () => {
        console.log('Server is listening on port 3400');
    });
});

module.exports = app;
