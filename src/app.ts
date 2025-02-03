import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'node:path';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import authRouter from './auth/auth.router';
import fileRouter from './routes/file';
import passport from 'passport';
import localStrategy from './auth/strategies/local'
require('dotenv').config()

const app = express()
const prisma = new PrismaClient()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(session({
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days 
    },
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    ),
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(localStrategy)

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        done(null, user)
    } catch(err) {
        done(err)
    }
})

app.use(authRouter)
app.use(fileRouter)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))