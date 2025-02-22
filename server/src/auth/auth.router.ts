import express from 'express'
import { authSignUpPost, authLoginPost, authSignUpGet, authLoginGet } from './auth.controller';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Hello world')
})
    
router.get('/login', authLoginGet)

router.post('/login', authLoginPost)

router.get('/sign-up', authSignUpGet)

router.post('/sign-up', authSignUpPost)

export default router;