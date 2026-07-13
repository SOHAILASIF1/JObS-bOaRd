"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type NavbarProps = {
  role?: "candidate" | "employer" | "admin" | null
}
const Navbar = ({ role = null }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }
  const guestLinks = (<>
    <Link href="/jobs" className="hover:text-amber-400 transition-colors">
      Browse Jobs
    </Link>
    <Link href="/login" className="hover:text-amber-400 transition-colors">
      Login
    </Link>
    <Link
      href="/signup"
      className="rounded-md bg-amber-400 px-4 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
    >
      Sign Up
    </Link>

  </>)
  const candidateLinks = (
    <>
      <Link href="/jobs" className="hover:text-amber-400 transition-colors">
        Browse Jobs
      </Link>
      <Link href="/applications" className="hover:text-amber-400 transition-colors">
        My Applications
      </Link>
      <button
        onClick={handleLogout}
        className="rounded-md border border-neutral-700 px-4 py-1.5 text-sm hover:border-amber-400 hover:text-amber-400 transition-colors"
      >
        Logout
      </button>
    </>
  )
  const employerLinks = (
    <>
      <Link href="/jobs/post" className="hover:text-amber-400 transition-colors">
        Post a Job
      </Link>
      <Link href="/employer/listings" className="hover:text-amber-400 transition-colors">
        My Listings
      </Link>
      <button
        onClick={handleLogout}
        className="rounded-md border border-neutral-700 px-4 py-1.5 text-sm hover:border-amber-400 hover:text-amber-400 transition-colors"
      >
        Logout
      </button>
    </>
  );
   const links=role==="candidate"?candidateLinks : role==="employer"? employerLinks : guestLinks

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-[#14171F]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Job<span className="text-amber-400">/</span>Board
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 text-sm font-medium text-neutral-300 md:flex">
          {links}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-neutral-800 px-5 py-5 text-sm font-medium text-neutral-300 md:hidden">
          {links}
        </div>
      )}
    </nav>
  )
}

export default Navbar