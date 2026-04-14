"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Briefcase, ArrowRight, HelpCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useLogin } from "@/query/auth";
import { useAuth } from "@/core/providers/Auth-context";

const formSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth(); // ← tambah ini
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: login } = useLogin({
    onSuccess: (data) => { // ← tambah `data` parameter
      setUser(data.user); // ← tambah ini
      setSnackbar({ open: true, message: "Login berhasil! Selamat datang kembali", severity: "success" });
      setTimeout(() => router.push("/x/dashboard"), 1500);
    },
    onError: (err) => {
      console.log(err);
      setSnackbar({ open: true, message: "Login gagal. Cek email & password kamu.", severity: "error" });
      setLoading(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    login({ email: data.email, password: data.password });
  };

  // ... sisa JSX tidak berubah sama sekali
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled"
          sx={{ borderRadius: "12px", fontFamily: "Plus Jakarta Sans" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="fixed -bottom-40 -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(152,244,217,0.3)_0%,rgba(255,255,255,0)_70%)] -z-10 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(253,181,204,0.2)_0%,rgba(255,255,255,0)_70%)] -z-10 pointer-events-none" />

      <nav className="w-full max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-extrabold tracking-tight text-brand-primary"
        >
          Spendaily
        </motion.div>
        <motion.button
          type="button"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 transition-colors"
        >
          <HelpCircle size={20} />
        </motion.button>
      </nav>

      <main className="flex-1 w-full max-w-lg mx-auto px-6 flex flex-col items-center justify-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <div className="w-16 h-12 bg-brand-secondary-container rounded-lg flex items-center justify-center mb-6 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.06)]">
            <Briefcase className="text-brand-secondary" size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
            Welcome Back, Saver!
          </h1>
          <p className="text-slate-500 font-medium">
            Ready to check on your financial marshmallows?
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-6">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="hello@spendaily.com"
                  className="w-full px-8 py-5 rounded-full bg-brand-muted border-none focus:ring-4 focus:ring-brand-primary-container/30 text-slate-700 placeholder-slate-400 font-medium transition-all outline-none"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-400 text-xs font-medium px-6">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-6">
              Password
            </label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className="w-full px-8 py-5 rounded-full bg-brand-muted border-none focus:ring-4 focus:ring-brand-primary-container/30 text-slate-700 placeholder-slate-400 font-medium transition-all outline-none pr-14"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs font-medium px-6">{errors.password.message}</p>
            )}
            <div className="text-right px-6">
              <button
                type="button"
                className="text-[11px] font-bold text-slate-500 uppercase tracking-widest hover:text-brand-primary transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-full bg-brand-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
            <ArrowRight size={20} />
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-12 mb-8 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative bg-white px-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Or Join With
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full py-5 rounded-full bg-brand-google border border-brand-muted text-slate-700 font-bold text-lg flex items-center justify-center gap-3 shadow-sm transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-sm font-medium text-slate-500"
        >
          New here?{" "}
          <Link href="/register" className="text-brand-primary font-bold hover:underline">
            Start a Saving Account
          </Link>
        </motion.p>
      </main>
    </div>
  );
}