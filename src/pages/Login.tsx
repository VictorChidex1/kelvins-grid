import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-950 text-white px-4">
      <div className="w-full max-w-md bg-brand-900 border border-brand-800 rounded-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-heading mb-6 text-center text-white">
          Admin <span className="text-action">Login</span>
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:border-action focus:outline-none focus:ring-1 focus:ring-action transition-colors"
              placeholder="admin@kelvinsgrid.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:border-action focus:outline-none focus:ring-1 focus:ring-action transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-action text-brand-950 font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
