import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

const steps = [
  {
    number: "01",
    title: "Book Consultation",
    description:
      "We assess your energy load and design a custom solution tailored to your home or business needs.",
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
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Deployment & Install",
    description:
      "Our engineers arrive with premium cabling and safety gear to install your system with zero structural damage.",
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
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Power On",
    description:
      "We flip the switch. You enjoy 24/7 consistent power and high-speed internet. We provide 1 month of free support.",
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
  {
    number: "04",
    title: "After-Sales Support",
    description:
      "Our relationship doesn't end at installation. We offer maintenance checks to ensure peak performance.",
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
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export function ProcessSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="process"
      className="py-24 px-6 md:px-12 bg-brand-950 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-action/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-800/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4 text-action font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-px bg-action"></span>
            The Process
            <span className="w-8 h-px bg-action"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white font-heading"
          >
            How We Power Your World
          </motion.h2>
          <p className="max-w-xl mx-auto mt-4 text-slate-400">
            From the first call to the final switch-flip, our process is
            transparent, safe, and engineered for speed.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          {!isMobile && (
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-brand-800 z-0 overflow-hidden">
              {/* Energy Pulse Animation */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-action to-transparent opacity-75"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Holographic Number HUD */}
                <div className="w-20 h-20 flex items-center justify-center mb-8 relative">
                  {/* Rotating Outer Ring */}
                  {!isMobile ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border border-dashed border-brand-700 opacity-50"
                    />
                  ) : (
                    <div className="absolute inset-0 rounded-full border border-dashed border-brand-700 opacity-50" />
                  )}

                  {/* Inner Solid Ring */}
                  <div className="absolute inset-1 rounded-full border border-brand-800 bg-brand-950 shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-shadow duration-500" />

                  {/* Number */}
                  <span className="text-action font-mono font-bold text-xl relative z-10">
                    {step.number}
                  </span>

                  {/* Bottom Indicator Dot */}
                  <div className="absolute -bottom-2 w-1.5 h-1.5 bg-action rounded-full group-hover:animate-ping" />
                </div>

                {/* Glassmorphism Card */}
                <div
                  className={`relative w-full h-full p-6 rounded-xl border border-brand-800 transition-all duration-300 ${
                    isMobile
                      ? "bg-brand-900"
                      : "bg-brand-900/40 backdrop-blur-md group-hover:bg-brand-900/60 group-hover:border-action/30 group-hover:shadow-2xl group-hover:shadow-action/5"
                  }`}
                >
                  {/* Ghost Border Gradient (On Hover) */}
                  {!isMobile && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-action/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}

                  <div className="text-action mb-4 flex justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    {step.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
