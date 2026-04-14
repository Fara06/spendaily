"use client";

import { motion } from "framer-motion";
import { Star, PlusCircle, ArrowRight } from "lucide-react";

interface SuccessProps {
    onNextMission: () => void;
    onBackToDashboard: () => void;
}

export default function Success({
    onNextMission,
    onBackToDashboard,
}: SuccessProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-xl">

            {/* 🎉 CONFETTI */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{
                            y: [0, 800],
                            opacity: [0, 1, 0],
                            x: Math.random() * 800 - 400,
                            rotate: Math.random() * 360,
                        }}
                        transition={{
                            duration: Math.random() * 2 + 2,
                            repeat: Infinity,
                            delay: Math.random(),
                        }}
                        className={`absolute top-0 left-1/2 w-3 h-3 rounded-full ${["bg-primary", "bg-secondary", "bg-tertiary"][i % 3]
                            }`}
                    />
                ))}
            </div>

            <motion.main
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl flex flex-col items-center gap-8"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-300/40 rounded-full scale-150 blur-2xl"></div>
                    <div className="relative bg-yellow-100 text-yellow-500 w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center">
                        <Star size={56} fill="currentColor" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black">
                        Mission Accomplished!
                    </h1>

                    <p className="text-gray-500 max-w-md mx-auto">
                        You completed{" "}
                        <span className="font-bold text-yellow-500">
                            "No-Spend Weekend"
                        </span>{" "}
                        mission. Keep going!
                    </p>
                </div>

                <div className="bg-yellow-100 px-6 py-3 rounded-full flex items-center gap-3">
                    <PlusCircle size={28} />
                    <span className="text-2xl font-black">+50 Points</span>
                </div>

                <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                        src="https://picsum.photos/seed/celebrate/800/600"
                        alt="celebration"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full space-y-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onNextMission}
                        className="w-full bg-blue-500 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2"
                    >
                        Next Mission
                        <ArrowRight size={20} />
                    </motion.button>

                    <button
                        onClick={onBackToDashboard}
                        className="text-sm text-gray-400 hover:text-black"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </motion.main>
        </div>
    );
}