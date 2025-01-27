import express from "express";
import { getAllUsers, getCurrentUser, login, logout } from "../controllers/user.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

const route = express.Router();

route.get("/", getAllUsers);
route.post("/login", login);
route.get("/user", checkAuthAndRefreshToken, getCurrentUser);
route.get("/logout", logout);

export default route;