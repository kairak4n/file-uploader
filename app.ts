import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'node:path';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth'
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()
import bcrypt from 'bcryptjs'

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
passport.use(
    new LocalStrategy(async (username: string, password: string, done: any) => {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    username
                }
            })
            if (!user) {
                return done(null, false, { message: "Username is incorrect" })
            }
            const match = bcrypt.compare(password, user.password)
            if (!match) {
                return done(null, false, { message: "Password is incorrect" })
            }
            return done(null, user)
        } catch(e) {
            return done(e)
        } finally {
            prisma.$disconnect()
        }
    })
)

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

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))