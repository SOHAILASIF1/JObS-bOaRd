import { connectDB } from "@/lib/dbConnection";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { applicationSchema } from "@/lib/validation/application";
import jobModel from "@/models/jobModel";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        
        const user=await getUserFromToken()
        if (!user || user.role!=="candidate") {
            return NextResponse.json({error:"Only Candidate Can apply"},{status:403})  

        }
        const body=await req.json()
        const parsed=applicationSchema.safeParse(body)
        if
        await connectDB()
        
    } catch (error) {
        
    }
    
}