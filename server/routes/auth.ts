import { Router } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import passport from 'passport';


const router = Router();

router.post('/register', [
    body('username').notEmpty().trim().isLength({ min: 1, max: 256 })
        .withMessage('Username must be at least 1 character long, and at maximum 256')
        .escape(),
    body('password').notEmpty().isLength({ min: 3, max: 256 })
        .withMessage('Password must be at least 3 character long, and at maximum 256')
        .escape(),
] , asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: 'Registration Failed',
            errors: result.array(),
        });
        return;
    }

    const { username, password } = req.body;
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
    const refreshToken = crypto.randomBytes(64).toString('hex');

    const user = await User.create({
        username,
        salt,
        hash,
        refreshToken,
    });

    const accessToken = jwt.sign({ sub: user.id }, 'secret', { expiresIn: '1h' });
    res.json({ message: 'Registered successfully', accessToken, refreshToken });
}));

router.post('/login', [
    body('username').notEmpty().trim().isLength({ min: 1, max: 256 })
        .withMessage('Username must be at least 1 character long, and at maximum 256')
        .escape(),
    body('password').notEmpty().isLength({ min: 3, max: 256 })
        .withMessage('Password must be at least 3 character long, and at maximum 256')
        .escape(),
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: "Login Failed",
            errors: result.array(),
        });
        return;
    }

    const { username, password } = req.body;
    const { id, salt, hash, refreshToken } = await User.findOne({ username });
    const passwordHashed = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

    if (crypto.timingSafeEqual(hash, passwordHashed)) {
        const accessToken = jwt.sign({ sub: id }, 'secret', { expiresIn: '1h' });
        res.json({ accessToken, refreshToken, message: 'Logged in successfully' });
    } else {
        res.sendStatus(401);
    }
}));

router.post('/token', [
    body('refreshToken').trim().isJWT()
        .withMessage('Refresh token must be provided of type JWT.'),
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: "Fetching token Failed",
            errors: result.array(),
        });
        return;
    }

    const { refreshToken } = req.body;
    const user = await User.findOne({ refreshToken });

    if (!user)
        res.status(403).json({ message: 'Invalid refresh token' });

    const token = jwt.sign({ sub: user.id }, 'secret', { expiresIn: '1h' });
    res.json({ message: 'New access token generated', token });
}));


router.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    async(req, res) => {
        console.log(req.headers);
        const user: any = req.user;
        if (!user) {
            res.status(400).json({ message: 'User not provided' });
            return;
        }

        user.refreshToken = null;
        res.json({ message: 'User logged out successfully' });
    });


export default router;
