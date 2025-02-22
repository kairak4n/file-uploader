import { isAuth } from '../../auth/auth.middleware'
import multer from 'multer';
import { createFile } from '../entities.helpers';

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
    async (req: any, res: any) => {
        const file = req.file;
        const filename = req.body.filename;
        await createFile(
            filename,
            file.mimetype,
            file.size,
            file.path,
            req.user.id,
            null
        )
        res.redirect('/')
    }
]