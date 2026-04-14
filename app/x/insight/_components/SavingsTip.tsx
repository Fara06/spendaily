"use client";

import { useGetSavingsTip } from "@/query/insight";

export default function SavingsTip() {
    const { data, isLoading } = useGetSavingsTip();

    return (
        <section className="bg-gradient-to-br from-primary to-primary/70 text-white rounded-3xl p-6 shadow-md">
            <p className="text-xs opacity-70">Savings Tip</p>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <p className="text-xl font-black mt-2">
                    {data?.tip ?? "Keep saving!"}
                </p>
            )}
        </section>
    );
}