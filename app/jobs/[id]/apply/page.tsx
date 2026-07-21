import { connectDB } from '@/lib/dbConnection'
import { getUserFromToken } from '@/lib/getUserFromToken'
import { redirect } from 'next/navigation'
import React from 'react'

function ApplyPage({params}:{params:Promise<{id:string}>}) {
       const {id}=await params
       const user=await getUserFromToken()
       if (!user||user.role!=="candidate") {
        redirect("/login")
        
       }
       connectDB()

  return (
 
  
  )
}

export default ApplyPage