import { Response } from "express";
import { IUser } from "../api/v1/models/user.model";
import jwt from "jsonwebtoken";

export const setTokenCookie = (user: IUser, res: Response) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "5m",
    });
  
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_REFRESH_TOKEN as string,
      {
        expiresIn: "30d",
      }
    );
  
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 5 * 60 * 1000, // 5 minutes
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 24 * 60 * 1000, // 30 days
      expires: new Date(Date.now() + 30 * 60 * 24 * 60 * 1000),
    });
  
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
    });
  };