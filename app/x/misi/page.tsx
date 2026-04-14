"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Moon,
    TrendingUp,
    ChevronRight,
    Coffee,
    Footprints,
    Package,
    Star,
    CheckCircle2,
    Lock,
    ArrowRight,
} from "lucide-react";

import {
    useGetMissions,
    useGetActiveMissions,
} from "@/query/misi";

export default function App() {
    const [activeTab, setActiveTab] = useState("missions");
    const [view, setView] = useState<
        "center" | "available" | "progress" | "success"
    >("center");

    // 🔥 QUERY
    const { data: missions, isLoading } = useGetMissions();
    const { data: activeMissions } = useGetActiveMissions();

    const active = activeMissions?.[0];

    return (
        <div className="min-h-screen bg-surface">
            <main className="pt-24 pb-20 md:pl-80 px-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {/* ================= CENTER ================= */}
                    {view === "center" && (
                        <motion.div
                            key="center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            <header>
                                <h1 className="text-4xl md:text-5xl font-black">
                                    Missions Center
                                </h1>
                                <p className="text-on-surface-variant">
                                    Small habits lead to big piggy banks.
                                </p>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Insight */}
                                <section className="lg:col-span-8 bg-tertiary-container p-8 rounded-xl">
                                    <h2 className="text-3xl font-extrabold">
                                        You spend a lot after 10 PM!
                                    </h2>

                                    <button
                                        onClick={() => setView("available")}
                                        className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-bold flex gap-2"
                                    >
                                        <Moon size={18} />
                                        Start Mission
                                    </button>
                                </section>

                                {/* Stats */}
                                <section className="lg:col-span-4 bg-surface-container-high p-8 rounded-xl text-center">
                                    <TrendingUp className="mx-auto mb-3 text-primary" />
                                    <p className="text-4xl font-black">$428.50</p>
                                </section>

                                {/* ================= ACTIVE MISSION ================= */}
                                <section className="lg:col-span-12">
                                    <h2 className="text-2xl font-bold mb-4">
                                        Active Mission
                                    </h2>

                                    {active ? (
                                        <div className="bg-surface-container-low p-6 rounded-xl border-l-8 border-secondary">
                                            <div className="flex justify-between items-center gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center">
                                                        <Coffee />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-bold text-lg">
                                                            {active.mission.title}
                                                        </h3>
                                                        <p className="text-sm text-on-surface-variant">
                                                            {active.mission.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex-1 max-w-md">
                                                    <div className="flex justify-between text-xs font-bold mb-1">
                                                        <span>Progress</span>
                                                        <span>{active.progress ?? 0}%</span>
                                                    </div>

                                                    <div className="h-4 bg-surface-container-high rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{
                                                                width: `${active.progress ?? 0}%`,
                                                            }}
                                                            className="h-full bg-secondary"
                                                        />
                                                    </div>
                                                </div>

                                                <button className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center">
                                                    <ChevronRight />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-on-surface-variant">
                                            No active mission
                                        </p>
                                    )}
                                </section>

                                {/* ================= RECOMMENDED ================= */}
                                <section className="lg:col-span-12">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Recommended
                                    </h2>

                                    {isLoading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <div className="grid md:grid-cols-3 gap-6">
                                            {missions?.slice(0, 3).map((m) => (
                                                <MissionCard
                                                    key={m.id}
                                                    title={m.title}
                                                    desc={m.description}
                                                    color={m.color}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </section>
                            </div>
                        </motion.div>
                    )}

                    {view === "available" && (
                        <motion.div key="available">
                            <h1 className="text-4xl font-black mb-6">
                                Available Missions
                            </h1>

                            <div className="grid md:grid-cols-3 gap-6">
                                {missions?.map((m) => (
                                    <div
                                        key={m.id}
                                        className="p-6 rounded-xl bg-surface-container-low"
                                    >
                                        <h3 className="font-bold text-lg">
                                            {m.title}
                                        </h3>
                                        <p className="text-sm text-on-surface-variant">
                                            {m.description}
                                        </p>

                                        <button
                                            onClick={() => setView("progress")}
                                            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
                                        >
                                            Start
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}


function MissionCard({
    title,
    desc,
    color,
}: {
    title: string;
    desc: string;
    color: string; 
}) {
    const colorMap: Record<string, string> = {
        primary: "bg-primary-container text-primary",
        secondary: "bg-secondary-container text-secondary",
        tertiary: "bg-tertiary-container text-tertiary",
    };

    const finalColor = colorMap[color] || "bg-surface-container-high text-on-surface";

    return (
        <div className="p-6 rounded-xl bg-surface-container-low">
            <div
                className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${finalColor}`}
            >
                <Package size={20} />
            </div>

            <h4 className="font-bold text-lg">{title}</h4>
            <p className="text-sm text-on-surface-variant mt-1">
                {desc}
            </p>
        </div>
    );
}