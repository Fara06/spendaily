"use client"

import HabitCards from "../dashboard/_components/HabitChart";
import SavingsTip from "./_components/SavingsTip";
import SpendingDynamic from "./_components/SpendingDynamic";
import TimeOfDay from "./_components/TimeofDay";
import TopSpend from "./_components/TopSpend";

export default function InsightPage() {
    return (
        <main className="flex flex-col gap-8 p-8">
            <div>
                <h1 className="text-3xl font-black text-on-surface">Insights</h1>
                <p className="text-on-surface-variant">A deep look into your spending patterns</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <SpendingDynamic />
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
        </main>
    );
}