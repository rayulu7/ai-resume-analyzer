"use client";

import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Log In — Resumind' },
    { name: 'description', content: 'Log in to Resumind to access your AI-analyzed resumes, ATS scores, and improvement suggestions.' },
    { name: 'robots', content: 'noindex, nofollow' },
    { property: 'og:title',       content: 'Log In — Resumind' },
    { property: 'og:description', content: 'Access your AI resume analysis dashboard on Resumind.' },
    { property: 'og:type',        content: 'website' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-gradient min-h-screen flex items-center justify-center">
            <div className="shadow-xl shadow-black/10 rounded-3xl border border-[#D4D4D4]">
                <section className="flex flex-col gap-8 bg-white rounded-3xl p-12">
                    <div className="flex flex-col items-center gap-3 text-center">
                        {/* Logo mark */}
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#DC001A] shadow-md mb-2">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12h6M9 8h6M9 16h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h1 className="!text-5xl !text-[#111111]">Welcome</h1>
                        <h2 className="!text-lg !text-[#888888] font-normal">Log in to continue your job journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Log In with Puter</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth