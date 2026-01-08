import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const images = [
  "/images/hero/hero-image.jpg",
  "/images/hero/hero-image-2.jpg",
  "/images/hero/hero-image-3.jpg",
  "/images/hero/hero-image-4.jpg",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3D Tilt Physics for Pricing Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Stay on each image for 6 seconds including transition

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full mt-0 mb-20 h-[800px] md:h-[750px] overflow-hidden shadow-2xl group border-b border-brand-800/50 bg-brand-950">
      {/* 0. ALIVE GRID BACKGROUND (Animated Overlay) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 z-[5] pointer-events-none mix-blend-overlay"
        style={{ WebkitTransform: "translateZ(0)" }}
      >
        <div className="absolute inset-0 bg-grid-subtle animate-grid-slow" />
      </motion.div>

      {/* 1. HUD OVERLAY (Technical Interface) */}
      <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-6">
        <div className="w-full h-full relative rounded-xl">
          {/* Crosshairs - Draw Animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-action/50 rounded-tl-lg origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
            className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-action/50 rounded-tr-lg origin-right"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-action/50 rounded-bl-lg origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
            className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-action/50 rounded-br-lg origin-right"
          />

          {/* Technical Data Stream */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute top-4 left-6 hidden md:block"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute bottom-4 right-6 hidden md:block"
          ></motion.div>
        </div>
      </div>

      {/* 2. BACKGROUND IMAGE SLIDER (With AnimatePresence) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Detailed Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-brand-950/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent z-10" />
          <img
            src={images[currentIndex]}
            alt={`Hero Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* 3. HERO CONTENT */}
      <div className="relative z-20 h-full flex items-center px-6 md:px-12">
        <div className="max-w-3xl space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-900/60 border border-brand-700 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
            </span>
            <span className="text-xs font-bold text-slate-300 tracking-widest uppercase font-mono">
              Engineered for Stability
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] font-heading text-white tracking-tight overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="block"
            >
              KELVIN'S
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-action via-yellow-200 to-action bg-[length:200%_auto] animate-gradient"
            >
              GRID
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-slate-300 border-l-2 border-action pl-6 leading-relaxed max-w-xl font-light"
          >
            Advanced solar architecture for homes that demand{" "}
            <span className="text-white font-semibold">zero downtime</span>.
            Join the energy independence revolution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-5 pt-6"
          >
            <button className="bg-action hover:bg-yellow-400 text-brand-950 font-bold py-4 px-10 rounded-lg transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,184,0,0.4)] text-lg flex items-center justify-center gap-2 group/btn">
              Book Consultation
              <svg
                className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <button className="border border-brand-700 hover:border-action text-slate-300 hover:text-white font-medium py-4 px-10 rounded-lg transition-all backdrop-blur-sm bg-brand-950/20 text-lg hover:bg-brand-950/50">
              View Packages
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="pt-8 opacity-80"
          >
            <p className="text-white font-heading text-lg tracking-wide uppercase font-bold">
              Kelvin's Grid RC NO: 7977365
            </p>
            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
              Engineering Service
            </p>
          </motion.div>
        </div>
      </div>

      {/* 4. PREMIUM GLASS PRICING CARD (With 3D Tilt) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease: "backOut" }}
        className="absolute -bottom-12 md:bottom-12 right-6 md:right-12 z-30 hidden md:block perspective-1000"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative group cursor-pointer"
        >
          {/* Glow Effect */}
          <div
            className="absolute -inset-1 bg-gradient-to-r from-action to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
            style={{ transform: "translateZ(-20px)" }}
          />

          {/* Card Content */}
          <div
            className="relative p-7 bg-brand-920/80 backdrop-blur-xl border-t border-l border-white/10 rounded-xl shadow-2xl max-w-sm"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase
                 bg-action text-brand-950 mb-2"
                >
                  Best Seller
                </span>
                <h3 className="text-xl font-heading font-bold text-white">
                  5KVA Silence Bundle
                </h3>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-slate-500 line-through decoration-red-500">
                  ₦6.2M
                </div>
                <div className="text-2xl font-bold font-mono text-action">
                  ₦5.8M
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-brand-800 flex items-center justify-center text-action">
                  <svg
                    className="w-3.5 h-3.5"
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
                </div>
                <span className="font-medium">24/7 Uninterrupted Power</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-brand-800 flex items-center justify-center text-action">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  Includes Installation & Support
                </span>
              </div>
            </div>

            <div
              className="w-full py-3 bg-brand-800/50 hover:bg-action hover:text-brand-950 border border-brand-600
             hover:border-action rounded-lg flex items-center justify-center gap-2 transition-all text-sm font-bold text-white group-hover:scale-[1.02]"
            >
              <span>View Technical Specs</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
