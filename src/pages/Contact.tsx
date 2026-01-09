import { motion } from "framer-motion";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Solar Installation",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation
    alert("Message sent! (Simulation)");
  };

  return (
    <div className="min-h-screen bg-brand-950 pb-24 relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/hero-image.jpg"
            alt="Kelvin's Grid Engineers at work"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Deep Grid Overlay: Gradient + Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/80 to-brand-950" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 -mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-action font-mono text-sm tracking-[0.2em] uppercase mb-4 block">
              Get Connected
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-heading tracking-tight mb-6">
              Contact Us
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Ready to stabilize your power? Reach out to our engineering team
              for a premium consultation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. MAIN CONTENT (Overlapping Card Layout) */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Glass Panel */}
            <div className="glass-panel p-8 md:p-10 rounded-2xl border border-brand-800/50 bg-brand-900/60 backdrop-blur-xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 font-heading border-b border-brand-800/50 pb-4">
                Headquarters
              </h3>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-800/50 flex items-center justify-center text-action shrink-0 border border-brand-700/50 group-hover:bg-action group-hover:text-brand-950 transition-all duration-300">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Visit Us
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-light">
                      Port Harcourt, Rivers State,
                      <br />
                      Nigeria.
                    </p>
                  </div>
                </div>

                {/* WhatsApp (NEW) */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-green-900/20 flex items-center justify-center text-green-400 shrink-0 border border-green-800/30 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      WhatsApp Us
                    </h4>
                    <a
                      href="https://wa.me/2348102689080"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-green-400 transition-colors block font-mono"
                    >
                      +234 810 268 9080
                    </a>
                  </div>
                </div>

                {/* Call */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-800/50 flex items-center justify-center text-action shrink-0 border border-brand-700/50 group-hover:bg-action group-hover:text-brand-950 transition-all duration-300">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Call Us
                    </h4>
                    <a
                      href="tel:+2348102689080"
                      className="text-slate-400 hover:text-action transition-colors block font-mono"
                    >
                      +234 810 268 9080
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-800/50 flex items-center justify-center text-action shrink-0 border border-brand-700/50 group-hover:bg-action group-hover:text-brand-950 transition-all duration-300">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Email Us
                    </h4>
                    <a
                      href="mailto:info@kelvinsgrid.com.ng"
                      className="text-slate-400 hover:text-action transition-colors block"
                    >
                      info@kelvinsgrid.com.ng
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Form Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-action/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <h3 className="text-3xl font-bold text-brand-950 mb-8 font-heading">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-2 uppercase tracking-wide text-[11px]">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition-all text-brand-950 font-medium placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-2 uppercase tracking-wide text-[11px]">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition-all text-brand-950 font-medium placeholder:text-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-2 uppercase tracking-wide text-[11px]">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition-all text-brand-950 font-medium placeholder:text-slate-400"
                  placeholder="+234..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-2 uppercase tracking-wide text-[11px]">
                  Service Interest
                </label>
                <select
                  value={formState.service}
                  onChange={(e) =>
                    setFormState({ ...formState, service: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition-all text-brand-950 font-medium"
                >
                  <option>Solar Installation</option>
                  <option>Starlink Setup</option>
                  <option>CCTV Security</option>
                  <option>Smart Home Systems</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-2 uppercase tracking-wide text-[11px]">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-action focus:border-transparent outline-none transition-all text-brand-950 font-medium placeholder:text-slate-400 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-action hover:bg-amber-400 text-brand-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
