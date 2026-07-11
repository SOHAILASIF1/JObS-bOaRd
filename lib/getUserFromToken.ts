import { cookies } from "next/headers";
import { verifyToken } from "./auth";
interface DecodeUser{
    id:string;
    role:"admin"|"candidate" |"employer"

}
export async function getUserFromToken():Promise<DecodeUser | null> {
    const cookieStore=await cookies()
    const token=cookieStore.get("token")?.value

    if (!token) {
        return null
    }
    try {
        const decode=verifyToken(token) as DecodeUser
        return decode
        
    } catch (error) {
        return null
        
    }
}
