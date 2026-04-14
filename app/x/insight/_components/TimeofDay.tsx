"use client";

import { Sunrise, Sun, Sunset, Moon, CloudMoon as Bedtime } from 'lucide-react';
import { motion } from 'motion/react';
import { useGetSpendingByTime } from '@/query/insight';

const TIME_CONFIG = {
    dawn: { label: 'Dawn', icon: Sunrise, color: 'bg-secondary-container/40', activeColor: 'bg-secondary' },
    day: { label: 'Day', icon: Sun, color: 'bg-primary-container/30', activeColor: 'bg-primary-container' },
    evening: { label: 'Evening', icon: Sunset, color: 'bg-primary-container/60', activeColor: 'bg-primary' },
    night: { label: 'Night', icon: Moon, color: 'bg-primary-container/20', activeColor: 'bg-primary-container' },
    midnight: { label: 'Midnight', icon: Bedtime, color: 'bg-secondary-container/60', activeColor: 'bg-secondary' },
};

export default function TimeOfDay() {
    const { data = [], isLoading } = useGetSpendingByTime();

    return (
        <section className="bg-surface-container rounded-xl p-8 marshmallow-shadow">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-on-surface">Time of Day</h3>
                    <p className="text-on-surface-variant">When your wallet feels most active</p>
                </div>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Low Activity</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Spike</span>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center text-on-surface-variant py-8">Loading...</div>
            ) : (
                <div className="grid grid-cols-5 gap-4">
                    {(Object.keys(TIME_CONFIG) as Array<keyof typeof TIME_CONFIG>).map((key) => {
                        const config = TIME_CONFIG[key];
                        const item = data.find(d => d.period === key);
                        const percent = item?.percent ?? 0;
                        const size = percent > 30 ? 'large' : percent > 15 ? 'medium' : 'small';
                        const Icon = config.icon;

                        return (
                            <div key={key} className="flex flex-col items-center gap-4">
                                <motion.div
                                    whileHover={{ scale: 0.95 }}
                                    className={`w-full h-32 rounded-full flex items-center justify-center transition-all ${config.color}`}
                                >
                                    <div className={`rounded-full flex items-center justify-center transition-all ${config.activeColor} ${size === 'large' ? "w-28 h-28" : size === 'medium' ? "w-20 h-20" : "w-12 h-12"
                                        }`}>
                                        <span className={`font-black ${size === 'large' ? "text-surface text-xl" : "text-on-primary-container text-lg"
                                            }`}>
                                            {percent}%
                                        </span>
                                    </div>
                                </motion.div>
                                <div className="flex flex-col items-center">
                                    <Icon className="w-5 h-5 text-on-surface-variant" />
                                    <span className="text-sm font-bold mt-1 text-on-surface">{config.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}