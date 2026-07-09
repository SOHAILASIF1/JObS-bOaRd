import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import { hashedPassword } from "@/lib/auth";
import User from "@/models/userModels";
import { error } from "console";

export async function POST(req:NextRequest) {
    try {
        await connectDB()
        const {name,email,password,role}=await req.json()
        if (!email ||!name || !password) {
            return NextResponse.json({error:"All field required"},{status:400})
            
        }
        const existingUser=await User.findOne({email})
        if (existingUser) {
            return NextResponse.json({error:"User Already Exist"},{status:400})
            
        }
        const hashPass=await hashedPassword(password)
        const user=await User.create({name,email,password:hashPass,role})
        return NextResponse.json({message:"User Created" ,user:{id:user._id,email:user.email }}.{status:409})
        
        
    } catch (error) {
        console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        
    }
    
}



