import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import User from "../api/v1/models/user.model";
import { setTokenCookie } from "../utils/setTokenCookie";
import { NextFunction, Response } from "express";

export const checkAuthAndRefreshToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken && !token) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as Secret
      ) as JwtPayload;
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }
  } else {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_TOKEN as Secret
      ) as JwtPayload;

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "5m",
        }
      );

      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 5 * 60 * 1000, // 5 minutes
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });

      return next();
    } catch (error) {
      console.log("Error in checkAuthAndRefreshToken: ", error);
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }
  }
};
