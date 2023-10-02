import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import postsRouter from './routes/posts.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import profilesRouter from './routes/profiles.js';

import User from './models/user.js';

import passport from 'passport';

export const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    next();
});

app.options('*', (req: any, res: any) => {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    res.send();
});

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

app.use(express.static(path.join(__dirname, 'uploads')));
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
