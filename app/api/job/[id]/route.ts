import { connectDB } from "@/lib/dbConnection";
import jobModel from "@/models/jobModel";
import mongoose from "mongoose";
import { NextResponse,NextRequest } from "next/server";
export async function GET(
     req:NextRequest,
    {params}:{params:Promise<{id:string}>}
){
    try {
        await connectDB()
        const {id}=await params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success:false , error:"Invalid Job Id"
            },{status:400})
            
        }
        const job=await jobModel.findById(id)
        if (!job) {
            return NextResponse.json({
                success:false,error:"job not found"
            },{status:404})
            
        }
        return NextResponse.json({success:true,job})
        
    } catch (error) {
        console.error("GET /api/jobs/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch job" },
      { status: 500 }
    );
        
    }
   
}