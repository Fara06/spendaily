"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
} from "lucide-react";

import { useGetTransactionSummary, useGetTransactions } from "@/query/dashboard";
import HeaderMinimal from "./headerMinimalis";

function formatRupiah(amount: number | string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BudgetPage() {
  const router = useRouter();
  const [search] = useState("");

  const { data: summary, isLoading: summaryLoading } =
    useGetTransactionSummary("monthly");

  const { data: transactions = [], isLoading: txLoading } =
    useGetTransactions();

  const filtered = transactions.filter((tx) =>
    tx.note?.toLowerCase().includes(search.toLowerCase()) ||
    tx.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* HEADER DASHBOARD STYLE */}
      <HeaderMinimal />

      <div className="px-8 pb-12 space-y-10 mt-6">
        {/* HERO BALANCE */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 p-10 bg-gradient-to-br from-primary-container to-primary-fixed rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container opacity-80 mb-1">
                    {summaryLoading
                      ? "Loading..."
                      : summary?.label ??
                      "Current Balance"}
                  </p>

                  <h3 className="text-6xl font-black tracking-tighter text-on-primary-container">
                    {summaryLoading
                      ? "..."
                      : formatRupiah(
                        summary?.balance ?? 0
                      )}
                  </h3>
                </div>

                <div
                  className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-sm ${(summary?.balance ?? 0) >= 0
                      ? "bg-secondary-container text-on-secondary-container"
                      : "bg-primary-container text-on-primary-container"
                    }`}
                >
                  {(summary?.balance ?? 0) >= 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}

                  <span className="text-sm font-bold">
                    {(summary?.balance ?? 0) >= 0
                      ? "Surplus"
                      : "Deficit"}
                  </span>
                </div>
              </div>

              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container opacity-60 mb-1">
                    Total Income
                  </p>
                  <p className="text-xl font-bold text-on-primary-container">
                    {formatRupiah(
                      summary?.total_income ?? 0
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container opacity-60 mb-1">
                    Total Expense
                  </p>
                  <p className="text-xl font-bold text-on-primary-container">
                    {formatRupiah(
                      summary?.total_expense ?? 0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="md:col-span-4 flex flex-col gap-4 h-full">
            <button
              onClick={() =>
                router.push("/x/budgets/add?type=income")
              }
              className="flex-1 bg-secondary-container hover:opacity-90 transition rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 text-on-secondary-container active:scale-95"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Plus size={28} strokeWidth={3} />
              </div>
              <span className="font-bold text-lg">
                Add Income
              </span>
            </button>

            <button
              onClick={() =>
                router.push("/x/budgets/add?type=expense")
              }
              className="flex-1 bg-primary-container hover:opacity-90 transition rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 text-on-primary-container active:scale-95"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Minus size={28} strokeWidth={3} />
              </div>
              <span className="font-bold text-lg">
                Add Spending
              </span>
            </button>
          </div>
        </section>

        {/* TRANSACTIONS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-extrabold text-on-surface">
              Recent Transactions
            </h4>
          </div>

          {txLoading ? (
            <p className="text-center text-on-surface-variant py-8">
              Loading...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-on-surface-variant py-8">
              No transactions found.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filtered.slice(0, 6).map((tx) => (
                <motion.div
                  key={tx.id}
                  whileHover={{ y: -5 }}
                  className="bg-surface-container-low p-6 rounded-[2rem] hover:shadow-lg transition"
                >
                  <div className="flex justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === "income"
                          ? "bg-secondary-container"
                          : "bg-primary-container"
                        }`}
                    >
                      {tx.type === "income" ? (
                        <TrendingUp size={22} />
                      ) : (
                        <TrendingDown size={22} />
                      )}
                    </div>

                    <span className="text-[10px] text-on-surface-variant opacity-50">
                      {formatDate(tx.transaction_time)}
                    </span>
                  </div>

                  <h5 className="text-lg font-bold text-on-surface">
                    {tx.note ?? tx.type}
                  </h5>

                  <p className="text-sm text-on-surface-variant">
                    {tx.source}
                  </p>

                  <div className="flex justify-between mt-4">
                    <span
                      className={`text-2xl font-black ${tx.type === "income"
                          ? "text-secondary"
                          : "text-primary"
                        }`}
                    >
                      {tx.type === "income"
                        ? "+"
                        : "-"}
                      {formatRupiah(tx.amount)}
                    </span>

                    <span className="text-[10px] uppercase opacity-50">
                      {tx.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}