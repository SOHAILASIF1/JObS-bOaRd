"use client"

import { useState } from "react"

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
}