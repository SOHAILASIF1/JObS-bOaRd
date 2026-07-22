import { connectDB } from '@/lib/dbConnection';
import { getUserFromToken } from '@/lib/getUserFromToken';
import applicationModel from '@/models/applicationModel';
import { redirect } from 'next/navigation';
import React from 'react'
const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  shortlisted: "bg-sky-100 text-sky-700",
  hired: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

async function CandidateDashboard() {
    const user =await getUserFromToken()
    if (!user ||user.role!=="candidate") {
        redirect("/login")
        
    }
    await connectDB()
    const applocations=await applicationModel.find({
      candidateId:user.id
      
    }).populate("jobId").sort({createdAt:-1}).lean()

  return (
    
  )
}

export default CandidateDashboard