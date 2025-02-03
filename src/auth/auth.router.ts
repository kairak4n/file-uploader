import express from 'express'
import { authSignUpPost, authLoginPost, authSignUpGet, authLoginGet } from './auth.controller';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user)
    res.render('index', {
        user: req.user,
    })
})
    
router.get('/login', authLoginGet)

router.post('/login', authLoginPost)

router.get('/sign-up', authSignUpGet)

router.post('/sign-up', authSignUpPost)

export default router;