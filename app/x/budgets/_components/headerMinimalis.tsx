"use client";

import { Bell, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/query/dashboard";
import { useLogout } from "@/query/auth";
import { useAuth } from "@/core/providers/Auth-context";

export default function HeaderMinimal() {
    const { data: user } = useGetUser();
    const { setUser } = useAuth();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { mutate: logout } = useLogout({
        onSuccess: () => {
            setUser(null);
            router.push("/login");
        },
    });

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex justify-between items-center w-full px-8 py-6 sticky top-0 z-40 bg-surface/80 backdrop-blur-xl">

            {/* LEFT */}
            <div>
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">
                    Budgets
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-50">
                    Managing your sweetness
                </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

                {/* NOTIFICATION */}
                <motion.button
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full hover:bg-surface-container transition relative"
                >
                    <Bell className="text-primary" size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </motion.button>

                {/* AVATAR */}
                <div ref={dropdownRef} className="relative">
                    <button onClick={() => setOpen(!open)}>
                        <div className="w-11 h-11 rounded-full bg-primary-container overflow-hidden border border-primary-container">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary font-black">
                                    {user?.name?.charAt(0) ?? "U"}
                                </div>
                            )}
                        </div>
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-56 bg-surface-container-lowest rounded-2xl shadow-xl p-4"
                            >
                                <div className="mb-3">
                                    <p className="font-bold text-primary text-sm">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-on-surface-variant">
                                        {user?.email}
                                    </p>
                                </div>

                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-100 text-red-500 text-sm"
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