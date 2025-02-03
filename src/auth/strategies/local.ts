import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
const LocalStrategy = require('passport-local').Strategy;
const prisma = new PrismaClient()

const strategy = new LocalStrategy(async (username: string, password: string, done: any) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (!user) {
            return done(null, false, { message: "Username is incorrect" })
        }
        const match = await bcrypt.compare(password, user.password)
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

export default strategy;