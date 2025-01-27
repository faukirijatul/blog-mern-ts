import express from "express";
import { createBlog, getBlogBySlug, updateBlogBySlug } from "../controllers/blog.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const route = express.Router();

route.post("/", checkAuthAndRefreshToken, upload.single("thumbnail"), createBlog);
route.get("/:slug", getBlogBySlug);
route.put("/:slug", checkAuthAndRefreshToken, upload.single("thumbnail"), updateBlogBySlug);

export default route;