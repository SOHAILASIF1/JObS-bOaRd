"use client"
import { applicationSchema } from '@/lib/validation/application'
import { FileText, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ApplyForm = ({ jobId }: { jobId: string }) => {
  const [resumeLink, setResumeLink] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const validation = applicationSchema.safeParse({ jobId, resumeLink })
    if (!validation.success) {
      setError(validation.error.issues[0].message)
      return

    }
    setLoading(true)
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Application failed")
        setLoading(false)
        return

      }
      router.push("/dashboard/candidate")
      router.refresh()
    } catch (error) {
      setError("Kuch masla ho gaya, dobara try karein");
      setLoading(false);

    }


  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4" />
          Resume Link
        </label>
        <input
          type="url"
          value={resumeLink}
          onChange={(e) => setResumeLink(e.target.value)}
          placeholder="https://drive.google.com/your-resume"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
        <p className="mt-1.5 text-xs text-gray-400">
          Google Drive, Dropbox, ya kisi bhi public link ka istemal karein.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
    
    
  )
}

export default ApplyForm