"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
      <div className="bg-white border border-black/[0.07] rounded-2xl p-8 w-full max-w-sm shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
            <span className="text-sm font-bold text-white">nu</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Numena OS</p>
            <p className="text-[10px] text-black/30 tracking-widest">PROPERTY MANAGEMENT</p>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-black mb-1">Welcome back</h1>
        <p className="text-sm text-black/40 mb-6">Sign in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-black/50 block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2.5 text-sm text-black placeholder:text-black/25 outline-none focus:border-black/20 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-black/50 block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2.5 text-sm text-black placeholder:text-black/25 outline-none focus:border-black/20 focus:bg-white transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm font-medium py-2.5 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
