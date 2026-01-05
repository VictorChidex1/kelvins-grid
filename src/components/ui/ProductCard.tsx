import { useState } from "react";
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
        relative group bg-brand-900 border border-brand-800 rounded-xl p-8 shadow-2xl transition-all duration-500
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
        <div className="absolute top-0 right-0 bg-action text-brand-950 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
          {product.badge}
        </div>
      )}

      <h3 className="text-2xl text-white mb-2 font-heading">{product.title}</h3>
      <div className="text-3xl font-heading text-action mb-6">
        {formatPrice(product.price)}
      </div>

      <div className="space-y-3 mb-8">
        {product.components.map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm text-slate-300"
          >
            <div className="w-1.5 h-1.5 bg-action rounded-full" />
            {feature}
          </div>
        ))}
      </div>

      <div className="w-full bg-brand-950 rounded-lg p-4 border border-brand-800 flex items-center justify-between group-hover:border-brand-700 transition-colors">
        <span className="text-sm text-slate-400">Load Capacity</span>
        <span className="text-sm font-bold text-white">
          {product.loadCapacity || "N/A"}
        </span>
      </div>
    </div>
  );
}
