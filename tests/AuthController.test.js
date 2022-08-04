import { login, userService } from '../controllers/AuthController';
import jwt from 'jsonwebtoken';

describe('Verify login functionality', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
        req.body = {};
        req.query = {};
        req.params = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Login by existing user', async () => {
        jest.spyOn(userService, 'findByUserNameAndPassword').mockReturnValue([{}]);
        const jwtStub = jest.spyOn(jwt, 'sign');

        await login(req, res);

        expect(jwtStub).toHaveBeenCalled();
    });

    it('Login by non-existing user', async () => {
        jest.spyOn(userService, 'findByUserNameAndPassword').mockReturnValue([]);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: "Bad username/password combination" });
    });
});

