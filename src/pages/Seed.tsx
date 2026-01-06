import { useEffect, useState } from "react";
import { seedDatabase } from "../lib/seed";
import { Link } from "react-router-dom";

export function Seed() {
  const [status, setStatus] = useState("Initializing seed...");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const runSeed = async () => {
      setStatus("Planting seeds in Firestore...");
      const result = await seedDatabase();
      setStatus(result.message as string);
      setComplete(true);
    };

    runSeed();
  }, []);

  return (
    <div className="min-h-screen bg-brand-950 flex flex-col items-center justify-center text-white p-10">
      <div className="glass-panel p-10 rounded-2xl border border-white/10 text-center max-w-md">
        <h1 className="text-3xl font-heading mb-4 text-action">
          Database Seeding
        </h1>
        <p className="font-mono text-sm text-slate-400 mb-8">{status}</p>

        {complete && (
          <div className="flex flex-col gap-3">
            <Link
              to="/services"
              className="bg-action text-brand-950 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              View Services Page
            </Link>
            <Link
              to="/"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
