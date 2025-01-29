import express from "express";
import { createBlog, getRandomBlogs, getLatestAndPopularBlogs, getAllBlogs, getBlogBySlug, updateBlogBySlug, likeBlogBySlug, unlikeBlogBySlug } from "../controllers/blog.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

const route = express.Router();

route.post("/", checkAuthAndRefreshToken, createBlog); // done
route.get("/random", getRandomBlogs); // done
route.get("/latest-and-popular", getLatestAndPopularBlogs);
route.get("/", getAllBlogs);
route.get("/:slug", getBlogBySlug); // done
route.put("/:slug", checkAuthAndRefreshToken, updateBlogBySlug); // done
route.get("/like/:slug", checkAuthAndRefreshToken, likeBlogBySlug); // done
route.get("/unlike/:slug", checkAuthAndRefreshToken, unlikeBlogBySlug); // done

export default route;