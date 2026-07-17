"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function DeleteJobButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    const confirmed = window.confirm("Did you really want to delete")
    if (!confirmed) return
    setLoading(true)
    try {
      const res = await fetch(`/api/job/${jobId}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Delete Failed")
        setLoading(false)
        return

      }
      router.refresh()
    } catch (error) {
      alert("Kuch masla ho gaya, dobara try karein")
      setLoading(false)

    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>


  )
}

export default DeleteJobButton