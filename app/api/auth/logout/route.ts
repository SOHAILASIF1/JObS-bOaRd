import { NextResponse } from "next/server";

export async  function POST() {
    const res=NextResponse.json({message:"Logged Out"},{status:201})
    res.cookies.set("token","",{
        httpOnly: true,
    
    sameSite: "lax",
    maxAge: 0,   // 👈 turant expire
    path: "/",

    })
    return res
    
}