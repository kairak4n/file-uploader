import express from 'express'
import { userFilesGet } from './user.controller';

const router = express.Router()

router.get('/:userId/files', userFilesGet);

export default router;