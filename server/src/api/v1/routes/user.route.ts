import express from "express";
import { getAllUsers, getCurrentUser, login, logout, saveBlog, unsaveBlog } from "../controllers/user.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

const route = express.Router();

route.get("/", getAllUsers);
route.post("/login", login); // done
route.get("/user", checkAuthAndRefreshToken, getCurrentUser); // done
route.get("/logout", logout); // done
route.get("/save/:blogId", checkAuthAndRefreshToken, saveBlog); // done
route.get("/unsave/:blogId", checkAuthAndRefreshToken, unsaveBlog); // done

export default route;