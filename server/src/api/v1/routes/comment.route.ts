import express from "express";
const router = express.Router();

import { createComment, likeComment, unlikeComment, deleteComment } from "../controllers/comment.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

router.post("/:blogId", checkAuthAndRefreshToken, createComment);
router.get("/like/:blogId/:commentId", checkAuthAndRefreshToken, likeComment);
router.get("/unlike/:blogId/:commentId", checkAuthAndRefreshToken, unlikeComment);
router.delete("/:blogId/:commentId", checkAuthAndRefreshToken, deleteComment);

export default router;