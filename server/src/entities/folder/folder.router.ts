import express from 'express';
import { folderCreateGet, folderCreatePost } from './folder.controller';

const router = express.Router();

router.get('/folder/create', folderCreateGet)
router.post('/folder/create', folderCreatePost)

export default router