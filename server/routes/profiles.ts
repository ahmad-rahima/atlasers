import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { body, param, validationResult } from 'express-validator';

import User from '../models/user.js';
import Profile, { ProfileToProfile } from '../models/profile.js';
import Post from "../models/post.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/profile-pictures');
    },
    filename: function(req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = (file.originalname as any).replaceAll(' ', '-');
        cb(null, `${uniquePrefix}-${filename}`);
    }
});

const upload = multer({ storage });

// TODO: add sort, comments
router.get('/:id/posts', asyncHandler(async(req, res) => {
    console.log("User: ", req.user);
    console.log("Query: ", req.query);
    console.log("Page: ", req.query.page);

    const page = + req.query.page || 1;
    const pageSize = 2;

    const posts = (await Post.find({ user: (req.user as any).id })
        .skip((page - 1) * pageSize)
        .limit(pageSize))
                      .map(post => post.toJSON());

    const profile = (await Profile.findById((req.user as any).id)).toJSON();

    const postsSentPromises = posts.map(async (post: any) => {
        const comments = post.comments.slice(0, 2);
        for (const comment of comments) {
            const profile = (await Profile.findById(comment.user)).toJSON();
            comment.profilePicPath = (profile as any).picturePath;
            console.log("comment of commentor: ", comment);
        }

        return {
            _id: post.id,
            user: post.user,
            file: post.file,
            content: post.content,
            date: post.date,
            loves: post.loves.length,
            loved: !!post.loves.filter((id: string) => id.toString() === req.params.id).length,
            comments,
            profilePicPath: (profile as any).picturePath,
        };
    });

    const postsSent = await Promise.all(postsSentPromises);
    console.log(postsSent);

    res.json({
        message: `Fetched posts by user ${(req.user as any).username} successfully`,
        posts: postsSent,
    });
    return;
}));

router.post('/follow/:id', [
    param('id')
        .exists()
        .isMongoId()
        .withMessage('Id of the profile to follow must be provided as param.')
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result) {
        res.json({
            message: 'Following a profile failed',
            errors: result.array(),
        });
        return;
    }

    if ((req.user as any).id.toString() === req.params.id) {
        res.json({
            message: "User cannot follow himself/herself!",
        });
        return;
    }

    const follower = await Profile.findById((req.user as any).id);
    if (!follower) {
        res.json({
            message: "User profile not found!",
        });
        return;
    }

    const following = await Profile.findById(req.params.id);
    if (!following) {
        res.json({
            message: "User to follow's profile not found!",
        })
        return;
    }

    const assoc = await ProfileToProfile.create({
        follower,
        following,
    });

    res.json({
        message: `${follower} is following ${following} successfully.`,
        assoc,
    });
    return;
}));

// router.get('/followers', asyncHandler(async(req, res) => {
//     const followers = ProfileToProfile.find({ follower: (req.user as any).id });
//     res.json({
//         message: `Fetching the followers of ${(req.user as any).id} successfully`,
//         followers,
//     });
//     return;
// }));


router.get('/followers', asyncHandler(async(req, res) => {
    const followers = await (Profile as any).getFollowers((req.user as any).id);
    res.json({
        message: `Fetching the followers of ${(req.user as any).id} successfully`,
        followers,
    });
    return;
}));

router.get('/followings', asyncHandler(async(req, res) => {
    const followings = await (Profile as any).getFollowings((req.user as any).id);
    res.json({
        message: `Fetching the followers of ${(req.user as any).id} successfully`,
        followings,
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


router.post('/', upload.single('picture'), [
    body('displayName')
        .trim()
        .isLength({ min: 3, max: 128 })
        .withMessage("displayName must be provided with length [3, 128]"),
    body('gender')
        .trim()
        .toLowerCase()
        .isIn(['male', 'female'])
        .withMessage("gender only accepts Male, Female."),
    body('nationality')
        .trim()
        .isLength({ max: 128 }),
    body('bio')
        .trim()
        .isLength({ max: 1024 }),
    body('born')
        .optional()
        .isDate(),
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: "Adding profile failed.",
            error: result.array(),
        });
    }

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
        displayName: profileData.displayName,
        bio: profileData.bio,
        born: profileData.born,
        joined: profileData.joined,
        gender: profileData.gender,
        nationality: profileData.nationality,
        pictureFilename: req.file?.filename,
    });

    res.json({
        message: 'Added user successfully',
        profile,
    });
    return;
}));

router.put('/:id', upload.single('picture'), [
    param('id')
        .isMongoId()
        .withMessage("Profile id must be provided."),
    body('displayName')
        .trim()
        .isLength({ min: 3, max: 128 })
        .withMessage("displayName must be provided with length [3, 128]"),
    body('gender')
        .trim()
        .toLowerCase()
        .isIn(['male', 'female'])
        .withMessage("gender only accepts Male, Female."),
    body('nationality')
        .trim()
        .isLength({ max: 128 }),
    body('bio')
        .trim()
        .isLength({ max: 1024 }),
    body('born')
        .optional()
        .isDate(),
], asyncHandler(async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.json({
            message: `Updating profile ${req.params.id} failed.`,
            error: result.array(),
        });
    }

    const userId = (req.user as any).id;
    if (!userId) {
        res.json({ message: "User does not exist!" });
        return;
    }

    console.log(req.file);
    const newProfile = {
        _id: userId,
        displayName: req.body.displayName,
        bio: req.body.bio,
        born: req.body.born,
        joined: req.body.joined,
        gender: req.body.gender,
        nationality: req.body.nationality,
        pictureFilename: req.file?.filename,
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
