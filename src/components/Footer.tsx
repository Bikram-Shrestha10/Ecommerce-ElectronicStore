import React from 'react';
import { Mail, Phone, MapPin, Cpu, Facebook, Twitter, Instagram, ShieldCheck } from "lucide-react";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing to HamroGadget newsletter! Exciting tech deals are coming your way.");
  };

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 tracking-normal text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400" id="app-footer">
      
      {/* Upper Features Rib */}
      <div className="border-b border-zinc-200 bg-white/50 py-8 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-405">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">100% Genuine Products</h4>
                <p className="text-xs">Direct brand warranties & authenticity cards secured.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-405">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Free Kathmandu Delivery</h4>
                <p className="text-xs">Complimentary shipping inside Valley borders above $300.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-405">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Dedicated Client Support</h4>
                <p className="text-xs">Active hotline 9:00 AM - 8:00 PM for tech support.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-405">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Easy EMI Schemes</h4>
                <p className="text-xs">Zero interest installments with partner credit cards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1 - Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white dark:bg-blue-500">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">
                Hamro<span className="text-blue-600 dark:text-blue-500">Gadget</span>
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed mb-6">
              Nepal's ultimate online hub for authentic high-end electronics. Discover the world's finest smartphones, custom keyboards, audiophile headphones, and professional work machines.
            </p>
            <div className="flex gap-4">
              <a href="#social" className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-650 hover:bg-blue-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-blue-500">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#social" className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-650 hover:bg-blue-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-blue-500">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#social" className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-650 hover:bg-blue-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-blue-500">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Categories */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Active Shop</h3>
            <ul className="space-y-2.5 text-xs">
              <li><a href="/products?category=Phones" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">Phones & Tablets</a></li>
              <li><a href="/products?category=Laptops" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">Workstation Laptops</a></li>
              <li><a href="/products?category=Audio" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">Audiophile Audio</a></li>
              <li><a href="/products?category=Smartwatches" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">Outdoor Wearables</a></li>
              <li><a href="/products?category=Gaming" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">PlayStation Console</a></li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Quick Links</h3>
            <ul className="space-y-2.5 text-xs">
              <li><a href="/products" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">Store Catalog</a></li>
              <li><a href="/cart" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">Shopping Cart</a></li>
              <li><a href="/login" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">User Login</a></li>
              <li><a href="/checkout" className="hover:text-blue-600 dark:hover:text-blue-500 font-medium text-zinc-500 dark:text-zinc-400">Checkout Portal</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info & Newsletter */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Store Desk</h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>New Baneshwor, Kathmandu, Ward 10, Nepal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 shrink-0 text-blue-500" />
                <span>+977 1 4488990</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                <span>support@hamrogadget.com</span>
              </div>
            </div>
            
            <form onSubmit={handleSubscribe} className="mt-5" id="news-form">
              <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-150">Stay Updated</h4>
              <div className="flex overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <input
                  type="email"
                  required
                  placeholder="Drop email address"
                  className="w-full bg-transparent px-3 py-1.5 text-[11px] text-zinc-800 outline-none dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-3 text-xs font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500 dark:border-zinc-800">
          <p>© {new Date().getFullYear()} HamroGadget Electronics. All Rights Reserved. Kathmandu, Nepal.</p>
          <p className="mt-1 text-[10px] text-zinc-400">Illustrative designs curated with genuine metadata specifications.</p>
        </div>
      </div>
    </footer>
  );
}
