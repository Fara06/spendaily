import { Lightbulb } from 'lucide-react';
import { useGetSavingsTip } from '@/query/insight';

export default function SavingsTip() {
    const { data, isLoading } = useGetSavingsTip();

    return (
        <footer className="flex justify-center mt-12">
            <div className="max-w-2xl w-full bg-secondary-container p-8 md:p-10 rounded-xl relative overflow-hidden flex items-center gap-8 marshmallow-shadow">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-surface/20 rounded-full" />

                <div className="hidden md:flex p-6 bg-surface/40 rounded-full text-secondary shrink-0">
                    <Lightbulb className="w-12 h-12 fill-current" />
                </div>

                <div className="z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                        Savings Tip
                    </p>
                    {isLoading ? (
                        <p className="text-on-secondary-container font-medium">Loading tip...</p>
                    ) : (
                        <p className="text-2xl font-black text-on-secondary-container leading-snug">
                            {data?.tip ?? "Keep tracking your spending to get personalized tips!"}
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
}