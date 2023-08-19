import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    email: String,
    password: String,
});

export const User = mongoose.model<IUser>('User', userSchema);