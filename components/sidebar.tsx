"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Wrench,
  Building2,
  BarChart3,
  Settings,
  MoreHorizontal,
} from "lucide-react";

const navItems = [
  {
    section: "OPERATIONS",
    links: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/calendar", label: "Live Calendar", icon: Calendar },
      { href: "/housekeeping", label: "Housekeeping", icon: Sparkles },
      { href: "/maintenance", label: "Maintenance", icon: Wrench },
    ],
  },
  {
    section: "BUSINESS",
    links: [
      { href: "/crm", label: "Real Estate CRM", icon: Building2, soon: true },
      { href: "/reports", label: "Owner Reports", icon: BarChart3 },
    ],
  },
  {
    section: "SYSTEM",
    links: [
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex flex-col h-screen bg-[#f5f5f5] border-r border-black/[0.07] shrink-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-black flex items-center justify-center">
            <span className="text-xs font-bold text-white">nu</span>
          </div>
        </div>
        <p className="text-[10px] text-black/30 mt-1 tracking-widest font-medium">NUMENA OS</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-5">
        {navItems.map((group) => (
          <div key={group.section}>
            <p className="text-[10px] text-black/25 tracking-widest font-medium px-2 mb-1">
              {group.section}
            </p>
            {group.links.map(({ href, label, icon: Icon, soon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-black/10 text-black font-medium"
                      : "text-black/40 hover:text-black/70 hover:bg-black/5"
                  }`}
                >
                  <Icon size={15} />
                  <span className="flex-1">{label}</span>
                  {soon && (
                    <span className="text-[9px] bg-black/8 text-black/30 px-1.5 py-0.5 rounded font-medium">
                      SOON
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-black/[0.07]">
        <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-black/5 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-white">
            H
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black/80 truncate">Hubert</p>
            <p className="text-[10px] text-green-600">Online · CEO</p>
          </div>
          <MoreHorizontal size={14} className="text-black/25" />
        </div>
      </div>
    </aside>
  );
}
