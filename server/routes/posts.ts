import { Router } from "express";
import passport from "passport";
import { body, param, validationResult } from "express-validator";
import asyncHandler from 'express-async-handler';

import Post from "../models/post.js";


const router = Router();

const DEFAULT_COMMENTS_PER_POST = 2;


router.get('/', asyncHandler(async (req, res) => {
    const posts = (await Post.find()).map(post => {
        post.comments = post.comments.slice(0, DEFAULT_COMMENTS_PER_POST);
        return post;
    });

    res.json({ posts, message: 'Posts fetched successfully' });
    return;
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    res.json({ post, message: `Post ${req.params.id} fetched successfully` });
    return;
}));

// TODO: add pagination
router.post('/:id/comments', [
    body('content')
        .trim().isLength({ min: 1, max: 2048 })
        .withMessage('Content must be provided of length [1, 2048]')
        .escape(),
    param('id')
    .isMongoId()
    .withMessage('Post id must be provided')
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: "Adding Comment Failed",
            errors: result.array(),
        });
        return;
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
        res.json({
            message: 'Adding Comment Failed',
            error: 'Post id not found',
        })
        return;
    }

    const comment = { content: req.body.content, user: (req.user as any).id };
    post.comments.unshift(comment);
    await post.save();

    res.json({
        message: 'Added Comment Successfully',
        comment,
    });
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
        user: (req.user as any).id,
        content,
    });

    res.status(201).json({ post, message: 'Post created successfully' });
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
