"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useCreateSavingsTarget, useUpdateSavingsTarget, SavingsTarget } from "@/query/saving";
import { useQueryClient } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  onClose: () => void;
  existing?: SavingsTarget;
};

export default function SetTargetModal({ onClose, existing }: Props) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    target_amount: existing?.target_amount?.toString() ?? "",
    daily_limit: existing?.daily_limit?.toString() ?? "",
    start_date: existing?.start_date ?? "",
    end_date: existing?.end_date ?? "",
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const { mutate: create, isPending: creating } = useCreateSavingsTarget();
  const { mutate: update, isPending: updating } = useUpdateSavingsTarget();
  const isPending = creating || updating;

  const handleSubmit = () => {
    if (!form.target_amount || !form.daily_limit || !form.start_date || !form.end_date) {
      setSnackbar({ open: true, message: "Semua field harus diisi.", severity: "error" });
      return;
    }

    const params = {
      target_amount: parseFloat(form.target_amount),
      daily_limit: parseFloat(form.daily_limit),
      start_date: form.start_date,
      end_date: form.end_date,
    };

    if (existing) {
      update({ id: existing.id, ...params }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["savings-target"] });
          setSnackbar({ open: true, message: "Target berhasil diupdate! 🎉", severity: "success" });
          setTimeout(() => onClose(), 1500);
        },
        onError: () => {
          setSnackbar({ open: true, message: "Gagal mengupdate target.", severity: "error" });
        },
      });
    } else {
      create(params, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["savings-target"] });
          setSnackbar({ open: true, message: "Target berhasil disimpan! 🎉", severity: "success" });
          setTimeout(() => onClose(), 1500);
        },
        onError: () => {
          setSnackbar({ open: true, message: "Gagal menyimpan target.", severity: "error" });
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-container-lowest rounded-[2.5rem] w-full max-w-md mx-4 p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-extrabold text-on-surface">
            {existing ? "Update Target" : "Set Savings Target"}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] px-2">
              Target Amount (Rp)
            </label>
            <input
              type="number"
              placeholder="5000000"
              value={form.target_amount}
              onChange={(e) => setForm({ ...form, target_amount: e.target.value })}
              className="w-full bg-surface-container rounded-full px-6 py-4 text-on-surface font-medium outline-none border-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] px-2">
              Daily Limit (Rp)
            </label>
            <input
              type="number"
              placeholder="50000"
              value={form.daily_limit}
              onChange={(e) => setForm({ ...form, daily_limit: e.target.value })}
              className="w-full bg-surface-container rounded-full px-6 py-4 text-on-surface font-medium outline-none border-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] px-2">
                Start Date
              </label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="w-full bg-surface-container rounded-full px-6 py-4 text-on-surface font-medium outline-none border-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] px-2">
                End Date
              </label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full bg-surface-container rounded-full px-6 py-4 text-on-surface font-medium outline-none border-none"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full py-5 rounded-full bg-primary text-white font-bold text-lg mt-8 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isPending ? "Saving..." : existing ? "Update Target →" : "Set Target →"}
        </motion.button>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: "12px", fontFamily: "Plus Jakarta Sans" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}