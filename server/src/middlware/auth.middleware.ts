import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken"

interface JwtPayload {
    id:string ;
}

export const protect = (
    req:Request & {user? : JwtPayload} ,
    res : Response ,
    next : NextFunction
) =>{
    const token = req.cookies?.token;
    if(!token) return res.status(401).json({message :"Unauthorized"})

    const decoded = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload
    req.user = decoded;
    next();
}