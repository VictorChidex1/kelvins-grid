import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <img
              src="/kelvins-grid-logo.png"
              alt="Kelvin's Grid Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-action transition-colors">
              KELVIN'S GRID
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-slate-400 hover:text-action transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          {/* CTA Button / Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-brand-800 border border-brand-700 flex items-center justify-center text-white font-bold hover:bg-brand-700 transition-colors focus:ring-2 focus:ring-action"
                >
                  {userProfile?.fullName?.[0] ||
                    user.email?.[0]?.toUpperCase() ||
                    "U"}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-brand-900 border border-brand-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-brand-800 bg-brand-950/50">
                      <p className="text-sm text-white font-medium truncate">
                        {userProfile?.fullName || "User"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-brand-800 transition-colors cursor-not-allowed">
                        Settings
                      </button>

                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-brand-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>

                      {userProfile?.role === "admin" && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-action hover:bg-brand-800 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-brand-800 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold text-white hover:text-action transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand-800 hover:bg-brand-700 text-white text-sm font-bold py-2 px-6 rounded-lg border border-brand-700 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-20 left-6 right-6 glass-panel rounded-xl p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-action font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-slate-300 hover:text-action font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {userProfile?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-action font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-brand-800 text-white font-bold py-3 rounded-lg w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-center text-slate-300 hover:text-action font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand-800 text-white font-bold py-3 rounded-lg w-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
