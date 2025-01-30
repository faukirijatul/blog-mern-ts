import express from "express";
const route = express.Router();

import { createBanner, getAllBanners, deleteBanner, getRandomBanners } from "../controllers/banner.controller";
import { checkAuthAndRefreshToken } from "../../../middlewares/checkAuthAndRefreshToken";

route.post("/", checkAuthAndRefreshToken, createBanner); // done
route.get("/", getAllBanners); // done
route.delete("/:bannerId", checkAuthAndRefreshToken, deleteBanner); // done
route.get("/random", getRandomBanners);

export default route;
