import * as express from 'express';
import { verifyToken } from '../services/jwtoken';
import { TokenPayload } from '../utils/payload';


const invalidToken = {
    error: {
        name: 'Unauthorized',
        message: 'Invalid token',
    },
};

export const authenticated: express.RequestHandler = (request, response, next) => {
    const authorization = request.headers.authorization;

    if (!authorization) {
        return response.status(401).json(invalidToken);
    }

    const [_, token] = authorization.split(' ');

    if (!token) {
        return response.status(401).json(invalidToken);
    }

    let payload;
    
    try {
        payload = verifyToken(token);
    } catch (error) {
        return response.status(401).json(invalidToken);
    }

    if (!payload) {
        return response.status(401).json(invalidToken);
    }

    (request as any).user = {
        id: (payload as TokenPayload).id,
    };

    return next();
};