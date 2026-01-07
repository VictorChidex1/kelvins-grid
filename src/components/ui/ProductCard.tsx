import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export function ProductCard({ product }: ProductCardProps) {
  // Determine Overlay Icon
  const getOverlayIcon = () => {
    switch (product.category) {
      case "solar":
      case "Inverters":
        return "/images/solar-installation-icon.webp";
      case "starlink":
        return "/images/wifi-icon.webp";
      case "cctv":
        return "/images/security-camera-icon.webp";
      default:
        return null;
    }
  };

  const overlayIcon = getOverlayIcon();

  return (
    <Link to="/services" className="block h-full">
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        variants={{
          rest: { scale: 1, y: 0 },
          hover: {
            scale: 1.02,
            y: -8,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          },
        }}
        className="relative group bg-brand-900 border border-brand-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:border-brand-700 transition-colors duration-300 flex flex-col md:flex-row h-full"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-20 bg-action text-brand-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {product.badge}
          </div>
        )}

        {/* Image Section (Left/Top) */}
        <div className="w-full md:w-2/5 relative bg-white p-6 flex items-center justify-center overflow-hidden">
          {/* Category Icon Overlay */}
          {overlayIcon && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10"></div>
          )}

          {/* Primary Product Image */}
          {product.imageUrl ? (
            <motion.img
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05, transition: { duration: 0.4 } },
              }}
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain relative z-10"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center text-brand-900/20">
              <Zap size={48} />
            </div>
          )}

          {/* Floating Category Icon (New Request) */}
          {overlayIcon && (
            <div className="absolute top-6 left-6 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center p-2.5">
              <img
                src={overlayIcon}
                alt="icon"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Floating Action Button */}
          <motion.div
            variants={{
              rest: { scale: 0, opacity: 0 },
              hover: {
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              },
            }}
            className="absolute bottom-4 right-4 w-10 h-10 bg-action rounded-full flex items-center justify-center text-brand-950 shadow-xl z-20"
          >
            <ArrowRight size={20} />
          </motion.div>
        </div>

        {/* Content Section (Right/Bottom) */}
        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl text-white font-heading mb-2 leading-tight">
              {product.title}
            </h3>
            <div className="text-2xl md:text-3xl font-heading text-action mb-6">
              {CURRENCY_FORMATTER.format(product.price)}
            </div>

            <div className="space-y-4 mb-6">
              {/* Usage */}
              {product.usage && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                    USE:
                  </span>
                  <p className="text-sm text-slate-300 leading-snug">
                    {product.usage}
                  </p>
                </div>
              )}

              {/* Components */}
              {product.components.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                    COMPONENTS:
                  </span>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {product.components.slice(0, 3).map((comp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-700 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="line-clamp-1">{comp}</span>
                      </li>
                    ))}
                    {product.components.length > 3 && (
                      <li className="text-xs text-slate-500 italic">
                        + {product.components.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Delivery / Load (Combined or Separate) */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                  CAPACITY:
                </span>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Zap size={14} className="text-action" />
                  {product.loadCapacity || "Standard"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
