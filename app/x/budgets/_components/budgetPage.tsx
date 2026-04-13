"use client";

import { useState } from "react";
import { Search, Bell, Settings, TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useGetTransactionSummary, useGetTransactions } from "@/query/dashboard";

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
  const [search, setSearch] = useState("");

  const { data: summary, isLoading: summaryLoading } = useGetTransactionSummary("monthly");
  const { data: transactions = [], isLoading: txLoading } = useGetTransactions();

  const filtered = transactions.filter((tx) =>
    tx.note?.toLowerCase().includes(search.toLowerCase()) ||
    tx.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen flex flex-col bg-surface">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-8 py-6 sticky top-0 z-40 bg-surface/80 backdrop-blur-2xl">
        <div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">Budgets</h2>
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-50">
            Managing your sweetness
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40" size={18} />
            <input
              type="text"
              placeholder="Find transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-surface-container-highest rounded-full border-none focus:ring-2 focus:ring-primary-container w-64 text-sm transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 rounded-full hover:bg-surface-container transition-colors relative">
              <Bell className="text-primary" size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-3 rounded-full hover:bg-surface-container transition-colors">
              <Settings className="text-primary" size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="px-8 pb-12 space-y-10">
        {/* Hero Balance Card */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 p-10 bg-gradient-to-br from-primary-container to-primary-fixed rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container opacity-80 mb-1">
                    {summaryLoading ? "Loading..." : summary?.label ?? "Current Balance"}
                  </p>
                  <h3 className="text-6xl font-black tracking-tighter text-on-primary-container">
                    {summaryLoading ? "..." : formatRupiah(summary?.balance ?? 0)}
                  </h3>
                </div>
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-sm ${
                  (summary?.balance ?? 0) >= 0
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-primary-container text-on-primary-container"
                }`}>
                  {(summary?.balance ?? 0) >= 0
                    ? <TrendingUp size={16} />
                    : <TrendingDown size={16} />
                  }
                  <span className="text-sm font-bold">
                    {(summary?.balance ?? 0) >= 0 ? "Surplus" : "Deficit"}
                  </span>
                </div>
              </div>
              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container opacity-60 mb-1">
                    Total Income
                  </p>
                  <p className="text-xl font-bold text-on-primary-container">
                    {formatRupiah(summary?.total_income ?? 0)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container opacity-60 mb-1">
                    Total Expense
                  </p>
                  <p className="text-xl font-bold text-on-primary-container">
                    {formatRupiah(summary?.total_expense ?? 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4 h-full">
            <button
              onClick={() => router.push("/x/budgets/add?type=income")}
              className="flex-1 group bg-secondary-container hover:bg-secondary-container/80 transition-all duration-300 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 text-on-secondary-container active:scale-95"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform">
                <Plus size={28} strokeWidth={3} />
              </div>
              <span className="font-bold text-lg tracking-tight">Add Income</span>
            </button>
            <button
              onClick={() => router.push("/x/budgets/add?type=expense")}
              className="flex-1 group bg-primary-container hover:bg-primary-container/80 transition-all duration-300 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 text-on-primary-container active:scale-95"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-180 transition-transform">
                <Minus size={28} strokeWidth={3} />
              </div>
              <span className="font-bold text-lg tracking-tight">Add Spending</span>
            </button>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-extrabold text-on-surface">Recent Transactions</h4>
            <button className="text-sm font-bold text-primary hover:underline px-4 py-2 bg-surface-container rounded-full">
              View All History
            </button>
          </div>

          {txLoading ? (
            <p className="text-center text-on-surface-variant py-8">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-on-surface-variant py-8">No transactions found.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filtered.slice(0, 6).map((tx) => (
                <motion.div
                  key={tx.id}
                  whileHover={{ y: -5 }}
                  className="bg-surface-container-low p-6 rounded-[2rem] transition-shadow hover:shadow-lg group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      tx.type === "income"
                        ? "bg-secondary-container text-on-secondary-container"
                        : "bg-primary-container text-on-primary-container"
                    }`}>
                      {tx.type === "income" ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-tighter">
                      {formatDate(tx.transaction_time)}
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-on-surface mb-1">
                    {tx.note ?? (tx.type === "income" ? "Income" : "Expense")}
                  </h5>
                  <p className="text-sm text-on-surface-variant opacity-60 mb-4 capitalize">{tx.source}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-black ${tx.type === "income" ? "text-secondary" : "text-primary"}`}>
                      {tx.type === "income" ? "+" : "-"}{formatRupiah(tx.amount)}
                    </span>
                    <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-black uppercase rounded-full opacity-60">
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