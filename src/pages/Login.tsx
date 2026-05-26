
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, Cpu, ShieldCheck } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";

export default function Login() {
  const { loginUser, isLoggedIn } = useShop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!email.trim() || !password.trim()) {
      setErrorText("Please fill in all credentials fields.");
      return;
    }

    if (!email.includes("@")) {
      setErrorText("Please provide a valid email handle address.");
      return;
    }

    if (password.length < 4) {
      setErrorText("Password must be at least 4 characters long.");
      return;
    }

    // Authenticate in dynamic context
    loginUser(email.trim());
    setLoginSuccess(true);

    setTimeout(() => {
      setLoginSuccess(false);
      navigate(-1); // return back to user's preceding location
    }, 1500);
  };

  const handleAutofillDemoUser = () => {
    setEmail("nepalitech@hamrogadget.com");
    setPassword("gadget123");
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:py-24 min-h-screen flex flex-col justify-center dark:bg-zinc-950 font-sans" id="login-container">
      
      {/* Visual login card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-805 dark:bg-zinc-900 shadow-xl"
        id="login-card-panel"
      >
        {/* Brand Banner */}
        <div className="text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white dark:bg-blue-500 mx-auto">
            <Cpu className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-black text-zinc-909 dark:text-white font-sans tracking-tight">Sign in to HamroGadget</h2>
          <p className="mt-1 text-[11px] text-zinc-400">Manage order tracking, warranties, and cart settings</p>
        </div>

        {/* Input fields form */}
        <form onSubmit={handleLoginSubmit} className="mt-8 space-y-4" id="login-form">
          
          <div className="text-xs font-semibold">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase">Email Address</label>
            <div className="mt-1 relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9.5 pr-4 text-zinc-805 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              />
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-350" />
            </div>
          </div>

          <div className="text-xs font-semibold">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase">Password</label>
              <a href="#reset" onClick={() => alert("Verification code sent to your mock telephone link!")} className="text-[10px] text-blue-600 underline font-bold">Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9.5 pr-4 text-zinc-805 outline-none focus:border-blue-550 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              />
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-355" />
            </div>
          </div>

          {/* Validation Alerts */}
          {errorText && (
            <p className="text-[10px] font-bold text-red-650 bg-red-50 dark:bg-red-955/20 px-3 py-2 rounded-lg border border-red-200/20 text-center">
              ⚠ {errorText}
            </p>
          )}

          {loginSuccess && (
            <p className="text-[10px] font-bold text-green-700 bg-green-50 dark:bg-green-955/20 px-3 py-2 rounded-lg border border-green-200/20 text-center">
              ✓ Access granted. Redirecting session...
            </p>
          )}

          {/* Core Sign-In Call To Action */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-blue-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-bold py-3 text-xs text-white shadow-md transition-all active:scale-97 cursor-pointer"
            id="login-submit-action-btn"
          >
            <LogIn className="h-4 w-4" />
            Sign In Account
          </button>

        </form>

        {/* Demo Fast Account Credential helper */}
        <div className="mt-6 pt-5 border-t border-zinc-100 text-center dark:border-zinc-800/60 font-medium">
          <p className="text-[10px] text-zinc-400">Want to check with a mock test account?</p>
          <button
            onClick={handleAutofillDemoUser}
            className="mt-2 rounded-lg bg-blue-50/70 border border-blue-200/50 px-3 py-1.5 text-[10px] font-extrabold text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            Autofill Demo Tech account
          </button>
        </div>

        {/* Secure SSL Lock credit */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-bold">
          <ShieldCheck className="h-3.5 w-3.5 text-zinc-450" />
          <span>128-Bit SHA-2 Encrypted Core Security</span>
        </div>

      </motion.div>
    </div>
  );
}