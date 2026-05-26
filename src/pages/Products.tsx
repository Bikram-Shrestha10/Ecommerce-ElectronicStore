//this is my product page
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  LayoutGrid, 
  X,
  Star
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES, BRANDS } from "../data/products";
import { motion, AnimatePresence } from "motion/react";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeywordFromUrl = searchParams.get("search") || "";
  const categoryFromUrl = searchParams.get("category") || "All";
  const filterFromUrl = searchParams.get("filter") || "";

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [searchQuery, setSearchQuery] = useState(searchKeywordFromUrl);
  const [sortBy, setSortBy] = useState("default");
  
  // Mobile filter drawer visibility toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL modifications
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    setSearchQuery(searchKeywordFromUrl);
  }, [searchKeywordFromUrl]);

  useEffect(() => {
    if (filterFromUrl === "trending") {
      // Just adjust specific tags if user requested trending from menu links
      setSortBy("rating");
    }
  }, [filterFromUrl]);

  // Compute maximum price boundaries from inventory
  const hardestPriceInInventory = useMemo(() => {
    return Math.max(...PRODUCTS.map((p) => p.price), 2500);
  }, []);

  // Filter logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category Filter
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Brand Filter
    if (selectedBrand !== "All") {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Rating Filter
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Price Filter
    list = list.filter((p) => p.price <= maxPrice);

    // Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [selectedCategory, selectedBrand, minRating, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setMinRating(0);
    setMaxPrice(hardestPriceInInventory);
    setSearchQuery("");
    setSortBy("default");
    setSearchParams({}); // Clean search flags
  };

  const handleSearchKeyPress = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300" id="products-catalog-page">
      
      {/* Search & Statistics Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-850">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white sm:text-3xl font-sans tracking-tight">
            Store Catalog
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Showing {filteredProducts.length} premium digital tools & gadget accessories
          </p>
        </div>

        {/* Search tool block */}
        <form onSubmit={handleSearchKeyPress} className="flex gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search store inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs font-semibold text-zinc-800 outline-none focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            Go
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* SIDEBAR FILTERS - Desktop */}
        <aside className="hidden lg:block space-y-6" id="catalog-sidebar">
          
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              <SlidersHorizontal className="h-4 w-4" />
              Store Filters
            </h3>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-red-750 dark:text-red-400"
              title="Reset all filters"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-805" />

          {/* Category Filters */}
          <div>
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">Category</h4>
            <div className="mt-3 flex flex-col gap-1.5 text-xs">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchParams((prev) => {
                        const next = new URLSearchParams(prev);
                        if (cat === "All") next.delete("category");
                        else next.set("category", cat);
                        return next;
                      });
                    }}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white font-bold"
                        : "text-zinc-650 hover:bg-zinc-150/40 dark:text-zinc-350 dark:hover:bg-zinc-900/60"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] ${isSelected ? "text-blue-105" : "text-zinc-405"}`}>
                      {cat === "All"
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-805" />

          {/* Brand Filters */}
          <div>
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">Brand Partner</h4>
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`rounded-lg py-1.5 px-2 text-center border font-semibold transition-all ${
                    selectedBrand === brand
                      ? "border-blue-550 bg-blue-50 text-blue-650 dark:bg-blue-950/20 dark:text-blue-450 dark:border-blue-500"
                      : "border-zinc-200 bg-white hover:border-zinc-400 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-805" />

          {/* Price Range Filter */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">Under Price</span>
              <span className="text-blue-650 dark:text-blue-400">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max={hardestPriceInInventory}
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-blue-600 dark:accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-semibold">
              <span>$0</span>
              <span>${hardestPriceInInventory} max</span>
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-805" />

          {/* Rating Filters */}
          <div>
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">Review Level</h4>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              {[0, 4.8, 4.7, 4.5].map((starRating) => (
                <button
                  key={starRating}
                  onClick={() => setMinRating(starRating)}
                  className={`flex items-center gap-2 rounded-lg py-1.5 px-3 border transition-all ${
                    minRating === starRating
                      ? "border-blue-500 bg-blue-50/50 text-blue-650 dark:bg-blue-950/20 dark:text-blue-450"
                      : "border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span className="font-bold">{starRating === 0 ? "All Ratings" : `${starRating}+ Stars`}</span>
                  {starRating > 0 && (
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 fill-amber-500`} />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* PRODUCT GRID SECTION */}
        <section className="lg:col-span-3">
          
          {/* Sorting / Controls bar */}
          <div className="flex flex-row items-center justify-between rounded-2xl bg-white px-4 py-3 border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-805/50 shadow-xs mb-6">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-zinc-700 lg:hidden dark:text-zinc-300"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            <span className="hidden sm:inline text-xs text-zinc-405 font-medium">
              We found <span className="font-bold text-zinc-700 dark:text-zinc-200">{filteredProducts.length}</span> items
            </span>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400 font-medium">Sort buy:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-zinc-200 bg-transparent py-1 px-2.5 outline-none text-zinc-800 font-bold dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              >
                <option value="default">Release Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Ratings</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          {/* ACTIVE FILTER SUMMARIZATION BARS */}
          {(selectedCategory !== "All" || selectedBrand !== "All" || minRating > 0 || maxPrice < hardestPriceInInventory || searchQuery !== "") && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-550 uppercase">Active filters:</span>
              
              {selectedCategory !== "All" && (
                <span className="flex items-center gap-1 rounded-full bg-blue-105 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 px-3 py-1 text-xs font-bold">
                  {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </span>
              )}

              {selectedBrand !== "All" && (
                <span className="flex items-center gap-1 rounded-full bg-blue-105 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 px-3 py-1 text-xs font-bold">
                  Brand: {selectedBrand}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedBrand("All")} />
                </span>
              )}

              {minRating > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-blue-105 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 px-3 py-1 text-xs font-bold">
                  Rating: {minRating}+
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating(0)} />
                </span>
              )}

              {searchQuery && (
                <span className="flex items-center gap-1 rounded-full bg-blue-105 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 px-3 py-1 text-xs font-bold">
                  Keyword: {searchQuery}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-red-655 underline hover:text-red-750"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Empty State visual */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200/50 dark:bg-zinc-900 dark:border-zinc-800">
              <p className="text-zinc-400">Sorry, no products matched your active filters or query.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 rounded-xl bg-orange-600 text-white font-bold px-4 py-2 text-xs hover:bg-orange-750"
              >
                Reset catalog search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

        </section>
      </div>

      {/* MOBILE FILTERS DRAWER LAYOUT */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 flex bg-black/60 backdrop-blur-xs lg:hidden"
            id="mobile-drawer-filters"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="relative flex w-full max-w-xs flex-col bg-white p-6 shadow-xl dark:bg-zinc-950"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase text-zinc-950 dark:text-white">Filters Panel</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-850"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 flex-1 overflow-y-auto space-y-6">
                
                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-zinc-950 dark:text-white">Categories</h4>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full px-3 py-1 font-semibold border ${
                          selectedCategory === cat
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-zinc-950 dark:text-white">Brands</h4>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    {BRANDS.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`rounded-lg px-3 py-1 border font-semibold ${
                          selectedBrand === brand
                            ? "border-blue-500 bg-blue-50 text-blue-605"
                            : "border-zinc-205 text-zinc-650 dark:border-zinc-800 dark:text-zinc-405"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-zinc-950 dark:text-white">Under Price</span>
                    <span className="text-blue-600">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={hardestPriceInInventory}
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="mt-3 w-full accent-blue-600"
                  />
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 rounded-xl bg-zinc-105 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-205 dark:bg-zinc-850 dark:text-zinc-200"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
