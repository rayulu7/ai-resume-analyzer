"use client";

import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Target, Bot, BarChart3 } from "lucide-react";

export const links = () => [
  {
    rel: "canonical",
    href: "https://rayulumukku.com/projects/ai-resume-analyzer/",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { name: "robots", content: "index, follow" },
    { title: "Resumind — AI Resume Analyzer" },
    {
      name: "description",
      content:
        "Resumind is a free AI-powered resume analyzer. Upload your resume and instantly get an ATS compatibility score, keyword analysis, and actionable improvement suggestions.",
    },
    { name: "author", content: "Rayulu Mukku" },
    { name: "theme-color", content: "#DC001A" },
    /* OG */
    { property: "og:site_name",   content: "Resumind" },
    { property: "og:type",        content: "website" },
    { property: "og:url",         content: "https://rayulumukku.com/projects/ai-resume-analyzer/" },
    { property: "og:title",       content: "Resumind — AI Resume Analyzer" },
    { property: "og:description", content: "Upload your resume and get an ATS score, AI feedback, and improvement tips — instantly." },
    { property: "og:image",       content: "https://rayulumukku.com/projects/ai-resume-analyzer/images/resume_01.png" },
    /* Twitter */
    { name: "twitter:card",        content: "summary_large_image" },
    { name: "twitter:title",       content: "Resumind — AI Resume Analyzer" },
    { name: "twitter:description", content: "Upload your resume and get an ATS score, AI feedback, and improvement tips — instantly." },
    { name: "twitter:image",       content: "https://rayulumukku.com/projects/ai-resume-analyzer/images/resume_01.png" },
    { name: "twitter:creator",     content: "@rayulumukku" },
  ];
}

const features = [
  { icon: Target,    label: "ATS Score",   desc: "See how well you pass applicant tracking filters" },
  { icon: Bot,       label: "AI Feedback", desc: "Detailed, actionable improvement suggestions" },
  { icon: BarChart3, label: "Job Match",   desc: "Compare your resume against any job description" },
];

const mockBars = [
  { label: "ATS Compatibility", pct: 92 },
  { label: "Content Quality",   pct: 85 },
  { label: "Structure",         pct: 78 },
];

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const items = (await kv.list("resume:*", true)) as KVItem[];
      setResumes(items?.map((r) => JSON.parse(r.value) as Resume) || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  const isEmpty   = !loadingResumes && resumes.length === 0;
  const hasItems  = !loadingResumes && resumes.length > 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <Navbar />

      {/* ── Loading ── */}
      {loadingResumes && (
        <div className="flex flex-1 items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="loading" />
        </div>
      )}

      {/* ══════════════════════════════════════════
          EMPTY STATE — split-hero layout
      ══════════════════════════════════════════ */}
      {isEmpty && (
        <section className="flex flex-1 max-lg:flex-col">

          {/* Left — text + CTA */}
          <div className="flex-1 flex flex-col justify-center px-16 max-md:px-8 py-16 max-lg:py-12">

            <h1
              className="text-5xl max-md:text-4xl font-extrabold text-[#111111] leading-[1.15] mb-5 max-w-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Track Your Applications &amp; Resume Ratings
            </h1>

            <p className="text-[#888888] text-lg leading-relaxed mb-10 max-w-md">
              Upload your resume and instantly get an ATS score, AI feedback, and personalised improvement tips — in seconds.
            </p>

            <Link
              to="/upload"
              id="hero-upload-btn"
              className="inline-flex items-center gap-2.5 bg-[#DC001A] hover:bg-[#b50015] text-white font-bold px-8 py-4 rounded-xl w-fit text-base transition-colors shadow-lg shadow-[#DC001A]/25"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V8m0 0l-3 3m3-3l3 3M5 20h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Your First Resume
            </Link>

            {/* Feature pills */}
            <div className="flex flex-col gap-3 mt-12">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3 bg-white border border-[#D4D4D4] rounded-xl px-4 py-3 shadow-sm max-w-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#DC001A]/10 flex items-center justify-center shrink-0">
                    <f.icon size={18} className="text-[#DC001A]" />
                  </div>
                  <div>
                    <p className="text-[#111111] text-sm font-bold">{f.label}</p>
                    <p className="text-[#888888] text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dark accent panel */}
          <div className="w-[440px] max-lg:w-full bg-[#111111] flex flex-col justify-center items-center p-12 max-md:p-8 relative overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full border border-[#DC001A]/15 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full border border-white/8 -translate-x-1/3 translate-y-1/3" />
            <div className="absolute inset-0 bg-[#DC001A]/3" />

            <div className="relative z-10 w-full max-w-xs">
              <p className="text-[#888888] text-xs uppercase tracking-widest font-bold mb-4">Sample Report Preview</p>

              {/* Score card */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 mb-4">
                <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Overall Score</p>
                <div className="flex items-end gap-2 mb-6">
                  <span
                    className="text-[#DC001A] text-6xl font-extrabold leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    87
                  </span>
                  <span className="text-[#555555] text-2xl mb-2">/100</span>
                </div>

                <div className="space-y-3.5">
                  {mockBars.map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-xs text-[#888888] mb-1.5">
                        <span>{b.label}</span>
                        <span className="text-white font-semibold">{b.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#DC001A] rounded-full"
                          style={{ width: `${b.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {["Strong Keywords", "Good Format", "Add Metrics"].map((t) => (
                  <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-[#888888] border border-white/10 rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>
      )}

      {/* ══════════════════════════════════════════
          HAS RESUMES STATE
      ══════════════════════════════════════════ */}
      {hasItems && (
        <section className="flex-1 px-10 max-md:px-4 py-10">
          {/* Page header bar */}
          <div className="flex items-center justify-between mb-8 pb-5 border-b-2 border-[#D4D4D4]">
            <div>
              <h1
                className="text-3xl font-extrabold text-[#111111]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Your Resumes
              </h1>
              <p className="text-[#888888] text-sm mt-1">
                {resumes.length} resume{resumes.length !== 1 ? "s" : ""} uploaded — click any card to view the full report
              </p>
            </div>
            <Link
              to="/upload"
              id="add-resume-btn"
              className="inline-flex items-center gap-2 bg-[#DC001A] hover:bg-[#b50015] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-[#DC001A]/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              New Resume
            </Link>
          </div>

          {/* Cards grid */}
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}