import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-950 flex text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-900 border-r border-brand-800 p-6 flex flex-col">
        <h1 className="text-xl font-heading text-white mb-8 tracking-widest">
          KELVIN'S <span className="text-action">GRID</span>
        </h1>

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
          <p className="px-4 text-sm text-slate-400 opacity-50">Users (Soon)</p>
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
