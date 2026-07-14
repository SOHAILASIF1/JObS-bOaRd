"use client"







import { useRouter } from 'next/navigation';
import React from 'react'
 const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState("");



const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

const PostJobForm = () => {
    const router=useRouter
  return (
    <div>PostJobForm</div>
  )
}

export default PostJobForm