import express from 'express';
import Joi from 'joi';
import UserService from '../services/UserService';
import { Op } from 'sequelize';
import models from '../models';
import 'express-async-errors';
import {
    getAllUsers,
    findUserById,
    createUser,
    autoSuggestUsers,
    updateUser,
    deleteUser
} from '../controllers/UserController';

const router = express.Router();
const userService = new UserService(models.User, Op, models.Group);

router.get('/', getAllUsers);

router.post('/', validator, createUser);

router.get('/autoSuggestUsers', autoSuggestUsers);

router.get('/:userId', findUserById);

router.put('/:userId', validator, updateUser);

router.delete('/:userId', deleteUser);

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
