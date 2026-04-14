"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGetMissions, useStartMission } from "@/query/misi";
import { Loader2, Zap, Clock, Star } from "lucide-react";
import { getMissionIcon } from "./getMissionIcon";
import { useQueryClient } from "@tanstack/react-query";

export default function ListView({ onStart }: any) {
  const { data, isLoading } = useGetMissions("all");
  const { mutate } = useStartMission();
  const queryClient = useQueryClient();

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleStart = (id: number) => {
    setLoadingId(id);

    mutate(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["user-missions"] });
        setLoadingId(null);
        onStart(res.id);
      },
      onError: () => setLoadingId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-6 space-y-3">
      {data?.map((m: any) => (
        <motion.div
          key={m.id}
          className="bg-white p-4 rounded-xl flex justify-between"
        >
          <div>
            <div className="text-xl">{getMissionIcon(m.title)}</div>
            <p className="font-bold">{m.title}</p>

            <div className="flex gap-3 text-xs">
              <span className="flex gap-1"><Clock size={12} /> {m.duration}</span>
              <span className="flex gap-1"><Star size={12} /> {m.reward_points}</span>
            </div>
          </div>

          <button
            onClick={() => handleStart(m.id)}
            className="text-primary font-bold flex items-center gap-1"
          >
            <Zap size={14} /> Start
          </button>
        </motion.div>
      ))}
    </div>
  );
}