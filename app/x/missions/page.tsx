"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../dashboard/_components/Sidebar";
import TopBar from "./_components/TopBar";
import Dashboard from "./_components/DashboardMission";
import Missions from "./_components/Mission";
import MissionDetail from "./_components/MissionDetection";
import Success from "./_components/Success";
import { useGetUser } from "@/query/dashboard";
import { Trophy, LayoutGrid, Landmark, BarChart3, Plus } from "lucide-react";


type View =
    | "dashboard"
    | "missions"
    | "mission-detail"
    | "success"
    | "savings"
    | "insights";


export default function App() {
    const [currentView, setCurrentView] = useState<View>("dashboard");

    const handleMissionClick = () => setCurrentView("mission-detail");
    const handleCompleteMission = () => setCurrentView("success");
    const handleBackToDashboard = () => setCurrentView("dashboard");
    const handleNextMission = () => setCurrentView("missions");

    return (
        <div className="min-h-screen bg-white">
            <TopBar currentView={currentView} />
            <Sidebar
                user={MOCK_USER}
                currentView={currentView}
                onViewChange={setCurrentView}
            />

            <main className="md:ml-72 pt-24 px-6 pb-24 md:pb-12">
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                        >
                            {currentView === "dashboard" && (
                                <Dashboard onMissionClick={handleMissionClick} />
                            )}

                            {currentView === "missions" && (
                                <Missions
                                    user={MOCK_USER}
                                    onMissionClick={handleMissionClick}
                                />
                            )}

                            {currentView === "mission-detail" && (
                                <MissionDetail
                                    onComplete={handleCompleteMission}
                                    onBack={() => setCurrentView("missions")}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {currentView === "success" && (
                <Success
                    onNextMission={handleNextMission}
                    onBackToDashboard={handleBackToDashboard}
                />
            )}

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
                    onClick={() => setCurrentView("missions")}
                />

                <div className="-mt-12">
                    <button className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center">
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

type MobileNavItemProps = {
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
};

function MobileNavItem({
    icon: Icon,
    label,
    active,
    onClick,
}: MobileNavItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1 ${active ? "text-blue-500" : "text-gray-400"
                }`}
        >
            <Icon size={24} fill={active ? "currentColor" : "none"} />
            <span className="text-[10px] font-bold">{label}</span>
        </button>
    );
}