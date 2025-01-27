import { Response } from "express";
import { uploadImage, deleteImage } from "../../../config/cloudinary";
import Blog from "../models/blog.model";
import "../models/comment.model";
import "../models/reply.model";
import "../models/user.model";

export const populateBlog = async (slug: string) => {
  return await Blog.findOne({ slug })
    .populate({
      path: "author",
      select: "name email picture.url",
    })
    .populate({
      path: "comments",
      populate: [
        {
          path: "user",
          select: "name email picture.url",
        },
        {
          path: "replies",
          populate: {
            path: "user",
            select: "name email picture.url",
          },
        },
      ],
    });
};

interface IBlogData {
  title: string;
  content: string;
  highlight: string;
  category: string;
  author: string;
  thumbnail?: {
    url: string;
    public_id: string;
  };
}

export const createBlog = async (req: any, res: Response): Promise<any> => {
  try {
    const { thumbnail, title, content, highlight, category } = req.body;

    // Upload thumbnail
    let uploadResult;
    try {
      uploadResult = await uploadImage(thumbnail, "almuhsiny/blog/thumbnails");
    } catch (err) {
      console.error("Error during image upload:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to upload thumbnail",
      });
    }

    // Create blog data
    const blogData: IBlogData = {
      title,
      content,
      highlight,
      category,
      author: req.user._id,
      thumbnail: {
        url: uploadResult ? uploadResult.secure_url : "",
        public_id: uploadResult ? uploadResult.public_id : "",
      },
    };

    // Create and populate blog
    let newBlog;
    try {
      newBlog = await Blog.create(blogData);
    } catch (err) {
      console.error("Error during blog creation:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to create blog",
      });
    }

    let populatedBlog;
    try {
      populatedBlog = await populateBlog(newBlog.slug);
    } catch (err) {
      console.error("Error during blog population:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to populate blog",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Error in create blog controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

// get blog by slug
export const getBlogBySlug = async (req: any, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;

    const blog = await populateBlog(slug);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.log("Error in get blog by slug controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get blog",
    });
  }
};

// update blog by slug
export const updateBlogBySlug = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const { slug } = req.params;
    const { title, content, highlight, category, thumbnail } = req.body;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (thumbnail) {
      // Delete old thumbnail
      if (blog.thumbnail.public_id) {
        try {
          await deleteImage(blog.thumbnail.public_id);
        } catch (err) {
          console.error("Error during thumbnail deletion:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to delete thumbnail",
          });
        }
      }

      // Upload new thumbnail
      let uploadResult;
      try {
        uploadResult = await uploadImage(
          thumbnail,
          "almuhsiny/blog/thumbnails"
        );
      } catch (err) {
        console.error("Error during image upload:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to upload thumbnail",
        });
      }

      blog.thumbnail = {
        url: uploadResult ? uploadResult.secure_url : "",
        public_id: uploadResult ? uploadResult.public_id : "",
      };
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.highlight = highlight || blog.highlight;
    blog.category = category || blog.category;

    try {
      const updatedBlog = await blog.save();
      const populatedBlog = await populateBlog(updatedBlog.slug);
      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog: populatedBlog,
      });
    } catch (err) {
      console.error("Error during blog update:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update blog",
      });
    }
  } catch (error) {
    console.error("Error in update blog by slug controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};
