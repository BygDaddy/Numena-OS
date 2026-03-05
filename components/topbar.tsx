"use client";

import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function TopBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-black/[0.07] bg-white sticky top-0 z-10">
      {/* Search */}
      <div className="flex items-center gap-2 bg-black/5 border border-black/[0.07] rounded-lg px-3 py-2 w-72">
        <Search size={14} className="text-black/30" />
        <input
          className="bg-transparent text-sm text-black/60 placeholder:text-black/30 outline-none flex-1"
          placeholder="Search villas, guests, tasks..."
        />
        <kbd className="text-[10px] text-black/25 bg-black/5 px-1.5 py-0.5 rounded">⌘K</kbd>
      </div>

      {/* Clock */}
      <div className="text-center">
        <p className="text-xs text-black/40">{date}</p>
        <p className="text-xl font-mono font-semibold text-black tracking-wide">
          {time} <span className="text-xs text-black/30 font-sans font-normal">ICT</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-black/5">
          <Bell size={16} className="text-black/40" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-black/80 transition-colors">
          <Plus size={14} />
          New Action
          <ChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}
