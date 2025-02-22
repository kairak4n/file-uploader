import express from 'express';
import { filesUploadGet, filesUploadPost } from './files.controller';

const router = express.Router()

router.get('/files/upload', filesUploadGet);
router.post('/files/upload', filesUploadPost)

export default router;