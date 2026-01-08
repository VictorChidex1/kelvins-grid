import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
    { name: "Portfolio", href: "/#portfolio", isHash: true },
    { name: "About", href: "/about", isHash: true },
    { name: "Contact", href: "/contact", isHash: true },
  ];

  const LinkComponent = ({ item, className, onClick }: any) => {
    if (item.isHash) {
      return (
        <HashLink smooth to={item.href} className={className} onClick={onClick}>
          {item.name}
        </HashLink>
      );
    }
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.name}
      </Link>
    );
  };

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
              <LinkComponent
                key={link.name}
                item={link}
                className="text-sm font-medium text-slate-400 hover:text-action transition-colors"
              />
            ))}
          </div>

          {/* CTA Button / Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-brand-800 border border-brand-700 flex items-center justify-center text-white font-bold hover:bg-brand-700 transition-colors focus:ring-2 focus:ring-action overflow-hidden"
                >
                  {userProfile?.photoURL ? (
                    <img
                      src={userProfile.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    userProfile?.fullName?.[0] ||
                    user.email?.[0]?.toUpperCase() ||
                    "U"
                  )}
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
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-brand-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>

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
          <div className="absolute top-20 left-6 right-6 glass-panel rounded-xl p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2 border border-brand-800/50 shadow-2xl">
            {/* User Info (Mobile) */}
            {user && (
              <div className="flex items-center gap-3 pb-4 border-b border-brand-800 mb-2">
                <div className="w-10 h-10 rounded-full bg-brand-800 border border-brand-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {userProfile?.photoURL ? (
                    <img
                      src={userProfile.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    userProfile?.fullName?.[0] ||
                    user.email?.[0]?.toUpperCase() ||
                    "U"
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">
                    {userProfile?.fullName || "User"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <LinkComponent
                key={link.name}
                item={link}
                className="text-slate-300 hover:text-action font-medium py-2 px-2 hover:bg-brand-800/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              />
            ))}

            {user ? (
              <div className="border-t border-brand-800 pt-2 flex flex-col gap-1">
                <Link
                  to="/settings"
                  className="text-slate-300 hover:text-action font-medium py-2 px-2 hover:bg-brand-800/50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/dashboard"
                  className="text-slate-300 hover:text-action font-medium py-2 px-2 hover:bg-brand-800/50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {userProfile?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-action font-medium py-2 px-2 hover:bg-brand-800/50 rounded-lg transition-colors flex items-center gap-2"
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
                  className="mt-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 rounded-lg w-full transition-all border border-red-500/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-brand-800 pt-4 flex flex-col gap-3">
                <Link
                  to="/login"
                  className="text-center text-slate-300 hover:text-action font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand-800 text-white font-bold py-3 rounded-lg w-full text-center border border-brand-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
