"use client";

import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import Navbar from "~/components/Navbar";


export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/projects/ai-resume-analyzer/favicon.ico",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Resumind — AI Resume Analyzer" },
  {
    name: "description",
    content:
      "Resumind is a free AI-powered resume analyzer. Get your ATS compatibility score, keyword analysis, and actionable improvement tips in seconds.",
  },
  { name: "author", content: "Rayulu Mukku" },
  { name: "theme-color", content: "#DC001A" },
  { name: "robots", content: "index, follow" },

  /* Open Graph */
  { property: "og:type",        content: "website" },
  { property: "og:site_name",   content: "Resumind" },
  { property: "og:title",       content: "Resumind — AI Resume Analyzer" },
  {
    property: "og:description",
    content:
      "Free AI-powered resume analyzer. ATS score, keyword analysis, and improvement tips — instantly.",
  },
  {
    property: "og:url",
    content: "https://rayulumukku.com/projects/ai-resume-analyzer/",
  },

  /* Twitter Card */
  { name: "twitter:card",        content: "summary_large_image" },
  { name: "twitter:title",       content: "Resumind — AI Resume Analyzer" },
  {
    name: "twitter:description",
    content:
      "Free AI-powered resume analyzer. ATS score, keyword analysis, and improvement tips — instantly.",
  },
  { name: "twitter:creator",     content: "@rayulumukku" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();

  useEffect(() => {
    init()
  }, [init]);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "@id": "https://rayulumukku.com/projects/ai-resume-analyzer/#application",
              "name": "AI Resume Analyzer",
              "url": "https://rayulumukku.com/projects/ai-resume-analyzer/",
              "description": "An AI-powered resume analyzer that evaluates ATS compatibility, identifies resume weaknesses, and provides actionable suggestions for improvement.",
              "applicationCategory": "BusinessApplication",
              "applicationSubCategory": "Resume Analysis",
              "operatingSystem": "Any",
              "browserRequirements": "Requires a modern web browser",
              "isAccessibleForFree": true,
              "featureList": [
                "AI resume analysis",
                "ATS compatibility score",
                "Resume keyword analysis",
                "Resume improvement suggestions",
                "Resume weakness detection"
              ],
              "provider": {
                "@type": "Person",
                "@id": "https://rayulumukku.com/#person",
                "name": "Rayulu Mukku",
                "url": "https://rayulumukku.com/"
              }
            })
          }}
        />
      </head>
      <body>
        <script src="https://js.puter.com/v2/"></script>
        {children}
        <footer className="w-full bg-[#111111] border-t border-[#222222] py-4 px-8 flex items-center justify-center">
          <p className="text-[#888888] text-xs">
            Developed by{" "}
            <a
              href="https://rayulumukku.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#DC001A] transition-colors font-semibold"
            >
              Rayulu Mukku
            </a>
          </p>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let is404 = false;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = is404 ? "404" : "Error";
    details = is404
      ? "The requested page could not be found."
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="relative mb-6">
          <span
            className="text-9xl max-md:text-7xl font-extrabold text-[#111111] tracking-tighter opacity-90 select-none"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {message}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-[#DC001A] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-[#DC001A]/30">
              {is404 ? "Page Not Found" : "Application Error"}
            </span>
          </div>
        </div>

        <h1
          className="text-3xl max-md:text-2xl font-bold text-[#111111] mb-3 max-w-md"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {is404 ? "Lost your way?" : "Something went wrong"}
        </h1>

        <p className="text-[#888888] text-base max-w-md mb-8 leading-relaxed">
          {details}
        </p>

        {stack && (
          <pre className="w-full max-w-2xl p-4 bg-[#111111] text-red-400 rounded-xl overflow-x-auto text-left text-xs mb-8">
            <code>{stack}</code>
          </pre>
        )}

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