import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

dotenv.config();

import './database';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, route.middlewares || [], route.controller);
    console.log(`Route ${route.method.toUpperCase()} ${route.path} registered`);
});

app.listen(PORT, () => {
    console.log('Port:', PORT);
});