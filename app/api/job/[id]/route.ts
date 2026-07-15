import { connectDB } from "@/lib/dbConnection";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { jobSchema } from "@/lib/validation/job";
import jobModel from "@/models/jobModel";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false, error: "Invalid Job Id"
            }, { status: 400 })

        }
        const job = await jobModel.findById(id)
        if (!job) {
            return NextResponse.json({
                success: false, error: "job not found"
            }, { status: 404 })

        }
        return NextResponse.json({ success: true, job })

    } catch (error) {
        console.error("GET /api/jobs/[id] error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch job" },
            { status: 500 }
        );

    }

}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const user = await getUserFromToken()
        if (!user || user.role !== "employer") {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        }
        await connectDB()
        const job = await jobModel.findById(id)
        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 })

        }
        const body = await req.json()
        const validation = jobSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({
                error: validation.error.issues[0].message
            }, { status: 400 })

        }
        const updatedJob = await jobModel.findByIdAndUpdate(id, { ...validation.data, status: "pending" }, { new: true })
        return NextResponse.json({ message: "job Updated" }, { status: 200 })
    } catch (error) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    }
}