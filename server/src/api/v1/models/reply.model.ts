import mongoose from "mongoose";

export interface IReply {
    comment: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    text: string;
    likes: number;
}

const replySchema : mongoose.Schema<IReply> = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
}, {
    timestamps: true
});

export default mongoose.model("Reply", replySchema);