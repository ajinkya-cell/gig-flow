import mongoose , {Schema , Document} from "mongoose";

export interface IGig extends Document{
    title : string ;
    description : string ;
    budget : number ;
    ownerId : mongoose.Types.ObjectId ;
    status : "open" | "assigned";
}

const GigSchema = new Schema<IGig>(
    {
        title : String,
        description : String,
        budget : Number,
        ownerId : {type : Schema.Types.ObjectId , ref:"User"},
        status :{type :String , enum :["open" , "assigned"] , default :"open"}
    },{
        timestamps : true
    }
)

export default mongoose.model<IGig>("Gig" , GigSchema)