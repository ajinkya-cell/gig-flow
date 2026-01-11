import mongoose, { Schema } from "mongoose";
const GigSchema = new Schema({
    title: String,
    description: String,
    budget: Number,
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "assigned"], default: "open" }
}, {
    timestamps: true
});
export default mongoose.model("Gig", GigSchema);
