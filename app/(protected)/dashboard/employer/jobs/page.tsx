import { connectDB } from "@/lib/dbConnection";
import { getUserFromToken } from "@/lib/getUserFromToken";
import jobModel from "@/models/jobModel";
import { Briefcase, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EmployersJobPage() {
    const user = await getUserFromToken()
    if (!user || user.role !== "employer") {
        redirect("/login")

    }
    await connectDB()
    const jobs = await jobModel.find({ employerId: user.id }).sort({ createdAt: -1 }).lean()
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Job Listings</h1>
          <Link
            href="/dashboard/employer/post-job"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <PlusCircle className="h-4 w-4" />
            Post a New Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-gray-300" />
            <h3 className="mt-4 text-base font-medium text-gray-900">
              No jobs posted yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by posting your first job listing to attract candidates.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job: any) => (
              <div
                key={job._id.toString()}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-indigo-400"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                    <p className="text-sm text-gray-500">{job.category} · {job.location}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      job.status === "approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : job.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-gray-600">{job.description}</p>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  {job.salary ? `Rs. ${job.salary.toLocaleString()}` : "Salary not specified"}
                </p>
                <div className="mt-4 flex gap-3 text-sm">
                  <Link href={`/dashboard/employer/jobs/${job._id}/edit`} className="text-indigo-600 hover:underline">
                    Edit
                  </Link>
                  <Link href={`/jobs/${job._id}`} className="text-gray-500 hover:underline">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    )
}