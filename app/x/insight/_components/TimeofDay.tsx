"use client";

import { motion } from "motion/react";
import { useGetSpendingByTime } from "@/query/insight";

export default function TimeOfDay() {
    const { data = [], isLoading } = useGetSpendingByTime();

    return (
        <section className="bg-white rounded-3xl p-6 border border-primary/10 shadow-sm">
            <h3 className="text-lg font-black mb-4">Time of Day</h3>

            {isLoading ? (
                <p>Loading...</p>
            ) : data.length === 0 ? (
                <p className="text-gray-400">No data</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {data.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-primary/10 rounded-2xl p-4 text-center"
                        >
                            <p className="text-sm font-bold">{item.period}</p>
                            <p className="text-xl font-black">{item.percent}%</p>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}