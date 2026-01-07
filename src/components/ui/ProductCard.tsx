import { useState } from "react";
import { ArrowRight, Box, Zap, Truck } from "lucide-react";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Format price to Naira currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className={`
        relative group bg-brand-900 border border-brand-800 rounded-xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row h-full
        ${
          isHovered
            ? "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-brand-700 translate-y-[-4px]"
            : ""
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-20 bg-action text-brand-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {product.badge}
        </div>
      )}

      {/* Image Section (Left/Top) */}
      <div className="w-full md:w-2/5 relative bg-white p-6 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 relative z-10"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-brand-900/20">
            <Zap size={48} />
          </div>
        )}

        {/* Floating Action Button */}
        <div
          className={`absolute bottom-4 right-4 w-10 h-10 bg-action rounded-full flex items-center justify-center text-brand-950 shadow-xl z-20 transition-transform duration-300 ${
            isHovered ? "scale-100" : "scale-0"
          }`}
        >
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Content Section (Right/Bottom) */}
      <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-xl md:text-2xl text-white font-heading mb-2 leading-tight">
            {product.title}
          </h3>
          <div className="text-2xl md:text-3xl font-heading text-action mb-6">
            {formatPrice(product.price)}
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
    </div>
  );
}
