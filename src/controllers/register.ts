import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as joi from 'joi';
import { User } from '../models/user';

export const registerController: express.RequestHandler = async (request, response) => {
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

    const user = await User.findOne({ email });

    if (user) {
        return response.status(400).json({
            error: {
                name: 'UserExists',
                message: 'User already exists',
            },
        });
    }

    const newUser = new User({
        email,
        password: await bcrypt.hash(password, 11),
    });

    await newUser.save();

    return response.status(201).json({
        id: newUser._id,
        email: newUser.email,
    });
};