
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  Trash2,
  Lock,
  DollarSign,
  Wallet
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";

export default function Checkout() {
  const { 
    cart, 
    cartTotal, 
    cartSubtotal, 
    cartTax, 
    cartShipping, 
    isLoggedIn, 
    userEmail, 
    placeOrder 
  } = useShop();

  const navigate = useNavigate();

  // Address Form States
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState(userEmail || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Kathmandu");

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Order Placement state
  const [placedOrderInfo, setPlacedOrderInfo] = useState<any>(null);
  const [errorText, setErrorText] = useState("");

  // Sync email if user logs in later
  useEffect(() => {
    if (userEmail) {
      setEmailAddress(userEmail);
    }
  }, [userEmail]);

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!fullName.trim() || !emailAddress.trim() || !phone.trim() || !address.trim()) {
      setErrorText("Please complete all shipping address fields before placing the order.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || cardNumber.length < 12) {
        setErrorText("Please enter a valid Credit Card number for instant online bank routing.");
        return;
      }
    }

    // Place order using context
    const createdOrder = placeOrder(
      {
        fullName: fullName.trim(),
        email: emailAddress.trim(),
        address: address.trim(),
        city,
        phone: phone.trim()
      },
      paymentMethod === "card" ? "Credit Card" : (paymentMethod === "esewa" ? "eSewa Direct Wallet" : "Cash on Delivery")
    );

    // Save success information to present modal
    setPlacedOrderInfo(createdOrder);
  };

  if (placedOrderInfo) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center min-h-screen flex flex-col items-center justify-center dark:bg-zinc-950 font-sans" id="success-receipt">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-805 dark:bg-zinc-900 shadow-xl w-full"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-105 text-green-700 dark:bg-green-950/40 dark:text-green-400 mx-auto">
            <CheckCircle2 className="h-10 w-10 animate-pulse" />
          </div>

          <h2 className="mt-6 text-2xl font-black text-zinc-900 dark:text-white">Order Placed Successfully!</h2>
          <p className="mt-2 text-xs text-zinc-400 font-semibold leading-relaxed">
            Congratulations! Your electronic gadgets are now scheduled for valley packing in Kathmandu.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 text-left border border-zinc-200/50 space-y-2.5 text-xs text-zinc-650 dark:text-zinc-400 font-medium">
            <div className="flex justify-between font-bold text-zinc-905 dark:text-white">
              <span>Order Reference ID</span>
              <span className="text-blue-600 dark:text-blue-455">{placedOrderInfo.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Recipient Name</span>
              <span className="text-zinc-900 dark:text-zinc-200">{placedOrderInfo.shippingAddress.fullName}</span>
            </div>

            <div className="flex justify-between">
              <span>Contact Phone</span>
              <span className="text-zinc-900 dark:text-zinc-200">{placedOrderInfo.shippingAddress.phone}</span>
            </div>

            <div className="flex justify-between">
              <span>Address Gateway</span>
              <span className="text-zinc-905 dark:text-zinc-200 text-right truncate max-w-[180px]">
                {placedOrderInfo.shippingAddress.address}, {placedOrderInfo.shippingAddress.city}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment Gateway</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{placedOrderInfo.paymentMethod}</span>
            </div>

            <div className="flex justify-between font-bold border-t border-zinc-200 pt-2.5 text-sm">
              <span>Total Paid</span>
              <span className="text-blue-600 dark:text-blue-455">${placedOrderInfo.total.toFixed(2)}</span>
            </div>
          </div>

          <p className="mt-5 text-[10px] text-zinc-400 text-center italic leading-relaxed">
            * A digital order warranty code has been mailed to <span className="font-bold">{placedOrderInfo.shippingAddress.email}</span>. Live tracking code will trigger shortly.
          </p>

          <div className="mt-8 flex flex-col gap-2.5">
            <Link
              to="/products"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white shadow-md block"
            >
              Continue Exploring Products
            </Link>
            
            <Link
              to="/"
              className="rounded-xl border border-zinc-200 py-3 text-zinc-650 font-bold hover:bg-zinc-50 text-xs dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-850 block"
            >
              Return to Homepage
            </Link>
          </div>

        </motion.div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300" id="checkout-workspace">
      
      {/* Back navigation Row */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-505 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Review Shopping Cart
        </Link>
        
        <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-450">
          <Lock className="h-3.5 w-3.5 text-blue-555" />
          <span>Advanced SSL Encrypted Terminal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* LEFT COLUMN - Compiling Addresses & Payments */}
        <div className="lg:col-span-8">
          <form onSubmit={handlePlaceOrderSubmit} className="space-y-6" id="checkout-form-target">
            
            {/* Box 1 - Shipping Address Information */}
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
              
              <h2 className="text-base font-extrabold text-zinc-905 dark:text-white flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-blue-650" />
                Shipping Delivery Coordinates
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs font-semibold">
                
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase">Receiver's Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Bipin Gurung"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-zinc-805 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase">Active Contact Phone number</label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g., +977 1 98XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-zinc-805 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase">Contact Email handle (Receipt Registry)</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g., recipient@gmail.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-zinc-805 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  />
                  {!isLoggedIn && (
                    <p className="text-[10px] text-blue-550/80 mt-1 font-bold">
                      Alternatively, <Link to="/login" className="underline font-black hover:text-blue-600">Sign in to sync your saved account address</Link>.
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase">Street Address / Landmark details</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., House No. 12, Sahayog Marg, Near Siddhartha Bank Office"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-zinc-805 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase">Delivery City / Region inside Nepal</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-zinc-850 font-bold outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  >
                    <option value="Kathmandu">Kathmandu Valley Region (24hr Delivery)</option>
                    <option value="Lalitpur">Lalitpur District Region</option>
                    <option value="Bhaktapur">Bhaktapur District Region</option>
                    <option value="Pokhara">Pokhara Valley Region</option>
                    <option value="Biratnagar">Biratnagar Outer Belt</option>
                    <option value="Butwal">Butwal / Bhairahawa Corridor</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Box 2 - Interactive Payment Methods */}
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
              
              <h2 className="text-base font-extrabold text-zinc-905 dark:text-white flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-blue-650" />
                Secure Checkout Payment Gateway
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Option 1: Credit Card */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-blue-550 bg-blue-50/10 dark:bg-blue-950/20"
                      : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-blue-600"
                    />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Credit / Debit Card</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-2">Visa, Mastercard, UnionPay gateway processed instantly.</p>
                </div>

                {/* Option 2: eSewa Digital Wallet */}
                <div
                  onClick={() => setPaymentMethod("esewa")}
                  className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "esewa"
                      ? "border-blue-550 bg-blue-50/10 dark:bg-blue-950/20"
                      : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "esewa"}
                      onChange={() => setPaymentMethod("esewa")}
                      className="accent-blue-600"
                    />
                    <span className="text-xs font-bold text-zinc-950 dark:text-white flex items-center gap-1">
                      eSewa / Khalti Pouch
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-2">Nepalese secure QR API / direct credentials authorization.</p>
                </div>

                {/* Option 3: COD */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-blue-550 bg-blue-50/10 dark:bg-blue-950/20"
                      : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-blue-600"
                    />
                    <span className="text-xs font-bold text-zinc-950 dark:text-white">Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-2">Settle in cash or QR code scan directly on delivery arrival.</p>
                </div>

              </div>

              {/* Dynamic Payment Details panels */}
              <AnimatePresence mode="wait">
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 border-t border-zinc-100 pt-6 space-y-4 max-w-md"
                  >
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                      
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase">Card Holder Number</label>
                        <div className="mt-1 relative">
                          <input
                            type="text"
                            placeholder="4111 2222 3333 4444"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-3.5 pr-10 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white font-mono font-bold"
                          />
                          <Lock className="absolute right-3.5 top-3 h-4 w-4 text-zinc-350" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                          className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase">CVV Code</label>
                        <input
                          type="password"
                          placeholder="***"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={3}
                          className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                        />
                      </div>

                    </div>
                  </motion.div>
                )}

                {paymentMethod === "esewa" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 border-t border-zinc-100 pt-6 text-xs text-zinc-500"
                  >
                    <div className="bg-green-50 rounded-xl p-4 border border-green-250/10 flex items-center gap-3 dark:bg-green-950/20 dark:text-green-400">
                      <Wallet className="h-6 w-6 text-green-700 shrink-0" />
                      <div>
                        <span className="font-bold block">Direct wallet routing</span>
                        <p className="mt-0.5 text-[11px]">
                          Upon placing the order, you will be redirected to the secure eSewa merchant payment portal to authorize payment credentials instantly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "cod" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 border-t border-zinc-100 pt-6 text-xs text-zinc-500"
                  >
                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/50 flex items-center gap-3 dark:bg-zinc-950 dark:text-zinc-400">
                      <DollarSign className="h-6 w-6 text-zinc-700 shrink-0" />
                      <div>
                        <span className="font-bold block">Cash / Fonepay Scan on Delivery</span>
                        <p className="mt-0.5 text-[11px]">
                          Our valley logistics agent will carry a static Fonepay QR code card. You can either pay in raw bills or scan to register instant mobile banking settlement on arrival.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Error notifications */}
            {errorText && (
              <p className="text-xs font-bold text-red-650 bg-red-50 dark:bg-red-950/30 dark:text-red-400 p-3 rounded-xl border border-red-250/10 text-center">
                ⚠ {errorText}
              </p>
            )}

            {/* Lower Place Order button trigger */}
            <div className="text-right">
              {cart.length > 0 ? (
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 text-xs shadow-lg shadow-blue-555/10 cursor-pointer"
                  id="submit-order-btn"
                >
                  Settle Payment & Place Order • ${cartTotal.toFixed(2)}
                </button>
              ) : (
                <button
                  disabled
                  className="rounded-xl bg-zinc-200 text-zinc-400 cursor-not-allowed px-8 py-3.5 text-xs font-bold"
                >
                  Shopping pouch is empty
                </button>
              )}
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN - Shopping summary & Order details */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Order products overview */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-805 dark:bg-zinc-900 shadow-sm" id="summary-overview-box">
            
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 border-b border-zinc-150 pb-3 dark:text-white dark:border-zinc-800">
              Your Order ({cart.length} unique gadget lines)
            </h3>

            {/* List current product lines */}
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 max-h-[280px] overflow-y-auto mt-4 pr-1">
              {cart.length === 0 ? (
                <div className="py-6 text-center text-xs text-zinc-405">
                  No items in cart.&nbsp;
                  <Link to="/products" className="underline font-bold text-blue-650">Return store</Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 py-3 font-medium text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 object-cover rounded-lg border dark:border-zinc-800"
                    />
                    <div className="flex-1 truncate">
                      <h4 className="font-bold text-zinc-850 dark:text-zinc-200 truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        Qty: <span className="font-bold text-zinc-900 dark:text-white">{item.quantity}</span> • ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="h-px bg-zinc-200 my-4 dark:bg-zinc-800" />

            {/* Core Calculations panel */}
            <div className="space-y-3.5 text-xs text-zinc-550 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Sub-Total Items Cost</span>
                <span className="font-bold text-zinc-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Government Tax VAT (13%)</span>
                <span className="font-bold text-zinc-900 dark:text-white">${cartTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Express Packing & Shipping</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {cartShipping === 0 ? "FREE" : `$${cartShipping.toFixed(2)}`}
                </span>
              </div>

              <div className="h-px bg-zinc-200 pt-1 dark:bg-zinc-800" />

              <div className="flex justify-between font-bold text-sm text-zinc-900 dark:text-white">
                <span>Total Amount Due</span>
                <span className="text-base font-black text-blue-600 dark:text-blue-450">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* Core Authenticity seal row */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-blue-500 shrink-0" />
            <div className="text-[11px] leading-relaxed text-zinc-400">
              <span className="font-bold text-zinc-900 dark:text-zinc-200 block">Kathmandu Valley Authorized</span>
              Direct warranty registration and premium support hotline access secured automatically under SSL gateway logic.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}