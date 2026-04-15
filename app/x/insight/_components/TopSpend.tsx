"use client";

import { useGetTopSpends } from "@/query/insight";
import { formatRupiah } from "./Format";

export default function TopSpend() {
    const { data = [], isLoading } = useGetTopSpends("weekly");

    return (
        <div className="bg-primary-container/30 rounded-xl p-8 flex flex-col gap-6 marshmallow-shadow">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-on-surface">Top Spends</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-on-primary px-3 py-1 rounded-full">
                    This Week
                </span>
            </div>

            {isLoading ? (
                <div className="text-center text-on-surface-variant py-4">
                    Loading...
                </div>
            ) : data.length === 0 ? (
                <div className="text-center text-on-surface-variant py-4">
                    No spending this week.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {data.slice(0, 5).map((item) => (
                        <div
                            key={item.category_id}
                            className="bg-white/60 p-4 rounded-full flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-lg">
                                    {item.category_icon}
                                </div>
                                <span className="font-bold text-on-surface">
                                    {item.category_name}
                                </span>
                            </div>

                            <span className="font-black text-primary">
                                {formatRupiah(item.total ?? 0)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}