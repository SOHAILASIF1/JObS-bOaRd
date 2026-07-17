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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const validation = jobSchema.safeParse(formData)
        if (!validation.success) {
            setError(validation.error.issues[0].message)
            return

        }
        setLoading(true)
        try {
            const res = await fetch('/api/job/${job._id}', {
                method: "PUT",
                headers: { "Content-Typr": "application/json" },
                body: JSON.stringify(validation.data)
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.error || "Update Failed")
                setLoading(false)
                return

            }
            router.push("/dashboard/employer/jobs")
            router.refresh()

        } catch (error) {
            setError("Kuch masla ho gaya, dobara try karein");
            setLoading(false);

        }

    }
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full  text-black rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Company</label>
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full  text-black rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="mb-1  block text-sm font-medium text-gray-700">Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full  text-black rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Job Type</label>
                <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full  text-black rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    required
                >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Min Salary</label>
                    <input
                        name="salaryMin"
                        type="number"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500  text-black focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Max Salary</label>
                    <input
                        name="salaryMax"
                        type="number"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300  text-black p-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full  text-black rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    required
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border  text-black border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    required
                />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Job"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
            </div>
        </form>
    )



}