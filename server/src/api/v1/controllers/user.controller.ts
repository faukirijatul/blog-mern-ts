import { deleteTokenCookie } from "../../../utils/deleteTokenCookie";
import { setTokenCookie } from "../../../utils/setTokenCookie";
import User from "../models/user.model";
import Blog from "../models/blog.model";
import { Response } from "express";
import { deleteImage, uploadImage } from "../../../config/cloudinary";

interface ILoginData {
  name: string;
  email: string;
  picture: string;
}

export const login = async (req: any, res: Response): Promise<any> => {
  try {
    const { name, email, picture } = req.body as ILoginData;

    if (!email || !name || !picture) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, name and picture",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.picture && user.picture.url && !user.picture.public_id) {
        user.picture.url = picture;
        user.save();
      }
      setTokenCookie(user, res);
    } else {
      const newUser = await User.create({
        name,
        email,
        picture: {
          url: picture,
        },
      });

      user = newUser;
      setTokenCookie(user, res);
    }
  } catch (error) {
    console.log("Error in google login controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const getCurrentUser = async (req: any, res: any): Promise<any> => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in get current user controller: ", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to get current user",
      });
    }
  }
};

export const logout = async (req: any, res: Response): Promise<any> => {
  try {
    deleteTokenCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Error in logout controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const getAllUsers = async (req: any, res: Response): Promise<any> => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log("Error in get all users controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

// update user (name and picture) with coludinary
export const updateUser = async (req: any, res: Response): Promise<any> => {
  try {
    const { name, picture } = req.body;

    console.log(req.body);

    const { _id } = req.user;

    if (!name && !picture) {
      return res.status(400).json({
        success: false,
        message: "Please provide name or picture",
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) {
      user.name = name;
    }

    if (picture) {
      if (user.picture && user.picture.public_id) {
        await deleteImage(user.picture.public_id);
      }

      const result = await uploadImage(picture, "almuhsiny/blog/pictures");

      user.picture = {
        url: result ? result.secure_url : "",
        public_id: result ? result.public_id : "",
      };
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log("Error in update user controller: ", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to update user",
      });
    }
  }
};

// save blog by user
export const saveBlog = async (req: any, res: Response): Promise<any> => {
  try {
    const { blogId } = req.params;
    const { _id } = req.user;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.savedBlogs && user.savedBlogs.includes(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Blog already saved",
      });
    }

    blog.saves += 1;
    await blog.save();

    user.savedBlogs && user.savedBlogs.push(blogId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Blog saved successfully",
      user,
      blog,
    });
  } catch (error) {
    console.log("Error in save blog controller: ", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to save blog",
      });
    }
  }
};

// unsave blog by user
export const unsaveBlog = async (req: any, res: Response): Promise<any> => {
  try {
    const { blogId } = req.params;
    const { _id } = req.user;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.savedBlogs || !user.savedBlogs.includes(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Blog not saved",
      });
    }

    blog.saves -= 1;
    await blog.save();

    user.savedBlogs = user.savedBlogs.filter(
      (id) => id.toString() !== blogId.toString()
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Blog unsaved successfully",
      user,
      blog,
    });
  } catch (error) {
    console.log("Error in unsave blog controller: ", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to unsave blog",
      });
    }
  }
};

// get user saved blogs
export const getUserSavedBlogs = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const { blogIds } = req.body;

    if (!Array.isArray(blogIds) || blogIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog IDs",
      });
    }

    const blogs = await Blog.find({ _id: { $in: blogIds } }).select(
      "title thumbnail.url highlight slug"
    );

    return res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
