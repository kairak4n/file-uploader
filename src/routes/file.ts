import express from 'express'
import multer from 'multer';
import { isAuth } from '../auth/authMiddleware'
const upload = multer({ dest: './uploads' })

const router = express.Router()

router.get('/file/upload', isAuth, (req, res) => {
    res.render('upload-file')
})

router.post('/file/upload', isAuth, upload.single('file'), (req, res) => {
    const file = req.body.file;
    res.send('')
})

export default router;