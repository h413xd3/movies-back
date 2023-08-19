import * as express from 'express';
import { Movie } from '../../models/movie';

export const deleteMovieController: express.RequestHandler = async (request, response) => {
    const { user } = request as any;

    const { id } = request.params;

    const movie = await Movie.findOne({ _id: id, user: user.id });

    if (!movie) {
        return response.status(404).json({
            error: {
                name: 'NotFoundError',
                message: 'Movie not found',
            },
        });
    }

    await movie.deleteOne();

    return response.status(204).send();
}
