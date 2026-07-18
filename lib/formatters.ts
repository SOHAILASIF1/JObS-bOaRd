export function timeAgo(date:string){
    const diffMs=Date.now()-new Date(date).getTime()
    const days=Math.floor(diffMs/(1000*60*60*24))
    if (days===0) return "today"
    if (days===1) return "1 day ago"
    if (days<30) return `${days} days ago`
    const months=Math.floor(days/30)
    return `${months} month${months>1?"s":""}`


}
export function formatSalary(min?: number, max?: number) {
  if (!min && !max) return "Not disclosed";
  if (min && max) return `Rs. ${min.toLocaleString()} – ${max.toLocaleString()}`;
  return `Rs. ${(min ?? max)!.toLocaleString()}+`;
}