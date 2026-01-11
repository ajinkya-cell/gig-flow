import mongoose , {Schema , Document} from "mongoose"

export interface IUser extends Document {
    name : string ;
    email : string ;
    password : string;
}

const UserSchema = new Schema<IUser>(
    {
        name :String,
        email : {type : String  , unique:true},
        password : String,
    },{
        timestamps : true
    }
)
export default mongoose.model<IUser>("User" , UserSchema)