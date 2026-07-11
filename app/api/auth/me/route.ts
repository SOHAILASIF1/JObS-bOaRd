import User from "@/models/userModels";
import { connectDB } from "@/lib/dbConnection";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { NextResponse } from "next/server";

export async function GET() {
    const decode=await getUserFromToken()
    if (!decode) {
        return NextResponse.json({error:"Unauthorized"},{status:401})
        
    }
    await connectDB()
    const user=await User.findById(decode.id).select("-password")
    return NextResponse.json({user})
    
}