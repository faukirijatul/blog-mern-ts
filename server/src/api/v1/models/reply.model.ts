import mongoose from "mongoose";

export interface IReply {
    _id?: mongoose.Schema.Types.ObjectId;
    comment: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    text: string;
    likes: mongoose.Schema.Types.ObjectId[];
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
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true
});

export default mongoose.model("Reply", replySchema);