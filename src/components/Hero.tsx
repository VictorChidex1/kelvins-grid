import { useState, useEffect } from "react";
import hero1 from "../assets/images/hero-image.jpg";
import hero2 from "../assets/images/hero-image-2.jpg";
import hero3 from "../assets/images/hero-image-3.jpg";
import hero4 from "../assets/images/hero-image-4.jpg";

const images = [hero1, hero2, hero3, hero4];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Stay on each image for 6 seconds including transition

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full max-w-screen-2xl mx-auto px-6 mt-32 mb-20 h-[800px] md:h-[750px] rounded-2xl overflow-hidden shadow-2xl group border border-brand-800/50">
      {/* 0. ALIVE GRID BACKGROUND (Animated Overlay) */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-grid-subtle animate-grid-slow" />
      </div>

      {/* 1. HUD OVERLAY (Technical Interface) */}
      <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-6">
        <div className="w-full h-full border border-white/10 relative rounded-xl">
          {/* Crosshairs */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-action/50 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-action/50 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-action/50 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-action/50 rounded-br-lg" />

          {/* Technical Data Stream */}
          <div className="absolute top-4 left-6 hidden md:block">
            <div className="flex items-center gap-2 font-mono text-[10px] text-action/60 tracking-[0.2em]">
              <span className="animate-pulse">●</span> SYSTEM_STATUS: ONLINE
            </div>
          </div>
          <div className="absolute bottom-4 right-6 hidden md:block">
            <div className="font-mono text-[10px] text-slate-500 tracking-[0.2em]"></div>
          </div>
        </div>
      </div>

      {/* 2. BACKGROUND IMAGE SLIDER */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out z-0 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Detailed Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-brand-950/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent z-10" />
          <img
            src={img}
            alt={`Hero Slide ${index + 1}`}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[6000ms]"
          />
        </div>
      ))}

      {/* 3. HERO CONTENT */}
      <div className="relative z-20 h-full flex items-center px-6 md:px-12">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-900/60 border border-brand-700 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
            </span>
            <span className="text-xs font-bold text-slate-300 tracking-widest uppercase font-mono">
              Engineered for Stability
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] font-heading text-white tracking-tight">
            KELVIN'S <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-action via-yellow-200 to-action bg-[length:200%_auto] animate-gradient">
              GRID
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 border-l-2 border-action pl-6 leading-relaxed max-w-xl font-light">
            Advanced solar architecture for homes that demand{" "}
            <span className="text-white font-semibold">zero downtime</span>.
            Join the energy independence revolution.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <button className="bg-action hover:bg-yellow-400 text-brand-950 font-bold py-4 px-10 rounded-lg transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,184,0,0.4)] text-lg flex items-center justify-center gap-2 group/btn">
              Get Priority Quote
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
              View Systems
            </button>
          </div>
        </div>
      </div>

      {/* 4. PREMIUM GLASS PRICING CARD */}
      <div className="absolute -bottom-12 md:bottom-12 right-6 md:right-12 z-30 hidden md:block">
        <div className="relative group cursor-pointer animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-action to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />

          {/* Card Content */}
          <div className="relative p-7 bg-brand-920/80 backdrop-blur-xl border-t border-l border-white/10 rounded-xl shadow-2xl max-w-sm">
            <div className="flex justify-between items-start mb-5">
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-action text-brand-950 mb-2">
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

            <div className="w-full py-3 bg-brand-800/50 hover:bg-action hover:text-brand-950 border border-brand-600 hover:border-action rounded-lg flex items-center justify-center gap-2 transition-all text-sm font-bold text-white group-hover:scale-[1.02]">
              <span>View Technical Specs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
