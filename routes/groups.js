import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import GroupService from '../services/GroupService';
import UserService from '../services/UserService';
import { Op } from 'sequelize';
import models, { sequelize } from '../models';

const router = express.Router();
const groupService = new GroupService(models.Group, Op, models.User);
const userService = new UserService(models.User, Op, models.Group);

router.get('/', async (req, res) => {
    const groups = await groupService.findAll();
    res.json(groups);
});

router.post('/', async (req, res) => {
    const body = req.body;
    body.id = uuidv4();
    const group = await groupService.create(body);
    res.json(group);
});

router.get('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const group = await groupService.findById(groupId);

    if (group === null) {
        res.status(404).send(`Group with id ${groupId} is not found`);
    } else {
        res.json(group);
    }
});

router.put('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const body = req.body;
    const group = await groupService.findById(groupId);

    if (group) {
        body.id = groupId;
        const updatedGroup = await groupService.update(body);
        res.json(updatedGroup);
    } else {
        res.status(404).send(`Group with id ${groupId} is not found`);
    }
});

router.delete('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const group = await groupService.findById(groupId);

    if (group === undefined) {
        res.status(404).send(`Group with id ${groupId} is not found`);
    }

    groupService.delete(group);
    res.end();
});

router.post('/:groupId/addUsers', async (req, res) => {
    const groupId = req.params.groupId;
    const userIds = req.body.userIds;

    addUsersToGroup(groupId, userIds);
    res.end();
});

async function addUsersToGroup(groupId, userIds) {
    const t = await sequelize.transaction();
    const group = await groupService.findById(groupId);
    console.log(group);

    if (group !== undefined) {
        try {
            userIds.forEach(async userId => {
                const user = await userService.findById(userId);

                if (user !== undefined) {
                    group.addUser(user);
                }
            });
            await t.commit();
        } catch (error) {
            await t.rollback();
        }
    }
}

module.exports = router;
