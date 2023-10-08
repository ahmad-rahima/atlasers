import { Router } from "express";
import passport from "passport";
import multer from 'multer';
import { body, param, validationResult } from "express-validator";
import asyncHandler from 'express-async-handler';

import Post from "../models/post.js";
import Profile from "../models/profile.js";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = (file.originalname as any).replaceAll(' ', '-');
        cb(null, `${uniquePrefix}-${filename}`);
    }
});

const upload = multer({ storage });

const router = Router();

const DEFAULT_COMMENTS_PER_POST = 2;


// TODO: add pagination
router.get('/:id/comments', [
    param('id')
        .isMongoId()
        .withMessage("Post id must be provided"),
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: 'Got comments successfully',
            comments: (await Post.findById(req.params.id)).comments,
        });
    }
}));

// TODO: sort by loves and comments!
router.get('/', asyncHandler(async (req, res) => {
    const postsPromises = (await Post.find().lean()).map(async (post: any) => {
        post.comments = post.comments.slice(0, DEFAULT_COMMENTS_PER_POST);

        const profile = (await Profile.findById((req.user as any).id)).toJSON();

        const comments = post.comments.slice(0, 2);
        for (const comment of comments) {
            const profile = (await Profile.findById(comment.user)).toJSON();
            comment.profilePicPath = (profile as any).picturePath;
        }

        post.profilePicPath = (profile as any).picturePath;
        post.comments = comments;

        return post;
    });

    const posts = await Promise.all(postsPromises);
    res.json({ posts, message: 'Posts fetched successfully' });
    return;
}));


router.get('/followings', asyncHandler(async(req, res) => {
    const user: any = req.user;

    const posts = await Profile.aggregate([
        { $match: { _id: (req.user as any)._id } },
        { $lookup: { from: 'posts', localField: '_id', foreignField: 'user', as: 'posts' } },
        { $project: { _id: 0, posts: 1 } },
        { $unwind: '$posts' },
        { $replaceRoot: { newRoot: "$posts" } },
        { $sort: { date: -1 } },
        { $limit: 2 },
    ]);

    res.json({
        posts,
        message: 'Got posts of the followed profiles successfully',
    });
    return;
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const post: any = await Post.findById(req.params.id).lean();

    const profile = (await Profile.findById((req.user as any).id)).toJSON();

    const comments = post.comments.slice(0, 2);
    for (const comment of comments) {
        const profile = (await Profile.findById(comment.user)).toJSON();
        comment.profilePicPath = (profile as any).picturePath;
    }

    post.profilePicPath = (profile as any).picturePath;
    post.comments = comments;

    res.json({ post, message: `Post ${req.params.id} fetched successfully` });
    return;
}));

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
        id: req.params.id,
        comment,
    });
    return;
}));

router.post('/', upload.single('file'), [
    body('content')
        .trim().isLength({ min: 1, max: 4096 })
        .withMessage('Content must be provided of length [1, 4096].')
        .escape()
], asyncHandler(async (req, res) => {
    const result = validationResult(req);
    console.log('File: ', req.file);
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
        file: req.file?.filename,
    });

    res.status(201).json({ post, message: 'Post created successfully' });
    return;
}));

router.post('/:id/loves', [
    param('id')
        .isMongoId()
        .withMessage("Post id must be provided"),
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: "Adding Love to Post Failed",
            errors: result.array(),
        });
        return;
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
        res.json({
            message: 'Post not found',
            errors: result.array(),
        });
        return;
    }

    let loved = post.loves.includes((req.user as any).id);

    // TODO: this was a mistake! 
    // Using arrays is almost always a bad idea!
    // convert it later to its own schema `PostLoves`!!
    if (!loved) {
        post.loves.unshift((req.user as any).id);
    } else {
        const idx = post.loves.indexOf((req.user as any).id);
        post.loves = post.loves.filter(userId => userId !== (req.user as any).id);
    }
    post.save();

    // TODO: add only if new and save
    res.json({
        message: 'Added Love to Post Successfully',
        id: req.params.id,
        loves: post.loves.length,
        loved: !loved,
    });
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

    const post = await Post.findById(req.params.id);
    if (!post) {
        res.json({
            message: 'Post not found',
        });
        return;
    }

    if ((req.user as any).id.toString() !== post.user.toString()) {
        res.json({
            message: 'Post not owned by the user',
        });
        return;
    }

    const newPostData = {
        content: req.body.content,
    };
    const newPost = await Post.findByIdAndUpdate(req.params.id, newPostData);

    res.json({ message: 'Post updated successfuly', newPost });
    return;
}));

router.delete('/:id', [
    param('id')
        .isMongoId()
        .withMessage("Post id must be provided")
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: 'Deleting post failed',
            errors: result.array(),
        });
        return;
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
        res.json({
            message: 'Post not found',
        });
        return;
    }

    if ((req.user as any).id.toString() !== post.user.toString()) {
        res.json({
            message: 'Post not owned by the user',
        });
        return;
    }

    await Post.findByIdAndRemove(req.params.id);
    res.json({
        message: 'Post deleted successfully',
        id: req.params.id
    });
    return;
}));


export default router;
