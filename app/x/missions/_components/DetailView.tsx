"use client";

import { useGetUserMissionById, useVerifyMissionDay } from "@/query/misi";
import { Loader2, AlertCircle, CheckCircle2, Flame, Lock, Clock, Gift, Trophy, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getMissionIcon } from "./getMissionIcon";

export default function DetailView({
    missionId,
    onComplete,
    onBack,
}: {
    missionId: number;
    onComplete: () => void;
    onBack: () => void;
}) {
    const { data, isLoading } = useGetUserMissionById(missionId);
    const { mutate: verify, isPending } = useVerifyMissionDay();

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center py-20 gap-3 text-gray-400">
                <AlertCircle />
                <p className="font-bold">Mission tidak ditemukan</p>
                <button onClick={onBack} className="text-primary font-bold">
                    ← Kembali
                </button>
            </div>
        );
    }

    const mission = data.mission;
    const progress = data.progress ?? 0;
    const target = mission.target_value ?? 1;

    const pct = Math.min((progress / target) * 100, 100);
    const isComplete = pct >= 100;

    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (pct / 100) * circumference;

    const handleVerify = () => {
        verify(data.id, {
            onSuccess: () => {
                if (isComplete) onComplete();
            },
        });
    };

    return (
        <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">

            {/* HEADER */}
            <div className="bg-white p-6 rounded-3xl border">
                <div className="flex gap-4">
                    <div className="text-4xl">
                        {getMissionIcon(mission.title)}
                    </div>

                    <div>
                        <h2 className="text-2xl font-black">{mission.title}</h2>
                        <p className="text-sm text-gray-500">{mission.description}</p>

                        <div className="flex gap-2 mt-2">
                            <span className="text-xs flex items-center gap-1">
                                <Clock size={12} /> {mission.duration} hari
                            </span>
                            <span className="text-xs flex items-center gap-1 text-amber-600">
                                <Gift size={12} /> {mission.reward_points} pts
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROGRESS RING */}
            <div className="bg-white p-8 rounded-3xl border flex flex-col items-center gap-4">

                <div className="relative w-36 h-36">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            stroke="currentColor"
                            strokeWidth="10"
                            className="text-gray-200"
                            fill="none"
                        />

                        <motion.circle
                            cx="60"
                            cy="60"
                            r="54"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray={circumference}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1 }}
                            className="text-primary"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-3xl font-black">{Math.round(pct)}%</p>
                        <p className="text-xs text-gray-400">Progress</p>
                    </div>
                </div>

                <p className="text-lg font-black">
                    {progress} / {target}
                </p>

                {/* BUTTON */}
                {isComplete ? (
                    <button
                        onClick={onComplete}
                        className="bg-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2"
                    >
                        <Trophy size={16} /> Ambil Reward
                    </button>
                ) : (
                    <button
                        onClick={handleVerify}
                        disabled={isPending}
                        className="bg-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 disabled:opacity-60"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" size={16} />
                        ) : (
                            <CheckCircle2 size={16} />
                        )}
                        Verify Hari Ini
                    </button>
                )}
            </div>

            {/* DAILY STEPS */}
            <div className="bg-white p-6 rounded-3xl border">
                <h3 className="font-black mb-4 flex items-center gap-2">
                    <Calendar size={16} /> Daily Progress
                </h3>

                <div className="space-y-3">
                    {Array.from({ length: target }).map((_, i) => {
                        const done = i < progress;
                        const current = i === progress;

                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-3 p-3 rounded-xl ${done
                                        ? "bg-green-50"
                                        : current
                                            ? "bg-amber-50"
                                            : "bg-gray-50"
                                    }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${done
                                            ? "bg-green-500 text-white"
                                            : current
                                                ? "bg-amber-500 text-white"
                                                : "bg-gray-200"
                                        }`}
                                >
                                    {done ? (
                                        <CheckCircle2 size={14} />
                                    ) : current ? (
                                        <Flame size={14} />
                                    ) : (
                                        <Lock size={14} />
                                    )}
                                </div>

                                <div>
                                    <p className="font-bold text-sm">Hari {i + 1}</p>
                                    <p className="text-xs text-gray-500">
                                        {done
                                            ? "Selesai"
                                            : current
                                                ? "Hari ini"
                                                : "Terkunci"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                onClick={onBack}
                className="w-full text-sm text-red-400 font-bold"
            >
                Menyerah & Kembali
            </button>
        </div>
    );
}