import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export function CustomerDashboard() {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-brand-950 text-white pt-24 px-6 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <header className="mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Hello,{" "}
            <span className="text-action">
              {userProfile?.fullName || "Valued Customer"}
            </span>
          </h1>
          <p className="text-slate-400">
            Welcome to your personal dashboard. Manage your orders and settings
            here.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recent Orders Card (Placeholder) */}
          <div className="bg-brand-900 border border-brand-800 rounded-xl p-6 hover:border-action/50 transition-colors group">
            <h3 className="text-xl font-bold mb-4 group-hover:text-action transition-colors">
              Recent Orders
            </h3>
            <div className="text-slate-500 text-sm py-8 text-center bg-brand-950/50 rounded-lg border border-dashed border-brand-800">
              No recent orders found.
            </div>
          </div>

          {/* Account Settings Card */}
          <div className="bg-brand-900 border border-brand-800 rounded-xl p-6 hover:border-action/50 transition-colors group">
            <h3 className="text-xl font-bold mb-4 group-hover:text-action transition-colors">
              Account Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 uppercase">
                  Email
                </label>
                <div className="text-slate-200">{userProfile?.email}</div>
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase">
                  Phone
                </label>
                <div className="text-slate-200">
                  {userProfile?.phone || "Not set"}
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase">Role</label>
                <div className="text-slate-200 capitalize">
                  {userProfile?.role}
                </div>
              </div>
            </div>
          </div>

          {/* Support / Help */}
          <div className="bg-brand-900 border border-brand-800 rounded-xl p-6 hover:border-action/50 transition-colors group">
            <h3 className="text-xl font-bold mb-4 group-hover:text-action transition-colors">
              Need Help?
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Our support team is available to assist you with any inquiries or
              issues.
            </p>
            <Link
              to="/#contact"
              className="text-action font-medium hover:underline"
            >
              Contact Support &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
