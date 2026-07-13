import { getUserFromToken } from '@/lib/getUserFromToken'
import { Briefcase, Eye, PlusCircle, Users } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const EmployerDashboard = async () => {
    const user=await getUserFromToken()
    if (!user || user.role!=="employer") {
        redirect("/login")
        
    }

  return (
    <div>

        <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, <span className="text-indigo-600">{user.name}</span> 👋
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your job postings and track applications from here.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <StatCard
          icon={<Briefcase className="h-6 w-6 text-indigo-600" />}
          label="Active Jobs"
          value="0"
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-emerald-600" />}
          label="Total Applicants"
          value="0"
        />
        <StatCard
          icon={<Eye className="h-6 w-6 text-amber-600" />}
          label="Profile Views"
          value="0"
        />
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/employer/post-job"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <PlusCircle className="h-4 w-4" />
            Post a New Job
          </Link>
          <Link
            href="/dashboard/employer/jobs"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <Briefcase className="h-4 w-4" />
            View My Jobs
          </Link>
        </div>
      </div>

      {/* Empty state / recent jobs */}
      <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <Briefcase className="mx-auto h-10 w-10 text-gray-300" />
        <h3 className="mt-4 text-base font-medium text-gray-900">
          No jobs posted yet
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Start by posting your first job listing to attract candidates.
        </p>
      </div>
    </div>

    </div>
  )
}
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default EmployerDashboard