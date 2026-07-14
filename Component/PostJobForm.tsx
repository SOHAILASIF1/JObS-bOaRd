"use client"







import { useRouter } from 'next/navigation';
import React, { useState } from 'react'




const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

const PostJobForm = () => {
    const router=useRouter
     const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState("");


  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setServerError("")

    const formData=new FormData(e.currentTarget)
    const payload=Object.fromEntries(formData.entries())
    try {
      const res=await fetch("/api/job",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      })
      const data=await res.json()
      if (!res.ok) {
        if (data.issues ) {
          setErrors(data.issues)
          
        }else setServerError(data.error|| "Something gone wrong")
        setLoading(false)
        return
        
      }
      router.push("/dashboard/employer/jobs")
    } catch (error) {
       setServerError("Network error, dobara try karein");
      setLoading(false);
      
    }
    
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      {serverError && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* Title */}
      <Field
        label="Job Title"
        name="title"
        icon={<Briefcase className="h-4 w-4" />}
        placeholder="e.g. Senior Frontend Developer"
        error={errors.title?.[0]}
      />

      {/* Company + Location */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Company Name"
          name="company"
          icon={<Building2 className="h-4 w-4" />}
          placeholder="e.g. Acme Inc."
          error={errors.company?.[0]}
        />
        <Field
          label="Location"
          name="location"
          icon={<MapPin className="h-4 w-4" />}
          placeholder="e.g. Karachi, Pakistan"
          error={errors.location?.[0]}
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Job Type
        </label>
        <select
          name="jobType"
          defaultValue="full-time"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {JOB_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.jobType && (
          <p className="mt-1 text-xs text-red-500">{errors.jobType[0]}</p>
        )}
      </div>

      {/* Salary Range */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Min Salary (optional)"
          name="salaryMin"
          type="number"
          icon={<DollarSign className="h-4 w-4" />}
          placeholder="e.g. 80000"
          error={errors.salaryMin?.[0]}
        />
        <Field
          label="Max Salary (optional)"
          name="salaryMax"
          type="number"
          icon={<DollarSign className="h-4 w-4" />}
          placeholder="e.g. 150000"
          error={errors.salaryMax?.[0]}
        />
      </div>

      {/* Description */}
      <TextAreaField
        label="Job Description"
        name="description"
        icon={<FileText className="h-4 w-4" />}
        placeholder="Role responsibilities, team, day-to-day work..."
        error={errors.description?.[0]}
      />

      {/* Requirements */}
      <TextAreaField
        label="Requirements"
        name="requirements"
        icon={<ListChecks className="h-4 w-4" />}
        placeholder="Skills, experience, qualifications required..."
        error={errors.requirements?.[0]}
      />

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Posting...
          </>
        ) : (
          "Post Job"
        )}
      </button>
    </form>
  )
}


function Field({
  label,
  name,
  icon,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  icon,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
        {icon}
        {label}
      </label>
      <textarea
        name={name}
        rows={5}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default PostJobForm