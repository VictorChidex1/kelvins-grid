import { useState } from "react";
import { User, Shield, MapPin } from "lucide-react";
import { ProfileForm } from "../components/forms/ProfileForm";
import { SecurityForm } from "../components/forms/SecurityForm";
import { LocationForm } from "../components/forms/LocationForm";

type Tab = "profile" | "security" | "locations";

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="min-h-screen bg-brand-950 text-white pt-24 px-6 pb-12 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        <h1 className="text-3xl font-heading font-bold mb-8">
          Control <span className="text-action">Center</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "profile"
                  ? "bg-brand-900 border-l-4 border-action text-white shadow-lg"
                  : "text-slate-400 hover:bg-brand-900/50 hover:text-white"
              }`}
            >
              <User size={18} />
              My Profile
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "security"
                  ? "bg-brand-900 border-l-4 border-action text-white shadow-lg"
                  : "text-slate-400 hover:bg-brand-900/50 hover:text-white"
              }`}
            >
              <Shield size={18} />
              Login & Security
            </button>
            <button
              onClick={() => setActiveTab("locations")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "locations"
                  ? "bg-brand-900 border-l-4 border-action text-white shadow-lg"
                  : "text-slate-400 hover:bg-brand-900/50 hover:text-white"
              }`}
            >
              <MapPin size={18} />
              Locations
            </button>
          </div>

          {/* Main Content Area (9 Cols) */}
          <div className="lg:col-span-9">
            <div className="bg-brand-900/50 border border-brand-800 rounded-2xl p-6 lg:p-10 shadow-2xl backdrop-blur-sm">
              {activeTab === "profile" && <ProfileForm />}
              {activeTab === "security" && <SecurityForm />}
              {activeTab === "locations" && <LocationForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
