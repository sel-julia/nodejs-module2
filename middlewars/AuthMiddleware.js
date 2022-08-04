import jwt from 'jsonwebtoken';
import 'dotenv/config';

const auth = (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) {
        return res.status(401).send({
            success: true,
            message: 'No token provided'
        });
    }

    return jwt.verify(token, process.env.secret, (error) => {
        if (error) {
            return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token'
            });
        }

        return next();
    });
};

module.exports = auth;
