import { Router } from "express";
import passport from "passport";
import { body, validationResult } from "express-validator";
import asyncHandler from 'express-async-handler';

import Post from "../models/post.js";


const router = Router();


router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.find();

    res.json({ posts });
    return;
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    res.json({ post });
    return;
}));

router.post('/', [
    body('content')
        .trim().isLength({ min: 1, max: 4096 })
        .withMessage('Content must be provided of length [1, 4096].')
        .escape()
], asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: "Adding Post Failed",
            errors: result.array(),
        });
        return;
    }

    const content = req.body.content;

    const post = await Post.create({
        content,
        user: (req.user as any).id
    });

    res.status(201).json({ post });
    return;
}));

router.put('/:id', [
    body('content')
        .trim().isLength({ min: 1, max: 4096 })
        .withMessage('Content must be provided of length [1, 4096].')
        .escape()
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: "Updating Post Failed",
            errors: result.array(),
        });
        return;
    }

    const newPost = {
        content: req.body.content,
    };

    const post = await Post.findByIdAndUpdate(req.params.id, newPost);

    res.json({ message: 'Post updated successfuly', post });
    return;
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.json({ message: 'Post deleted successfuly' });
    return;
}));


export default router;
