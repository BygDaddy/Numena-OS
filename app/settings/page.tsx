import { TopBar } from "@/components/topbar";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-semibold text-black">Settings</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "General", desc: "App name, timezone, currency" },
            { title: "Properties", desc: "Manage villas and units" },
            { title: "Team", desc: "Users, roles and permissions" },
            { title: "Vendors", desc: "Maintenance vendor directory" },
            { title: "Notifications", desc: "Alerts, emails and webhooks" },
            { title: "Integrations", desc: "Airbnb, Booking.com, Stripe" },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white border border-black/[0.07] rounded-xl p-5 hover:bg-black/[0.01] cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Settings size={14} className="text-black/30" />
                <h2 className="text-sm font-semibold text-black">{title}</h2>
              </div>
              <p className="text-xs text-black/40">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
