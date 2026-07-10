import { signToken, comparePassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import User from "@/models/userModels";


export async function POST(req: NextRequest) {
    try {
        connectDB()
        const { email, password } = await req.json()
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })



        }
        const checkPassword = await comparePassword(password, user.password)
        if (!checkPassword) {
            return NextResponse.json({ error: "invalid Password" }, { status: 401 })

        }
        const token = await signToken({ id: user.id, role: user.role })
        const responce = NextResponse.json({ message: "Login Successfully" },{status:200})
        responce.cookies.set("token", token, {
            httpOnly: true,

            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        })
        return responce




    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"some thing wrong"},{status:500})        

    }

}