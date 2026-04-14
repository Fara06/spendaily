/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./_components/DashboardMission";
import Missions from "./_components/Mission";
import MissionDetail from "./_components/MissionDetection";
import Success from "./_components/Success";
import { useAuth } from "@/core/providers/Auth-context";
import { useStartMission, useGetActiveMissions } from "@/query/misi";
import { useQueryClient } from "@tanstack/react-query";
import { Trophy, LayoutGrid, Landmark, BarChart3, Plus, LucideIcon } from "lucide-react";

type View =
    | "dashboard"
    | "missions"
    | "mission-detail"
    | "success"
    | "savings"
    | "insights";

export default function App() {
    const [currentView, setCurrentView] = useState<View>("dashboard");
    const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    const { user } = useAuth();
    const queryClient = useQueryClient();

    // isPending dihapus karena tidak digunakan (fix eslint unused-vars)
    const { mutate: startMission } = useStartMission();
    const { data: activeMissions } = useGetActiveMissions();

    const active = activeMissions?.[0] ?? null;

    useEffect(() => {
        setMounted(true);
    }, []);

    const refreshData = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["user-missions"] });
        queryClient.invalidateQueries({ queryKey: ["user-missions", "active"] });
    }, [queryClient]);

    // ✅ START MISSION
    const handleStartMission = (missionId: number) => {
        if (active) {
            alert("You already have an active mission!");
            return;
        }

        startMission(missionId, {
            onSuccess: (res) => {
                setSelectedMissionId(res.id);
                refreshData();
                setCurrentView("mission-detail");
            },
        });
    };

    // ✅ CLICK (Pindah ke detail)
    const handleMissionClick = (missionId: number) => {
        setSelectedMissionId(missionId);
        setCurrentView("mission-detail");
    };

    const handleCompleteMission = () => {
        refreshData();
        setCurrentView("success");
    };

    const handleBackToDashboard = () => {
        refreshData();
        setCurrentView("dashboard");
    };

    const handleNextMission = () => {
        setSelectedMissionId(null);
        setCurrentView("missions");
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white">
            <main className="md:ml-12 pt-24 px-6 pb-24 md:pb-12">
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="min-h-[60vh]"
                        >
                            {currentView === "dashboard" && (
                                <Dashboard onStartMission={handleStartMission} />
                            )}

                            {currentView === "missions" && (
                                <Missions
                                    // Casting ke any jika interface User vs UserData masih konflik di core/types
                                    user={user as any} 
                                    onMissionClick={handleMissionClick}
                                />
                            )}

                            {currentView === "mission-detail" && selectedMissionId && (
                                <MissionDetail
                                    missionId={selectedMissionId}
                                    onComplete={handleCompleteMission}
                                    onBack={() => setCurrentView("missions")}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* ✅ SUCCESS VIEW - Sekarang mengirim missionId (fix error 2741) */}
            {currentView === "success" && (
                <Success
                    missionId={selectedMissionId ?? 0}
                    onNextMission={handleNextMission}
                    onBackToDashboard={handleBackToDashboard}
                />
            )}

            {/* MOBILE NAV */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center p-4 z-40 border-t">
                <MobileNavItem
                    icon={LayoutGrid}
                    label="Dash"
                    active={currentView === "dashboard"}
                    onClick={() => setCurrentView("dashboard")}
                />
                <MobileNavItem
                    icon={Trophy}
                    label="Missions"
                    active={currentView === "missions"}
                    onClick={() => {
                        setSelectedMissionId(null);
                        setCurrentView("missions");
                    }}
                />
                <div className="-mt-12">
                    <button 
                        onClick={() => setCurrentView("missions")}
                        className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
                    >
                        <Plus size={28} />
                    </button>
                </div>
                <MobileNavItem
                    icon={Landmark}
                    label="Save"
                    active={currentView === "savings"}
                    onClick={() => setCurrentView("savings")}
                />
                <MobileNavItem
                    icon={BarChart3}
                    label="Stats"
                    active={currentView === "insights"}
                    onClick={() => setCurrentView("insights")}
                />
            </nav>
        </div>
    );
}

// ✅ FIX: Menggunakan LucideIcon sebagai tipe (bukan any) untuk menghilangkan error eslint
type MobileNavItemProps = {
    icon: LucideIcon;
    label: string;
    active: boolean;
    onClick: () => void;
};

function MobileNavItem({ icon: Icon, label, active, onClick }: MobileNavItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1 transition-colors ${
                active ? "text-blue-500" : "text-gray-400"
            }`}
        >
            <Icon size={24} fill={active ? "currentColor" : "none"} />
            <span className="text-[10px] font-bold">{label}</span>
        </button>
    );
}