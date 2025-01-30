import { Response } from "express";
import Blog from "./../models/blog.model";
import User from "./../models/user.model";
import Visit from "../models/visit.model";
import Comment from "../models/comment.model";

export const addVisit = async (req: any, res: Response): Promise<any> => {
  try {
    let visit = await Visit.findOne();
    if (visit) {
      visit.totalVisits += 1;
      await visit.save();
    } else {
      visit = await Visit.create({
        totalVisits: 1,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Visit added successfully",
      totalVisits: visit.totalVisits,
    });
  } catch (error) {
    console.log("Error in add visit controller: ", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to add visit",
      });
    }
  }
};

export const getAllStatistics = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalUsers = await User.countDocuments();

    const blogs = await Blog.find({}, "views likes");

    let totalViews = 0;
    let totalLikes = 0;

    blogs.forEach((blog) => {
      totalViews += blog.views || 0;
      totalLikes += blog.likes ? blog.likes.length : 0;
    });

    const comments = await Comment.find({}, "replies");
    let totalComments = comments.length;

    comments.forEach((comment) => {
      totalComments += comment.replies ? comment.replies.length : 0;
    });

    const visitData = await Visit.findOne();
    const totalVisits = visitData ? visitData.totalVisits : 0;

    return res.json({
      success: true,
      data: {
        totalBlogs,
        totalUsers,
        totalViews,
        totalLikes,
        totalComments,
        totalVisits,
      },
    });
  } catch (error) {
    console.log("Error in get all statistics controller: ", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to get statistics",
      });
    }
  }
};

export const getLatestUsersAndBlogs = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name email createdAt");

    const latestBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author", "name")
      .select("title category createdAt author");

    return res.json({
      success: true,
      latestUsers,
      latestBlogs,
    });
  } catch (error) {
    console.error("Error fetching latest users and blogs:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
