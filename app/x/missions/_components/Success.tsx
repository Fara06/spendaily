"use client";

import { useGetUserMissionById, useClaimMissionReward } from "@/query/misi";
import { Loader2, Trophy, Gift } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessView({
    missionId,
    onNext,
    onBack,
}: {
    missionId: number;
    onNext: () => void;
    onBack: () => void;
}) {
    const { data, isLoading } = useGetUserMissionById(missionId);
    const { mutate: claim, isPending } = useClaimMissionReward();

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    const mission = data?.mission;

    const handleClaim = () => {
        claim(data!.id, {
            onSuccess: onNext,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">

            {/* CARD */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-8 w-full max-w-sm text-center space-y-5"
            >
                <div className="w-20 h-20 mx-auto bg-amber-400 rounded-full flex items-center justify-center">
                    <Trophy size={40} className="text-white" />
                </div>

                <h2 className="text-2xl font-black">Mission Selesai!</h2>

                <p className="text-sm text-gray-500">
                    Kamu menyelesaikan <b>{mission?.title}</b>
                </p>

                <div className="bg-amber-50 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-amber-600">Reward</p>
                    <p className="text-3xl font-black text-amber-600">
                        +{mission?.reward_points}
                    </p>
                </div>

                <button
                    onClick={handleClaim}
                    disabled={isPending || data?.is_claimed}
                    className="w-full bg-primary text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-60"
                >
                    {isPending ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        <Gift size={16} />
                    )}

                    {data?.is_claimed
                        ? "Sudah Diklaim"
                        : isPending
                            ? "Mengklaim..."
                            : "Klaim Reward"}
                </button>

                <button
                    onClick={onBack}
                    className="text-sm font-bold text-gray-500"
                >
                    Kembali ke Dashboard
                </button>
            </motion.div>
        </div>
    );
}