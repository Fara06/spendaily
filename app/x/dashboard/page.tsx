"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import BalanceCard from "./_components/Balance";
import SavingsGoals from "./_components/SavingGoalGraphic";
import HabitCards from "./_components/HabitChart";
import RecentActivity from "./_components/RecentActivity";
import MobileNav from "./_components/MobileNav";

export default function DashboardPage() {
  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login"); 
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-surface-container-low overflow-hidden">
      <main className="flex-1 overflow-y-auto h-screen relative">
        <Header />

        <div className="max-w-7xl mx-auto px-8 pb-20 mt-4">
          <div className="grid grid-cols-12 gap-8">
            <BalanceCard />
            <SavingsGoals />
            <HabitCards />
            <RecentActivity />
          </div>
        </div>

        <footer className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full bg-surface-container rounded-t-xl mt-10">
          <p className="text-sm font-bold text-primary uppercase tracking-wide">
            © 2024 Spendaily. Keep it Bubbly.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </main>

      <MobileNav />
    </div>
  );
}