import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Services", href: "/services", isHash: false },
    { name: "Portfolio", href: "/#portfolio", isHash: true },
    { name: "About", href: "/#about", isHash: true },
    { name: "Contact", href: "/#contact", isHash: true },
  ];

  const LinkComponent = ({ item, className }: any) => {
    if (item.isHash) {
      return (
        <HashLink smooth to={item.href} className={className}>
          {item.name}
        </HashLink>
      );
    }
    return (
      <Link to={item.href} className={className}>
        {item.name}
      </Link>
    );
  };

  return (
    <footer className="bg-brand-950 border-t border-brand-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-action to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link
              to="/"
              className="flex items-center gap-3 group cursor-pointer w-fit"
            >
              <img
                src="/kelvins-grid-logo.png"
                alt="Kelvin's Grid"
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="block font-heading font-bold text-2xl tracking-tight text-white group-hover:text-action transition-colors">
                  KELVIN'S GRID
                </span>
                <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                  RC: 7977365
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Engineering premium power and security solutions for modern homes.
              We don't just install systems; we guarantee stability.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold font-heading text-lg">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <LinkComponent
                    item={link}
                    className="text-slate-400 hover:text-action transition-colors flex items-center gap-2 group"
                  />
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-action transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold font-heading text-lg">
              Contact Us
            </h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-action mt-1 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Port Harcourt, Rivers State, Nigeria.
                  <br />
                  (Available Nationwide)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-action shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+2348102689080"
                  className="hover:text-action transition-colors"
                >
                  +234 810 268 9080
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-action shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@kelvinsgrid.com.ng"
                  className="hover:text-action transition-colors"
                >
                  info@kelvinsgrid.com.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {currentYear} Kelvin's Grid. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-action cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-action cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-action cursor-pointer transition-colors">
              Sitemap
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
