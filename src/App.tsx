import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./pages/Services";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-brand-950 font-sans selection:bg-action selection:text-brand-950 overflow-x-hidden">
        {/* Background Grid Pattern (Global) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>

        <Navbar />

        <main className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
