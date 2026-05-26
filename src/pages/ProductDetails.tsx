import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  User,
  Plus,
  Minus,
  MessageSquarePlus
} from "lucide-react";
import { PRODUCTS, Product, Review } from "../data/products";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { motion } from "motion/react";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useShop();

  // Find targeted product
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === id);
  }, [id]);

  // Handle item not found gracefully
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center min-h-screen flex flex-col items-center justify-center dark:bg-zinc-950">
        <h2 className="text-xl font-bold text-zinc-805 dark:text-zinc-200">Device catalog reference not found.</h2>
        <p className="mt-1 text-xs text-zinc-400">The electronic item might have recently sold out or has been delisted.</p>
        <Link
          to="/products"
          className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-lg animate-fade-in"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Related products selection (exclude this product, prioritize matching category)
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  // Quantity to add state
  const [quantity, setQuantity] = useState(1);

  // Write custom Review state
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Computed average rating and review counts including submitted reviews
  const currentAvgRating = useMemo(() => {
    if (reviewsList.length === 0) return product.rating;
    const sum = reviewsList.reduce((acc, rev) => acc + rev.rating, 0);
    return Number((sum / reviewsList.length).toFixed(1));
  }, [reviewsList, product.rating]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80", // Standard placeholder avatar
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      comment: reviewComment.trim()
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setReviewAuthor("");
    setReviewComment("");
    setReviewRating(5);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3050);
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product, quantity);
      const toast = document.createElement("div");
      toast.className = "fixed bottom-5 right-5 z-100 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce";
      toast.innerHTML = `🛒 Added ${quantity}x "${product.name.substring(0, 25)}..." to cart!`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    }
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300" id="product-details-container">
      
      {/* Back to store navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          id="back-btn"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <span className="text-xs text-zinc-405 font-semibold">
          Authorized {product.brand} Distributor
        </span>
      </div>

      {/* Main product representation grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 bg-white rounded-3xl border border-zinc-200/65 p-6 sm:p-10 dark:bg-zinc-900 dark:border-zinc-805/50 shadow-xs" id="detail-card">
        
        {/* Left column - Cover Image */}
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100 aspect-square dark:bg-zinc-850">
            {product.isTrending && (
              <span className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white shadow-md">
                <Sparkles className="h-3 w-3" />
                <span>Trending Gadget</span>
              </span>
            )}
            
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-102"
              id="detail-main-img"
            />
          </div>

          {/* Core Guarantees icons info row */}
          <div className="grid grid-cols-3 gap-2.5 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-250/20">
            <div className="flex flex-col items-center text-center p-1">
              <ShieldCheck className="h-5 w-5 text-blue-550" />
              <span className="text-[10px] font-bold mt-1.5 text-zinc-800 dark:text-zinc-200">1 Year Warranty</span>
              <span className="text-[8px] text-zinc-400">Authentic brand warrant card</span>
            </div>
            <div className="flex flex-col items-center text-center p-1">
              <Truck className="h-5 w-5 text-blue-550" />
              <span className="text-[10px] font-bold mt-1.5 text-zinc-800 dark:text-zinc-200">Express Valley Delivery</span>
              <span className="text-[8px] text-zinc-400">Arrives in Kathmandu in 24 hrs</span>
            </div>
            <div className="flex flex-col items-center text-center p-1">
              <RotateCcw className="h-5 w-5 text-blue-550" />
              <span className="text-[10px] font-bold mt-1.5 text-zinc-800 dark:text-zinc-200">7 Days Return</span>
              <span className="text-[8px] text-zinc-400">In tact seal return accepted</span>
            </div>
          </div>
        </div>

        {/* Right column - Copy Description details */}
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-650 dark:text-blue-450">
            {product.brand} • {product.category}
          </span>
          
          <h1 className="mt-1 font-sans text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl lg:text-3xl leading-snug dark:text-white" id="detail-title">
            {product.name}
          </h1>

          {/* Star ratings details */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4.5 w-4.5 ${i < Math.floor(currentAvgRating) ? "fill-amber-500" : "text-zinc-350 dark:text-zinc-700"}`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-805 dark:text-zinc-205">
              {currentAvgRating} Rating Breakdown
            </span>
            <span className="text-xs text-zinc-400">• ({reviewsList.length} global buyer reviews)</span>
          </div>

          <div className="my-5 h-px bg-zinc-200 dark:bg-zinc-805" />

          {/* Price Layout */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-black text-zinc-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <div className="flex items-center gap-2">
                <span className="text-base text-zinc-400 line-through dark:text-zinc-650">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-655 dark:bg-red-950/30 dark:text-red-400">
                  Save {discountPercent}%
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-xs md:text-sm leading-relaxed text-zinc-555 dark:text-zinc-350" id="detail-desc">
            {product.description}
          </p>

          {/* Cart triggers section */}
          <div className="mt-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-250/20">
            
            {/* Stock details */}
            <div className="flex items-center justify-between text-xs font-semibold mb-4">
              <span className="text-zinc-500">Stock Availability:</span>
              {product.inStock ? (
                <span className="flex items-center gap-1 text-green-700 dark:text-green-400 font-bold">
                  ● Ready in Store (Kathmandu Warehouse)
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-bold">
                  ● Out of Stock (Restocking Soon)
                </span>
              )}
            </div>

            {/* Adjuster plus triggers */}
            {product.inStock && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                <div className="flex items-center rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs max-w-[140px] h-11 justify-between">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-zinc-100 font-bold dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    title="Lower count"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-zinc-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-zinc-100 font-bold dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    title="Raise count"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 cursor-pointer"
                  id="add-to-cart-action-btn"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart • Total ${(product.price * quantity).toFixed(2)}
                </button>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* Specifications & Review Layout Panel - Split Grid */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12" id="specifications-reviews-wrap">
        
        {/* Specifications List Column (Left) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200/60 p-6 sm:p-8 dark:bg-zinc-900 dark:border-zinc-805/50">
          <h3 className="text-base font-extrabold text-zinc-950 dark:text-white flex items-center gap-2">
            Technical Specifications
          </h3>
          <p className="text-[10px] text-zinc-400 mt-0.5">Verified brand dimensions & hardware layers</p>
          
          <div className="mt-6 border border-zinc-100 rounded-xl overflow-hidden dark:border-zinc-800">
            <table className="w-full text-left text-xs text-zinc-650 dark:text-zinc-400">
              <tbody>
                {product.specifications.map((spec, index) => (
                  <tr 
                    key={spec.key} 
                    className={`border-b border-zinc-100 dark:border-zinc-800/80 last:border-b-0 ${
                      index % 2 === 0 ? "bg-zinc-50 dark:bg-sm-900 dark:bg-zinc-900/30" : "bg-white dark:bg-zinc-900"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-zinc-500 w-1/3">{spec.key}</td>
                    <td className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-300">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews Section Column (Right) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/60 p-6 sm:p-8 dark:bg-zinc-900 dark:border-zinc-805/50 flex flex-col">
          <h3 className="text-base font-extrabold text-zinc-950 dark:text-white flex items-center gap-2">
            Customer Feedback & Reviews
          </h3>
          <p className="text-[10px] text-zinc-400 mt-0.5">Real feedback shared by verified Kathmandu purchasers</p>

          {/* Form to compilation comments */}
          <form onSubmit={handleReviewSubmit} className="mt-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-250/20 dark:bg-zinc-950 font-sans">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-zinc-850 dark:text-zinc-200 uppercase">
              <MessageSquarePlus className="h-4 w-4 text-blue-500" />
              Write a Review
            </h4>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Ram Bahadur"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white outline-none focus:border-blue-550"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase">Star Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white outline-none focus:border-blue-550"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars Good)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars Average)</option>
                  <option value={2}>⭐⭐ (2 Stars Disliked)</option>
                  <option value={1}>⭐ (1 Star Critical)</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase">Your Comments</label>
              <textarea
                required
                rows={3}
                placeholder="Share your setup configurations or experiences with this gadget..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="mt-1 w-full h-[70px] rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-840 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white outline-none resize-none focus:border-blue-550"
              />
            </div>

            <button
              type="submit"
              className="mt-4 rounded-xl bg-zinc-900 text-white hover:bg-blue-605 px-4 py-2 text-xs font-bold transition dark:bg-zinc-800 dark:hover:bg-blue-500 cursor-pointer"
            >
              Post Review
            </button>

            {submitSuccess && (
              <p className="text-[10px] font-bold text-green-700 dark:text-green-400 mt-2">
                ✓ Thank you! Your verified purchase review is now active below.
              </p>
            )}
          </form>

          {/* Render comments list */}
          <div className="mt-8 flex-1 space-y-5 max-h-[350px] overflow-y-auto pr-2" id="reviews-list-target">
            {reviewsList.length === 0 ? (
              <p className="text-xs text-zinc-400 text-center py-6">Be the first to review this product!</p>
            ) : (
              reviewsList.map((rev) => (
                <div key={rev.id} className="border-b border-zinc-100 last:border-b-0 pb-4 dark:border-zinc-805/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-105 text-blue-600 dark:bg-blue-950/40">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-250">{rev.author}</h5>
                        <p className="text-[9px] text-zinc-400 font-semibold">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < rev.rating ? "fill-amber-500" : "text-zinc-200 dark:text-zinc-700"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed dark:text-zinc-400 font-medium pl-10">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Suggested Related Products block */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-zinc-200 py-12 dark:border-zinc-850" id="related-products-slider">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-650 dark:text-blue-450">
            SIMILAR SPECIFICATIONS
          </span>
          <h2 className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-white">
            Related Gadgets You May Like
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
