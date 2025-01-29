import express from "express";
import { createBlog, getRandomBlogs, getBlogBySlug, updateBlogBySlug, likeBlogBySlug, unlikeBlogBySlug } from "../controllers/blog.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

const route = express.Router();

route.post("/", checkAuthAndRefreshToken, createBlog); // done
route.get("/random", getRandomBlogs); // done
route.get("/:slug", getBlogBySlug); // done
route.put("/:slug", checkAuthAndRefreshToken, updateBlogBySlug); // done
route.get("/like/:slug", checkAuthAndRefreshToken, likeBlogBySlug); // done
route.get("/unlike/:slug", checkAuthAndRefreshToken, unlikeBlogBySlug); // done

export default route;