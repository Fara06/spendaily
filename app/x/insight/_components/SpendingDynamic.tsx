"use client";

import { Shapes } from 'lucide-react';
import { motion } from 'motion/react';
import { useGetSpendingByCategory } from '@/query/insight';

const BUBBLE_COLORS = [
    { color: 'bg-primary-container', textColor: 'text-on-primary-container' },
    { color: 'bg-secondary-container', textColor: 'text-on-secondary-container' },
    { color: 'bg-tertiary-container', textColor: 'text-on-tertiary-container' },
    { color: 'bg-surface-container-highest', textColor: 'text-on-surface-variant' },
    { color: 'bg-primary-container/50', textColor: 'text-on-primary-container' },
];

const POSITIONS = [
    { top: '50%', left: '50%' },
    { top: '25%', left: '75%' },
    { top: '75%', left: '35%' },
    { top: '30%', left: '30%' },
    { top: '65%', left: '70%' },
];

export default function SpendingDynamics() {
    const { data = [], isLoading } = useGetSpendingByCategory();

    const maxTotal = Math.max(...data.map(d => d.total), 1);

    const bubbles = data.slice(0, 5).map((item, i) => ({
        label: item.category_name,
        amount: item.total,
        size: 80 + (item.total / maxTotal) * 120, // min 80, max 200
        color: BUBBLE_COLORS[i % BUBBLE_COLORS.length].color,
        textColor: BUBBLE_COLORS[i % BUBBLE_COLORS.length].textColor,
        ...POSITIONS[i],
    }));

    return (
        <section className="bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden flex flex-col min-h-[500px] marshmallow-shadow">
            <div className="flex justify-between items-start mb-8 z-10">
                <div>
                    <h3 className="text-2xl font-bold text-on-surface">Spending Dynamics</h3>
                    <p className="text-on-surface-variant">Your category volume over the last 30 days</p>
                </div>
                <div className="p-3 bg-primary-container rounded-full text-primary">
                    <Shapes className="w-6 h-6" />
                </div>
            </div>

            <div className="flex-1 relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                        Loading...
                    </div>
                ) : bubbles.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                        No spending data yet.
                    </div>
                ) : (
                    bubbles.map((bubble, i) => (
                        <motion.div
                            key={bubble.label}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                            whileHover={{ scale: 1.05 }}
                            className={`absolute rounded-full flex flex-col items-center justify-center text-center shadow-sm cursor-pointer ${bubble.color} ${bubble.textColor}`}
                            style={{
                                width: bubble.size,
                                height: bubble.size,
                                top: bubble.top,
                                left: bubble.left,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <span className="text-[10px] font-bold uppercase tracking-wider mb-1">{bubble.label}</span>
                            <span className="text-2xl font-black">Rp{bubble.amount.toLocaleString('id-ID')}</span>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}