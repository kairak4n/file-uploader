import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'node:path';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import prisma from './database/prismaClient'
import authRouter from './auth/auth.router';
import filesRouter from './entities/files/files.router'
import userRouter from './entities/user/user.router'
import folderRouter from './entities/folder/folder.router'
import passport from 'passport';
import localStrategy from './auth/strategies/local'
import cors from 'cors';
require('dotenv').config()

const app = express()
const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'))

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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

// app.use(authRouter)
// app.use(filesRouter)
// app.use("/user", userRouter)
// app.use(folderRouter)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))