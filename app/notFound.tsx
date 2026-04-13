"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            <div className="fixed -bottom-40 -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(152,244,217,0.3)_0%,rgba(255,255,255,0)_70%)] -z-10 pointer-events-none" />
            <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(253,181,204,0.2)_0%,rgba(255,255,255,0)_70%)] -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center px-6"
            >
                <h1 className="text-9xl font-black text-primary tracking-tighter">404</h1>
                <p className="text-2xl font-extrabold text-slate-800 mt-4">Oops! Page Not Found</p>
                <p className="text-slate-500 font-medium mt-2">
                    You need to login first to access this page.
                </p>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity"
                >
                    Go to Login
                </Link>
            </motion.div>
        </div>
    );
}