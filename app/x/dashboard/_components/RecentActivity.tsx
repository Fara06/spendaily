"use client";

import { motion } from "motion/react";
import { ShoppingCart, Banknote, HelpCircle } from "lucide-react";
import { useGetTransactions } from "@/query/dashboard";

function formatRupiah(amount: string | number) {
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
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentActivity() {
  const { data: transactions = [], isLoading } = useGetTransactions();

  const recent = transactions.slice(0, 5);

  return (
    <div className="col-span-12 bg-surface-container-highest p-10 rounded-xl marshmallow-shadow">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-extrabold text-2xl">Recent Activity</h4>
        <button className="text-primary font-bold hover:underline">View All</button>
      </div>

      {isLoading ? (
        <p className="text-center text-on-surface-variant py-8">Loading transactions...</p>
      ) : recent.length === 0 ? (
        <p className="text-center text-on-surface-variant py-8">No transactions yet.</p>
      ) : (
        <div className="space-y-4">
          {recent.map((tx) => (
            <motion.div
              key={tx.id}
              whileHover={{ x: 8 }}
              className="flex items-center justify-between p-4 bg-surface rounded-lg transition-all"
            >
              <div className="flex items-center gap-6">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    tx.type === "income"
                      ? "bg-secondary-container text-secondary"
                      : "bg-primary-container text-primary"
                  }`}
                >
                  {tx.type === "income" ? (
                    <Banknote size={24} />
                  ) : (
                    <ShoppingCart size={24} />
                  )}
                </div>
                <div>
                  <p className="text-lg font-bold">
                    {tx.note ?? (tx.type === "income" ? "Income" : "Expense")}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {tx.type} • {formatDate(tx.transaction_time)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-xl font-black ${
                    tx.type === "income" ? "text-secondary" : "text-on-surface"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatRupiah(tx.amount)}
                </p>
                <p className="text-xs font-bold uppercase text-on-surface-variant">
                  {tx.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}