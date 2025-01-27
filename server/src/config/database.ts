import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/blog2");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;