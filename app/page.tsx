'use client'

import { motion } from "motion/react";
import Link from "next/link";
import {
  History,
  Rocket,
  TrendingUp,
  PlayCircle,
  PiggyBank,
  Check,
  Lock,
  Zap,
  Globe,
  Mail,
  UserCircle
} from "lucide-react";

export default function App(

) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-surface-container">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-primary">Spendaily</div>

          <div className="hidden md:flex items-center gap-10">
            {["Features", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-bold text-lg text-on-surface-variant hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="font-bold text-lg text-primary hover:scale-95 transition-transform">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-bold text-lg hover:scale-95 transition-transform shadow-sm">
                Get Started
              </button>
            </Link>
            <UserCircle className="w-8 h-8 text-primary cursor-pointer" />
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1 text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-6 py-2 bg-secondary-container text-on-secondary-container rounded-full font-bold text-sm tracking-widest uppercase">
              Your Finance, Inflatable
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface leading-[1.1]">
              Master Your <br />
              <span className="text-primary italic">Daily Spend</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Personal finance shouldn't feel heavy. Track your money with soft bubbles and marshmallow-light insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="bg-primary text-on-primary px-10 py-5 rounded-xl font-bold text-xl shadow-marshmallow hover:scale-95 transition-transform">
                Get Started Free
              </button>
              <button className="bg-surface-container-highest text-on-surface px-10 py-5 rounded-xl font-bold text-xl hover:scale-95 transition-transform flex items-center justify-center gap-2">
                <PlayCircle className="w-6 h-6" />
                See Magic
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-tertiary-container rounded-full blur-[80px] opacity-40 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-secondary-container rounded-full blur-[80px] opacity-40 animate-pulse" />

            <div className="relative bg-surface-container-low rounded-xl p-6 shadow-marshmallow rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-h_Ei6YYSg2F1JJR_hd08AqecK4s70044uhRzqEv2GsfMH1fIWWJIoWSJmQ0qP3Vrh5lEfZPUo2Mf9AeptzOJ4hI9niR8lX-4S06_gF-4fL1MNloc9nFbluRMdUdk7sgQN8LoK0yP5GSMlpJj3aPRrwfhl_uWP14ZZNMueAlcODdYQVGUV3pZl_i5TF02kfaXb44duNiChZ1DFTg149UQIG8DZef_X2wq5Es8-zZC7M3LEMf4k-ZfQH8koRPi6MRsI35d3vcH1Njo"
                alt="Dashboard Preview"
                className="rounded-lg w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <motion.div
                className="absolute -bottom-8 -right-8 bg-surface-container-highest p-4 rounded-lg shadow-xl max-w-[200px]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <PiggyBank className="w-5 h-5 text-secondary fill-secondary" />
                  <span className="font-bold text-sm">Goal Reached!</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-3">
                  <motion.div
                    className="bg-secondary h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="bg-surface-container-low py-32 rounded-t-[4rem]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-on-surface">Built for your pocket.</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg font-medium">
                Simple tools that help you save more and worry less. No spreadsheets, just bubbles.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Track Habits",
                  desc: "Log your daily spends with one tap. Categorize by color and see where your \"marshmallows\" go.",
                  icon: History,
                  color: "bg-primary-container text-primary"
                },
                {
                  title: "Save for Goals",
                  desc: "Set inflatable goals. Watch your savings bubbles grow as you contribute to your future dreams.",
                  icon: Rocket,
                  color: "bg-secondary-container text-secondary"
                },
                {
                  title: "Get Insights",
                  desc: "Understand your money through friendly visual reports that don't require an accounting degree.",
                  icon: TrendingUp,
                  color: "bg-tertiary-container text-tertiary"
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-surface-container-lowest p-10 rounded-xl hover:-translate-y-2 transition-all group shadow-sm"
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  className="h-64 bg-secondary-container rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWi0b_QWO_9aqcJaj_QLr3x-MJGuDO9HBtxd4oIJurzZwzACpj4W3okqPYqVHZ-lslt8XF2HCi3Fs5uKWAIyVkHElFylmXV3-BUrA62gHjmoj7mFkTgQaBV9GGLmDu1LyZeIQYVGMpL5l67cwaUNtaJwgMqbEr8rI-uh_ukECQiX104Ze-VvcgCRokHpG_nEij6c5fkKUcXwVs8sHIE_nYPxmonM4LI5bjjZkrhvKM0dD54VWZfQRetmM0UU9HvyJ1xOLmWr7SC_Cj"
                    alt="Savings"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="h-48 bg-primary-container rounded-xl flex items-center justify-center p-8 text-center">
                  <p className="font-bold text-on-primary-container italic">
                    "Finally, a finance app that doesn't make me stressed."
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 bg-tertiary-container rounded-xl flex flex-col items-center justify-center p-4">
                  <span className="text-4xl font-black text-on-tertiary-container">4.9/5</span>
                  <span className="text-sm font-bold text-on-tertiary-container uppercase tracking-widest">App Rating</span>
                </div>
                <motion.div
                  className="h-64 bg-surface-container-highest rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACOGK-nDrvBAmyclzZreUgb_V7JLol0DltwuaFts6462h6Rv6qTEHyqdmWwJdw0drDndfsOzfSYdOUagBj0HZohOmqpX3-GST9ru5UrfJmGfJShztfkOng0ns81oyfeM_MWQKKchq6BQmCtmmjn1Cx7nC0LTCV1kLTOW5mTh5bTXsjpiubYN7pK_1QUF-EpGu6i1OtZOlMTzGWsx3NfMHpoBryoTuoaGh-KnpB9K5boJ5uRmOk5zpgLMzHUo9evbk-z9a-n-XEk1cX"
                    alt="Happy User"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-5xl font-black text-on-surface leading-tight">
                Personal Finance,<br />
                <span className="text-secondary">Redefined.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Zero Hidden Fees",
                    desc: "We believe in transparency. What you see is exactly what you get.",
                    icon: Check,
                    color: "bg-secondary-container text-secondary"
                  },
                  {
                    title: "Marshmallow-Secure",
                    desc: "Your data is encrypted and protected by bank-level security layers.",
                    icon: Lock,
                    color: "bg-primary-container text-primary"
                  },
                  {
                    title: "Instant Sync",
                    desc: "Connect your bank accounts and see transactions appear in real-time.",
                    icon: Zap,
                    color: "bg-tertiary-container text-tertiary"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-on-surface-variant">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <motion.div
            className="bg-primary text-on-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-marshmallow"
            whileInView={{ scale: [0.95, 1] }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">
              Ready to float your finances?
            </h2>
            <p className="text-xl mb-12 text-primary-container opacity-90 relative z-10 max-w-2xl mx-auto font-medium">
              Join 50,000+ users who are mastering their spend with Spendaily. Get started in less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button className="bg-white text-primary px-12 py-5 rounded-xl font-extrabold text-xl hover:scale-95 transition-transform">
                Get Started Now
              </button>
              <button className="border-4 border-white/30 text-white px-12 py-5 rounded-xl font-extrabold text-xl hover:scale-95 transition-transform backdrop-blur-sm">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container rounded-t-[4rem] mt-20">
        <div className="max-w-7xl mx-auto px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-2">
            <div className="text-2xl font-black text-primary">Spendaily</div>
            <p className="text-sm tracking-wide uppercase font-bold text-primary opacity-70">
              © 2024 Spendaily. Keep it Bubbly.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm tracking-wide uppercase font-bold text-on-surface-variant hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary cursor-pointer hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary cursor-pointer hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
