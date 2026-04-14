"use client";

import { motion, AnimatePresence } from "motion/react";
import { Bell, Check, Plus, Pencil, Trash2, X, Clock } from "lucide-react";
import { useGetReminders, useToggleReminder, useCreateReminder, useUpdateReminder, useDeleteReminder, Reminder } from "@/query/reminders";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type FrequencyType = "daily" | "weekly" | "monthly";

type FormState = {
  title: string;
  description: string;
  remind_time: string;
  frequency: FrequencyType;
};

const defaultForm: FormState = {
  title: "",
  description: "",
  remind_time: "08:00",
  frequency: "daily",
};

const FREQUENCY_OPTIONS: { value: FrequencyType; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

function ReminderModal({
  open,
  onClose,
  editData,
}: {
  open: boolean;
  onClose: () => void;
  editData?: Reminder | null;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(
    editData
      ? {
        title: editData.title,
        description: editData.description ?? "",
        remind_time: editData.remind_time,
        frequency: editData.frequency,
      }
      : defaultForm
  );

  const { mutate: createReminder, isPending: isCreating } = useCreateReminder({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      onClose();
    },
  });

  const { mutate: updateReminder, isPending: isUpdating } = useUpdateReminder({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      onClose();
    },
  });

  const isPending = isCreating || isUpdating;

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    if (editData) {
      updateReminder({ id: editData.id, ...form });
    } else {
      createReminder(form);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-surface-container-low rounded-[2rem] p-8 w-full max-w-md marshmallow-shadow pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-extrabold text-on-surface">
                  {editData ? "Edit Reminder" : "Add Reminder"}
                </h4>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
                >
                  <X size={18} className="text-on-surface-variant" />
                </button>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Take vitamins"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="bg-surface-container rounded-2xl px-4 py-3 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Description <span className="normal-case font-normal">(optional)</span>
                  </label>
                  <textarea
                    placeholder="Add a short note..."
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="bg-surface-container rounded-2xl px-4 py-3 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>

                {/* Time & Frequency */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      Time
                    </label>
                    <div className="relative">
                      <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                      <input
                        type="time"
                        value={form.remind_time}
                        onChange={(e) => setForm((f) => ({ ...f, remind_time: e.target.value }))}
                        className="w-full bg-surface-container rounded-2xl pl-9 pr-3 py-3 text-sm font-medium text-on-surface outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      Frequency
                    </label>
                    <select
                      value={form.frequency}
                      onChange={(e) => setForm((f) => ({ ...f, frequency: e.target.value as FrequencyType }))}
                      className="bg-surface-container rounded-2xl px-4 py-3 text-sm font-medium text-on-surface outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
                    >
                      {FREQUENCY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={isPending || !form.title.trim()}
                  className="mt-2 w-full py-3.5 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <Plus size={16} />
                      {editData ? "Save Changes" : "Add Reminder"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function RemindCard() {
  const { data: reminders = [], isLoading } = useGetReminders();
  const { mutate: toggleReminder } = useToggleReminder();
  const { mutate: deleteReminder } = useDeleteReminder();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Reminder | null>(null);

  const handleToggle = (id: number) => {
    toggleReminder(id, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reminders"] }),
    });
  };

  const handleDelete = (id: number) => {
    deleteReminder(id, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reminders"] }),
    });
  };

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  const openEdit = (reminder: Reminder) => {
    setEditTarget(reminder);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  return (
    <>
      <section className="bg-surface-container-low rounded-[2.5rem] p-8 marshmallow-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-extrabold text-on-surface">Remind Me!</h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
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
                {/* Top row: icon + badge + actions */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${reminder.is_active
                        ? "bg-secondary-container text-secondary"
                        : "bg-surface-container text-on-surface-variant"
                      }`}
                  >
                    <Bell size={22} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${reminder.is_active
                          ? "bg-secondary-container text-secondary"
                          : "bg-surface-container text-on-surface-variant"
                        }`}
                    >
                      {reminder.is_active ? "Active" : "Inactive"}
                    </span>

                    {/* Edit */}
                    <button
                      onClick={() => openEdit(reminder)}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
                      title="Edit reminder"
                    >
                      <Pencil size={14} className="text-on-surface-variant" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-error-container transition-colors group"
                      title="Delete reminder"
                    >
                      <Trash2 size={14} className="text-on-surface-variant group-hover:text-error transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 className="font-extrabold text-on-surface">{reminder.title}</h4>
                  {reminder.description && (
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      {reminder.description}
                    </p>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  <span>{reminder.frequency}</span>
                  <span>{reminder.remind_time}</span>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => handleToggle(reminder.id)}
                  className={`w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${reminder.is_active
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

      {/* Modal */}
      <ReminderModal open={modalOpen} onClose={closeModal} editData={editTarget} />
    </>
  );
}