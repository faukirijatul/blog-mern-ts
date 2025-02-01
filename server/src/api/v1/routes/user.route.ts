import express from "express";
import { getAllUsers, getCurrentUser, updateUser, login, logout, saveBlog, unsaveBlog, getUserSavedBlogs } from "../controllers/user.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

const route = express.Router();

route.get("/", getAllUsers);
route.post("/login", login); // done
route.get("/user", checkAuthAndRefreshToken, getCurrentUser); // done
route.post("/logout", logout); // done
route.put("/", checkAuthAndRefreshToken, updateUser);
route.get("/save/:blogId", checkAuthAndRefreshToken, saveBlog); // done
route.get("/unsave/:blogId", checkAuthAndRefreshToken, unsaveBlog); // done
route.post("/saved-blogs", checkAuthAndRefreshToken, getUserSavedBlogs);

export default route;