"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useGetSavingsTarget, useGetTransactionSummary } from "@/query/dashboard";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function SavingsGoals() {
  const { data: target, isLoading } = useGetSavingsTarget();
  const { data: summary } = useGetTransactionSummary("monthly");

  const balance = summary?.balance ?? 0;
  const targetAmount = target?.target_amount ?? 0;
  const progress = targetAmount > 0 ? Math.min((balance / targetAmount) * 100, 100) : 0;

  const startDate = target?.start_date
    ? new Date(target.start_date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
    : "-";
  const endDate = target?.end_date
    ? new Date(target.end_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : "-";

  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-highest p-8 rounded-xl flex flex-col gap-6 marshmallow-shadow">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-xl text-on-surface">Savings Target</h4>
        <Star size={20} className="text-primary fill-primary" />
      </div>

      {isLoading ? (
        <p className="text-on-surface-variant text-sm">Loading...</p>
      ) : !target ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-4">
          <p className="text-on-surface-variant text-sm font-medium">No savings target yet.</p>
          <motion.button
            whileHover={{ scale: 0.98 }}
            className="py-3 px-6 bg-primary text-white rounded-full font-bold text-sm"
          >
            Set a Target
          </motion.button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <span>Target</span>
              <span className="text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-6 w-full bg-surface-container-low rounded-full overflow-hidden p-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant font-medium">
              <span>{formatRupiah(balance)}</span>
              <span>{formatRupiah(targetAmount)}</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs font-bold text-on-surface-variant">
              <span>Daily Limit</span>
              <span className="text-secondary">{formatRupiah(target.daily_limit)}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-on-surface-variant">
              <span>Period</span>
              <span>{startDate} – {endDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}