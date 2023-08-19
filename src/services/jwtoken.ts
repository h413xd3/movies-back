import jwt from 'jsonwebtoken';
import { TokenPayload } from '../utils/payload';

export const generateToken = (payload: TokenPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}