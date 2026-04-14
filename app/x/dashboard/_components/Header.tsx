"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";
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
    <header className="sticky top-0 z-40 bg-[#FFF6E9]/90 backdrop-blur-xl border-b border-[#f1d9b5] px-4 md:px-8 py-4 flex justify-between items-center">

      {/* LEFT */}
      <div>
        <h2 className="text-lg md:text-2xl font-black text-[#6b4f4f]">
          Hello, {user?.name ?? "User"}!
        </h2>
        <p className="text-[10px] md:text-xs text-[#a68c7c] font-bold uppercase">
          Ready to manage your money
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <motion.button whileTap={{ scale: 0.9 }}>
          <Bell size={20} className="text-[#6b4f4f]" />
        </motion.button>

        <button
          onClick={() => logout()}
          className="w-10 h-10 rounded-full bg-[#e7a6b1] text-white flex items-center justify-center font-bold"
        >
          {user?.name?.charAt(0) ?? "U"}
        </button>
      </div>
    </header>
  );
}