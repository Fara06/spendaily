/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Star, PlusCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useGetUserMissionById, useClaimMissionReward } from "@/query/misi";

interface SuccessProps {
    missionId: number | null;
    onNextMission: () => void;
    onBackToDashboard: () => void;
}

export default function Success({
    missionId,
    onNextMission,
    onBackToDashboard,
}: SuccessProps) {

    const { data, isLoading } = useGetUserMissionById(missionId || 0);
    const { mutate: claimReward, isPending } = useClaimMissionReward();

    const [confetti] = useState(() =>
        [...Array(12)].map(() => ({
            x: Math.random() * 800 - 400,
            rotate: Math.random() * 360,
            duration: Math.random() * 2 + 2,
            delay: Math.random(),
        }))
    );

    if (!missionId) return null;
    if (isLoading) return <p>Loading...</p>;

    const mission = data?.mission;

    const handleClaim = () => {
        claimReward(data!.id, {
            onSuccess: () => {
                onNextMission();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-xl">

            {/* CONFETTI */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {confetti.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{
                            y: [0, 800],
                            opacity: [0, 1, 0],
                            x: item.x,
                            rotate: item.rotate,
                        }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            delay: item.delay,
                        }}
                        className={`absolute top-0 left-1/2 w-3 h-3 rounded-full ${
                            ["bg-primary", "bg-secondary", "bg-tertiary"][i % 3]
                        }`}
                    />
                ))}
            </div>

            <motion.main
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl p-8 text-center shadow-2xl flex flex-col items-center gap-8"
            >
                {/* ICON */}
                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-300/40 rounded-full scale-150 blur-2xl"></div>
                    <div className="relative bg-yellow-100 text-yellow-500 w-24 h-24 rounded-full flex items-center justify-center">
                        <Star size={56} fill="currentColor" />
                    </div>
                </div>

                {/* TEXT */}
                <div>
                    <h1 className="text-4xl font-black">
                        Mission Accomplished!
                    </h1>

                    <p className="text-gray-500">
                        You completed{" "}
                        <span className="font-bold text-yellow-500">
                            "{mission?.title}"
                        </span>
                    </p>
                </div>

                {/* REWARD */}
                <div className="bg-yellow-100 px-6 py-3 rounded-full flex items-center gap-3">
                    <PlusCircle size={28} />
                    <span className="text-2xl font-black">
                        +{mission?.reward_points} Points
                    </span>
                </div>

                {/* IMAGE */}
                <div className="w-full h-48 rounded-lg overflow-hidden relative">
                    <Image
                        src="https://picsum.photos/seed/celebrate/800/600"
                        alt="celebration"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* ACTION */}
                <div className="w-full space-y-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClaim}
                        disabled={isPending}
                        className="w-full bg-blue-500 text-white py-4 rounded-full font-bold"
                    >
                        {isPending ? "Claiming..." : "Claim Reward"}
                    </motion.button>

                    <button
                        onClick={onBackToDashboard}
                        className="text-sm text-gray-400"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </motion.main>
        </div>
    );
}