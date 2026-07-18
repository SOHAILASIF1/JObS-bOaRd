

import { connectDB } from '@/lib/dbConnection';
import { formatSalary, timeAgo } from '@/lib/formatters';
import jobModel from '@/models/jobModel';
import { ArrowLeft, Briefcase, Building2, Clock, DollarSign, MapPin } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'


const JOB_TYPE_STYLES: Record<string, string> = {
  "full-time": "bg-indigo-100 text-indigo-700",
  "part-time": "bg-sky-100 text-sky-700",
  contract: "bg-amber-100 text-amber-700",
  internship: "bg-emerald-100 text-emerald-700",
  remote: "bg-purple-100 text-purple-700",
};

export default async function JobDetailPage({params}:{params:Promise<{id:string}>}) {
    const {id}=await params
    await connectDB()
    const job=await jobModel.findById(id).lean()
    if (!job) {
        notFound()
        
    }
    const j=job as any
    return (
          <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/jobs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>

        {/* Hero card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl font-semibold text-indigo-600">
                {j.company.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{j.title}</h1>
                <p className="mt-1 flex items-center gap-1.5 text-gray-500">
                  <Building2 className="h-4 w-4" />
                  {j.company}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium ${JOB_TYPE_STYLES[j.jobType]}`}
            >
              {j.jobType.replace("-", " ")}
            </span>
          </div>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-gray-100 pt-6 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gray-400" />
              {j.location}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-gray-400" />
              {formatSalary(j.salaryMin, j.salaryMax)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-400" />
              Posted {timeAgo(j.createdAt)}
            </span>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Description + Requirements */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Briefcase className="h-5 w-5 text-indigo-600" />
                Job Description
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {j.description}
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Requirements</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {j.requirements}
              </p>
            </section>
          </div>

          {/* Apply sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Salary Range
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatSalary(j.salaryMin, j.salaryMax)}
              </p>

              <div className="mt-5 space-y-2 border-t border-gray-100 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Job Type</span>
                  <span className="font-medium capitalize text-gray-900">
                    {j.jobType.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium text-gray-900">{j.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Posted</span>
                  <span className="font-medium text-gray-900">{timeAgo(j.createdAt)}</span>
                </div>
              </div>

              <Link
                href={`/jobs/${j._id}/apply`}
                className="mt-6 flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

