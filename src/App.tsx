import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
// import { ProductCard } from "./components/ui/ProductCard"; // Temporarily unused in main view, strictly following Hero request

function App() {
  return (
    <div className="min-h-screen bg-brand-950 font-sans text-slate-50">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
