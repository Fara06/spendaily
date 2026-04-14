"use client";

import { useState } from "react";
import GoalCard from "./GoalCard";
import RemindCard from "./RemindCard";
import SetTargetModal from "./TargetModal";
import SavingsHeader from "./SavingsHeader";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

export default function SavingsPage() {
    const [showSetTarget, setShowSetTarget] = useState(false);

    return (
        <div className="h-screen flex flex-col bg-surface overflow-hidden">
            <SavingsHeader />

            <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-surface-container-lowest">
                <GoalCard onAddTarget={() => setShowSetTarget(true)} />
                <RemindCard />
            </main>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSetTarget(true)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-xl z-50"
            >
                <Plus size={28} />
            </motion.button>

            {showSetTarget && (
                <SetTargetModal onClose={() => setShowSetTarget(false)} />
            )}
        </div>
    );
}