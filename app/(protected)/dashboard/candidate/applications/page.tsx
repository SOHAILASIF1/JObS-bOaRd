import { getUserFromToken } from "@/lib/getUserFromToken";
import { connectDB } from "@/lib/dbConnection";
import applicationModel from "@/models/applicationModel";
import "@/models/jobModel"; // populate ke liye register hona zaroori
import { redirect } from "next/navigation";
import Link from "next/link";
import { Briefcase, Search } from "lucide-react";
import { timeAgo, formatSalary } from "@/lib/formatters";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  shortlisted: "bg-sky-100 text-sky-700",
  hired: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const FILTERS = ["all", "pending", "shortlisted", "hired", "rejected"] as const;

export default async function MyApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = await getUserFromToken();
  if (!user || user.role !== "candidate") {
    redirect("/login");
  }

  const { status } = await searchParams;
  const activeFilter = FILTERS.includes(status as any) ? status : "all";

  await connectDB();

  const query: Record<string, any> = { candidateId: user.id };
  if (activeFilter !== "all") {
    query.status = activeFilter;
  }

  const applications = await applicationModel
    .find(query)
    .populate("jobId")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
            <p className="mt-1 text-gray-500">
              Track the status of every job you've applied to.
            </p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Search className="h-4 w-4" />
            Browse Jobs
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
          {FILTERS.map((f) => (
            <Link
              key={f}
              href={f === "all" ? "/dashboard/candidate/applications" : `/dashboard/candidate/applications?status=${f}`}
              className={`border-b-2 px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                activeFilter === f
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </Link>
          ))}
        </div>

        {/* Applications list */}
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-gray-300" />
            <h3 className="mt-4 text-base font-medium text-gray-900">
              {activeFilter === "all"
                ? "Aapne abhi tak kisi job pe apply nahi kiya"
                : `Koi ${activeFilter} application nahi mili`}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeFilter === "all" && "Jobs browse karein aur apni pehli application submit karein."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app: any) => {
              const job = app.jobId;

              if (!job) {
                return (
                  <div
                    key={app._id.toString()}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm italic text-gray-400">
                      Ye job employer ne delete kar di hai.
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[app.status]}`}
                    >
                      {app.status}
                    </span>
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
                        <p className="text-sm text-gray-500">
                          {job.company} · {job.location}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
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
  );
}