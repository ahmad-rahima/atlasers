import { Schema, model } from 'mongoose';


export const ProfileToProfile = model('ProfilesToProfiles', new Schema({
    follower: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    following: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
}));


const profileSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User', populateTo: 'user' },
    displayName: { type: String, required: true },
    bio: {
        type: String,
        maxLength: [512, "User bio must be 512 at maximum."]
    },
    born: Date,
    joined: { type: Date, default: Date.now, required: true },
    gender: {
        type: String,
        enum: { values: ['male', 'female'], message: '{VALUE} is not supported' },
    },
    pictureFilename: { type: String },
    nationality: String,
});


profileSchema.static({
    getFollowers: function(id: string) {
        return ProfileToProfile.find({ follower: id }).populate('following');
    },
    getFollowings: function(id: string) {
        return ProfileToProfile.find({ following: id }).populate('follower');
    }
});

profileSchema.virtual('picturePath').get(function() {
    return `profile-pictures/${this.pictureFilename}`;
});

profileSchema.set('toJSON', {
    virtuals: true,
    transform: (_doc, ret) => {
        delete ret.pictureFilename;
    }
});

profileSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: '_id',
    justOne: true,
});


export default model('Profile', profileSchema);
