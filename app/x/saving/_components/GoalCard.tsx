"use client";

import { motion } from "motion/react";
import { Plus, DollarSign } from "lucide-react";
import {
    useGetTransactionSummary,
} from "@/query/dashboard";
import {
    useGetSavingsTarget,
} from "@/query/saving";

function formatRupiah(amount: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function GoalCard({ onAddTarget }: { onAddTarget: () => void }) {
    const { data: targets } = useGetSavingsTarget();
    const target = targets?.[0];

    const { data: summary } = useGetTransactionSummary("monthly");

    const balance = summary?.balance ?? 0;
    const targetAmount = target?.target_amount ?? 0;

    const progress =
        targetAmount > 0
            ? Math.min((balance / targetAmount) * 100, 100)
            : 0;

    if (!target) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[280px] bg-surface-container rounded-[2rem] border-2 border-dashed border-on-surface/20 flex flex-col items-center justify-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                        <DollarSign className="text-primary" />
                    </div>

                    <div className="text-center">
                        <h3 className="font-extrabold text-lg">
                            No Savings Yet
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                            Start your first saving goal 🚀
                        </p>
                    </div>

                    <button
                        onClick={onAddTarget}
                        className="px-6 py-3 bg-primary text-white rounded-full font-bold flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Set Target
                    </button>
                </div>

                <button
                    onClick={onAddTarget}
                    className="h-[280px] border-2 border-dashed border-on-surface/20 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-surface-container transition"
                >
                    <Plus size={28} className="text-primary" />
                    <p className="font-bold">Add Goal</p>
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary to-primary/70 text-white p-8 rounded-[2.5rem] flex flex-col justify-between h-[300px] shadow-xl"
            >
                {/* TOP */}
                <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <DollarSign />
                    </div>

                    <span className="font-bold text-lg">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div>
                    <h3 className="text-2xl font-extrabold">
                        {target.title}
                    </h3>

                    <p className="text-sm opacity-80 mt-1">
                        Target: {formatRupiah(targetAmount)}
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold">
                        <span>{formatRupiah(balance)}</span>
                        <span>{formatRupiah(targetAmount)}</span>
                    </div>

                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-white rounded-full"
                        />
                    </div>

                    <p className="text-xs opacity-80">
                        {Math.round(progress)}% achieved
                    </p>
                </div>
            </motion.div>

            <button
                onClick={onAddTarget}
                className="h-[300px] border-2 border-dashed border-on-surface/20 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-surface-container transition"
            >
                <Plus size={30} className="text-primary" />
                <p className="font-bold">Add Goal</p>
            </button>
        </div>
    );
}