import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import { hashedPassword } from "@/lib/auth";
import User from "@/models/userModels";

export async function POST(req:NextRequest) {
    try {
        await connectDB()
        
    } catch (error) {
        
    }
    
}



