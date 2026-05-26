import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Eye, Sparkles } from "lucide-react";
import { Product } from "../data/products";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  key?: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useShop();
  const navigate = useNavigate();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.inStock) {
      addToCart(product, 1);
      // Trigger user confirmation
      const toast = document.createElement("div");
      toast.className = "fixed bottom-5 right-5 z-100 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce";
      toast.innerHTML = `🛒 Added "${product.name.substring(0, 25)}..." to your cart!`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    }
  };

  const activeStars = Math.floor(product.rating);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-xs transition-all hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900"
      id={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} className="block flex-1">
        
        {/* Image wrapper */}
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-106"
          />

          {/* Badges layer */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isTrending && (
              <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm dark:bg-blue-500">
                <Sparkles className="h-2.5 w-2.5" />
                Trending
              </span>
            )}
            {discountPercent > 0 && (
              <span className="rounded-full bg-red-650 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                Save {discountPercent}%
              </span>
            )}
            {!product.inStock && (
              <span className="rounded-full bg-zinc-650 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                Sold Out
              </span>
            )}
          </div>

          {/* Quick Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md transition-all hover:scale-110 active:scale-95 hover:bg-blue-600 hover:text-white"
              title="Quick Specifications View"
            >
              <Eye className="h-4.5 w-4.5" />
            </button>
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md transition-all hover:scale-110 active:scale-95 hover:bg-blue-600 hover:text-white"
                title="Add to shopping cart"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
              </button>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col p-4 flex-1">
          {/* Category */}
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-650 dark:text-blue-450">
            {product.category}
          </span>
          
          {/* Product Name */}
          <h3 className="mt-1 line-clamp-2 text-xs font-semibold text-zinc-800 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-500">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < activeStars ? "fill-amber-500" : "text-zinc-300 dark:text-zinc-700"}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Price display or stock indicator */}
          <div className="mt-auto pt-3 flex items-baseline justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-zinc-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-zinc-400 line-through dark:text-zinc-600">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-zinc-450 dark:text-zinc-500">
              {product.brand}
            </span>
          </div>

        </div>
      </Link>

      {/* Button fallback for touch / devices (or direct action) */}
      <div className="border-t border-zinc-100 px-4 py-2 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        {product.inStock ? (
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-900 hover:bg-blue-600 dark:bg-zinc-800 dark:hover:bg-blue-500 py-1.5 text-[11px] font-bold text-white transition-all active:scale-97 cursor-pointer"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="w-full cursor-not-allowed rounded-lg bg-zinc-100 py-1.5 text-center text-[10px] font-bold text-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-600"
          >
            Out of Stock
          </button>
        )}
      </div>
    </motion.div>
  );
}
