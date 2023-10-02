import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import User from '../models/user.js';
import Profile from '../models/profile.js';
import Post from "../models/post.js";

const router = Router();


// TODO: add sort, comments
router.get('/:id/posts', asyncHandler(async(req, res) => {
    console.log("User: ", req.user);
    console.log("Query: ", req.query);
    console.log("Page: ", req.query.page);

    const page = + req.query.page || 1;
    const pageSize = 2;

    const posts = await Post.find({ user: (req.user as any).id })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    const postsSent = posts.map((post: any) => {
        return {
            _id: post.id,
            user: post.user,
            file: post.file,
            content: post.content,
            date: post.date,
            loves: post.loves.length,
            loved: !!post.loves.filter((id: string) => id.toString() === req.params.id).length,
            comments: post.comments.slice(0, 2),
        };
    });
    console.log(postsSent);

    res.json({
        message: `Fetched posts by user ${(req.user as any).username} successfully`,
        posts: postsSent,
    });
    return;
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.json({
            message: 'User not found by id',
            profile: null,
        });
        return;
    }

    const profile = await Profile.findById(user.id)
        .populate('user', '_id');
    if (!profile) {
        res.json({
            message: 'User does not have a profile!',
            profile: null,
        });
        return;
    }

    res.json({
        message: 'Fetched users successfully',
        profile,
    });
    return;
}));

// TODO: add pagination to this!
router.get('/', asyncHandler(async(req, res) => {
    res.json({
        message: 'Fetched all profiles successfully',
        profiles: await Profile.find()
    });
    return;
}));

router.post('/', asyncHandler(async(req, res) => {
    const userId = (req.user as any).id;
    const profileData = req.body;

    const profileExists = await Profile.findById(userId)
        .populate('user', '_id');
    if (profileExists) {
        res.json({
            message: 'User already has a profile!',
            profile: profileExists,
        });
        return;
    }

    const profile = await Profile.create({
        _id: userId,
        bio: profileData.bio,
        born: profileData.born,
        joined: profileData.joined,
        gender: profileData.gender,
        nationality: profileData.nationaity,
    });

    res.json({
        message: 'Added user successfully',
        profile,
    });
    return;
}));

router.put('/:id', asyncHandler(async(req, res) => {
    const userId = (req.user as any).id;
    if (!userId) {
        res.json({ message: "User does not exist!" });
        return;
    }

    const newProfile = {
        _id: userId,
        bio: req.body.bio,
        born: req.body.born,
        joined: req.body.joined,
        gender: req.body.gender,
        nationality: req.body.nationaity,
    };

    const _profile = await Profile.findByIdAndUpdate(userId, newProfile);
    if (!_profile) {
        res.json({ message: 'User does not have a profile!' })
        return;
    }

    res.json({
        message: 'Added user successfully',
        profile: newProfile,
    });
    return;
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    const userId = (req.user as any).id;

    await Profile.findByIdAndRemove(userId);
    res.json({
        message: 'Profile deleted successfully'
    });
    return;
}));

export default router;
