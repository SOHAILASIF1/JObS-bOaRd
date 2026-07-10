import { jwtVerify } from "jose";
import { NextRequest,NextResponse } from "next/server";
const JWT_SECRET=new TextEncoder().encode(process.env.TOKEN!)

const protectedPaths=["/dashboard","employer","candidate"]