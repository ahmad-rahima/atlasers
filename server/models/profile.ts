import { Schema, model } from 'mongoose';


const profileSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User', populateTo: 'user' },
    bio: {
        type: String,
        maxLength: [512, "User bio must be 512 at maximum."]
    },
    born: Date,
    joined: Date,
    gender: {
        type: String,
        enum: { values: ['Male', 'Female'], message: '{VALUE} is not supported' },
    },
    nationality: String,
    // Following: Number,
    // Followers: Number,
});

profileSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: '_id',
    justOne: true,
});


export default model('Profile', profileSchema);
