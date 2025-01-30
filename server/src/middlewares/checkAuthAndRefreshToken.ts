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
      message: "Unauthorized",
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
        message: "Unauthorized",
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
      setTokenCookie(req.user, res);
      return next();
    } catch (error) {
      console.log("Error in checkAuthAndRefreshToken: ", error);
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  }
};
