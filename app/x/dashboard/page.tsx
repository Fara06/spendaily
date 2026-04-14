"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import BalanceCard from "./_components/Balance";
import SavingsGoals from "./_components/SavingGoalGraphic";
import HabitCards from "./_components/HabitChart";
import RecentActivity from "./_components/RecentActivity";
import Sidebar from "./_components/Sidebar";

export default function DashboardPage() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="flex bg-[#FFF6E9] min-h-screen">
      <main className="flex-1 overflow-y-auto">
        <Header />

        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            <BalanceCard />
            <SavingsGoals />
            <HabitCards />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}