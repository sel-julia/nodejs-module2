import express from 'express';
import {
    getAllGroups,
    createGroup,
    fingGroupById,
    updateGroup,
    deleteGroup,
    addUsersToGroup
} from '../controllers/GroupController';
import 'express-async-errors';

const router = express.Router();

router.get('/', getAllGroups);

router.post('/', createGroup);

router.get('/:groupId', fingGroupById);

router.put('/:groupId', updateGroup);

router.delete('/:groupId', deleteGroup);

router.post('/:groupId/addUsers', addUsersToGroup);

module.exports = router;
