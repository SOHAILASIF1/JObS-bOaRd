import { connectDB } from '@/lib/dbConnection';
import { formatSalary, timeAgo } from '@/lib/formatters';
import { getUserFromToken } from '@/lib/getUserFromToken';
import applicationModel from '@/models/applicationModel';
import { ArrowRight, Briefcase, CheckCircle2, Clock, Search } from 'lucide-react';
import Link from 'next/link';
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
    const applications=await applicationModel.find({
      candidateId:user.id
      
    }).populate("jobId").sort({createdAt:-1}).lean()
    const total=applications.length
    const pending=applications.filter((a:any)=>a.status==="pending").length
    const hired=applications.filter((a:any)=>a.status==="hired")
    const shortlisted=applications.filter((a:any)=>a.status==="shortlisted").length

    const recentApplications=applications.slice(0,3)
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-indigo-600">{user.name}</span> 👋
          </h1>
          <p className="mt-2 text-gray-500">
            Track your job applications and discover new opportunities.
          </p>
        </div>

        {/* Stats — clickable, poori list ke liye link */}
        <Link href="/dashboard/candidate/applications" className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={<Briefcase className="h-6 w-6 text-indigo-600" />} label="Total Applied" value={total.toString()} />
          <StatCard icon={<Clock className="h-6 w-6 text-amber-600" />} label="Pending" value={pending.toString()} />
          <StatCard icon={<CheckCircle2 className="h-6 w-6 text-sky-600" />} label="Shortlisted" value={shortlisted.toString()} />
          <StatCard icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />} label="Hired" value={hired.toString()} />
        </Link>

        {/* Quick action */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Looking for something new?</h2>
              <p className="mt-1 text-sm text-gray-500">Browse the latest approved job listings.</p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <Search className="h-4 w-4" />
              Browse Jobs
            </Link>
          </div>
        </div>

        {/* Recent applications preview */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            {applications.length > 0 && (
              <Link
                href="/dashboard/candidate/applications"
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-gray-300" />
              <h3 className="mt-4 text-base font-medium text-gray-900">
                Aapne abhi tak kisi job pe apply nahi kiya
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Jobs browse karein aur apni pehli application submit karein.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {recentApplications.map((app: any) => {
                const job = app.jobId;

                if (!job) {
                  return (
                    <div key={app._id.toString()} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <p className="text-sm italic text-gray-400">Ye job delete ho chuki hai.</p>
                    </div>
                  );
                }

                return (
                  <Link
                    key={app._id.toString()}
                    href={`/jobs/${job._id}`}
                    className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-semibold text-indigo-600">
                          {job.company.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[app.status]}`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
                      <span>Applied {timeAgo(app.createdAt)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
    
  )
}
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md sm:p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 sm:h-12 sm:w-12">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
        <p className="text-lg font-semibold text-gray-900 sm:text-xl">{value}</p>
      </div>
    </div>
  );
}

export default CandidateDashboard