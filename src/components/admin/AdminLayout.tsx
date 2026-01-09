import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function AdminLayout() {
  const { user, userProfile, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (userProfile?.role !== "admin") {
        // 🛑 Security Check: If you are not an admin, GET OUT.
        navigate("/dashboard");
      }
    }
  }, [user, userProfile, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-950 flex items-center justify-center text-action">
        Loading...
      </div>
    );
  }

  // Double Check: explicitly return null if not admin to prevent UI flashing
  if (!user || userProfile?.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-brand-950 flex text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-900 border-r border-brand-800 p-6 flex flex-col">
        <Link to="/" className="flex items-center gap-3 mb-8 group">
          <img
            src="/kelvins-grid-logo.png"
            alt="Kelvin's Grid"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          />
          <h1 className="text-xl font-heading text-white tracking-widest group-hover:text-action transition-colors">
            KELVIN'S{" "}
            <span className="text-action group-hover:text-white transition-colors">
              GRID
            </span>
          </h1>
        </Link>

        <nav className="flex-1 space-y-2">
          <Link
            to="/admin"
            className="block px-4 py-2 rounded-lg bg-brand-800 text-white"
          >
            Dashboard
          </Link>
          <div className="text-xs font-semibold text-slate-500 uppercase mt-8 mb-2 px-4">
            Management
          </div>
          <p className="px-4 text-sm text-slate-400">Products (Active)</p>
          <Link
            to="/admin/clients"
            className="block px-4 py-2 mt-1 rounded-lg hover:bg-brand-800 text-slate-400 hover:text-white transition-colors"
          >
            Clients
          </Link>
          <Link
            to="/admin/messages"
            className="block px-4 py-2 mt-1 rounded-lg hover:bg-brand-800 text-slate-400 hover:text-white transition-colors"
          >
            Messages
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
