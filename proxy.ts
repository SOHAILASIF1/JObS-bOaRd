import { jwtVerify } from "jose";
import { NextRequest,NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
const JWT_SECRET=new TextEncoder().encode(process.env.TOKEN!)

const protectedPaths=["/dashboard","/employer","/candidate"]
const roleBasedPaths:Record<string,string[]>={
    "/employer":["employer","admin"],
    "/candidate":["candidate","admin"]
}

export async function proxy(req:NextRequest){
    const {pathname}=req.nextUrl
    const isProtected=protectedPaths.some((path)=>pathname.startsWith(path))
    if (!isProtected) return NextResponse.next();
    const token=req.cookies.get("token")?.value   
    if (!token) {
        return NextResponse.redirect(new URL("/login",req.url))
        
    } 

    try {
        const {payload}=await jwtVerify(token,JWT_SECRET)
        const role=payload.role as string

        for(const path in roleBasedPaths){
            if (pathname.startsWith(path) && !roleBasedPaths[path].includes(role)) {
                return NextResponse.redirect(new URL("/unauthorized",req.url))
            }
        }
        return NextResponse.next()
        
    } catch (error) {
        return NextResponse.redirect(new URL("/login",req.url))
        
    }



        
    

}

export const config={
    matcher:["/dashboard/:path*","/employer/:path*","/candidate/:path*"]
}