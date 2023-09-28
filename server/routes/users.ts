// TODO: DELETE THIS ROUTE!

import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';


const router = Router();

router.get('/:id', asyncHandler(async(req, res) => {
    const users = await User.findById(req.params.id);

    res.json({
        message: 'Fetched users successfully',
        users,
    });
    return;
}));

router.post('/', asyncHandler(async(req, res) => {
    res.send('POST /users/:id NOT IMPLEMENTED YET!');
}));

router.put('/:id', asyncHandler(async(req, res) => {
    res.send('PUT /users/:id NOT IMPLEMENTED YET!');
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    res.send('DELETE /users/:id NOT IMPLEMENTED YET!');
}));


export default router;
