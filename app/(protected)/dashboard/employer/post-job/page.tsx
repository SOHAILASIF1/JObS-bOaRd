import PostJobForm from "@/Component/PostJobForm";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { redirect } from "next/navigation";

import React from 'react'

const PostJobPage = async() => {
    const user=await getUserFromToken()
    if (!user || user.role!=="employer") {
        redirect("/login")
        
    }
  return (
     <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-1 text-gray-500 mb-8">
          Fill in the details below to publish your job listing.
        </p>
        <PostJobForm />
      </div>
    </div>
  )
}

export default PostJobPage