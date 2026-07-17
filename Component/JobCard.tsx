import { Clock, DollarSign, MapPin, MapPinCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
type Job={
    _id:string,
    title:string,
    company:string,
    location:string,
    jobType:"full-time"|"part-time"|"contract"|"internship"|"remote",
    salaryMin?:number,
    salaryMax?:number,
    description:string,
    createdAt:string

}

const JOB_TYPE_STYLES: Record<string, string> = {
  "full-time": "bg-indigo-100 text-indigo-700",
  "part-time": "bg-sky-100 text-sky-700",
  contract: "bg-amber-100 text-amber-700",
  internship: "bg-emerald-100 text-emerald-700",
  remote: "bg-purple-100 text-purple-700",
};

function timeAgo(date:string){
    const diffMs=Date.now()-new Date(date).getTime()
    const days=Math.floor(diffMs/(1000*60*60*24))
    if (days===0) return "today"
    if (days===1) return "1 day ago"
    if (days<30) return `${days} days ago`
    const months=Math.floor(days/30)
    return `${months} month${months>1?"s":""}`


}
function formatSalary(min?: number, max?: number) {
  if (!min && !max) return "Not disclosed";
  if (min && max) return `Rs. ${min.toLocaleString()} – ${max.toLocaleString()}`;
  return `Rs. ${(min ?? max)!.toLocaleString()}+`;
}


const JobCard = ({job}:{job:Job}) => {
  return (
     <Link
      href={`/jobs/${job._id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-semibold">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </h2>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${JOB_TYPE_STYLES[job.jobType]}`}
        >
          {job.jobType.replace("-", " ")}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-gray-600">{job.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5" />
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {timeAgo(job.createdAt)}
        </span>
      </div>
    </Link>
  )
}

export default JobCard