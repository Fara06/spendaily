"use client";

import { LayoutGrid, Wallet, PiggyBank, BarChart3, Plus, Settings, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/query/auth";
import { useAuth } from "@/core/providers/Auth-context";

const navItems = [
    { label: "Dashboard", icon: LayoutGrid, href: "/x/dashboard" },
    { label: "Budgets", icon: Wallet, href: "/x/budgets" },
    { label: "Savings", icon: PiggyBank, href: "/x/saving" },
    { label: "Insights", icon: BarChart3, href: "/x/insight" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, setUser } = useAuth(); 

    const { mutate: logout } = useLogout({
        onSuccess: () => {
            setUser(null);
            router.push("/login");
        },
    });

    return (
        <aside className="hidden md:flex flex-col h-screen py-8 px-4 w-64 bg-surface-container rounded-r-xl shrink-0 z-20 marshmallow-shadow">
            <div className="px-4 mb-10">
                <h1 className="text-2xl font-black text-primary tracking-tight">Spendaily</h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mt-1">
                    Hello, {user?.name ?? "there"}! 
                </p>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                {navItems.map(({ label, icon: Icon, href }) => {
                    const isActive = pathname === href;
                    return (
                        <motion.a
                            key={label}
                            href={href}
                            whileHover={{ x: 4 }}
                            className={`flex items-center gap-3 rounded-full px-6 py-3 font-medium transition-all ${isActive
                                ? "bg-primary-container text-primary font-bold"
                                : "text-primary/70 hover:bg-primary-container/30"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="text-md">{label}</span>
                        </motion.a>
                    );
                })}
            </nav>

            <div className="mt-auto px-4 flex flex-col gap-6">
                <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white rounded-full py-4 px-6 font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                    <Plus size={20} />
                    Add Expense
                </motion.button>

                <div className="flex flex-col gap-1 border-t border-primary/10 pt-6">
                    <button className="flex items-center gap-3 text-primary/70 px-4 py-2 hover:bg-primary-container/50 rounded-full transition-all">
                        <Settings size={18} />
                        <span className="text-xs font-bold uppercase tracking-wide">Settings</span>
                    </button>
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 text-primary/70 px-4 py-2 hover:bg-primary-container/50 rounded-full transition-all"
                    >
                        <LogOut size={18} />
                        <span className="text-xs font-bold uppercase tracking-wide">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}