"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Delete } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/core/utils/service";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Category = {
  id: number;
  name: string;
  icon: string;
  type: "income" | "expense";
};

export default function AddTransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as "income" | "expense") ?? "expense";

  const [type, setType] = useState<"income" | "expense">(initialType);
  const [display, setDisplay] = useState("0");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const { data: allCategories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    },
  });

  const categories = allCategories.filter((cat) => cat.type === type);

  const { mutate: addTransaction, isPending } = useMutation({
    mutationFn: async () => {
      const payload: Record<string, unknown> = {
        type,
        amount: parseFloat(display),
        category_id: categoryId,
        transaction_time: new Date().toISOString().replace("T", " ").split(".")[0],
        source: "manual",
      };
      if (note) payload.note = note;

      const res = await api.post("/transactions", payload);
      return res.data;
    },
    onSuccess: () => {
      setSnackbar({ open: true, message: "Transaksi berhasil ditambahkan! 🎉", severity: "success" });
      setTimeout(() => router.push("/x/budgets"), 1500);
    },
    onError: (error: any) => {
      console.log("Error detail:", error.response?.data);
      setSnackbar({ open: true, message: "Gagal menambahkan transaksi.", severity: "error" });
    },
  });

  const handleKey = (key: string) => {
    if (key === "C") { setDisplay("0"); return; }
    if (key === "⌫") {
      setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      return;
    }
    if (key === "00") {
      setDisplay((prev) => (prev === "0" ? "0" : prev + "00"));
      return;
    }
    setDisplay((prev) => prev === "0" && key !== "." ? key : prev + key);
  };

  const handleSubmit = () => {
    if (parseFloat(display) <= 0) {
      setSnackbar({ open: true, message: "Masukkan jumlah yang valid.", severity: "error" });
      return;
    }
    if (!categoryId) {
      setSnackbar({ open: true, message: "Pilih kategori terlebih dahulu.", severity: "error" });
      return;
    }
    addTransaction();
  };

  const formatDisplay = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "0";
    return num.toLocaleString("id-ID");
  };

  const isExpense = type === "expense";

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left Panel — Amount & Calculator */}
      <div className={`flex flex-col justify-between w-full md:w-1/2 p-8 md:p-12 ${
        isExpense
          ? "bg-gradient-to-br from-primary-container to-primary-fixed"
          : "bg-gradient-to-br from-secondary-container to-secondary-fixed"
      }`}>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-on-primary-container font-bold w-fit hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span className="text-sm uppercase tracking-widest">Back</span>
        </button>

        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex gap-2 bg-white/20 p-1 rounded-full">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setType(t); setCategoryId(null); setDisplay("0"); }}
                className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                  type === t ? "bg-white text-on-surface shadow" : "text-white"
                }`}
              >
                {t === "expense" ? "Spending" : "Income"}
              </button>
            ))}
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container opacity-60">
            Enter Amount
          </p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-on-primary-container opacity-50 mb-2">Rp</span>
            <span className="text-6xl md:text-7xl font-black text-on-primary-container tracking-tighter">
              {formatDisplay(display)}
            </span>
          </div>

          <input
            type="text"
            placeholder="✏️ Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full max-w-xs bg-white/20 text-on-primary-container placeholder:text-on-primary-container/50 rounded-full px-6 py-3 text-sm font-medium outline-none border-none text-center"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto w-full">
          {["7","8","9","4","5","6","1","2","3","C","0","⌫"].map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`h-16 rounded-2xl text-xl font-black transition-all active:scale-95 ${
                key === "C" || key === "⌫"
                  ? "bg-white/30 text-on-primary-container"
                  : "bg-white/20 text-on-primary-container hover:bg-white/30"
              }`}
            >
              {key === "⌫" ? <Delete size={20} className="mx-auto" /> : key}
            </button>
          ))}
          <button
            onClick={() => handleKey("00")}
            className="col-span-3 h-16 rounded-2xl text-xl font-black bg-white/20 text-on-primary-container hover:bg-white/30 transition-all active:scale-95"
          >
            00
          </button>
        </div>
      </div>

      {/* Right Panel — Categories & Save */}
      <div className="hidden md:flex flex-col w-1/2 p-12 bg-surface-container-lowest">
        <h2 className="text-2xl font-extrabold text-on-surface mb-2">
          {isExpense ? "What did you spend on?" : "Where did this come from?"}
        </h2>
        <p className="text-sm text-on-surface-variant mb-8">
          Select a category for your {isExpense ? "expense" : "income"}.
        </p>

        <div className="grid grid-cols-3 gap-4 flex-1">
          {categories.length === 0 ? (
            <p className="col-span-3 text-sm text-on-surface-variant">Memuat kategori...</p>
          ) : (
            categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoryId(cat.id)}
                className={`flex flex-col items-center gap-3 p-6 rounded-3xl transition-all ${
                  categoryId === cat.id
                    ? isExpense
                      ? "bg-primary-container ring-2 ring-primary"
                      : "bg-secondary-container ring-2 ring-secondary"
                    : "bg-surface-container hover:bg-surface-container-high"
                }`}
              >
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-sm font-bold text-on-surface">{cat.name}</span>
              </motion.button>
            ))
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isPending}
          className={`w-full py-5 rounded-full font-bold text-lg text-white mt-8 flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
            isExpense
              ? "bg-primary shadow-lg shadow-primary/20"
              : "bg-secondary shadow-lg shadow-secondary/20"
          }`}
        >
          {isPending ? "Saving..." : "Save Transaction →"}
        </motion.button>
      </div>

      {/* Mobile Save Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-6 bg-surface">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className={`w-full py-5 rounded-full font-bold text-lg text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
            isExpense ? "bg-primary" : "bg-secondary"
          }`}
        >
          {isPending ? "Saving..." : "Save Transaction →"}
        </button>
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
    </div>
  );
}