"use client";

import { motion } from "motion/react";
import { Bell, Check, Plus } from "lucide-react";
import { useGetReminders, useToggleReminder } from "@/query/saving";
import { useQueryClient } from "@tanstack/react-query";

export default function RemindCard() {
  const { data: reminders = [], isLoading } = useGetReminders();
  const { mutate: toggleReminder } = useToggleReminder();
  const queryClient = useQueryClient();

  const handleToggle = (id: number) => {
    toggleReminder(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reminders"] });
      },
    });
  };

  return (
    <section className="bg-surface-container-low rounded-[2.5rem] p-8 marshmallow-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-extrabold text-on-surface">Remind Me!</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
          <Plus size={16} />
          Add Reminder
        </button>
      </div>

      {isLoading ? (
        <p className="text-on-surface-variant text-sm text-center py-8">Loading...</p>
      ) : reminders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4">
            <Bell size={32} className="opacity-30" />
          </div>
          <p className="font-bold">No reminders yet.</p>
          <p className="text-sm mt-1">Add a reminder to stay on track!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              whileHover={{ y: -4 }}
              className="bg-surface-container-lowest p-6 rounded-[2rem] marshmallow-shadow flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  reminder.is_active
                    ? "bg-secondary-container text-secondary"
                    : "bg-surface-container text-on-surface-variant"
                }`}>
                  <Bell size={22} />
                </div>
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${
                  reminder.is_active
                    ? "bg-secondary-container text-secondary"
                    : "bg-surface-container text-on-surface-variant"
                }`}>
                  {reminder.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-on-surface">{reminder.title}</h4>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                  {reminder.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                <span>{reminder.frequency}</span>
                <span>{reminder.remind_time}</span>
              </div>

              <button
                onClick={() => handleToggle(reminder.id)}
                className={`w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  reminder.is_active
                    ? "bg-secondary text-white"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <Check size={16} />
                {reminder.is_active ? "Active!" : "Set Active"}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}