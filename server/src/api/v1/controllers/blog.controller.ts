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
          path: "likes",
          select: "name email picture.url",
        },
        {
          path: "replies",
          populate: [
            {
              path: "user",
              select: "name email picture.url",
            },
            {
              path: "likes",
              select: "name email picture.url",
            },
          ],
        },
      ],
    })
    .populate({
      path: "likes",
      select: "name email picture.url",
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

// get 5 random blogs
export const getRandomBlogs = async (req: any, res: Response): Promise<any> => {
  try {
    const blogs = await Blog.aggregate([
      { $sample: { size: 5 } }, // Mengambil 5 data secara acak
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorData"
        }
      },
      {
        $unwind: "$authorData"
      },
      {
        $project: {
          title: 1,
          slug: 1,
          category: 1,
          createdAt: 1,
          "authorData.name": 1,
          "thumbnail.url": 1
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      message: "Random blogs fetched successfully",
      blogs
    });
  } catch (error) {
    console.error("Error in getRandomBlogs controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch random blogs"
    });
  }
};

export const getLatestAndPopularBlogs = async (req: any, res: Response): Promise<any> => {
  try {
    const latestBlogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorData"
        }
      },
      { $unwind: "$authorData" },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "commentsData"
        }
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
          commentsCount: {
            $sum: [
              { $size: "$comments" },
              {
                $sum: {
                  $map: {
                    input: "$commentsData",
                    as: "comment",
                    in: { $size: "$$comment.replies" }
                  }
                }
              }
            ]
          }
        }
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          title: 1,
          slug: 1,
          highlight: 1,
          "authorData.name": 1,
          "thumbnail.url": 1,
          likesCount: 1,
          views: 1,
          commentsCount: 1,
          createdAt: 1
        }
      }
    ]);

    const popularBlogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorData"
        }
      },
      { $unwind: "$authorData" },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "commentsData"
        }
      },
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
          commentsCount: {
            $sum: [
              { $size: { $ifNull: ["$comments", []] } }, // Pastikan comments adalah array
              {
                $sum: {
                  $map: {
                    input: { $ifNull: ["$commentsData", []] }, // Pastikan commentsData adalah array
                    as: "comment",
                    in: { $size: { $ifNull: ["$$comment.replies", []] } } // Pastikan replies adalah array
                  }
                }
              }
            ]
          }
        }
      },
      { $sort: { views: -1 } },
      { $limit: 5 },
      {
        $project: {
          title: 1,
          slug: 1,
          highlight: 1,
          "authorData.name": 1,
          "thumbnail.url": 1,
          likesCount: 1,
          views: 1,
          commentsCount: 1,
          createdAt: 1
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      message: "Latest and Popular blogs fetched successfully",
      latestBlogs,
      popularBlogs
    });
  } catch (error) {
    console.error("Error in getMultipleBlogSets controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs"
    });
  }
};

// get all blogs
export const getAllBlogs = async (req: any, res: Response): Promise<any> => {
  try {
    const { page = 1, limit = 10, search = "", category, sortBy = "createdAt", order = "desc" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions: any = {};
    sortOptions[sortBy] = order === "desc" ? -1 : 1;

    const match: any = {};
    if (search) {
      match.$or = [
        { title: { $regex: search, $options: "i" } },
        { highlight: { $regex: search, $options: "i" } },
        { "authorData.name": { $regex: search, $options: "i" } }
      ];
    }
    if (category) {
      match.category = category;
    }

    const blogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorData"
        }
      },
      {
        $unwind: "$authorData"
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "commentsData"
        }
      },
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
          commentsCount: {
            $sum: [
              { $size: { $ifNull: ["$comments", []] } }, // Pastikan comments adalah array
              {
                $sum: {
                  $map: {
                    input: { $ifNull: ["$commentsData", []] }, // Pastikan commentsData adalah array
                    as: "comment",
                    in: { $size: { $ifNull: ["$$comment.replies", []] } } // Pastikan replies adalah array
                  }
                }
              }
            ]
          }
        }
      },
      { $match: match },
      { $sort: sortOptions },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $project: {
          title: 1,
          slug: 1,
          highlight: 1,
          "authorData.name": 1,
          "thumbnail.url": 1,
          likesCount: 1,
          views: 1,
          commentsCount: 1,
          createdAt: 1
        }
      }
    ]);

    const totalBlogs = await Blog.countDocuments(match);
    
    return res.status(200).json({
      success: true,
      message: "All blogs fetched successfully",
      blogs,
      totalPages: Math.ceil(totalBlogs / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error("Error in getAllBlogs controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all blogs"
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

    blog.views += 1;
    await blog.save();

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

// like blog by slug online for logged in user
export const likeBlogBySlug = async (req: any, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;
    const { _id } = req.user;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.likes.includes(_id)) {
      return res.status(400).json({
        success: false,
        message: "Blog already liked",
      });
    }

    blog.likes.push(_id);
    await blog.save();

    const populatedBlog = await populateBlog(slug);

    return res.status(200).json({
      success: true,
      message: "Blog liked successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error in like blog by slug controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to like blog",
    });
  }
};

// unlike blog by slug online for logged in user
export const unlikeBlogBySlug = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const { slug } = req.params;
    const { _id } = req.user;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (!blog.likes.includes(_id)) {
      return res.status(400).json({
        success: false,
        message: "Blog not liked",
      });
    }

    blog.likes = blog.likes.filter((id) => id.toString() !== _id.toString());
    await blog.save();

    const populatedBlog = await populateBlog(slug);

    return res.status(200).json({
      success: true,
      message: "Blog unliked successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.log("Error in unlike blog by slug controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to unlike blog",
    });
  }
};

// delete blog by slug
export const deleteBlogBySlug = async (
  req: any,
  res: Response
): Promise<any> => {};
