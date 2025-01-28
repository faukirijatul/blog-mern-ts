import express from "express";
import { createBlog, getBlogBySlug, updateBlogBySlug } from "../controllers/blog.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

const route = express.Router();

route.post("/", checkAuthAndRefreshToken, createBlog);
route.get("/:slug", getBlogBySlug);
route.put("/:slug", checkAuthAndRefreshToken, updateBlogBySlug);

export default route;