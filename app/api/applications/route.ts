import { connectDB } from "@/lib/dbConnection";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { applicationSchema } from "@/lib/validation/application";
import applicationModel from "@/models/applicationModel";
import jobModel from "@/models/jobModel";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        
        const user=await getUserFromToken()
        if (!user || user.role!=="candidate") {
            return NextResponse.json({error:"Only Candidate Can apply"},{status:403})  

        }
        const body=await req.json()
        const parsed=applicationSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json({
                error:"Validation Failed" ,issues:parsed.error.flatten().fieldErrors
            },{status:400})
            
        }
        const {jobId,resumeLink}=parsed.data
        await connectDB()
        const job=await jobModel.findById(jobId)
        if (!job) {
            return NextResponse.json({error:"job not found"},{status:404})
            
        }
        const already = await applicationModel.findOne({ jobId, candidateId: user.id });
    if (already) {
      return NextResponse.json(
        { error: "Aap is job pe pehle hi apply kar chuke hain" },
        { status: 400 }
      );
    }

    const application = await applicationModel.create({
      jobId,
      candidateId: user.id,
      resumeLink,
    });
    return NextResponse.json(
      { message: "Application submitted", application },
      { status: 201 }
    );
        
    } catch (error) {
            console.error("Apply error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        
    }
    
}