import express from 'express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; 
import passport from 'passport';

const router = express.Router();
const prisma = new PrismaClient()

router.get('/', (req, res) => {
    console.log(req.user)
    res.render('index', {
        user: req.user,
    })
})
    
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
}))

router.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

router.post('/sign-up',async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);
        await prisma.user.create({
            data: {
                username: req.body.username,
                password: hash,
            }
        })
        res.redirect('/')
    } catch (e) {
        console.error(e)
        res.status(500).send('internal')
    } finally {
        await prisma.$disconnect
    }
})

export default router;