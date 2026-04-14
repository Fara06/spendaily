/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Moon,
    Star,
    Plus,
} from "lucide-react";
import { motion } from "framer-motion"; // Pastikan import dari framer-motion atau motion/react sesuai setup
import { useGetMissions, useStartMission } from "@/query/misi";
import type { Mission, User } from "@/core/types";
import { useState } from "react";

// Perbaiki Interface agar konsisten dengan data yang dikirim App
interface MissionsProps {
    user: User | null;
    onMissionClick: (missionId: number) => void;
}

export default function Missions({ user, onMissionClick }: MissionsProps) {
    const { data: missions, isLoading } = useGetMissions("all");
    const { mutate: startMission } = useStartMission();

    const [loadingId, setLoadingId] = useState<number | null>(null);

    // Destructuring missions dengan safe-guarding
    const featured = missions?.find((m) => m.is_featured) || missions?.[0];
    const secondary = missions?.[1];
    const longTerm = missions?.[2];

    const handleStart = (id: number) => {
        setLoadingId(id);

        startMission(id, {
            onSuccess: () => {
                setLoadingId(null);
                onMissionClick(id);
            },
            onError: () => {
                setLoadingId(null);
            },
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {/* HEADER */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-blue-500 font-black mb-2 block">
                        Active Challenges
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                        Available Missions
                    </h1>
                </div>

                <div className="bg-amber-50 px-6 py-3 rounded-xl flex items-center gap-3 border border-amber-100 shadow-sm">
                    <Star size={20} className="text-amber-500 fill-amber-500" />
                    <span className="font-bold text-amber-900">
                        {user?.points?.toLocaleString() ?? 0} Pts
                    </span>
                </div>
            </section>

            {/* CONTENT */}
            {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    Loading missions...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* FEATURED */}
                    {featured && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="md:col-span-8 bg-slate-50 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center border border-slate-100 shadow-sm"
                        >
                            <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center shrink-0">
                                <Moon size={48} className="text-blue-600" />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-900">{featured.title}</h2>
                                <p className="text-slate-600 mt-2 line-clamp-2">
                                    {featured.description}
                                </p>

                                <div className="flex gap-3 mt-5">
                                    <Badge label={`${featured.duration} Days`} />
                                    <Badge label={`${featured.reward_points} Pts`} variant="primary" />
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                disabled={loadingId !== null}
                                onClick={() => handleStart(featured.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold disabled:opacity-50 transition-colors whitespace-nowrap"
                            >
                                {loadingId === featured.id ? "Starting..." : "Start Now"}
                            </motion.button>
                        </motion.div>
                    )}

                    {/* SECONDARY & LONG TERM */}
                    <div className="md:col-span-4 space-y-4">
                        {secondary && (
                            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-indigo-900">{secondary.title}</h3>
                                <p className="text-sm text-indigo-700 mt-1 line-clamp-2">{secondary.description}</p>
                            </div>
                        )}
                        {longTerm && (
                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-emerald-900">{longTerm.title}</h3>
                                <p className="text-sm text-emerald-700 mt-1 line-clamp-2">{longTerm.description}</p>
                            </div>
                        )}
                    </div>

                    {/* SMALL MISSIONS GRID */}
                    <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {missions?.slice(3, 6).map((m: Mission) => (
                            <SmallMissionCard
                                key={m.id}
                                title={m.title}
                                pts={m.reward_points}
                                // Jika progress_percentage tidak ada di type Mission, 
                                // pastikan di core/types/index.ts ditambahkan atau fallback ke 0
                                progress={(m as any).progress_percentage ?? 0}
                                onStart={() => handleStart(m.id)}
                                loading={loadingId === m.id}
                                anyLoading={loadingId !== null}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Sub-komponen Badge dengan Type Safety
function Badge({
    label,
    variant = "secondary",
}: {
    label: string;
    variant?: "primary" | "secondary";
}) {
    const styles = {
        primary: "bg-blue-100 text-blue-700",
        secondary: "bg-slate-200 text-slate-700",
    };

    return (
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[variant]}`}>
            {label}
        </div>
    );
}

function SmallMissionCard({
    title,
    pts,
    progress,
    onStart,
    loading,
    anyLoading
}: {
    title: string;
    pts: number;
    progress: number;
    onStart: () => void;
    loading: boolean;
    anyLoading: boolean;
}) {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-900 line-clamp-1">{title}</h4>
                <span className="text-xs font-bold text-blue-600">{pts} Pts</span>
            </div>

            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-blue-500"
                />
            </div>

            <button
                onClick={onStart}
                disabled={anyLoading}
                className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-sm font-bold disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
                {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <Plus size={16} />
                )}
                {loading ? "Starting..." : "Take Mission"}
            </button>
        </div>
    );
}