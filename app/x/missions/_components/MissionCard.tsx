"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { getMissionIcon } from "./getMissionIcon";

type Mission = {
    id: number;
    title: string;
};

type Props = {
    mission: Mission;
    index: number;
    onStart: (id: number) => void;
};

export default function MissionCard({ mission, index, onStart }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-xl border"
        >
            <div className="text-2xl">
                {getMissionIcon(mission?.title ?? "")}
            </div>

            <p className="font-bold">
                {mission?.title ?? "Untitled Mission"}
            </p>

            <button
                onClick={() => onStart(mission.id)}
                className="text-primary text-xs flex items-center gap-1"
            >
                Mulai <ChevronRight size={12} />
            </button>
        </motion.div>
    );
}