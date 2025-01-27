import mongoose from "mongoose";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    picture: {
        public_id?: string;
        url: string;
    };
    savedBlogs?: mongoose.Types.ObjectId[];
    likedBlogs?: mongoose.Types.ObjectId[];
    role: string;
}

const userSchema : mongoose.Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: {
        public_id: String,
        url: String
    },
    savedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    role: { type: String, default: "user", enum: ["user", "admin"] },
}, { timestamps: true });

export default mongoose.model("User", userSchema);