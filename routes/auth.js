import express from 'express';
import { login } from '../controllers/AuthController';

const router = express.Router();

router.post('/login', login);

module.exports = router;
