import express from 'express';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import UserService from '../services/UserService';
import { Op } from 'sequelize';
import models from '../models';
import 'express-async-errors';

const router = express.Router();
const userService = new UserService(models.User, Op, models.Group);

router.get('/', async (req, res) => {
    const users = await userService.findAll();
    res.json(users);
});

router.post('/', validator, async (req, res) => {
    const body = req.body;
    body.id = uuidv4();
    const user = await userService.create(body);
    res.json(user);
});

router.get('/autoSuggestUsers', async (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    const users = await userService.findForAutoSuggest(loginSubstring, limit);

    res.json(users);
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.findById(userId);

    if (user === null) {
        res.status(404).send(`User with id ${userId} is not found`);
    } else {
        res.json(user);
    }
});

router.put('/:userId', validator, async (req, res) => {
    const userId = req.params.userId;
    const body = req.body;
    const user = await userService.findById(userId);

    if (user) {
        body.id = userId;
        const updatedUser = userService.update(body);
        res.json(updatedUser);
    } else {
        res.status(404).send(`User with id ${userId} is not found`);
    }
});

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.findById(userId);

    if (user === undefined) {
        res.status(404).send(`User with id ${userId} is not found`);
    }

    userService.delete(user);
    res.end();
});

// Validation

const querySchema = Joi.object({
    login: Joi.string().external(async (value) => {
        const users = await userService.findAll();
        const user = users.find(u => u.login === value);
        if (user !== undefined) {
            throw Error('There is already a user with the same login in the system');
        }
    }).required(),
    password: Joi.string().regex(/([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/).required(),
    age: Joi.number().min(4).max(130).required()
});

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

function validator(req, res, next) {
    querySchema.validateAsync(req.body, options)
        .then(() => next())
        .catch((err) => next(`Validation error: ${err}`));
}

module.exports = router;
