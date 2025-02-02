import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'node:path';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

require('dotenv').config()

const app = express()

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

app.get("/", (req: Request, res: Response) => {
    res.send('you made it in')
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))