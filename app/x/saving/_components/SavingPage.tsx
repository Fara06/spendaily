"use client";

import { Bell, Plus } from "lucide-react";
import { useGetUser } from "@/query/dashboard";
import GoalCard from "./GoalCard";
import RemindCard from "./RemindCard";
import { useState } from "react";
import SetTargetModal from "./TargetModal";

export default function SavingsPage() {
    const { data: user } = useGetUser();
    const [showSetTarget, setShowSetTarget] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-surface p-6 gap-6 overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-xl py-2 z-10">
                <div>
                    <h2 className="text-4xl font-extrabold text-on-surface tracking-tight">
                        Savings Goals
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-50">
                        Keep saving those marshmallows!
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-3 bg-surface-container-lowest rounded-full marshmallow-shadow hover:shadow-md transition-shadow">
                        <Bell size={24} className="text-on-surface" />
                    </button>
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container marshmallow-shadow">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary-container text-primary font-black text-lg">
                                {user?.name?.charAt(0).toUpperCase() ?? "M"}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Goal Cards */}
            <GoalCard onAddTarget={() => setShowSetTarget(true)} />

            {/* Remind Me Section */}
            <RemindCard />

            {/* Set Target Modal */}
            {showSetTarget && (
                <SetTargetModal onClose={() => setShowSetTarget(false)} />
            )}
        </div>
    );
}