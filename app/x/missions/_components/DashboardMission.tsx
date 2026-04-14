/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { Moon, TrendingUp, Utensils, ChevronRight, Package } from "lucide-react";
import { motion } from "motion/react";
import { useGetMissions, useGetActiveMissions } from "@/query/misi";

export default function Dashboard({
    onStartMission,
}: {
    onStartMission: (missionId: number) => void;
}) {
    const { data: missions, isLoading } = useGetMissions("all");
    const { data: activeMission } = useGetActiveMissions();

    const active = Array.isArray(activeMission) ? activeMission[0] : activeMission;

    return (
        <div className="space-y-10">
            
            {/* HEADER */}
            <header>
                <h1 className="text-4xl md:text-5xl font-black text-on-surface">
                    Missions Center
                </h1>
                <p className="text-on-surface-variant font-medium">
                    Small habits lead to big piggy banks.
                </p>
            </header>

            {/* RECOMMENDED */}
            <section>
                <h2 className="text-2xl font-extrabold mb-4">
                    Recommended for You
                </h2>

                {isLoading ? (
                    <p className="text-sm text-on-surface-variant">Loading...</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {missions?.slice(0, 3).map((m) => (
                            <MissionCard
                                key={m.id}
                                id={m.id}
                                title={m.title}
                                desc={m.description}
                                color={m.color}
                                onStart={onStartMission}
                            />
                        ))}
                    </div>
                )}
            </section>

            <div className="grid grid-cols-12 gap-6">

                {/* INSIGHT */}
                <motion.section className="col-span-12 lg:col-span-8 bg-tertiary-container p-8 rounded-xl marshmallow-shadow">
                    <span className="bg-tertiary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        New Insight
                    </span>

                    <h2 className="text-3xl font-extrabold mt-4">
                        You spend a lot after 10 PM!
                    </h2>

                    <p className="mt-3 text-on-tertiary-container/70 italic">
                        "Late night browsing is leading to late night buying."
                    </p>
                </motion.section>

                {/* STATS */}
                <motion.section className="col-span-12 lg:col-span-4 bg-surface-container-high p-8 rounded-xl marshmallow-shadow text-center">
                    <TrendingUp className="mx-auto text-primary mb-3" size={40} />
                    <h3 className="text-xs font-bold uppercase text-on-surface-variant">
                        Total Spent This Week
                    </h3>
                    <p className="text-4xl font-black mt-2">$428.50</p>
                </motion.section>

                {/* ACTIVE MISSION */}
                <section className="col-span-12">
                    <h2 className="text-2xl font-extrabold mb-4">Active Mission</h2>

                    {active ? (
                        <motion.div className="bg-surface-container-low p-6 rounded-xl marshmallow-shadow border-l-8 border-secondary">
                            <div className="flex justify-between items-center gap-6">

                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center">
                                        <Utensils className="text-secondary" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {active.mission?.title}
                                        </h3>
                                        <p className="text-sm text-on-surface-variant">
                                            {active.mission?.description}
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
                                            animate={{ width: `${active.progress ?? 0}%` }}
                                            className="h-full bg-secondary"
                                        />
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ) : (
                        <p className="text-sm text-on-surface-variant">
                            No active mission
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
}

function MissionCard({
    id,
    title,
    desc,
    color,
    onStart,
}: {
    id: number;
    title: string;
    desc: string;
    color?: string;
    onStart: (id: number) => void;
}) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl bg-surface-container-low marshmallow-shadow"
        >
            <div
                className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white"
                style={{ backgroundColor: color || "#6366f1" }}
            >
                <Package size={20} />
            </div>

            <h4 className="font-bold text-lg">{title}</h4>
            <p className="text-sm text-on-surface-variant mt-1">{desc}</p>

            {/* ✅ START BUTTON */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onStart(id)}
                className="mt-4 w-full bg-primary text-white py-2 rounded-lg text-sm font-bold">
                Start Mission
            </motion.button>
        </motion.div>
    );
}