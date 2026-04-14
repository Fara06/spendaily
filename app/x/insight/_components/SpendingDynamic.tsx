"use client";

import { motion } from "motion/react";
import { useGetSpendingByCategory } from "@/query/insight";
import { formatRupiah } from "./Format";

export default function SpendingDynamics() {
    const { data = [], isLoading } = useGetSpendingByCategory();
    const max = Math.max(...data.map((d) => d.total), 1);

    return (
        <section className="bg-white rounded-3xl p-6 border border-primary/10 shadow-sm min-h-[400px] relative">
            <h3 className="text-lg font-black mb-1">Spending Dynamics</h3>
            <p className="text-xs text-gray-400 mb-6">
                30 hari terakhir
            </p>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                data.slice(0, 5).map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="absolute rounded-full bg-primary/10 flex flex-col items-center justify-center text-center shadow-md"
                        style={{
                            width: 80 + (item.total / max) * 120,
                            height: 80 + (item.total / max) * 120,
                            top: `${20 + i * 15}%`,
                            left: `${20 + i * 15}%`,
                        }}
                    >
                        <span className="text-xs">{item.category_name}</span>
                        <span className="font-bold">
                            {formatRupiah(item.total)}
                        </span>
                    </motion.div>
                ))
            )}
        </section>
    );
}