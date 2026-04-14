"use client";

import { Trophy, Plus, Target } from "lucide-react";
import MissionCard from "./MissionCard";
import { useGetMissions } from "@/query/misi";
import { getMissionIcon } from "./getMissionIcon";

export default function DashboardView({
    user,
    active,
    onOpenList,
    onActiveClick,
    onStart,
}: any) {
    const { data: missions } = useGetMissions("all");

    const recommended = missions?.slice(0, 3) ?? [];

    return (
        <div className="px-6 py-8 max-w-4xl mx-auto space-y-8">

            {/* HERO */}
            <div className="bg-primary text-white rounded-3xl p-6">
                <Trophy />
                <h2 className="text-2xl font-black mt-2">
                    Halo, {user?.name?.split(" ")[0] ?? "User"}
                </h2>

                <button
                    onClick={onOpenList}
                    className="mt-4 bg-white text-primary px-4 py-2 rounded-full font-bold"
                >
                    <Plus size={16} /> Ambil Mission
                </button>
            </div>

            {/* ACTIVE */}
            <div>
                <h3 className="font-black mb-2">Mission Aktif</h3>

                {active ? (
                    <div
                        onClick={onActiveClick}
                        className="bg-white p-4 rounded-xl cursor-pointer"
                    >
                        <div className="text-2xl">
                            {getMissionIcon(active.mission?.title)}
                        </div>
                        <p className="font-bold">{active.mission?.title}</p>
                        <p className="text-xs">{active.progress}%</p>
                    </div>
                ) : (
                    <div className="text-center text-gray-400">
                        <Target />
                        Belum ada mission
                    </div>
                )}
            </div>

            {/* RECOMMENDED */}
            <div className="grid grid-cols-3 gap-4">
                {recommended.map((m: any, i: number) => (
                    <MissionCard
                        key={m.id}
                        mission={m}
                        index={i}
                        onStart={onStart}
                    />
                ))}
            </div>
        </div>
    );
}