import { Response } from "express";
import { deleteImage, uploadImage } from "../../../config/cloudinary";
import Banner from "../models/banner.model";

export const createBanner = async (req: any, res: Response): Promise<any> => {
  try {
    const { title, link, image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await uploadImage(image, "almuhsiny/banners");

    const bannerData = {
      title,
      link,
      image: {
        url: result && result.secure_url,
        public_id: result && result.public_id,
      },
    };

    const banner = await Banner.create(bannerData);

    return res
      .status(201)
      .json({ success: true, message: "Banner created successfully", banner });
  } catch (error) {
    console.error("Error creating banner:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create banner" });
    }
  }
};

// delete banner
export const deleteBanner = async (req: any, res: Response): Promise<any> => {
  try {
    const { bannerId } = req.params;

    const banner = await Banner.findById(bannerId);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await deleteImage(banner.image.public_id);

    await Banner.findByIdAndDelete(bannerId);

    return res
      .status(200)
      .json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete banner" });
    }
  }
};

// get all
export const getAllBanners = async (req: any, res: Response): Promise<any> => {
  try {
    const banners = await Banner.find();
    return res.status(200).json({ success: true, banners });
  } catch (error) {
    console.error("Error getting all banners:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to get all" });
    }
  }
};

// get random
export const getRandomBanners = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const banners = await Banner.find();

    if (banners.length === 0) {
      return res.status(404).json({ message: "Tidak ada banner tersedia" });
    }

    // Fungsi untuk mengambil elemen acak dari array
    const getRandomItems = <T>(arr: T[], num: number): T[] => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };

    // Ambil 2 banner acak (jika ada minimal 2 banner)
    const randomTwoBanners =
      banners.length >= 2 ? getRandomItems(banners, 2) : banners;

    // Ambil 1 banner acak
    const randomOneBanner = getRandomItems(banners, 1)[0];

    return res
      .status(200)
      .json({ success: true, randomTwoBanners, randomOneBanner });
  } catch (error) {
    console.error("Error getting random banners:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to get random" });
    }
  }
};
