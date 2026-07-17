import EditJobForm from '@/Component/EditJobForm'
import { connectDB } from '@/lib/dbConnection'
import { getUserFromToken } from '@/lib/getUserFromToken'
import jobModel from '@/models/jobModel'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

const EditJobPage = async({params}:{params:Promise<{id:string}>}) => {



  const {id}=await params
  const user=await getUserFromToken()
  if (!user||user.role!=="employer") {
    redirect("/login")
    
  }
  await connectDB()
  const job=await jobModel.findById(id).lean()
  if (!job) {
    notFound()
    
  }
  if ((job as any).employerId.toString()!==user.id) {
    redirect("/dashboard/employer/jobs")
    
  }

  return (
     <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-black">Edit Job</h1>
        <EditJobForm job={JSON.parse(JSON.stringify(job))} />
      </div>
    </div>
  )
}

export default EditJobPage