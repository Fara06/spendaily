"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useGetTransactionSummary } from "@/query/dashboard";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function BalanceCard() {
  const { data: summary, isLoading } = useGetTransactionSummary("monthly");

  const balance = summary?.balance ?? 0;
  const totalIncome = summary?.total_income ?? 0;
  const totalExpense = summary?.total_expense ?? 0;
  const isPositive = balance >= 0;

  return (
    <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-primary-container to-primary-fixed p-10 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[320px] balance-card-shadow">
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-on-primary-container opacity-80">
          {isLoading ? "Loading..." : summary?.label ?? "Total Live Balance"}
        </p>
        <h3 className="text-5xl md:text-7xl font-extrabold text-on-primary-container mt-2 tracking-tighter">
          {isLoading ? "..." : formatRupiah(balance)}
        </h3>
      </div>

      <div className="flex items-end justify-between relative z-10 flex-wrap gap-4">
        <div className="flex gap-4">
          <div className="bg-white/30 backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-2">
            <TrendingUp size={18} className="text-secondary" />
            <span className="font-bold text-on-primary-container text-sm">
              {formatRupiah(totalIncome)} in
            </span>
          </div>
          <div className="bg-white/30 backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-2">
            <TrendingDown size={18} className="text-primary" />
            <span className="font-bold text-on-primary-container text-sm">
              {formatRupiah(totalExpense)} out
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container/60 mb-1">
            Status
          </p>
          <p className={`font-bold ${isPositive ? "text-secondary" : "text-primary"}`}>
            {isPositive ? "▲ Surplus" : "▼ Deficit"}
          </p>
        </div>
      </div>

      <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-20 w-32 h-32 bg-secondary-container/40 rounded-full blur-2xl" />
    </div>
  );
}