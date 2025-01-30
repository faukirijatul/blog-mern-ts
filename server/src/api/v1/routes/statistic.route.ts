import express from "express";
const router = express.Router();
import {addVisit, getAllStatistics, getLatestUsersAndBlogs } from "../controllers/statistic.controller";

router.get("/add-visit", addVisit);
router.get("/", getAllStatistics);
router.get("/latest-users-and-blogs", getLatestUsersAndBlogs);

export default router;