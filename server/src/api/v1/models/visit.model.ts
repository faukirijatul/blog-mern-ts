import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
    totalVisits: { type: Number, default: 0 }
});

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;