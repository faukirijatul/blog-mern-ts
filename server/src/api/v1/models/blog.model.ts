import mongoose from "mongoose";
import slugify from "slugify";

export interface IBlog extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  highlight: string;
  thumbnail: {
    url: string;
    public_id: string;
  };
  author: mongoose.Schema.Types.ObjectId;
  category: string;
  likes: mongoose.Schema.Types.ObjectId[];
  saves: number;
  views: number;
  comments?: mongoose.Schema.Types.ObjectId[];
  slug: string;
}

const blogSchema: mongoose.Schema<IBlog> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    highlight: { type: String, required: true },
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    saves: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    slug: { type: String },
  },
  {
    timestamps: true,
  }
);

// Middleware untuk membuat slug
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Blog", blogSchema);
