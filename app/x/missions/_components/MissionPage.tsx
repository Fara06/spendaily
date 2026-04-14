"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft } from "lucide-react";
import { useAuth } from "@/core/providers/Auth-context";
import { useGetActiveMissions, useStartMission } from "@/query/misi";
import { useQueryClient } from "@tanstack/react-query";

import DashboardView from "./DashboardMission";
import ListView from "./ListItem";
import DetailView from "./DetailView";
import SuccessView from "./Success";

type View = "dashboard" | "list" | "detail" | "success";

export default function MissionsPage() {
    const [view, setView] = useState<View>("dashboard");
    const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { mutate: startMission } = useStartMission();
    const { data: activeMissions } = useGetActiveMissions();

    const active = activeMissions?.[0] ?? null;

    useEffect(() => setMounted(true), []);

    const refresh = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["user-missions"] });
        queryClient.invalidateQueries({ queryKey: ["user-missions", "active"] });
    }, [queryClient]);

    const handleStart = (id: number) => {
        if (active) return alert("Kamu sudah punya mission aktif!");

        startMission(id, {
            onSuccess: (res) => {
                setSelectedMissionId(res.id);
                refresh();
                setView("detail");
            },
        });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#FDF8F3]">

            {/* HEADER */}
            <header className="sticky top-0 z-30 bg-[#FDF8F3]/80 backdrop-blur-xl border-b px-6 py-4 flex justify-between">
                <div className="flex items-center gap-3">
                    {view !== "dashboard" && (
                        <button
                            onClick={() => setView("dashboard")}
                            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}

                    <h1 className="text-xl font-black text-primary">
                        {view === "dashboard" && "Missions"}
                        {view === "list" && "All Missions"}
                        {view === "detail" && "Mission Detail"}
                        {view === "success" && "Success 🎉"}
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black">
                        {user?.points?.toLocaleString() ?? 0}
                    </span>
                </div>
            </header>

            {/* BODY */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    {view === "dashboard" && (
                        <DashboardView
                            user={user}
                            active={active}
                            onOpenList={() => setView("list")}
                            onActiveClick={() => {
                                if (!active) return;
                                setSelectedMissionId(active.id);
                                setView("detail");
                            }}
                            onStart={handleStart}
                        />
                    )}

                    {view === "list" && (
                        <ListView
                            onStart={(id) => {
                                setSelectedMissionId(id);
                                setView("detail");
                            }}
                        />
                    )}

                    {view === "detail" && selectedMissionId && (
                        <DetailView
                            missionId={selectedMissionId}
                            onBack={() => setView("dashboard")}
                            onComplete={() => {
                                refresh();
                                setView("success");
                            }}
                        />
                    )}

                    {view === "success" && selectedMissionId && (
                        <SuccessView
                            missionId={selectedMissionId}
                            onNext={() => {
                                setSelectedMissionId(null);
                                setView("list");
                            }}
                            onBack={() => {
                                refresh();
                                setView("dashboard");
                            }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}