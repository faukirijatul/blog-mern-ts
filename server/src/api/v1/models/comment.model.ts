import mongoose from "mongoose";

export interface IComment {
    blog: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    text: string;
    likes: number;
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
    likes: { type: Number, default: 0 },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
}, {
    timestamps: true
});

export default mongoose.model("Comment", commentSchema);