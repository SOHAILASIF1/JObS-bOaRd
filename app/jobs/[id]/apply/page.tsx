import { connectDB } from '@/lib/dbConnection'
import { getUserFromToken } from '@/lib/getUserFromToken'
import applicationModel from '@/models/applicationModel'
import jobModel from '@/models/jobModel'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

function ApplyPage({params}:{params:Promise<{id:string}>}) {
       const {id}=await params
       const user=await getUserFromToken()
       if (!user||user.role!=="candidate") {
        redirect("/login")
        
       }
       connectDB()
       const job=await jobModel.findById(id).lean()
       if (!job) {
        notFound()
        
       }
       const alreadyApplied=await applicationModel.findOne({
        jobId:id,
        candidate:user.id
       })

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-xl">
        <Link
          href={`/jobs/${id}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to job details
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            Apply for <span className="text-indigo-600">{(job as any).title}</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">at {(job as any).company}</p>

          <div className="mt-6 border-t border-gray-100 pt-6">
            {alreadyApplied ? (
              <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Aap is job pe pehle hi apply kar chuke hain.
              </div>
            ) : (
              <ApplyForm jobId={id} />
            )}
          </div>
        </div>
      </div>
    </div>
 
  
  )
}

export default ApplyPage