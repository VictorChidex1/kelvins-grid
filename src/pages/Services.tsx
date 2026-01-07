import { useEffect, useRef } from "react";
import { useProductStore } from "../store/useProductStore";
import { ProductCard } from "../components/ui/ProductCard";
import { motion, useScroll, useTransform } from "framer-motion";

export function Services() {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll(); // Global scroll

  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div
      ref={containerRef}
      className="min-h-screen bg-brand-950 pt-32 pb-20 px-6 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <motion.div
        style={{ y: blob1Y, WebkitTransform: "translateZ(0)" }}
        className="absolute top-20 left-10 w-[600px] h-[600px] bg-action/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y, WebkitTransform: "translateZ(0)" }}
        className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-16 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading"
          >
            Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-action to-yellow-200 ml-3">
              Systems
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed"
          >
            Industrial-grade solar energy solutions engineered for zero
            downtime. Select a configuration below to view technical
            specifications.
          </motion.p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] bg-brand-900/50 rounded-2xl animate-pulse border border-brand-800"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            Error loading systems: {error}
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "200px" }}
            style={{ WebkitTransform: "translateZ(0)" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {products.length === 0 ? (
              <div className="col-span-full text-center py-20 text-slate-500">
                No systems currently available. check back later.
              </div>
            ) : (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
