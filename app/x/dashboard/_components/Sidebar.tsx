"use client";

import {
    LayoutGrid,
    Wallet,
    PiggyBank,
    BarChart3,
    Trophy,
    LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/query/auth";
import { useAuth } from "@/core/providers/Auth-context";

const navItems = [
    { label: "Dashboard", icon: LayoutGrid, href: "/x/dashboard" },
    { label: "Budgets", icon: Wallet, href: "/x/budgets" },
    { label: "Savings", icon: PiggyBank, href: "/x/saving" },
    { label: "Insights", icon: BarChart3, href: "/x/insight" },
    { label: "Missions", icon: Trophy, href: "/x/missions" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { setUser } = useAuth();

    const { mutate: logout } = useLogout({
        onSuccess: () => {
            setUser(null);
            router.push("/login");
        },
    });

    return (
        <aside className="hidden md:flex flex-col h-screen py-8 px-4 w-64 bg-[#F3E7C9] rounded-r-3xl shadow-md">

            <h1 className="text-2xl font-black text-[#6b4f4f] px-4 mb-10">
                Spendaily
            </h1>

            <nav className="flex flex-col gap-2">
                {navItems.map(({ label, icon: Icon, href }) => {
                    const active = pathname === href;
                    return (
                        <a
                            key={label}
                            href={href}
                            className={`flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold transition ${active
                                    ? "bg-[#e7a6b1] text-white"
                                    : "text-[#6b4f4f] hover:bg-[#e7a6b1]/40"
                                }`}
                        >
                            <Icon size={18} />
                            {label}
                        </a>
                    );
                })}
            </nav>

            <button
                onClick={() => logout()}
                className="mt-auto flex items-center gap-2 text-[#6b4f4f] px-4 py-3 hover:bg-[#e7a6b1]/30 rounded-full"
            >
                <LogOut size={18} />
                Logout
            </button>
        </aside>
    );
}