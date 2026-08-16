import { Link, useLocation } from "react-router";

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <nav className="w-full bg-[#111111] flex items-center justify-between px-8 py-0 border-b-2 border-[#DC001A]" style={{ height: "68px" }}>
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#DC001A] shrink-0">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12h6M9 8h6M9 16h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span
                    className="text-white font-extrabold text-xl tracking-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Resumind
                </span>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-6">
                <Link
                    to="/"
                    className={`text-sm font-medium transition-colors ${isHome ? "text-white" : "text-[#888888] hover:text-white"}`}
                >
                    Home
                </Link>

                {/* GitHub icon */}
                <a
                    href="https://github.com/rayulumukku/ai-resume-analyzer"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className="text-[#888888] hover:text-white transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                </a>

                {/* Personal Website icon */}
                <a
                    href="https://rayulumukku.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View developer website"
                    className="text-[#888888] hover:text-white transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                    </svg>
                </a>

                <Link
                    to="/upload"
                    className="flex items-center gap-2 bg-[#DC001A] hover:bg-[#b50015] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 16V8m0 0l-3 3m3-3l3 3M5 20h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Upload Resume
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;