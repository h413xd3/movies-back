import * as express from 'express';
import * as joi from 'joi';
import { Movie } from '../../models/movie';

export const createMovieController: express.RequestHandler = async (request, response) => {
    const schema = joi.object({
        title: joi.string().required(),
        year: joi.number().required(),
        rating: joi.number().required(),
    });

    const { error } = schema.validate(request.body);

    if (error) {
        return response.status(400).json({
            error: {
                name: 'ValidationError',
                message: error.message,
            },
        });
    }
    
    const { user } = request as any;

    const movie = new Movie({
        ...request.body,
        user: user.id,
    });

    await movie.save();

    return response.status(201).json(movie);
}
