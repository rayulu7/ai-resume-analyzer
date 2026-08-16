"use client";

import { Link } from "react-router";
import Navbar from "~/components/Navbar";

export const meta = () => [
  { title: "404 Page Not Found — Resumind" },
  { name: "description", content: "The page you are looking for does not exist." },
  { name: "robots", content: "noindex, follow" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* Large 404 badge */}
        <div className="relative mb-6">
          <span
            className="text-9xl max-md:text-7xl font-extrabold text-[#111111] tracking-tighter opacity-90 select-none"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-[#DC001A] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-[#DC001A]/30">
              Page Not Found
            </span>
          </div>
        </div>

        <h1
          className="text-3xl max-md:text-2xl font-bold text-[#111111] mb-3 max-w-md"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Lost your way?
        </h1>

        <p className="text-[#888888] text-base max-w-md mb-8 leading-relaxed">
          The page you are looking for doesn’t exist or has been moved to a new URL.
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-4 max-sm:flex-col w-full justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#DC001A] hover:bg-[#b50015] text-white font-bold px-7 py-3 rounded-xl text-sm transition-all shadow-md shadow-[#DC001A]/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>

          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#EBEBEB] text-[#111111] border border-[#D4D4D4] font-semibold px-7 py-3 rounded-xl text-sm transition-all shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V8m0 0l-3 3m3-3l3 3M5 20h14" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Upload Resume
          </Link>
        </div>
      </main>
    </div>
  );
}