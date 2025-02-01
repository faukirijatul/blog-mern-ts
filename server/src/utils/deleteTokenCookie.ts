import { Response } from "express";

export const deleteTokenCookie = (res: Response): void => {
  //   res.cookie("token", "", {
  //     httpOnly: process.env.NODE_ENV === "production",
  //     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //     secure: process.env.NODE_ENV === "production",
  //     expires: new Date(0),
  //   });

  res.clearCookie("token", {
    httpOnly: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.clearCookie("refreshToken", {
    httpOnly: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  //   res.cookie("refreshToken", "", {
  //     httpOnly: process.env.NODE_ENV === "production",
  //     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //     secure: process.env.NODE_ENV === "production",
  //     expires: new Date(0),
  //   });

  //   res.clearCookie("refreshToken");
};
