import { Route } from './utils/route';
import { registerController } from './controllers/register';
import { loginController } from './controllers/login';
import { getMoviesController } from './controllers/movies/get-movies';
import { authenticated } from './middlewares/authenticated';
import { createMovieController } from './controllers/movies/create-movie';
import { deleteMovieController } from './controllers/movies/delete-movie';

export const routes: Route[] = [
    {
        method: 'post',
        path: '/register',
        controller: registerController,
    },
    {
        method: 'post',
        path: '/login',
        controller: loginController,
    },
    {
        method: 'get',
        path: '/movies',
        middlewares: [authenticated],
        controller: getMoviesController,
    },
    {
        method: 'post',
        path: '/movies',
        middlewares: [authenticated],
        controller: createMovieController,
    },
    {
        method: 'delete',
        path: '/movies/:id',
        middlewares: [authenticated],
        controller: deleteMovieController,
    },
];