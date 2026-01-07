import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-brand-950 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 border-4 border-t-action border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-t-transparent border-r-status-success border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">K</span>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-slate-400 font-mono text-sm tracking-widest uppercase"
        >
          Initializing Grid...
        </motion.p>
      </div>
    </div>
  );
}
