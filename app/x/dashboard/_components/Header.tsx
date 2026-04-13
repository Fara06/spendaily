"use client";

import { Bell } from "lucide-react";
import { motion } from "motion/react";
import { useGetUser } from "@/query/dashboard";

export default function Header() {
  const { data: user } = useGetUser();

  return (
    <header className="w-full top-0 sticky z-10 bg-surface-container-low/80 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-black text-primary tracking-tight">
            Hello, {user?.name ?? "Marshmallow"}!
          </h2>
          <p className="text-on-surface-variant font-medium">
            Ready to balance your bubbly life?
          </p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary"
          >
            <Bell size={20} />
          </motion.button>
          <div className="w-12 h-12 rounded-full bg-primary-container overflow-hidden border-2 border-primary-container">
            {user?.avatar ? (
              <img
                alt={user.name}
                className="w-full h-full object-cover"
                src={user.avatar}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-container text-primary font-black text-lg">
                {user?.name?.charAt(0).toUpperCase() ?? "M"}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}