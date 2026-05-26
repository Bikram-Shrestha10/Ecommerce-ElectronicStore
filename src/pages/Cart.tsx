import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight, 
  Cpu, 
  Trash2,
  ShieldAlert,
  TicketPercent
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import CartItem from "../components/CartItem";
import { motion } from "motion/react";

export default function Cart() {
  const { 
    cart, 
    clearCart, 
    cartSubtotal, 
    cartTax, 
    cartShipping, 
    cartTotal,
    cartCount
  } = useShop();
  
  const navigate = useNavigate();

  const handleCheckoutRedirect = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center min-h-screen flex flex-col items-center justify-center dark:bg-zinc-950" id="empty-cart-view">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-6">
          <ShoppingBag className="h-8 w-8" />
        </div>
        
        <h2 className="text-xl font-black text-zinc-900 dark:text-white">Your shopping cart is empty</h2>
        <p className="mt-1.5 text-xs text-zinc-400 max-w-xs leading-relaxed">
          Looks like you haven't added any elite electronic gadgets to your basket pouch yet. Discover our premium stock list.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white hover:bg-blue-700 transition"
        >
          Explore Best Sellers Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300 animate-fade-in" id="cart-workspace">
      
      {/* Back button header navigation */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Electronics Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* LEFT COLUMN - Selected items row lists */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            
            <div className="flex items-center justify-between border-b border-zinc-150 pb-4 dark:border-zinc-805">
              <h2 className="font-sans text-lg font-extrabold text-zinc-905 dark:text-white flex items-center gap-2">
                Cart Items ({cartCount})
              </h2>
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-[10px] font-bold text-red-650 hover:text-red-750"
                title="Clears all products in shopping pouch"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Cart
              </button>
            </div>

            {/* Cart products iteration */}
            <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800" id="pouch-items-block">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

          </div>

          {/* Secure assurance text wrapper */}
          <div className="flex items-start gap-3 rounded-2xl bg-zinc-100/60 p-4 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-850/30">
            <ShieldAlert className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-zinc-850 dark:text-zinc-200 block">Shopping Security Guarantee</span>
              <p className="text-zinc-400 mt-1">
                Prices include localized 13% Nepali government digital tax imports. Warranties are registered to the specified checkout email handle.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - Shopping Order Summary block */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm sticky top-24" id="order-summary-panel">
            
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 border-b border-zinc-150 pb-3 dark:text-white dark:border-zinc-800">
              Shopping Summary
            </h3>

            {/* Price breakdown lists */}
            <div className="mt-5 space-y-3.5 text-xs text-zinc-550 dark:text-zinc-400 font-medium">
              <div className="flex items-center justify-between">
                <span>Sub-Total Items Cost</span>
                <span className="font-bold text-zinc-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Govt VAT Charge (13%)</span>
                <span className="font-bold text-zinc-900 dark:text-white">${cartTax.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Valley Express Delivery</span>
                {cartShipping === 0 ? (
                  <span className="font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded text-[10px]">
                    FREE SHIPPING
                  </span>
                ) : (
                  <span className="font-bold text-zinc-900 dark:text-white">${cartShipping.toFixed(2)}</span>
                )}
              </div>

              {cartShipping > 0 && (
                <p className="text-[10px] text-zinc-400 bg-blue-50/50 p-2 rounded-lg border border-blue-250/10 text-center">
                  💡 Hint: Add <span className="font-bold text-blue-600">${(300 - cartSubtotal).toFixed(2)}</span> more to enjoy free delivery!
                </p>
              )}

              {/* Promo code mock input block */}
              <div className="mt-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                <label className="text-[10px] font-bold text-zinc-405 uppercase block mb-1">Apply Promotion Voucher</label>
                <div className="flex overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                  <input
                    type="text"
                    placeholder="E.g., HAMROTECH"
                    className="w-full bg-transparent px-3 py-1.5 text-xs font-semibold text-zinc-800 outline-none uppercase dark:text-white"
                  />
                  <button
                    onClick={() => alert("Promo code accepted! 5% discount pending at shipping address compilation.")}
                    className="bg-zinc-900 px-3 text-xs font-bold text-white hover:bg-blue-600 transition dark:bg-zinc-800 dark:hover:bg-zinc-700"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="h-px bg-zinc-150 my-4 dark:bg-zinc-800" />

              {/* Grand total computation */}
              <div className="flex items-baseline justify-between pt-1 text-sm">
                <span className="font-bold text-zinc-900 dark:text-white">Estimated Total</span>
                <span className="text-xl font-black text-blue-600 dark:text-blue-450">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout action button */}
            <button
              onClick={handleCheckoutRedirect}
              className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-650 font-bold py-3 text-xs text-white shadow-md transition-transform active:scale-97 cursor-pointer"
            >
              Secure Checkout Portal
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
