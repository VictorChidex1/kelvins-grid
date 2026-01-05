import { ProductCard } from "./components/ui/ProductCard";
import type { Product } from "./types";

function App() {
  const sampleProduct: Product = {
    id: "5kva-solar-system",
    title: "5KVA Inverter System",
    price: 5800000,
    description:
      "Premium solar installation with high capacity battery backup.",
    category: "solar",
    components: [
      "10kwh Lithium Battery",
      "12x 400W Solar Panels",
      "Smart MPPT Controller",
      "Installation Included",
    ],
    isFeatured: true,
    loadCapacity: "4,500W Peak",
    badge: "BEST SELLER",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Typography & Brand Identity */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900 border border-brand-800">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
              System Operational
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            KELVIN'S <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              GRID
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-md border-l-2 border-action pl-4">
            Premium solar installation services engineered for reliability.
            Power your home with the 5KVA standard.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="bg-action hover:bg-action-hover text-brand-950 font-bold py-3 px-8 rounded-md transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)]">
              Get Quote
            </button>
            <button className="border border-brand-700 hover:border-action text-slate-300 hover:text-white font-medium py-3 px-8 rounded-md transition-colors">
              View Packages
            </button>
          </div>
        </div>

        {/* Right Column: The "Product Card" Mockup */}
        <ProductCard product={sampleProduct} />
      </main>
    </div>
  );
}

export default App;
