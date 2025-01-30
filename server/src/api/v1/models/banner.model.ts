import mongoose from "mongoose";

interface IBanner extends mongoose.Document {
  image: {
    url: string;
    public_id: string;
  };
  title: string;
  link: string;
}

const BannerSchema = new mongoose.Schema<IBanner>({
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  title: { type: String, required: true },
  link: { type: String, required: true },
});

export default mongoose.model<IBanner>("Banner", BannerSchema);