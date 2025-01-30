import Reply from "../models/reply.model";
import Blog from "../models/blog.model";
import Comment from "../models/comment.model";
import { Response } from "express";
import { populateBlog } from "./blog.controller";

// create new reply
export const createReply = async (req: any, res: Response): Promise<any> => {
  try {
    const { commentId } = req.params;
    const { blogId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const reply = await Reply.create({
      comment: commentId,
      user: req.user._id,
      text,
    });

    comment.replies && comment.replies.push(reply._id);
    await comment.save();

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(201).json({
      success: true,
      message: "Reply created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error creating reply", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create reply" });
  }
};

// like a reply
export const likeReply = async (req: any, res: Response): Promise<any> => {
  try {
    const { replyId } = req.params;
    const { blogId } = req.params;

    const reply = await Reply.findById(replyId);

    if (!reply) {
      return res
        .status(404)
        .json({ success: false, message: "Reply not found" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (reply.likes.includes(req.user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "Reply already liked" });
    }

    reply.likes.push(req.user._id);
    await reply.save();

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(200).json({
      success: true,
      message: "Reply liked successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error liking reply", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to like reply" });
  }
};

// unlike a reply
export const unlikeReply = async (req: any, res: Response): Promise<any> => {
  try {
    const { replyId } = req.params;
    const { blogId } = req.params;
    const { _id } = req.user;

    const reply = await Reply.findById(replyId);

    if (!reply) {
      return res
        .status(404)
        .json({ success: false, message: "Reply not found" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (!reply.likes.includes(req.user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "Reply not liked yet" });
    }

    reply.likes = reply.likes.filter((id) => id.toString() !== _id.toString());
    await reply.save();

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(200).json({
      success: true,
      message: "Reply unliked successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error unliking reply", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to unlike reply" });
  }
};

// delete a reply
export const deleteReply = async (req: any, res: Response): Promise<any> => {
  try {
    const { replyId } = req.params;
    const { commentId } = req.params;
    const { blogId } = req.params;

    const reply = await Reply.findById(replyId);

    if (!reply) {
      return res
        .status(404)
        .json({ success: false, message: "Reply not found" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    comment.replies =
      comment.replies && comment.replies.filter((id) => id !== replyId);
    await comment.save();

    await Reply.findByIdAndDelete(replyId);

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(200).json({
      success: true,
      message: "Reply deleted successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error deleting reply", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete reply" });
  }
};
