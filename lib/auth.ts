import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


export async function hashedPassword(password:string) {
    return bcrypt.hash(password,10)
    
}

export async function comparePassword(password:string,hashed:string) {
    return bcrypt.compare(password,hashed)
    
}

