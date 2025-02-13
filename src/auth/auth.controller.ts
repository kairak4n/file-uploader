import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';

const prisma = new PrismaClient()

export function authSignUpGet(req: any, res: any) {
    res.render('sign-up')
}

export async function authSignUpPost(req: any, res: any) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        await prisma.user.create({
            data: {
                username: req.body.username,
                password: hash,
            }
        })
        res.redirect('/');
    } catch (err) {
        console.error(err)
        res.status(500).send('internal')
    } finally {
        prisma.$disconnect()
    }
}

export function authLoginGet(req: any, res: any) {
    res.render('login')
}

export function authLoginPost(req: any, res: any) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
    })(req, res)
}