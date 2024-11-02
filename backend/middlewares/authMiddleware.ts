import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';

const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
         res.status(401).json({ message: 'Unauthorized' });
         return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.userId = (decoded as any).userId;
        next();
    });
};
