import mongoose , {Schema , Document} from "mongoose";

export interface IBid extends Document {
    gigId : mongoose.Types.ObjectId ;
    freelancerId : mongoose.Types.ObjectId;
    message : string ;
    price: number;
    status : "pending" | "hired" | "rejected"
}

const BidSchema = new Schema<IBid> (
    {
        gigId : {type : Schema.Types.ObjectId , ref:"Gig" },
        freelancerId :{type :Schema.Types.ObjectId , ref:"User"},
        message : String ,
        price : Number ,
        status : {
            type : String ,
            enum :["pending" , "hired" , "rejected"],
            default : "pending"
        }

    },{
        timestamps:true
    }
)

export default mongoose.model<IBid>("Bid", BidSchema);