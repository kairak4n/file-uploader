import { isAuth } from '../auth/auth.middleware'
import multer from 'multer';

const upload = multer({ dest: './uploads' })

export const filesUploadGet = [
    isAuth,
    (req: any, res: any) => {
        res.render('upload-file')
    }
]

export const filesUploadPost = [
    isAuth,
    upload.single('file'),
    (req: any, res: any) => {
        const file = req.body.file;
        res.send('')
    }
]