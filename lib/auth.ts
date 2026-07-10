import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


export async function hashedPassword(password:string) {
    return bcrypt.hash(password,10)
    
}

export async function comparePassword(password:string,hashed:string) {
    return bcrypt.compare(password,hashed)
    
}


export async function signToken(payload:{}) {
    return jwt.sign(payload,process.env.TOKEN!,{expiresIn:"7d"})
    
}

export function verifyToken(token:string){
    return jwt.verify(token,process.env.TOKEN!)

}