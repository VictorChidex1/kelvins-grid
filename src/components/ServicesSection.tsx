// PERFORMANCE: Heavy blurs and parallax are disabled on mobile (iOS) to prevent GPU memory crashes.
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { ProductCard } from "./ui/ProductCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function ServicesSection() {
  const { products, fetchProducts, isLoading } = useProductStore();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const blob1Y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -100]
  );
  const blob2Y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, 100]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Select a mix of products: Top 2 Solar + Starlink + CCTV
  const solarProducts = products
    .filter((p) => p.category === "solar")
    .slice(0, 2);
  const otherProducts = products.filter(
    (p) => p.category === "starlink" || p.category === "cctv"
  );
  const featuredProducts = [...solarProducts, ...otherProducts];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { stiffness: 50, damping: 15 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative z-10 bg-brand-950 overflow-hidden"
    >
      {/* Background Grid & Spotlights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {!isMobile && (
        <>
          <motion.div
            style={{ y: blob1Y }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-action/5 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            style={{ y: blob2Y }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"
          />
        </>
      )}

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4 text-action font-mono text-xs tracking-widest uppercase"
            >
              <span className="w-8 h-px bg-action"></span>
              Power Solutions
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white font-heading"
            >
              System Configurations
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-action transition-colors group"
            >
              View Full Catalog
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[450px] bg-brand-900/50 rounded-2xl animate-pulse border border-brand-800"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
