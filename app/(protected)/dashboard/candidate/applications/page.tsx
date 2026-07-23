
import { createParamsFromClient } from 'next/dist/server/request/params';
import React from 'react'




const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  shortlisted: "bg-sky-100 text-sky-700",
  hired: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};
const FILTERS = ["all", "pending", "shortlisted", "hired", "rejected"] as const;


async function MyApplicationsPage({searchParams}:{searchParams:Promise<{status:string}>}) {
  const params=await searchParams
  console.log(params);
  console.log(params.status);
  
  
  
   
    
  return (
    <div>page</div>
  )
}

export default MyApplicationsPage