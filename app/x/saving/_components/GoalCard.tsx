"use client";

import { motion } from "motion/react";
import { Plus, Flame, DollarSign, Trash2, Pencil } from "lucide-react";
import {
    useGetTransactionSummary,
} from "@/query/dashboard";
import { useGetSavingsTarget, useDeleteSavingsTarget } from "@/query/saving";
import { useQueryClient } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

function formatRupiah(amount: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function GoalCard({ onAddTarget }: { onAddTarget: () => void }) {
    const { data: target, isLoading } = useGetSavingsTarget();
    const { data: summary } = useGetTransactionSummary("monthly");
    const { mutate: deleteTarget } = useDeleteSavingsTarget();
    const queryClient = useQueryClient();
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({ open: false, message: "", severity: "success" });

    const balance = summary?.balance ?? 0;
    const targetAmount = target?.target_amount ?? 0;
    const progress = targetAmount > 0 ? Math.min((balance / targetAmount) * 100, 100) : 0;

    const startDate = target?.start_date
        ? new Date(target.start_date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "-";
    const endDate = target?.end_date
        ? new Date(target.end_date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "-";

    const handleDelete = () => {
        deleteTarget(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["savings-target"] });
                setSnackbar({ open: true, message: "Target dihapus.", severity: "success" });
            },
            onError: () => {
                setSnackbar({ open: true, message: "Gagal menghapus target.", severity: "error" });
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 text-on-surface-variant">
                Loading...
            </div>
        );
    }

    return (
        <>
            {/* Goal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!target ? (
                    /* Empty State */
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onAddTarget}
                        className="h-[340px] bg-surface-container rounded-[2.5rem] border-2 border-dashed border-on-surface/20 flex flex-col items-center justify-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-colors marshmallow-shadow"
                    >
                        <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center">
                            <Plus size={32} className="text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-extrabold text-lg text-on-surface">Set Savings Target</p>
                            <p className="text-sm text-on-surface-variant mt-1">Start your saving journey!</p>
                        </div>
                    </motion.button>
                ) : (
                    /* Target Card */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary-container p-8 rounded-[2.5rem] flex flex-col justify-between h-[340px] marshmallow-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center">
                                <DollarSign className="text-primary" size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={onAddTarget}
                                    className="w-9 h-9 bg-white/50 rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
                                >
                                    <Pencil size={16} className="text-primary" />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-9 h-9 bg-white/50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 size={16} className="text-red-500" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-extrabold text-on-primary-container mb-1 leading-tight">
                                Savings Target
                            </h3>
                            <p className="text-[10px] font-bold text-on-primary-container/60 uppercase tracking-widest mb-4">
                                {startDate} – {endDate}
                            </p>
                            <p className="text-sm font-bold text-on-primary-container/70">
                                Daily Limit: {formatRupiah(target.daily_limit)}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-extrabold text-on-primary-container">
                                    {formatRupiah(balance)}
                                </span>
                                <span className="text-lg font-bold text-on-primary-container opacity-60">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="w-full h-4 bg-black/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-primary rounded-full"
                                />
                            </div>
                            <p className="text-xs font-bold text-on-primary-container/60">
                                of {formatRupiah(targetAmount)} goal
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Add New Goal placeholder */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onAddTarget}
                    className="h-[340px] bg-surface-container rounded-[2.5rem] border-2 border-dashed border-on-surface/20 flex flex-col items-center justify-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                    <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center">
                        <Plus size={32} className="text-primary" />
                    </div>
                    <div className="text-center">
                        <p className="font-extrabold text-lg text-on-surface">New Goal</p>
                        <p className="text-sm text-on-surface-variant mt-1">Add another saving target</p>
                    </div>
                </motion.button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-tertiary-container p-8 rounded-[2.5rem] flex items-center gap-6 marshmallow-shadow"
                >
                    <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center">
                        <Flame className="text-tertiary" size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest text-tertiary uppercase">
                            Daily Limit
                        </p>
                        <h4 className="text-4xl font-extrabold text-on-surface">
                            {target ? formatRupiah(target.daily_limit) : "—"}
                        </h4>
                        <p className="text-xs font-bold text-on-surface-variant mt-1">
                            Per day spending limit
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-secondary-container p-8 rounded-[2.5rem] flex items-center gap-6 marshmallow-shadow"
                >
                    <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center">
                        <DollarSign className="text-secondary" size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest text-secondary uppercase">
                            Target Amount
                        </p>
                        <h4 className="text-4xl font-extrabold text-on-surface">
                            {target ? formatRupiah(target.target_amount) : "—"}
                        </h4>
                        <p className="text-xs font-bold text-on-surface-variant mt-1">
                            {target
                                ? `${Math.round(progress)}% achieved`
                                : "No target set yet"}
                        </p>
                    </div>
                </motion.div>
            </div>

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
        </>
    );
}