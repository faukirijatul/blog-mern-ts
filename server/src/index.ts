import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser"
import cors from "cors";
import connectDB from "./config/database";
import bodyParser = require("body-parser");

dotenv.config();
connectDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.get("/test", (req: Request, res : Response) => {
    res.send("Hello from the server!");
});

const API_V1 = "/api/v1";

import userRoutes from "./api/v1/routes/user.route";
import blogRoutes from "./api/v1/routes/blog.route";
import commentRoutes from "./api/v1/routes/comment.route";
import replyRoutes from "./api/v1/routes/reply.route";
import statisticRoutes from "./api/v1/routes/statistic.route";
import bannerRoutes from "./api/v1/routes/banner.route";

app.use(`${API_V1}/users`, userRoutes);
app.use(`${API_V1}/blogs`, blogRoutes);
app.use(`${API_V1}/comments`, commentRoutes);
app.use(`${API_V1}/replies`, replyRoutes);
app.use(`${API_V1}/statistics`, statisticRoutes);
app.use(`${API_V1}/banners`, bannerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});