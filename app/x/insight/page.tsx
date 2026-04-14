"use client";

import HeaderMinimalis from "./_components/HeaderMinimalis";
import SavingsTip from "./_components/SavingsTip";
import SpendingDynamics from "./_components/SpendingDynamic";
import TimeOfDay from "./_components/TimeofDay";
import TopSpend from "./_components/TopSpend";
import HabitCards from "../dashboard/_components/HabitChart";

export default function InsightPage() {
    return (
        <main className="min-h-screen bg-[#FDF8F3]">
            <HeaderMinimalis />

            <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                        <SpendingDynamics />
                    </div>

                    <div className="col-span-12">
                        <TimeOfDay />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <TopSpend />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <HabitCards />
                    </div>
                </div>

                <SavingsTip />
            </div>
        </main>
    );
}