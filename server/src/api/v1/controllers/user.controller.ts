import { deleteTokenCookie } from "../../../utils/deleteTokenCookie";
import { setTokenCookie } from "../../../utils/setTokenCookie";
import User from "../models/user.model";

interface ILoginData {
  name: string;
  email: string;
  picture: string;
}

export const login = async (req: any, res: any) => {
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

export const getCurrentUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in get current user controller: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to get current user",
    });
  }
};

export const logout = async (req: any, res: any) => {
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

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log("Error in get all users controller: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};
