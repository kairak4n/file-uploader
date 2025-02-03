import express from 'express'
import { authSignUpPost, authLoginPost, authSignUpGet, authLoginGet } from './authController';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user)
    res.render('index', {
        user: req.user,
    })
})
    
router.get('/login', authSignUpGet)

router.post('/login', authLoginPost)

router.get('/sign-up', authLoginGet)

router.post('/sign-up', authSignUpPost)

export default router;