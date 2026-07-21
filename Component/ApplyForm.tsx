"use client"
import { applicationSchema } from '@/lib/validation/application'
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
    
    
  )
}

export default ApplyForm