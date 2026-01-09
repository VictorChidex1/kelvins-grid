import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function About() {
  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "85+" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Active Maintenance", value: "24/7" },
  ];

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

      {/* 1.5 TRUST SIGNALS (STATS STRIP) */}
      <section className="py-12 border-y border-brand-800/50 bg-brand-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-white font-heading mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CEO / FOUNDER SECTION */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-1 rounded-3xl border border-brand-700/50 relative shadow-2xl"
          >
            <div className="bg-brand-900/80 rounded-[22px] overflow-hidden p-8 md:p-12 text-center relative z-10">
              {/* Badge */}
              <div className="mb-8 inline-block">
                <span className="px-4 py-2 rounded-full border border-action/30 bg-action/10 text-action font-mono text-xs md:text-sm font-bold tracking-widest uppercase">
                  KELVIN'S GRID RC NO: 7977365
                </span>
                <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">
                  Engineering Service
                </p>
              </div>

              {/* CEO Image - EXECUTIVE HALO */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 cursor-pointer group">
                {/* Gold Glow Behind */}
                <div className="absolute inset-0 bg-action/20 blur-3xl rounded-full scale-125 opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-action/20 scale-110 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 rounded-full border border-action/50 scale-100 group-hover:scale-95 transition-transform duration-500" />
                <img
                  src="/images/kelvin-ceo.jpg"
                  alt="Reuben Kelvin - CEO"
                  className="w-full h-full object-cover rounded-full shadow-2xl relative z-10 border-4 border-brand-900"
                />
              </div>

              {/* Name & Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2">
                Reuben Kelvin
              </h2>
              <p className="text-action font-medium text-lg mb-8">
                CEO & Lead Engineer
              </p>

              {/* Quote */}
              <div className="max-w-2xl mx-auto relative px-8">
                <svg
                  className="absolute -top-4 -left-4 w-8 h-8 text-brand-700 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.8954 16 16 16H19C19.5523 16 20 15.5523 20 15V9C20 8.44772 19.5523 8 19 8H15C14.4477 8 14 8.44772 14 9V11C14 11.5523 13.5523 12 13 12H12V8H14.017C14.017 5.79086 15.7909 4 18 4H20C21.1046 4 22 4.89543 22 6V16C22 18.7614 19.7614 21 17 21H14.017ZM8 21L8 18C8 16.8954 8.89543 16 10 16H13C13.5523 16 14 15.5523 14 15V9C14 8.44772 13.5523 8 13 8H9C8.44772 8 8 8.44772 8 9V11C8 11.5523 7.55228 12 7 12H6V8H8C8 5.79086 9.79086 4 12 4H14C15.1046 4 16 4.89543 16 6V16C16 18.7614 13.7614 21 11 21H8Z" />
                </svg>
                <blockquote className="text-slate-300 italic text-lg leading-relaxed relative z-10">
                  "We founded Kelvin's Grid on a simple premise: Mathematics
                  doesn't lie. Whether it's calculating a solar load or
                  configuring a network, we apply engineering principles to
                  ensure your system works not just today, but for years to
                  come."
                </blockquote>
                {/* Signature */}
                <div className="mt-6 flex justify-center">
                  <div className="font-serif italic text-2xl text-action/80 -rotate-2">
                    Reuben Kelvin
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="py-20 px-6 bg-brand-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-white font-heading mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-950 p-8 rounded-2xl border border-brand-800 transition-all duration-300 group hover:-translate-y-2 hover:border-action/50 hover:shadow-[0_0_30px_rgba(255,184,0,0.1)] relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-brand-900 rounded-lg flex items-center justify-center text-action mb-6 group-hover:scale-110 transition-transform relative z-10">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading relative z-10">
                  {value.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                  {value.description}
                </p>

                {/* Hover Glow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
            understand the science of power and communication.
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
