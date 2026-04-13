"use client";

import { LayoutGrid, Wallet, PiggyBank, BarChart3, Plus } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center py-4 px-6 z-50 rounded-t-xl shadow-2xl">
      <button className="flex flex-col items-center gap-1 text-primary">
        <LayoutGrid size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Dash</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant">
        <Wallet size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Wallets</span>
      </button>
      <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white -mt-10 shadow-lg border-4 border-surface">
        <Plus size={24} />
      </div>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant">
        <PiggyBank size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Goals</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant">
        <BarChart3 size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
      </button>
    </nav>
  );
}