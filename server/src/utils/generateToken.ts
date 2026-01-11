import { Response  } from "express";
import jwt from "jsonwebtoken"

export const generateToken = (res : Response , userId :string)=>{
    const token = jwt.sign({id : userId} , process.env.JWT_SECRET as string,{
        expiresIn:"7d",
     });

     res.cookie("token" , token ,{
        httpOnly : true,
        secure : process.env.NODE_ENV ==="production",
        sameSite : "strict"
     })
}