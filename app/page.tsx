"use client"

import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  BarChart3,
  Search,
  Bell,
  Settings,
  TrendingUp,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Utensils,
  Car,
  MoreHorizontal
} from 'lucide-react';
import { motion } from "framer-motion";

const Sidebar = () => (
  <aside className="flex flex-col py-8 px-6 fixed left-0 top-0 h-full bg-surface rounded-r-xl w-72 shadow-marshmallow z-50">
    <div className="mb-12 px-2 flex items-center gap-3">
      <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center">
        <PiggyBank className="text-primary w-6 h-6 fill-primary/20" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-black text-primary tracking-tighter">Spendaily</h1>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">Marshmallow Saver</span>
      </div>
    </div>

    <nav className="flex-1 space-y-2">
      {[
        { icon: LayoutDashboard, label: 'Dashboard', active: false },
        { icon: Wallet, label: 'Budgets', active: true },
        { icon: PiggyBank, label: 'Savings', active: false },
        { icon: BarChart3, label: 'Insights', active: false },
      ].map((item) => (
        <motion.a
          key={item.label}
          href="#"
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-4 py-4 px-6 rounded-full transition-all duration-200 ${item.active
              ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary'
              : 'text-on-surface-variant font-medium hover:bg-primary-container/5'
            }`}
        >
          <item.icon className={`w-6 h-6 ${item.active ? 'fill-primary/20' : ''}`} />
          <span className="text-lg">{item.label}</span>
        </motion.a>
      ))}
    </nav>

    <div className="mt-auto p-4 bg-surface-container rounded-lg flex items-center gap-3">
      <img
        alt="User profile"
        className="w-10 h-10 rounded-full border-2 border-primary-container"
        src="https://picsum.photos/seed/alex/100/100"
        referrerPolicy="no-referrer"
      />
      <div className="overflow-hidden">
        <p className="text-sm font-bold truncate">Alex Marshmallow</p>
        <p className="text-xs text-on-surface-variant/70 truncate">Pro Saver</p>
      </div>
    </div>
  </aside>
);

const TopBar = () => (
  <header className="flex justify-between items-center w-full px-8 py-6 sticky top-0 z-40 bg-surface/80 backdrop-blur-xl">
    <div>
      <h2 className="text-3xl font-extrabold text-primary tracking-tight">Budgets</h2>
      <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/50 font-bold">Managing your sweetness</p>
    </div>

    <div className="flex items-center gap-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-5 h-5" />
        <input
          className="pl-12 pr-6 py-3 bg-surface-container-highest rounded-full border-none focus:ring-2 focus:ring-primary-container w-64 text-sm transition-all outline-none"
          placeholder="Find transactions..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="p-3 rounded-full hover:bg-surface-container transition-colors relative">
          <Bell className="text-primary w-6 h-6" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
        </button>
        <button className="p-3 rounded-full hover:bg-surface-container transition-colors">
          <Settings className="text-primary w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

const BalanceCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="md:col-span-8 p-10 bubbly-gradient rounded-xl shadow-[0_20px_50px_rgba(141,83,103,0.15)] text-white relative overflow-hidden group"
  >
    <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1">Current Balance</p>
          <h3 className="text-6xl font-black tracking-tighter">$4,250.60</h3>
        </div>
        <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-bold">+3.4%</span>
        </div>
      </div>
      <div className="flex gap-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Previous Month</p>
          <p className="text-xl font-bold">$4,108.40</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Monthly Saved</p>
          <p className="text-xl font-bold">$142.20</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const ActionButtons = () => (
  <div className="md:col-span-4 flex flex-col gap-4 h-full">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1 group bg-secondary-container hover:bg-secondary-container/90 transition-all duration-300 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-on-secondary-container"
    >
      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform">
        <Plus className="w-8 h-8 text-secondary" strokeWidth={3} />
      </div>
      <span className="font-bold text-lg tracking-tight">Add Income</span>
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1 group bg-primary-container hover:bg-primary-container/90 transition-all duration-300 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-on-primary-container"
    >
      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-180 transition-transform">
        <Minus className="w-8 h-8 text-primary" strokeWidth={3} />
      </div>
      <span className="font-bold text-lg tracking-tight">Add Spending</span>
    </motion.button>
  </div>
);

const TransactionCard = ({ icon: Icon, title, subtitle, amount, date, category, type }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-surface-container-low p-6 rounded-xl shadow-marshmallow hover:shadow-lg transition-all group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${type === 'income' ? 'bg-secondary-container' : type === 'leisure' ? 'bg-primary-container' : 'bg-tertiary-container'
        }`}>
        <Icon className={`w-6 h-6 ${type === 'income' ? 'text-on-secondary-container' : type === 'leisure' ? 'text-on-primary-container' : 'text-on-tertiary-container'
          }`} />
      </div>
      <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">{date}</span>
    </div>
    <h5 className="text-lg font-bold text-on-surface mb-1">{title}</h5>
    <p className="text-sm text-on-surface-variant/60 mb-4">{subtitle}</p>
    <div className="flex items-center justify-between">
      <span className={`text-2xl font-black ${type === 'income' ? 'text-secondary' : 'text-primary'}`}>
        {type === 'income' ? '+' : '-'}{amount}
      </span>
      <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-black uppercase rounded-full">
        {category}
      </span>
    </div>
  </motion.div>
);

const SpendingCategories = () => (
  <div className="bg-surface-container-lowest p-8 rounded-xl shadow-marshmallow space-y-6">
    <div className="flex items-center justify-between">
      <h4 className="text-xl font-extrabold">Spending Categories</h4>
      <MoreHorizontal className="text-on-surface-variant/40 w-6 h-6 cursor-pointer" />
    </div>
    <div className="space-y-6">
      {[
        { label: 'Housing', value: 65, color: 'bg-tertiary-container' },
        { label: 'Entertainment', value: 22, color: 'bg-primary-container' },
        { label: 'Savings Goal', value: 88, color: 'bg-secondary-container' },
      ].map((cat) => (
        <div key={cat.label} className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span>{cat.label}</span>
            <span>{cat.value}%</span>
          </div>
          <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${cat.value}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${cat.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SavingsGoal = () => (
  <div className="bg-surface-container p-8 rounded-xl shadow-marshmallow relative overflow-hidden">
    <div className="relative z-10 flex flex-col h-full">
      <h4 className="text-xl font-extrabold mb-2">New Car Fund</h4>
      <p className="text-sm text-on-surface-variant/70 mb-8">You're almost at the finish line! Keep saving those marshmallows.</p>
      <div className="mt-auto flex items-end justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-4xl font-black text-on-surface">$12,450</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">of $15,000 goal</span>
        </div>
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-8 border-secondary-container shadow-xl relative">
          <span className="text-xl font-black text-secondary">83%</span>
        </div>
      </div>
    </div>
    <div className="absolute -right-8 -bottom-8 opacity-5 rotate-12">
      <Car className="w-40 h-40" />
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="ml-72 flex-1 flex flex-col min-h-screen">
        <TopBar />

        <div className="px-8 pb-12 space-y-10">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <BalanceCard />
            <ActionButtons />
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-extrabold text-on-surface">Recent Transactions</h4>
              <button className="text-xs font-bold text-primary hover:underline px-4 py-2 bg-surface-container rounded-full transition-all">
                View All History
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <TransactionCard
                icon={ShoppingBag}
                title="Organic Groceries"
                subtitle="Whole Foods Market"
                amount="124.50"
                date="14 MAY, 2024"
                category="Essential"
                type="essential"
              />
              <TransactionCard
                icon={CreditCard}
                title="Freelance Payment"
                subtitle="Design Project UX"
                amount="2,400.00"
                date="12 MAY, 2024"
                category="Income"
                type="income"
              />
              <TransactionCard
                icon={Utensils}
                title="Marshmallow Cafe"
                subtitle="Coffee & Treats"
                amount="18.25"
                date="11 MAY, 2024"
                category="Leisure"
                type="leisure"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpendingCategories />
            <SavingsGoal />
          </section>
        </div>
      </main>
    </div>
  );
}
  