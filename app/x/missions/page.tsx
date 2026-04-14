"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Trophy,
    Star,
    Flame,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Lock,
    Clock,
    Zap,
    Target,
    Gift,
    Loader2,
    AlertCircle,
    Plus,
    TrendingUp,
    Calendar,
    Award,
} from "lucide-react";
import { useAuth } from "@/core/providers/Auth-context";
import {
    useGetMissions,
    useGetActiveMissions,
    useStartMission,
    useGetUserMissionById,
    useVerifyMissionDay,
    useClaimMissionReward,
} from "@/query/misi";
import { useQueryClient } from "@tanstack/react-query";

type View = "dashboard" | "list" | "detail" | "success";

// ─── UTILS ────────────────────────────────────────────────────────────────────

function getMissionIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes("food") || t.includes("makan") || t.includes("eat")) return "🍱";
    if (t.includes("coffee") || t.includes("kopi")) return "☕";
    if (t.includes("walk") || t.includes("jalan")) return "🚶";
    if (t.includes("night") || t.includes("malam")) return "🌙";
    if (t.includes("save") || t.includes("tabung")) return "💰";
    if (t.includes("budget") || t.includes("pengeluaran")) return "📊";
    if (t.includes("sport") || t.includes("gym") || t.includes("olahraga")) return "🏋️";
    return "🎯";
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function MissionsPage() {
    const [view, setView] = useState<View>("dashboard");
    const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { mutate: startMission } = useStartMission();
    const { data: activeMissions } = useGetActiveMissions();
    const active = activeMissions?.[0] ?? null;

    useEffect(() => { setMounted(true); }, []);

    const refresh = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["user-missions"] });
        queryClient.invalidateQueries({ queryKey: ["user-missions", "active"] });
    }, [queryClient]);

    const handleStart = (id: number) => {
        if (active) {
            alert("Kamu sudah punya mission aktif!");
            return;
        }
        startMission(id, {
            onSuccess: (res) => {
                setSelectedMissionId(res.id);
                refresh();
                setView("detail");
            },
        });
    };

    const handleMissionClick = (id: number) => {
        setSelectedMissionId(id);
        setView("detail");
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#FDF8F3]">
            {/* TOP BAR */}
            <header className="sticky top-0 z-30 bg-[#FDF8F3]/80 backdrop-blur-xl border-b border-primary/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {view !== "dashboard" && (
                        <button
                            onClick={() => setView(view === "list" ? "dashboard" : view === "detail" ? "list" : "dashboard")}
                            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-xl font-black text-primary tracking-tight">
                            {view === "dashboard" && "Missions"}
                            {view === "list" && "All Missions"}
                            {view === "detail" && "Mission Detail"}
                            {view === "success" && "Selesai! 🎉"}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black text-amber-700">
                        {user?.points?.toLocaleString() ?? 0} pts
                    </span>
                </div>
            </header>

            {/* CONTENT */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.2 }}
                >
                    {view === "dashboard" && (
                        <DashboardView
                            user={user}
                            active={active}
                            onOpenList={() => setView("list")}
                            onActiveClick={() => active && handleMissionClick(active.id)}
                            onStart={handleStart}
                        />
                    )}
                    {view === "list" && (
                        <ListView onStart={handleStart} />
                    )}
                    {view === "detail" && selectedMissionId && (
                        <DetailView
                            missionId={selectedMissionId}
                            onComplete={() => { refresh(); setView("success"); }}
                            onBack={() => setView("dashboard")}
                        />
                    )}
                    {view === "success" && selectedMissionId && (
                        <SuccessView
                            missionId={selectedMissionId}
                            onNext={() => { setSelectedMissionId(null); setView("list"); }}
                            onBack={() => { refresh(); setView("dashboard"); }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── DASHBOARD VIEW ────────────────────────────────────────────────────────────

function DashboardView({ user, active, onOpenList, onActiveClick, onStart }: {
    user: any;
    active: any;
    onOpenList: () => void;
    onActiveClick: () => void;
    onStart: (id: number) => void;
}) {
    const { data: missions, isLoading } = useGetMissions("all");
    const recommended = missions?.slice(0, 3) ?? [];

    return (
        <div className="px-6 py-8 max-w-4xl mx-auto space-y-8">
            {/* HERO */}
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-3xl p-7 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
                <div className="absolute bottom-0 right-12 w-24 h-24 bg-white/5 rounded-full translate-y-8" />
                <Trophy className="mb-3 opacity-80" size={32} />
                <h2 className="text-3xl font-black leading-tight">
                    Halo, {user?.name?.split(" ")[0] ?? "Spender"}! 👋
                </h2>
                <p className="text-white/70 mt-1 text-sm font-medium">
                    Kebiasaan kecil bikin dompet makin tebal.
                </p>
                <button
                    onClick={onOpenList}
                    className="mt-5 flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-full text-sm font-black hover:bg-white/90 transition-colors"
                >
                    <Plus size={16} /> Ambil Mission Baru
                </button>
            </div>

            {/* ACTIVE MISSION */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-lg text-on-surface">Mission Aktif</h3>
                    {active && (
                        <button onClick={onActiveClick} className="text-xs font-bold text-primary flex items-center gap-1">
                            Lihat Detail <ChevronRight size={14} />
                        </button>
                    )}
                </div>

                {active ? (
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={onActiveClick}
                        className="w-full bg-white border border-primary/10 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">{getMissionIcon(active.mission?.title ?? "")}</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-on-surface truncate">{active.mission?.title}</p>
                                <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{active.mission?.description}</p>

                                <div className="mt-3">
                                    <div className="flex justify-between text-xs font-bold text-on-surface-variant mb-1.5">
                                        <span className="flex items-center gap-1"><Flame size={11} className="text-orange-400" /> Progress</span>
                                        <span>{active.progress ?? 0}%</span>
                                    </div>
                                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${active.progress ?? 0}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 shrink-0">
                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                <span className="text-xs font-black text-amber-700">{active.mission?.reward_points}</span>
                            </div>
                        </div>
                    </motion.button>
                ) : (
                    <div className="bg-white border border-dashed border-primary/20 rounded-2xl p-6 text-center">
                        <Target className="mx-auto text-primary/30 mb-2" size={32} />
                        <p className="text-sm font-bold text-on-surface-variant">Belum ada mission aktif</p>
                        <button onClick={onOpenList} className="mt-3 text-xs font-black text-primary">
                            + Mulai mission sekarang
                        </button>
                    </div>
                )}
            </section>

            {/* RECOMMENDED */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-lg text-on-surface">Rekomendasi</h3>
                    <button onClick={onOpenList} className="text-xs font-bold text-primary flex items-center gap-1">
                        Semua <ChevronRight size={14} />
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-primary" size={24} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {recommended.map((m, i) => (
                            <MissionCard key={m.id} mission={m} index={i} onStart={onStart} />
                        ))}
                    </div>
                )}
            </section>

            {/* STATS STRIP */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { icon: <Award size={18} />, label: "Total Pts", value: user?.points?.toLocaleString() ?? "0" },
                    { icon: <TrendingUp size={18} />, label: "Minggu ini", value: "🔥" },
                    { icon: <Calendar size={18} />, label: "Streak", value: "3 hari" },
                ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-primary/8 text-center">
                        <div className="text-primary/50 flex justify-center mb-1">{s.icon}</div>
                        <p className="text-lg font-black text-on-surface">{s.value}</p>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── LIST VIEW ────────────────────────────────────────────────────────────────

function ListView({ onStart }: { onStart: (id: number) => void }) {
    const { data: missions, isLoading } = useGetMissions("all");
    const { data: activeMissions } = useGetActiveMissions();
    const active = activeMissions?.[0] ?? null;
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const { mutate: startMission } = useStartMission();
    const queryClient = useQueryClient();

    const handleStart = (id: number) => {
        if (active) { alert("Selesaikan mission aktif dulu!"); return; }
        setLoadingId(id);
        startMission(id, {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["user-missions"] });
                setLoadingId(null);
                onStart(res.id);
            },
            onError: () => setLoadingId(null),
        });
    };

    if (isLoading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={28} />
        </div>
    );

    return (
        <div className="px-6 py-8 max-w-4xl mx-auto space-y-4">
            {missions?.map((m, i) => (
                <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl p-5 border border-primary/8 shadow-sm flex items-center gap-4"
                >
                    <div className="text-3xl w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                        {getMissionIcon(m.title)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-on-surface">{m.title}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{m.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                                <Clock size={10} /> {m.duration} hari
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                                <Star size={10} className="fill-amber-500 text-amber-500" /> {m.reward_points} pts
                            </span>
                            {m.is_featured && (
                                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-full">
                                    ⭐ Featured
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        disabled={loadingId !== null}
                        onClick={() => handleStart(m.id)}
                        className="shrink-0 bg-primary text-white px-4 py-2.5 rounded-xl text-xs font-black hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center gap-1.5"
                    >
                        {loadingId === m.id ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                        {loadingId === m.id ? "..." : "Mulai"}
                    </button>
                </motion.div>
            ))}
        </div>
    );
}

// ─── DETAIL VIEW ──────────────────────────────────────────────────────────────

function DetailView({ missionId, onComplete, onBack }: {
    missionId: number;
    onComplete: () => void;
    onBack: () => void;
}) {
    const { data, isLoading } = useGetUserMissionById(missionId);
    const { mutate: verify, isPending: isVerifying } = useVerifyMissionDay();

    if (isLoading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={28} />
        </div>
    );

    if (!data) return (
        <div className="flex flex-col items-center py-20 gap-3 text-on-surface-variant">
            <AlertCircle size={32} />
            <p className="font-bold">Data mission tidak ditemukan</p>
            <button onClick={onBack} className="text-sm text-primary font-bold">← Kembali</button>
        </div>
    );

    const mission = data.mission;
    const progress = data.progress ?? 0;
    const target = mission?.target_value ?? 1;
    const pct = Math.min((progress / target) * 100, 100);
    const isComplete = pct >= 100;

    const handleVerify = () => {
        verify(data.id, {
            onSuccess: () => {
                if (isComplete) onComplete();
            },
        });
    };

    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (pct / 100) * circumference;

    return (
        <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
            {/* MISSION HEADER */}
            <div className="bg-white rounded-3xl p-6 border border-primary/8 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="text-4xl">{getMissionIcon(mission?.title ?? "")}</div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-black text-on-surface leading-tight">{mission?.title}</h2>
                        <p className="text-sm text-on-surface-variant mt-1">{mission?.description}</p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                                <Clock size={10} /> {mission?.duration} hari
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                                <Gift size={10} /> {mission?.reward_points} pts reward
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROGRESS RING */}
            <div className="bg-white rounded-3xl p-8 border border-primary/8 shadow-sm flex flex-col items-center gap-4">
                <div className="relative w-36 h-36">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="10" className="text-primary/10" />
                        <motion.circle
                            cx="60" cy="60" r="54"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-primary"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-primary">{Math.round(pct)}%</span>
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase">Progress</span>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-2xl font-black text-on-surface">{progress} / {target}</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">hari selesai</p>
                </div>

                {isComplete ? (
                    <button
                        onClick={onComplete}
                        className="w-full max-w-xs bg-gradient-to-r from-primary to-primary/70 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Trophy size={18} /> Ambil Reward!
                    </button>
                ) : (
                    <button
                        onClick={handleVerify}
                        disabled={isVerifying}
                        className="w-full max-w-xs bg-primary text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {isVerifying ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                        {isVerifying ? "Memverifikasi..." : "Verify Hari Ini"}
                    </button>
                )}
            </div>

            {/* STEPS PROGRESS */}
            <div className="bg-white rounded-3xl p-6 border border-primary/8 shadow-sm">
                <h3 className="font-black text-on-surface mb-4 flex items-center gap-2">
                    <Calendar size={16} /> Daily Log
                </h3>
                <div className="space-y-3">
                    {Array.from({ length: target }).map((_, i) => {
                        const done = i < progress;
                        const current = i === progress;
                        return (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${done ? "bg-primary/5" : current ? "bg-amber-50 border border-amber-200" : "bg-surface-container/50"}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-primary text-white" : current ? "bg-amber-500 text-white" : "bg-surface-container text-on-surface-variant"}`}>
                                    {done ? <CheckCircle2 size={16} /> : current ? <Flame size={16} /> : <Lock size={14} />}
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${done ? "text-primary" : current ? "text-amber-700" : "text-on-surface-variant"}`}>
                                        Hari {i + 1}
                                    </p>
                                    <p className="text-[10px] text-on-surface-variant">
                                        {done ? "Selesai ✓" : current ? "Dalam progress..." : "Terkunci"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* GIVE UP */}
            <button onClick={onBack} className="w-full py-3 text-sm font-bold text-red-400 hover:text-red-500 transition-colors">
                Menyerah & Kembali
            </button>
        </div>
    );
}

// ─── SUCCESS VIEW ─────────────────────────────────────────────────────────────

function SuccessView({ missionId, onNext, onBack }: {
    missionId: number;
    onNext: () => void;
    onBack: () => void;
}) {
    const { data, isLoading } = useGetUserMissionById(missionId);
    const { mutate: claim, isPending } = useClaimMissionReward();

    const handleClaim = () => {
        claim(data!.id, { onSuccess: onNext });
    };

    if (isLoading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={28} />
        </div>
    );

    const mission = data?.mission;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            {/* Confetti particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 0, x: Math.random() * window.innerWidth }}
                        animate={{ y: window.innerHeight + 20, opacity: [0, 1, 1, 0], rotate: Math.random() * 720 }}
                        transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 1.5, repeat: Infinity }}
                        className={`absolute w-3 h-3 rounded-sm ${["bg-primary", "bg-amber-400", "bg-secondary", "bg-tertiary"][i % 4]}`}
                    />
                ))}
            </div>

            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center gap-6 text-center"
            >
                {/* ICON */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 10 }}
                    className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg"
                >
                    <Trophy size={44} className="text-white" />
                </motion.div>

                <div>
                    <h2 className="text-2xl font-black text-on-surface">Mission Selesai!</h2>
                    <p className="text-sm text-on-surface-variant mt-1">
                        Kamu berhasil menyelesaikan <strong className="text-on-surface">"{mission?.title}"</strong>
                    </p>
                </div>

                {/* REWARD */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 w-full">
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">Reward Kamu</p>
                    <p className="text-4xl font-black text-amber-600">+{mission?.reward_points}</p>
                    <p className="text-xs font-bold text-amber-500">points</p>
                </div>

                <div className="w-full space-y-3">
                    <button
                        onClick={handleClaim}
                        disabled={isPending || data?.is_claimed}
                        className="w-full bg-gradient-to-r from-primary to-primary/70 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                    >
                        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Gift size={18} />}
                        {data?.is_claimed ? "Sudah Diklaim" : isPending ? "Mengklaim..." : "Klaim Reward"}
                    </button>
                    <button onClick={onBack} className="w-full text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors py-2">
                        Kembali ke Dashboard
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// ─── MISSION CARD ─────────────────────────────────────────────────────────────

function MissionCard({ mission, index, onStart }: { mission: any; index: number; onStart: (id: number) => void }) {
    const colors = [
        "from-violet-50 to-violet-100/50 border-violet-200",
        "from-emerald-50 to-emerald-100/50 border-emerald-200",
        "from-rose-50 to-rose-100/50 border-rose-200",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${colors[index % 3]} rounded-2xl p-5 border flex flex-col gap-3`}
        >
            <div className="text-3xl">{getMissionIcon(mission.title)}</div>
            <div className="flex-1">
                <p className="font-black text-on-surface text-sm leading-tight">{mission.title}</p>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{mission.description}</p>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                    {mission.reward_points} pts
                </span>
                <button
                    onClick={() => onStart(mission.id)}
                    className="text-xs font-black text-primary flex items-center gap-1 hover:gap-2 transition-all"
                >
                    Mulai <ChevronRight size={13} />
                </button>
            </div>
        </motion.div>
    );
}