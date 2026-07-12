"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Signup Failed")
                setLoading(false)
                return

            }
            router.push("/dashboard")
            router.refresh()
        } catch (error) {
            setError("Kuch masla ho gaya, dobara try karein");
            setLoading(false);

        }

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg   ">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select Role</option>
                    <option value="candidate">Candidate</option>
                    <option value="employer">Employer</option>
                </select>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}



