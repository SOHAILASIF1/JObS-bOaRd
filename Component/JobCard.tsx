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