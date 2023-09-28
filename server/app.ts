import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import asyncHandler from 'express-async-handler';

import postsRouter from './routes/posts.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import profilesRouter from './routes/profiles.js';

import User from './models/user.js';

import passport from 'passport';


export const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
};

app.use('/auth', authRouter);
passport.use(new JwtStrategy(jwtOpts, async(jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.sub);
        if (!user) {
            return done(null, false);
        }

        return done(null, user);

    } catch (err) {
        return done(err, false);
    }
}));


// app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.authenticate('jwt', { session: false }));
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);

async function main() {
    await mongoose.connect('mongodb://localhost/atlas');
}

app.listen(port, () => {
    console.log('App is listening at port: ', port);
    main().then(() => console.log('Mongodb: Connected Successfully!'));
});
