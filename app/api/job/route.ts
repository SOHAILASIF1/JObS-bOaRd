import { getUserFromToken } from "@/lib/getUserFromToken";
import { jobSchema } from "@/lib/validation/job";
import { NextResponse,NextRequest } from "next/server";


export async function POST(req:NextRequest){
    try {
        const user =await getUserFromToken()
        if (!user || user.role!=="employer") {
            return NextResponse.json(
                {
                    error:"Only Employer Allow to post"

                },
                {status:403}
            )
            
        }
        const body=await req.json()
        const parsed=jobSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse
            
        }
    } catch (error) {
        
    }
}