import express from 'express';
const router = express.Router();

import { createReply, likeReply, unlikeReply, deleteReply } from '../controllers/reply.controller';
import { checkAuthAndRefreshToken } from '../../../middlewares/checkAuthAndRefreshToken';

router.post('/:blogId/:commentId', checkAuthAndRefreshToken, createReply);
router.get('/like/:blogId/:replyId', checkAuthAndRefreshToken, likeReply);
router.get('/unlike/:blogId/:replyId', checkAuthAndRefreshToken, unlikeReply);
router.delete('/:blogId/:commentId/:replyId', checkAuthAndRefreshToken, deleteReply);

export default router;