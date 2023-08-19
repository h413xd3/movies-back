import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IMovie extends Document {
    _id: string;
    title: string;
    year: number;
    rating: number;
    user: string;
}

const movieSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    title: String,
    year: Number,
    rating: Number,
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
});

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);