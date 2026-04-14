"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Lock, Info } from "lucide-react";

interface MissionDetailProps {
    onComplete: () => void;
    onBack: () => void;
}

export default function MissionDetail({ onComplete, onBack }: MissionDetailProps) {
    return (
        <div className="max-w-5xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-secondary font-bold">
                        <Star size={16} fill="currentColor" />
                        <span className="uppercase tracking-[0.2em] text-[10px] font-black">
                            Active Mission
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        No Late Night Spending
                    </h1>

                    <p className="text-on-surface-variant text-lg font-medium">
                        Keep your wallet tucked away after 9:00 PM.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="bg-surface-container-high px-6 py-3 rounded-xl font-bold">
                        View Rules
                    </button>

                    <button
                        onClick={onBack}
                        className="bg-red-500/10 text-red-500 px-6 py-3 rounded-xl font-bold"
                    >
                        Give Up
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-7 bg-primary/10 rounded-xl p-10 text-center"
                >
                    <div className="relative w-64 h-64 mx-auto">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="50%" cy="50%" r="45%"
                                stroke="gray"
                                strokeWidth="20"
                                fill="transparent"
                            />
                            <motion.circle
                                cx="50%" cy="50%" r="45%"
                                stroke="white"
                                strokeWidth="20"
                                fill="transparent"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 150 }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black">1/3</span>
                            <span className="text-xs uppercase">Days</span>
                        </div>
                    </div>

                    <p className="mt-6 font-bold">
                        You saved <span className="text-xl">$42.50</span>
                    </p>
                </motion.div>

                <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-xl font-bold">Daily Log</h3>

                    <LogItem
                        status="completed"
                        title="Day 1"
                        desc="Success"
                    />

                    <LogItem
                        status="current"
                        title="Day 2"
                        desc="In progress"
                        onAction={onComplete}
                    />

                    <LogItem
                        status="locked"
                        title="Day 3"
                        desc="Locked"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-yellow-100 p-4 rounded-xl flex gap-3"
                    >
                        <Info />
                        <p className="text-sm">
                            Stay consistent to maximize savings!
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

type LogItemProps = {
    status: "completed" | "current" | "locked" | "failed";
    title: string;
    desc: string;
    onAction?: () => void;
};

function LogItem({ status, title, desc, onAction }: LogItemProps) {
    return (
        <motion.div
            whileHover={{ x: 5 }}
            className="p-4 rounded-xl bg-gray-100 flex justify-between items-center"
        >
            <div className="flex items-center gap-3">
                {status === "completed" && <CheckCircle />}
                {status === "locked" && <Lock />}

                <div>
                    <p className="font-bold">{title}</p>
                    <p className="text-xs">{desc}</p>
                </div>
            </div>

            {status === "current" && (
                <button
                    onClick={onAction}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs"
                >
                    Verify
                </button>
            )}
        </motion.div>
    );
}