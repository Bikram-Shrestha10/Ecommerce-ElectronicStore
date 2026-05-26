import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Zap, Trophy, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 py-16 text-white sm:py-24 dark:bg-zinc-950" id="hero-section">
      {/* Background visual circles */}
      <div className="absolute -right-30 -top-30 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" id="radial-glow-r" />
      <div className="absolute -left-30 -bottom-30 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" id="radial-glow-l" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left copy column */}
          <div className="lg:col-span-12 flex flex-col justify-center max-w-4xl">
            
            {/* Tag badge with stagger entry */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex max-w-fit items-center gap-1.5 rounded-full bg-zinc-800/80 px-3.5 py-1.5 text-xs font-bold text-blue-450 border border-zinc-700/50"
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>SUPERCHARGED TECH UP TO 25% OFF</span>
            </motion.div>
 
            {/* Giant Display Header */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight"
            >
              Hamro<span className="text-blue-550">Gadget</span>
              <br />
              <span className="text-zinc-100">The Premium Digital Experience</span>
            </motion.h1>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-zinc-400"
            >
              Unlock access to certified, highly sought-after electronic gadgets from Apple, Sony, Samsung, and Keychron, available in Nepal. Secure 100% genuine brand warranties and super fast customer support.
            </motion.p>
 
            {/* CTA list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 flex flex-row flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
              >
                Shop Store Catalog
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
               
               <Link
                to="/products?category=Gaming"
                className="rounded-xl border border-zinc-700 hover:border-zinc-500 bg-zinc-800/40 hover:bg-zinc-850 px-6 py-3.5 text-xs font-bold text-zinc-200 transition-all cursor-pointer"
              >
                Explore Gaming Deals
              </Link>
            </motion.div>
 
            {/* High-value statistics or guarantees in lower grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-4 border-t border-zinc-800/60 pt-8 max-w-xl"
            >
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-450 sm:text-2xl">100%</span>
                <span className="mt-1 text-[10px] text-zinc-450 uppercase font-semibold">Genuine Gear</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white sm:text-2xl">24 Hr</span>
                <span className="mt-1 text-[10px] text-zinc-450 uppercase font-semibold">Valley Delivery</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white sm:text-2xl">Partner-EMI</span>
                <span className="mt-1 text-[10px] text-zinc-450 uppercase font-semibold">Zero Interest</span>
              </div>
            </motion.div>
 
          </div>

        </div>
      </div>
    </section>
  );
}
