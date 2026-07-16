import { connectDB } from '@/lib/dbConnection'
import { getUserFromToken } from '@/lib/getUserFromToken'
import { redirect } from 'next/navigation'
import React from 'react'

const EditJobPage = async({params}:{params:Promise<{id:string}>}) => {



  const {id}=await params
  const user=await getUserFromToken()
  if (!user||user.role!=="employer") {
    redirect("/login")
    
  }
  await connectDB()
  return (
    <div>page</div>
  )
}

export default EditJobPage