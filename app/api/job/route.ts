import { connectDB } from "@/lib/dbConnection";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { jobSchema } from "@/lib/validation/job";
import jobModel from "@/models/jobModel";
// import { connect } from "http2";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromToken()
        if (!user || user.role !== "employer") {
            return NextResponse.json(
                {
                    error: "Only Employer Allow to post"

                },
                { status: 403 }
            )

        }
        const body = await req.json()
        const parsed = jobSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json({
                error: "Validation Failed",
                issues: parsed.error.flatten().fieldErrors
            }, { status: 400 })

        }
        await connectDB()
        const job = await jobModel.create({
            ...parsed.data,
            employerId: user.id
        })
        return NextResponse.json({ message: "Job Posted", job }, { status: 201 })
    } catch (error) {
        console.error("Job post error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });

    }
}