"use client";

import { useGetTransactionSummary } from "@/query/dashboard";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function BalanceCard() {
  const { data: summary } = useGetTransactionSummary("monthly");

  const balance = summary?.balance ?? 0;

  return (
    <div className="col-span-12 md:col-span-8 bg-gradient-to-br from-[#e7a6b1] to-[#d98c9a] p-5 md:p-10 rounded-2xl">

      <p className="text-xs uppercase text-[#5c3b42]">
        Monthly Balance
      </p>

      <h3 className="text-3xl md:text-6xl font-black text-[#5c3b42] mt-2">
        {formatRupiah(balance)}
      </h3>
    </div>
  );
}