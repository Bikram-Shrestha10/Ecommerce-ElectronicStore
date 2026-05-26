import React from "react";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem as CartItemType, useShop } from "../context/ShopContext";

interface CartItemProps {
  item: CartItemType;
  key?: any;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useShop();
  const { product, quantity } = item;

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 last:border-b-0 dark:border-zinc-805/50">
      <div className="flex gap-4 items-start sm:items-center">
        
        {/* Thumbnail representation */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Text descriptions */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-650 dark:text-blue-450">
            {product.brand} • {product.category}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="mt-0.5 line-clamp-1 text-sm font-semibold text-zinc-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
          >
            {product.name}
          </Link>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-zinc-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[10px] rounded bg-green-50 px-1.5 py-0.5 font-bold text-green-700 dark:bg-green-950/30 dark:text-green-400">
              In Stock
            </span>
          </div>
        </div>

      </div>

      {/* Adjust quantity controls & Subtotal row */}
      <div className="flex items-center justify-between gap-6 pl-24 sm:pl-0">
        
        {/* Quantity control box */}
        <div className="flex items-center rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-md font-bold text-zinc-505 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            title="Decrease quantity by 1"
          >
            <Minus className="h-3 w-3" />
          </button>
          
          <span className="w-10 text-center text-xs font-bold text-zinc-900 dark:text-white">
            {quantity}
          </span>

          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-md font-bold text-zinc-505 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            title="Increase quantity by 1"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        {/* Dynamic total price calculation */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-zinc-400 dark:text-zinc-550 header-title">Subtotal</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              ${(product.price * quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 border border-zinc-200 bg-white hover:text-red-650 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            title="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
