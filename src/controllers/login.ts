import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as joi from 'joi';
import { User } from '../models/user';
import { generateToken } from '../services/jwtoken';

export const loginController: express.RequestHandler = async (request, response) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
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
    
    const { email, password } = request.body;

    const user = await User.findOne({ email: request.body.email });

    if (!user) {
        return response.status(400).json({
            error: {
                name: 'UserNotFound',
                message: 'User not found',
            },
        });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return response.status(400).json({
            error: {
                name: 'IncorrectPassword',
                message: 'Incorrect password',
            },
        });
    }

    return response.status(200).json({ 
        token: generateToken({ id: user._id }),
    });
};