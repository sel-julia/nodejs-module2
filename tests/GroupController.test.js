import {
    groupService,
    userService,
    getAllGroups,
    findGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    addUsersToGroup
} from '../controllers/groupController';
import { sequelize } from '../models';

describe('Verify Group controller', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
        req.body = {};
        req.query = {};
        req.params = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        res.end = jest.fn().mockReturnValue();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Find all groups', async () => {
        jest.spyOn(groupService, 'findAll').mockReturnValue([{}]);

        await getAllGroups(req, res);

        expect(res.json).toHaveBeenCalled();
    });

    it('Find non-existing group by id', async () => {
        req.params.groupId = 'mockedGroup';
        jest.spyOn(groupService, 'findById').mockReturnValue(null);

        await findGroupById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Group with id mockedGroup is not found');
    });

    it('Find existing group by id', async () => {
        req.params.groupId = 'mockedUser';
        jest.spyOn(groupService, 'findById').mockReturnValue([]);

        await findGroupById(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('Create group', async () => {
        const createStub = jest.spyOn(groupService, 'create').mockReturnValue([]);

        await createGroup(req, res);

        expect(createStub).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('Update non-existing group', async () => {
        req.params.groupId = 'mockedGroup';
        const findByIdStub = jest.spyOn(groupService, 'findById').mockReturnValue();

        await updateGroup(req, res);

        expect(findByIdStub).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Group with id mockedGroup is not found');
    });

    it('Update existing group', async () => {
        req.params.groupId = 'mockedGroup';
        const findByIdStub = jest.spyOn(groupService, 'findById').mockReturnValue([]);
        const updateStub = jest.spyOn(groupService, 'update').mockReturnValue([]);

        await updateGroup(req, res);

        expect(updateStub).toHaveBeenCalled();
        expect(findByIdStub).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('Delete non-existing user', async () => {
        req.params.groupId = 'mockedGroup';
        const findByIdStub = jest.spyOn(groupService, 'findById').mockReturnValue();

        await deleteGroup(req, res);

        expect(findByIdStub).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Group with id mockedGroup is not found');
    });

    it('Delete existing group', async () => {
        req.params.groupId = 'mockedGroup';
        const findByIdStub = jest.spyOn(groupService, 'findById').mockReturnValue([]);
        const deleteGroupStub = jest.spyOn(groupService, 'delete').mockReturnValue([]);

        await deleteGroup(req, res);

        expect(findByIdStub).toHaveBeenCalled();
        expect(deleteGroupStub).toHaveBeenCalled();
        expect(res.end).toHaveBeenCalled();
    });

    it('Add user to non-existing group', async () => {
        jest.spyOn(sequelize, 'transaction').mockReturnValue();
        const findGroupByIdStub = jest.spyOn(groupService, 'findById').mockReturnValue();
        const findUserByIdStub = jest.spyOn(userService, 'findById').mockReturnValue([]);

        await addUsersToGroup(req, res);

        expect(findGroupByIdStub).toHaveBeenCalled();
        expect(findUserByIdStub).not.toHaveBeenCalled();
    });
});
