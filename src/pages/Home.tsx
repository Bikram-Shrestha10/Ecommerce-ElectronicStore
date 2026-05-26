import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Gamepad, 
  Tv, 
  Keyboard, 
  Zap, 
  ArrowRight, 
  Star, 
  Heart,
  RotateCcw,
  Sparkles,
  Award
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { motion } from "motion/react";

export default function Home() {
  const navigate = useNavigate();

  // Filter lists
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);

  // Categories helper mapping
  const categoryIcons: Record<string, any> = {
    Phones: Smartphone,
    Laptops: Laptop,
    Audio: Headphones,
    Smartwatches: Watch,
    Gaming: Gamepad,
    TVs: Tv,
    Accessories: Keyboard,
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300" id="home-page-container">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main categories section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="category-grid-section">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-baseline">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-650 dark:text-blue-450">
              EXPLORE COLLECTIONS
            </span>
            <h2 className="mt-1 font-sans text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
          >
            See all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Elegant responsive box grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.filter((c) => c !== "All").map((cat, idx) => {
            const IconComponent = categoryIcons[cat] || Smartphone;
            return (
              <motion.div
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(cat)}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-xs transition-all hover:border-blue-550 hover:shadow-md dark:border-zinc-805 dark:bg-zinc-900"
                id={`category-card-${idx}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-zinc-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-355 dark:group-hover:bg-blue-950/40 dark:group-hover:text-blue-450">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="mt-3.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {cat}
                </h3>
                <span className="mt-1 text-[9px] text-zinc-400 dark:text-zinc-500">
                  {PRODUCTS.filter((p) => p.category === cat).length} items
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured premium products showcase */}
      <section className="bg-white py-16 dark:bg-zinc-900/40 border-y border-zinc-200/50 dark:border-zinc-805/50" id="featured-showcase-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-baseline">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-650 dark:text-blue-450">
                EXCLUSIVE spotlight
              </span>
              <h2 className="mt-1 font-sans text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Featured Electronics
              </h2>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-1.5 text-xs font-bold text-zinc-800 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
            >
              View complete store
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Product Cards grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>
      </section>

      {/* Dynamic promo split layout banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="promo-banner-grid">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Card 1 - keychron promo */}
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 text-white shadow-xl dark:bg-zinc-950/80 border border-zinc-800">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-650/10 blur-2xl" />
            
            <div className="p-8 sm:p-10 max-w-[65%] flex flex-col justify-center h-full min-h-[220px]">
              <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">Enthusiast Accessories</span>
              <h3 className="mt-2 text-xl font-extrabold sm:text-2xl">Keychron Custom Keebs</h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">
                Premium double-gasket solid CNC aluminum cases supporting luxury tactile clicking acoustics.
              </p>
              <Link
                to="/products?category=Accessories"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-450 hover:underline"
              >
                Assemble keyboard setup
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <img
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=350&q=80"
              alt="Keychron Custom layout"
              referrerPolicy="no-referrer"
              className="absolute right-0 bottom-0 h-40 w-[35%] object-cover object-left rounded-tl-2xl border-l border-t border-zinc-800"
            />
          </div>

          {/* Card 2 - playstation promo */}
          <div className="relative overflow-hidden rounded-3xl bg-blue-700 text-white shadow-xl dark:bg-blue-800/90">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-2xl" />

            <div className="p-8 sm:p-10 max-w-[65%] flex flex-col justify-center h-full min-h-[220px]">
              <span className="text-[10px] font-bold text-blue-105 tracking-wider uppercase">Active Entertainment</span>
              <h3 className="mt-2 text-xl font-extrabold sm:text-2xl">PlayStation Gaming Deals</h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-100">
                Immerse into lightning-fast solid SSD loading and next-gen adaptive triggers today.
              </p>
              <Link
                to="/products?category=Gaming"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline"
              >
                Access instant catalog
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <img
              src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=350&q=80"
              alt="Gamepad overlay"
              referrerPolicy="no-referrer"
              className="absolute right-0 bottom-0 h-40 w-[35%] object-cover object-left rounded-tl-2xl border-l border-t border-blue-500"
            />
          </div>

        </div>
      </section>

      {/* Trending gadgets list */}
      <section className="bg-white py-16 dark:bg-zinc-900/40 border-t border-zinc-200/50 dark:border-zinc-805/50 font-sans" id="trending-gadgets-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-baseline">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-650 dark:text-blue-450">
                Popular with buyers
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Trending Gadgets
              </h2>
            </div>
            <Link
              to="/products?filter=trending"
              className="flex items-center gap-1 text-xs font-bold text-blue-655 dark:text-blue-400 hover:underline"
            >
              See all hot deals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

        </div>
      </section>

      {/* Brands row section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center" id="brand-ticker-section">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          AUTHORIZED PRODUCT DISTRIBUTOR
        </span>
        <h2 className="mt-1 text-base font-bold text-zinc-800 dark:text-zinc-250">
          Curating authentic brands with lifetime localized assistance
        </h2>
        
        {/* Brand visual symbols grid */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 dark:opacity-85 grayscale hover:grayscale-0 transition-all">
          <span className="text-sm font-black tracking-widest text-zinc-905 dark:text-white">APPLE</span>
          <span className="text-sm font-black tracking-widest text-zinc-905 dark:text-white">SONY</span>
          <span className="text-sm font-black tracking-widest text-zinc-905 dark:text-white">SAMSUNG</span>
          <span className="text-sm font-black tracking-widest text-zinc-905 dark:text-white">CANON</span>
          <span className="text-sm font-black tracking-widest text-zinc-905 dark:text-white">JBL AUDIO</span>
          <span className="text-sm font-black tracking-widest text-zinc-905 dark:text-white">LOGITECH</span>
        </div>
      </section>

    </div>
  );
}
