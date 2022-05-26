const express = require('express');
const Joi = require('joi');

const router = express.Router();

const querySchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().custom((value, helper) => {
        const user = users.find(u => u.login === value);
        if (user === undefined) {
            return true;
        }

        return helper.message('There is already a user with the same login in the system');
    }).required(),
    password: Joi.string().regex(/([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

const users = [];

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/', (req, res) => {
    const { error } = querySchema.validate(req.body, options);
    if (error) {
        res.status(404).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        const body = req.body;
        users.push(body);
        res.json(body);
    }
});

router.get('/autoSuggestUsers', (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    const arr = users
        .filter(i => i.login.includes(loginSubstring))
        .sort((a, b) => a.login > b.login ? 1 : -1);

    res.json(arr.slice(0, limit));
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = users.find(i => i.id === userId);

    if (user === undefined) {
        res.status(404).send(`User with id ${userId} is not found`);
    } else {
        res.json(user);
    }
});

router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    const body = req.body;
    const userIndex = users.findIndex(i => i.id === userId);

    if (userIndex > -1) {
        const { error } = querySchema.validate(req.body, options);
        if (error) {
            res.status(404).send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        } else {
            body.id = userId;
            users[userIndex] = body;
            res.json(body);
        }
    } else {
        res.status(404).send(`User with id ${userId} is not found`);
    }
});

router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = users.find(i => i.id === userId);

    if (user === undefined) {
        res.status(404).send(`User with id ${userId} is not found`);
    } 

    user.isDeleted = true;
    res.end();
});

module.exports = router;
