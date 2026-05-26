import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Cpu,
  BookmarkCheck
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const { cartCount, theme, toggleTheme, isLoggedIn, userEmail, logoutUser } = useShop();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950/80" id="navbar">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" id="nav-logo">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/10 dark:bg-blue-500">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="font-sans text-xl font-extrabold tracking-tighter text-zinc-900 transition-colors dark:text-white">
              Hamro<span className="text-blue-600 dark:text-blue-500">Gadget</span>
            </span>
          </Link>

          {/* Navigation links - Desktop */}
          <div className="hidden md:flex items-center gap-6" id="nav-desktop-links">
            <Link to="/" className="text-sm font-bold text-zinc-600 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/products" className="text-sm font-bold text-zinc-600 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
              Store
            </Link>
            <Link to="/products?category=Phones" className="text-sm font-bold text-zinc-600 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
              Phones
            </Link>
            <Link to="/products?category=Laptops" className="text-sm font-bold text-zinc-600 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
              Laptops
            </Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden max-w-xs flex-1 sm:block md:max-w-sm" id="nav-search-form">
            <input
              type="text"
              placeholder="Search premium electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-1.5 pl-10 pr-4 text-xs font-semibold text-zinc-900 outline-none transition-all focus:border-blue-550 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-blue-500 dark:focus:bg-zinc-950"
            />
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <button type="submit" className="hidden">Search</button>
          </form>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-4" id="nav-right-controls">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              title="Toggle design mode"
              id="theme-toggler"
            >
              {theme === "light" ? (
                <Moon className="h-4.5 w-4.5" />
              ) : (
                <Sun className="h-4.5 w-4.5 text-blue-400" />
              )}
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              id="nav-cart-btn"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm dark:bg-blue-500"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Profile / Login */}
            <div className="relative">
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex h-9 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-800 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    id="profile-dropdown-btn"
                  >
                    <User className="h-4 w-4 text-blue-550" />
                    <span className="max-w-[80px] truncate hidden sm:inline">{userEmail?.split("@")[0]}</span>
                  </button>
                  
                  {/* Dropdown list */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-950">
                      <div className="px-3 py-2 text-[11px] font-medium text-zinc-400">
                        Logged in as:
                        <div className="truncate font-semibold text-zinc-800 dark:text-zinc-200">{userEmail}</div>
                      </div>
                      <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                      
                      <Link
                        to="/checkout"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                      >
                        <BookmarkCheck className="h-4 w-4 text-zinc-400" />
                        My Orders / Checkout
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex h-9 items-center gap-1 flex-row rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  id="nav-login-btn"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-50 md:hidden dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
              id="nav-mobile-hamburger"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
            id="mobile-drawer"
          >
            {/* Search row */}
            <form onSubmit={handleSearchSubmit} className="relative mb-4 w-full">
              <input
                type="text"
                placeholder="Search premium electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-xs font-semibold text-zinc-900 outline-none transition-all focus:border-blue-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
              <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-zinc-400" />
            </form>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg py-2 px-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg py-2 px-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                All Products
              </Link>
              <Link
                to="/products?category=Phones"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg py-2 px-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Smartphones
              </Link>
              <Link
                to="/products?category=Laptops"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg py-2 px-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Laptops
              </Link>
              <Link
                to="/products?category=Audio"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg py-2 px-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Audio Devices
              </Link>
              <Link
                to="/products?category=Smartwatches"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg py-2 px-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Smartwatches
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
