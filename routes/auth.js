import express from 'express';
import UserService from '../services/UserService';
import models from '../models';
import { Op } from 'sequelize';
import 'express-async-errors';
import jwt from 'jsonwebtoken';

const router = express.Router();
const userService = new UserService(models.User, Op, models.Group);
const secret = 'node_mentoring_secret';

router.post('/login', async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const user = await userService.findByUserNameAndPassword(username, password);
    if (user.length === 1) {
        const payload = { sub: user.age, title: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: 120 });
        res.send(token);
    } else {
        res.status(401).send({
            success: false,
            message: 'Bad username/password combination'
        });
    }
});

module.exports = router;
