import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import User from '../models/user.js';
import Profile from '../models/profile.js';
import Post from "../models/post.js";

const router = Router();


export interface UserDTO {
    user: string;
    bio: string;
    born: Date;
    joined: Date;
    nationality: string;
    gender: string;
}


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

router.get('/', asyncHandler(async(req, res) => {
    res.json(await Profile.find());
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

// TODO: add sort
router.get('/:id/posts', asyncHandler(async(req, res) => {
    const page = + req.query.page || 1;
    const pageSize = 2;

    const posts = await Post.find({ user: (req.user as any).id })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    res.json({
        message: `Fetched posts by user ${(req.user as any).username} successfully`,
        posts
    });
    return;
}));

export default router;
