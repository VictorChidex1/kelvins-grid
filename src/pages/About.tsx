import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function About() {
  const values = [
    {
      title: "Precision Engineering",
      description:
        "We don't guess. We calculate, simulate, and execute with mathematical accuracy.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      title: "Unwavering Integrity",
      description:
        "Transparency is our currency. No hidden costs. No shortcuts. Just honest work.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Future-Proof Solutions",
      description:
        "We build systems that last. Solar and security setups designed for the next decade.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-brand-950 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-action font-mono text-sm tracking-[0.2em] uppercase mb-4 block">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-heading tracking-tight mb-6">
              Engineering the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-action to-amber-500">
                Future
              </span>{" "}
              of Power
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Kelvin's Grid is more than a service provider. We are an
              engineering firm dedicated to stabilizing Nigeria's power and
              security infrastructure, one home at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CEO / FOUNDER SECTION */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-800 to-transparent" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-1 rounded-3xl border border-brand-700/50 relative"
          >
            <div className="bg-brand-900/80 rounded-[22px] overflow-hidden p-8 md:p-12 text-center">
              {/* Badge */}
              <div className="mb-8 inline-block">
                <span className="px-4 py-2 rounded-full border border-action/30 bg-action/10 text-action font-mono text-xs md:text-sm font-bold tracking-widest uppercase">
                  KELVIN'S GRID RC NO: 7977365
                </span>
                <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">
                  Engineering Service
                </p>
              </div>

              {/* CEO Image */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 cursor-pointer group">
                <div className="absolute inset-0 rounded-full border-2 border-action/20 scale-110 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 rounded-full border border-action/50 scale-100 group-hover:scale-95 transition-transform duration-500" />
                <img
                  src="/images/kelvin-ceo.jpg"
                  alt="Reuben Kelvin - CEO"
                  className="w-full h-full object-cover rounded-full shadow-2xl relative z-10"
                />
              </div>

              {/* Name & Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2">
                Reuben Kelvin
              </h2>
              <p className="text-action font-medium text-lg mb-6">
                CEO & Lead Engineer
              </p>

              {/* Quote */}
              <blockquote className="max-w-2xl mx-auto text-slate-300 italic leading-relaxed border-l-4 border-brand-700 pl-6 text-left md:text-center md:border-l-0 md:border-t-4 md:pt-6">
                "We founded Kelvin's Grid on a simple premise: Mathematics
                doesn't lie. Whether it's calculating a solar load or
                configuring a network, we apply engineering principles to ensure
                your system works not just today, but for years to come."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="py-20 px-6 bg-brand-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-950 p-8 rounded-2xl border border-brand-800 hover:border-action/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-brand-900 rounded-lg flex items-center justify-center text-action mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading">
                  {value.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            Build with Confidence
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Stop gambling with your infrastructure. Partner with engineers who
            understand the science of power.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-action hover:bg-amber-400 text-brand-950 font-bold rounded-xl transition-all shadow-lg transform hover:scale-105"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
