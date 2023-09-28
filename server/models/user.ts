import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [1, "Username must be at least of length 1"],
        maxLength: [256, "Username must of length 256 at maximum"],
    },
    salt: { type: String, required: true },
    hash: { type: Buffer, required: true },
    refreshToken: {
        type: String,
    },
});

export default model('User', userSchema);
