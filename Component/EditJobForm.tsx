"use client"

import { jobSchema } from "@/lib/validation/job"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

type Job = {
    _id: string,
    title: string,
    company: string,
    location: string,
    jobType: "full-time" | "part-time" | "contract" | "internship" | "remote",
    salaryMin?: number,
    salaryMax?: number,
    description: string,
    requirements: string
}

export default function EditJobForm({ job }: { job: Job }) {
    const [formData, setFormData] = useState({
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType,
        salaryMin: job.salaryMin?.toString() ?? "",
        salaryMax: job.salaryMax?.toString() ?? "",
        description: job.description,
        requirements: job.requirements,

    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        setError("")

        const validation=jobSchema.safeParse(formData)
        if (!validation.success) {
            setError(validation.error.issues[0].message)
            return
            
        }
        setLoading(true)
        try {
            const res=await fetch('/api/job/job._id',{
                method:"PUT",
                headers:{"Content-Typr":"application/json"},
                body:JSON.stringify(validation.data)
            })
            const data=await res.json()
            if (!res.ok) {
                setError(data.error || "Update Failed")
                setLoading(false)
                return
                
            }
            router.push("/dashboard/employer/jobs")
            router.refresh()
            
        } catch (error) {
            
        }

    }


}