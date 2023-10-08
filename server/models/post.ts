import { Schema, model } from "mongoose";
import Profile from './profile.js';


// TODO add files
const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', populateTo: 'user', required: true },
    file: { type: String },
    content: { type: String, required: true, minLength: 1, maxLength: 4096 },
    date: { type: Date, default: Date.now, required: true },
    loves: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
    }],
});

postSchema.set('toJSON', { virtuals: true });

export default model('Post', postSchema);
