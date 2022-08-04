import {
    getAllUsers,
    userService,
    findUserById,
    createUser,
    autoSuggestUsers,
    updateUser,
    deleteUser
} from '../controllers/UserController';

describe('Verify User controller', () => {
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

    it('Find all users', async () => {
        jest.spyOn(userService, 'findAll').mockReturnValue([{}]);

        await getAllUsers(req, res);

        expect(res.json).toHaveBeenCalled();
    });

    it('Find non-existing user by id', async () => {
        req.params.userId = 'mockedUser';
        jest.spyOn(userService, 'findById').mockReturnValue(null);

        await findUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('User with id mockedUser is not found');
    });

    it('Find existing user by id', async () => {
        req.params.userId = 'mockedUser';
        jest.spyOn(userService, 'findById').mockReturnValue([]);

        await findUserById(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('Create user', async () => {
        const createStub = jest.spyOn(userService, 'create').mockReturnValue([]);

        await createUser(req, res);

        expect(createStub).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('autoSuggestUsers', async () => {
        const findForAutoSuggestStub = jest.spyOn(userService, 'findForAutoSuggest').mockReturnValue([]);

        await autoSuggestUsers(req, res);

        expect(findForAutoSuggestStub).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('Update non-existing user', async () => {
        req.params.userId = 'mockedUser';
        const findByIdStub = jest.spyOn(userService, 'findById').mockReturnValue();

        await updateUser(req, res);

        expect(findByIdStub).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('User with id mockedUser is not found');
    });

    it('Update existing user', async () => {
        req.params.userId = 'mockedUser';
        const updateStub = jest.spyOn(userService, 'update').mockReturnValue([]);
        const findByIdStub = jest.spyOn(userService, 'findById').mockReturnValue([]);

        await updateUser(req, res);

        expect(updateStub).toHaveBeenCalled();
        expect(findByIdStub).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('Delete non-existing user', async () => {
        req.params.userId = 'mockedUser';
        const findByIdStub = jest.spyOn(userService, 'findById').mockReturnValue();

        await deleteUser(req, res);

        expect(findByIdStub).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('User with id mockedUser is not found');
    });

    it('Delete existing user', async () => {
        req.params.userId = 'mockedUser';
        const findByIdStub = jest.spyOn(userService, 'findById').mockReturnValue([]);
        const deleteUserStub = jest.spyOn(userService, 'delete').mockReturnValue([]);

        await deleteUser(req, res);

        expect(findByIdStub).toHaveBeenCalled();
        expect(deleteUserStub).toHaveBeenCalled();
        expect(res.end).toHaveBeenCalled();
    });
});
