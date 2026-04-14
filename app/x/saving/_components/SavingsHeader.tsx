"use client";

import { Bell } from "lucide-react";
import { motion } from "motion/react";
import { useGetUser } from "@/query/dashboard";
import { useLogout } from "@/query/auth";
import { useAuth } from "@/core/providers/Auth-context";
import { useRouter } from "next/navigation";

export default function Header() {
    const { data: user } = useGetUser();
    const { setUser } = useAuth();
    const router = useRouter();

    const { mutate: logout } = useLogout({
        onSuccess: () => {
            setUser(null);
            router.push("/login");
        },
    });

    return (
        <header className="sticky top-0 z-40 bg-[#FDF8F3]/80 backdrop-blur-xl border-b border-primary/10 px-6 md:px-8 py-4 flex justify-between items-center">

            {/* LEFT */}
            <div>
                <h2 className="text-lg md:text-xl font-black text-primary">
                    Hello, {user?.name ?? "User"} 
                </h2>
                <p className="text-xs text-on-surface-variant">
                    Manage your money smarter
                </p>
            </div>

            <div className="flex items-center gap-3">

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition"
                >
                    <Bell size={20} className="text-primary" />
                </motion.button>

                <button
                    onClick={() => logout()}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold hover:opacity-90 transition"
                >
                    {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                </button>
            </div>
        </header>
    );
}