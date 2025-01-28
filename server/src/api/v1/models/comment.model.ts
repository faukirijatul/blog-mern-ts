import mongoose from "mongoose";

export interface IComment {
    _id?: mongoose.Schema.Types.ObjectId;
    blog: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    text: string;
    likes: mongoose.Schema.Types.ObjectId[];
    replies?: mongoose.Schema.Types.ObjectId[];
}

const commentSchema : mongoose.Schema<IComment> = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
}, {
    timestamps: true
});

export default mongoose.model("Comment", commentSchema);