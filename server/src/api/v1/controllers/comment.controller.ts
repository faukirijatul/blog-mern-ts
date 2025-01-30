import { Response } from "express";
import Comment from "../models/comment.model";
import Blog from "../models/blog.model";
import User from "../models/user.model";
import { populateBlog } from "./blog.controller";
import Reply from "../models/reply.model";

export const createComment = async (req: any, res: Response): Promise<any> => {
  try {
    const { blogId } = req.params;
    const { text } = req.body;
    const { _id } = req.user;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    if (!text) {
      return res.status(400).send({ message: "Text is required" });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const comment = new Comment({
      blog: blogId,
      user: req.user._id,
      text,
    });

    user.statistic.totalComments += 1;
    await user.save();

    blog.comments && blog.comments.push(comment._id);
    await blog.save();

    await comment.save();

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error creating comment", error);
    return res.status(400).json({
      success: false,
      message: "Failed to create comment",
    });
  }
};

// like comment
export const likeComment = async (req: any, res: Response): Promise<any> => {
  try {
    const { commentId } = req.params;
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    comment.likes.push(req.user._id);
    await comment.save();

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(200).json({
      success: true,
      message: "Comment liked successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error liking comment", error);
    return res.status(400).json({
      success: false,
      message: "Failed to like comment",
    });
  }
};

// unlike comment
export const unlikeComment = async (req: any, res: Response): Promise<any> => {
  try {
    const { commentId } = req.params;
    const { blogId } = req.params;
    const { _id } = req.user;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    comment.likes = comment.likes.filter((like) => like.toString() !== _id.toString());
    await comment.save();

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(200).json({
      success: true,
      message: "Comment unliked successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error unliking comment", error);
    return res.status(400).json({
      success: false,
      message: "Failed to unlike comment",
    });
  }
};

// delete comment
export const deleteComment = async (req: any, res: Response): Promise<any> => {
  try {
    const { commentId } = req.params;
    const { blogId } = req.params;
    const { _id } = req.user;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (comment.user.toString() !== _id.toString()) {
      return res
        .status(401)
        .send({ message: "You are not authorized to delete this comment" });
    }

    user.statistic.totalComments -= 1;
    await user.save();

    await Reply.deleteMany({ comment: commentId });

    await Comment.findByIdAndDelete(commentId);

    blog.comments =
      blog.comments && blog.comments.filter((c) => c.toString() !== commentId);
    await blog.save();

    const populatedBlog = await populateBlog(blog.slug);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error deleting comment", error);
    return res.status(400).json({
      success: false,
      message: "Failed to delete comment",
    });
  }
};
