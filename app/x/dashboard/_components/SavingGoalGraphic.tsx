"use client";

import { useGetSavingsTarget } from "@/query/dashboard";

export default function SavingsGoals() {
  const { data: target } = useGetSavingsTarget();

  return (
    <div className="col-span-12 md:col-span-4 bg-[#F3E7C9] p-5 md:p-8 rounded-2xl">

      <h4 className="font-bold text-[#6b4f4f] mb-4">
        Savings Target
      </h4>

      {!target ? (
        <div className="text-center">
          <p className="text-sm text-[#a68c7c] mb-4">
            No savings target yet.
          </p>

          <button className="bg-[#b76e79] text-white px-5 py-2 rounded-full">
            Set a Target
          </button>
        </div>
      ) : (
        <p>Target exists</p>
      )}
    </div>
  );
}