import { TopBar } from "@/components/topbar";
import { Building2 } from "lucide-react";

export default function CRMPage() {
  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="bg-white border border-black/[0.07] rounded-2xl p-12 text-center max-w-sm">
          <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center mx-auto mb-4">
            <Building2 size={20} className="text-black/30" />
          </div>
          <h1 className="text-lg font-semibold text-black mb-2">Real Estate CRM</h1>
          <p className="text-sm text-black/40 mb-4">Owner pipeline, leads & property listings</p>
          <span className="text-xs bg-black/5 text-black/30 px-3 py-1.5 rounded-full font-medium">Coming soon</span>
        </div>
      </div>
    </div>
  );
}
