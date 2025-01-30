import { deleteTokenCookie } from "../../../utils/deleteTokenCookie";
import { setTokenCookie } from "../../../utils/setTokenCookie";
import User from "../models/user.model";
import Blog from "../models/blog.model";
import { Response } from "express";

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
        message: "User not found" 
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

export const getAllUsers = async (req: any, res: Response): Promise<any>  => {
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
    });
  } catch (error) {
    console.log("Error in save blog controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save blog",
    });
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

    user.savedBlogs = user.savedBlogs.filter((id) => id.toString() !== blogId.toString());
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Blog unsaved successfully",
      user,
    });
  } catch (error) {
    console.log("Error in unsave blog controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to unsave blog",
    });
  }
};
