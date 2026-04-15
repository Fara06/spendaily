"use client";

import { Bell, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/query/dashboard";
import { useLogout } from "@/query/auth";
import { useAuth } from "@/core/providers/Auth-context";

export default function HeaderMinimalis() {
    const { data: user } = useGetUser();
    const { setUser } = useAuth();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    // ✅ FIX UTAMA DI SINI
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { mutate: logout } = useLogout({
        onSuccess: () => {
            setUser(null);
            router.push("/login");
        },
    });

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!dropdownRef.current) return;

            const target = e.target as Node;

            if (!dropdownRef.current.contains(target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-40 bg-[#FDF8F3]/80 backdrop-blur-xl border-b border-primary/10 px-6 py-4 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-black text-primary">Insights</h2>
                <p className="text-xs text-on-surface-variant">
                    Lihat pola pengeluaran kamu
                </p>
            </div>

            <div className="flex items-center gap-4">
                <motion.button whileTap={{ scale: 0.9 }}>
                    <Bell size={20} />
                </motion.button>

                {/* dropdown ref dipasang di sini */}
                <div ref={dropdownRef} className="relative">
                    <button onClick={() => setOpen(!open)}>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0) ?? "U"}
                        </div>
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg p-4"
                            >
                                <p className="font-bold">{user?.name}</p>
                                <p className="text-xs text-gray-400 mb-2">
                                    {user?.email}
                                </p>

                                <button
                                    onClick={() => logout()}
                                    className="text-red-500 text-sm flex gap-2 items-center"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}