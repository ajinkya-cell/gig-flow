import mongoose, { Schema } from "mongoose";
const BidSchema = new Schema({
    gigId: { type: Schema.Types.ObjectId, ref: "Gig" },
    freelancerId: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    price: Number,
    status: {
        type: String,
        enum: ["pending ", "hired", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true
});
export default mongoose.model("Bid", BidSchema);
