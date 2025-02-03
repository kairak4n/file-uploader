import { NextFunction } from "express";

export const isAuth = (req: any, res: any, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({ message: 'Unauthenticated' });
    }
}
