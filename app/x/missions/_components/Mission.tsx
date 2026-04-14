"use client";

import {
    Moon,
    Star,
    Sofa,
    Edit3,
    Verified,
    Plus,
    Utensils,
    Footprints,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetMissions } from "@/query/misi";
import type { Mission, User } from "@/core/types";

interface MissionsProps {
    user: User;
    onMissionClick: (missionId: string) => void;
}

export default function Missions({ user, onMissionClick }: MissionsProps) {
    const { data: missions, isLoading } = useGetMissions("all");

    const featured = missions?.[0];
    const secondary = missions?.[1];
    const longTerm = missions?.[2];

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {/* HEADER */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-secondary font-black mb-2 block">
                        Active Challenges
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-on-surface">
                        Available Missions
                    </h1>
                </div>

                <div className="bg-tertiary-container px-6 py-3 rounded-xl flex items-center gap-3 marshmallow-shadow">
                    <Star size={20} className="text-primary fill-primary" />
                    <span className="font-bold text-on-tertiary-container">
                        {user.points.toLocaleString()} Pts
                    </span>
                </div>
            </section>

            {/* LOADING */}
            {isLoading ? (
                <p className="text-sm text-on-surface-variant">Loading missions...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* FEATURED MISSION */}
                    {featured && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="md:col-span-8 bg-surface-container-low rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center marshmallow-shadow relative overflow-hidden"
                        >
                            <div className="absolute -right-16 -top-16 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl" />

                            <div className="z-10 bg-secondary-container w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center">
                                <Moon size={48} className="text-secondary" />
                            </div>

                            <div className="z-10 flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold">{featured.title}</h2>
                                <p className="text-sm text-on-surface-variant mt-2">
                                    {featured.description}
                                </p>

                                <div className="flex gap-3 mt-5 flex-wrap justify-center md:justify-start">
                                    <Badge label={`${featured.duration} Days`} />
                                    <Badge label={`${featured.reward_points} Pts`} color="primary" />
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onMissionClick(String(featured.id))}
                                className="bg-primary text-surface px-8 py-4 rounded-xl font-bold"
                            >
                                Start Now
                            </motion.button>
                        </motion.div>
                    )}

                    {secondary && (
                        <motion.div className="md:col-span-4 bg-primary-container/20 rounded-xl p-8 marshmallow-shadow">
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-primary-container w-16 h-16 rounded-lg flex items-center justify-center">
                                    <Sofa className="text-primary" />
                                </div>
                                <span className="text-[10px] font-black uppercase text-primary/60">
                                    Flash Mission
                                </span>
                            </div>

                            <h3 className="text-xl font-bold">{secondary.title}</h3>
                            <p className="text-sm text-on-surface-variant mt-2">
                                {secondary.description}
                            </p>

                            <div className="mt-6 flex justify-between">
                                <span className="text-secondary font-bold">
                                    {secondary.reward_points} Pts
                                </span>
                                <span className="text-[10px] font-black uppercase">
                                    {secondary.duration} Days
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {longTerm && (
                        <motion.div className="md:col-span-6 bg-tertiary-container/20 rounded-xl p-8 flex gap-6 items-center marshmallow-shadow">
                            <div className="bg-tertiary-container w-20 h-20 rounded-xl flex items-center justify-center">
                                <Edit3 className="text-tertiary" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{longTerm.title}</h3>
                                <p className="text-sm text-on-surface-variant mt-1">
                                    {longTerm.description}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-lg font-black text-tertiary">
                                    {longTerm.reward_points}
                                </div>
                                <div className="text-[10px] uppercase">Pts</div>
                            </div>
                        </motion.div>
                    )}

                    <motion.div className="md:col-span-6 bg-surface-container-high rounded-xl p-8 marshmallow-shadow">
                        <div className="flex justify-between">
                            <h3 className="font-bold">Mission Progress</h3>
                            <span className="text-xs text-secondary font-black">
                                Level 5
                            </span>
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span>XP to Level 6</span>
                                <span>850 / 1000</span>
                            </div>

                            <div className="h-3 bg-surface-container-lowest rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    className="h-full bg-secondary"
                                />
                            </div>
                        </div>

                        <div className="mt-6 text-xs flex items-center gap-2 text-on-surface-variant">
                            <Verified size={14} className="text-secondary" />
                            Complete 2 more missions for bonus XP
                        </div>
                    </motion.div>

                    <motion.div className="md:col-span-4 border-4 border-dashed rounded-xl p-8 flex flex-col items-center justify-center opacity-60 hover:opacity-100 cursor-pointer">
                        <Plus className="mb-3" />
                        <span className="text-xs font-black uppercase">
                            Request Mission
                        </span>
                    </motion.div>

                    <div className="md:col-span-8 grid grid-cols-2 gap-6">
                        {missions?.slice(3, 5).map((m: Mission) => (
                            <SmallMissionCard
                                key={m.id}
                                title={m.title}
                                pts={m.reward_points}
                                icon={m.type === "meal_prep" ? Utensils : Footprints}
                                progress={m.target_value || 0}
                                color="primary"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function Badge({
    label,
    color = "secondary",
}: {
    label: string;
    color?: "primary" | "secondary";
}) {
    return (
        <div
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${color === "primary"
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
        >
            {label}
        </div>
    );
}

function SmallMissionCard({
    icon: Icon,
    title,
    pts,
    progress,
    color,
}: {
    icon: any;
    title: string;
    pts: number;
    progress: number;
    color: "primary" | "secondary";
}) {
    return (
        <div className="bg-surface-container-low rounded-xl p-6 marshmallow-shadow">
            <div className="flex justify-between items-center">
                <Icon size={20} className="text-primary" />
                <span className="text-[10px] font-black">{pts} PTS</span>
            </div>

            <h4 className="font-bold mt-3">{title}</h4>

            <div className="h-1.5 bg-surface-container-highest rounded-full mt-4 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full ${color === "primary" ? "bg-primary" : "bg-secondary"}`}
                />
            </div>
        </div>
    );
}