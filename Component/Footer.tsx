import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#14171F] text-neutral-400">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-bold tracking-tight text-white">
              Job<span className="text-amber-400">/</span>Board
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              Connecting the right people with the right opportunities.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-neutral-200">For Candidates</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-amber-400 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/signup" className="hover:text-amber-400 transition-colors">Create Account</Link></li>
              <li><Link href="/applications" className="hover:text-amber-400 transition-colors">My Applications</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-neutral-200">For Employers</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs/post" className="hover:text-amber-400 transition-colors">Post a Job</Link></li>
              <li><Link href="/employer/listings" className="hover:text-amber-400 transition-colors">Manage Listings</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-neutral-200">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Job/Board. All rights reserved.</p>
          <p>Built by Sohail Asif</p>
        </div>
      </div>
    </footer>
  );
}