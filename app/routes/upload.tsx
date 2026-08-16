"use client";

import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import { FileText, Key, AlignLeft, TrendingUp } from "lucide-react";

export const links = () => [
  {
    rel: "canonical",
    href: "https://rayulumukku.com/projects/ai-resume-analyzer/upload",
  },
];

export const meta = () => [
  { name: "robots", content: "index, follow" },
  { title: "Upload Resume — Resumind" },
  {
    name: "description",
    content:
      "Upload your resume PDF and let AI analyze it for ATS compatibility, keyword gaps, and provide tailored improvement suggestions.",
  },
  { name: "author", content: "Rayulu Mukku" },
  { name: "theme-color", content: "#DC001A" },
  /* OG */
  { property: "og:site_name",   content: "Resumind" },
  { property: "og:type",        content: "website" },
  { property: "og:url",         content: "https://rayulumukku.com/projects/ai-resume-analyzer/upload" },
  { property: "og:title",       content: "Upload Resume — Resumind" },
  { property: "og:description", content: "Get your resume analyzed by AI. ATS score, keyword gaps, and improvement tips in seconds." },
  { property: "og:image",       content: "https://rayulumukku.com/projects/ai-resume-analyzer/images/resume_01.png" },
  /* Twitter */
  { name: "twitter:card",        content: "summary_large_image" },
  { name: "twitter:title",       content: "Upload Resume — Resumind" },
  { name: "twitter:description", content: "Get your resume analyzed by AI. ATS score, keyword gaps, and improvement tips in seconds." },
  { name: "twitter:image",       content: "https://rayulumukku.com/projects/ai-resume-analyzer/images/resume_01.png" },
  { name: "twitter:creator",     content: "@rayulumukku" },
];


const tips = [
  { icon: FileText,    title: "Use a clean layout",    body: "Single column, clear sections, no tables or graphics that confuse ATS." },
  { icon: Key,         title: "Include keywords",      body: "Mirror the exact phrases from the job description — ATS matches literally." },
  { icon: AlignLeft,   title: "Keep it to 1–2 pages", body: "Recruiters spend ~7 seconds per resume. Stay concise and relevant." },
  { icon: TrendingUp,  title: "Quantify achievements", body: "Use numbers: \"Improved load time by 40%\" beats \"improved performance\"." },
];

const steps = ["Upload PDF", "Fill Details", "Analyze"];

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => setFile(file);

  const handleAnalyze = async ({
    companyName, jobTitle, jobDescription, file,
  }: { companyName: string; jobTitle: string; jobDescription: string; file: File }) => {
    setIsProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = { id: uuid, resumePath: uploadedFile.path, imagePath: uploadedImage.path, companyName, jobTitle, jobDescription, feedback: "" };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing with AI...");
    const feedback = await ai.feedback(uploadedFile.path, prepareInstructions({ jobTitle, jobDescription }));
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText = typeof feedback.message.content === "string"
      ? feedback.message.content
      : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form || !file) return;
    const fd = new FormData(form);
    handleAnalyze({
      companyName: fd.get("company-name") as string,
      jobTitle:    fd.get("job-title") as string,
      jobDescription: fd.get("job-description") as string,
      file,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <Navbar />

      {/* ── Processing overlay ── */}
      {isProcessing && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-20">
          <img src="/images/resume-scan.gif" className="w-64 max-w-full" alt="analyzing" />
          <div className="text-center">
            <p className="text-[#111111] text-xl font-bold mb-1">{statusText}</p>
            <p className="text-[#888888] text-sm">This may take a moment…</p>
          </div>
          {/* Step indicators */}
          <div className="flex items-center gap-3 mt-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
                  ${i < 2 ? "bg-[#DC001A] text-white" : "bg-[#E8E8E8] text-[#888888]"}`}>
                  {i + 1}
                </div>
                <span className={`text-sm font-medium ${i < 2 ? "text-[#111111]" : "text-[#888888]"}`}>{s}</span>
                {i < steps.length - 1 && <div className="w-8 h-px bg-[#D4D4D4]" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Two-column form layout ── */}
      {!isProcessing && (
        <div className="flex flex-1 max-lg:flex-col">

          {/* LEFT — Form panel */}
          <div className="flex-1 px-12 max-md:px-6 py-12 flex flex-col justify-start max-w-2xl">
            {/* Section heading */}
            <div className="mb-8">

              <h1
                className="text-4xl font-extrabold text-[#111111] leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Analyze Your Resume
              </h1>
              <p className="text-[#888888] mt-2 text-base">
                Fill in the job details and upload your PDF to get an instant AI review.
              </p>
            </div>

            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
              {/* Row: Company + Job Title side by side */}
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input type="text" name="company-name" placeholder="e.g. Google" id="company-name" />
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input type="text" name="job-title" placeholder="e.g. Frontend Engineer" id="job-title" />
                </div>
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5} name="job-description" placeholder="Paste the job description here…" id="job-description" />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Resume PDF</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button
                id="analyze-btn"
                className="mt-2 w-full bg-[#DC001A] hover:bg-[#b50015] text-white font-bold py-4 rounded-xl text-base transition-colors shadow-lg shadow-[#DC001A]/20 flex items-center justify-center gap-2"
                type="submit"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6zM9 3v6h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Analyze Resume
              </button>
            </form>
          </div>

          {/* RIGHT — Tips & info sidebar */}
          <div className="w-[380px] max-lg:w-full bg-[#111111] flex flex-col px-10 max-md:px-6 py-12 relative overflow-hidden">
            {/* Red top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#DC001A]" />
            {/* Decorative circle */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border border-[#DC001A]/10" />

            <p className="text-[#888888] text-xs uppercase tracking-widest font-bold mb-6 relative z-10">
              Tips for a Great Resume
            </p>

            <div className="flex flex-col gap-5 relative z-10">
              {tips.map((t) => (
                <div key={t.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <t.icon size={18} className="text-[#DC001A]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold mb-0.5">{t.title}</p>
                    <p className="text-[#888888] text-xs leading-relaxed">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-white/10 relative z-10" />

            {/* Stat block */}
            <div className="flex gap-6 relative z-10">
              {[["< 30s", "Analysis time"], ["95%", "Accuracy rate"], ["10k+", "Resumes analyzed"]].map(([val, lbl]) => (
                <div key={lbl} className="text-center">
                  <p className="text-[#DC001A] text-xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{val}</p>
                  <p className="text-[#888888] text-[10px] uppercase tracking-wider">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Upload;