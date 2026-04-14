"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Lock, Info } from "lucide-react";
import { useGetUserMissionById, useVerifyMissionDay } from "@/query/misi";

interface MissionDetailProps {
    missionId: number | null;
    onComplete: () => void;
    onBack: () => void;
}

export default function MissionDetail({
    missionId,
    onComplete,
    onBack,
}: MissionDetailProps) {

    const { data, isLoading } = useGetUserMissionById(missionId || 0);
    const { mutate: verifyMission, isPending } = useVerifyMissionDay();

    if (!missionId) return <p>No mission selected</p>;
    if (isLoading) return <p>Loading...</p>;

    const mission = data?.mission;

    const progress = data?.progress || 0;
    const target = mission?.target_value || 1;

    const percentage = Math.min((progress / target) * 100, 100);

    const handleVerify = () => {
        verifyMission(data!.id, {
            onSuccess: () => {
                if (percentage >= 100) {
                    onComplete();
                }
            },
        });
    };

    return (
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black">
                        {mission?.title}
                    </h1>

                    <p className="text-on-surface-variant text-lg">
                        {mission?.description}
                    </p>
                </div>

                <button
                    onClick={onBack}
                    className="bg-red-500/10 text-red-500 px-6 py-3 rounded-xl font-bold"
                >
                    Give Up
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* PROGRESS */}
                <motion.div className="lg:col-span-7 bg-primary/10 rounded-xl p-10 text-center">
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
                                animate={{
                                    strokeDashoffset: 283 - (283 * percentage) / 100,
                                }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black">
                                {progress} / {target}
                            </span>
                            <span className="text-xs uppercase">Progress</span>
                        </div>
                    </div>
                </motion.div>

                {/* ACTION */}
                <div className="lg:col-span-5 space-y-6">
                    <h3 className="text-xl font-bold">Action</h3>

                    <button
                        onClick={handleVerify}
                        disabled={isPending}
                        className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold"
                    >
                        {isPending ? "Verifying..." : "Verify Today"}
                    </button>

                    {percentage >= 100 && (
                        <button
                            onClick={onComplete}
                            className="w-full bg-green-500 text-white py-3 rounded-xl font-bold"
                        >
                            Claim Reward
                        </button>
                    )}
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