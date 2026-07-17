export const dynamic="force-dynamic"
import { connectDB } from '@/lib/dbConnection'
import jobModel from '@/models/jobModel'
import React from 'react'

const JobPage = async() => {
    await connectDB()
    const jobs=await jobModel.find().sort({createdAt:-1}).lean()

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
          <p className="mt-2 text-gray-500">
            {jobs.length} opportunit{jobs.length === 1 ? "y" : "ies"} available right now
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-gray-300" />
            <h3 className="mt-4 text-base font-medium text-gray-900">
              Abhi koi job available nahi hai
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Jald hi naye job listings yahan dikhengi.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job: any) => (
              <JobCard key={job._id.toString()} job={JSON.parse(JSON.stringify(job))} />
            ))}
          </div>
        )}
      </div>
    </div>
    
  )
}

export default JobPage