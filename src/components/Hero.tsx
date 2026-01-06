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
    <section className="relative w-full max-w-screen-2xl mx-auto px-6 mt-32 mb-20 h-[800px] md:h-[750px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Background Image Slider - Now spans the full container */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Heavy gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/60 to-transparent z-10" />
          <img
            src={img}
            alt={`Hero Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Hero Content - Floating on top */}
      <div className="relative z-20 h-full flex items-center px-12">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/80 border border-brand-800 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
              Powering Nigeria 24/7
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight font-heading text-white">
            KELVIN'S <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-action to-yellow-200">
              GRID
            </span>
          </h1>

          <p className="text-xl text-slate-300 border-l-4 border-action pl-6 leading-relaxed">
            Premium solar installation services engineered for reliability. Say
            goodbye to power outages with our 5KVA standard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-action hover:bg-action-hover text-brand-950 font-bold py-4 px-8 rounded-lg transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)] text-lg">
              Get A Quote
            </button>
            <button className="border border-brand-700 hover:border-action text-slate-300 hover:text-white font-medium py-4 px-8 rounded-lg transition-colors backdrop-blur-sm bg-brand-950/30 text-lg">
              View Packages
            </button>
          </div>
        </div>
      </div>

      {/* Floating Badge (Example) */}
      <div className="absolute bottom-8 right-8 z-20 bg-brand-900/90 backdrop-blur-md border border-brand-700 p-4 rounded-lg shadow-xl max-w-[200px] hidden md:block">
        <div className="text-action font-bold text-lg mb-1">5KVA Ready</div>
        <div className="text-xs text-slate-400">
          Standard installations available for immediate deployment.
        </div>
      </div>
    </section>
  );
}
