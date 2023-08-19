import * as express from 'express';
import { Movie } from '../../models/movie';

export const getMoviesController: express.RequestHandler = async (request, response) => {
    const { user } = request as any;

    const movies = await Movie.find({ user: user.id });
    
    return response.status(200).json({
        items: movies,
    });
}