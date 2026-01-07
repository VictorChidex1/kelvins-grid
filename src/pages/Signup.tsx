import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Signup() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      setError("");
      await googleLogin();
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Failed to sign up with Google.");
    }
  };

  // Real-time Validation Logic
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasLength = password.length >= 6;
  const passwordsMatch = password === confirmPassword && password !== "";

  const isFormValid =
    hasUpper &&
    hasNumber &&
    hasSpecial &&
    hasLength &&
    passwordsMatch &&
    fullName &&
    phone;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return; // Should be disabled, but extra safety

    try {
      setError("");
      setLoading(true);
      await signup(email, password, fullName, phone);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Account already exists. Please log in.");
      } else {
        setError("Failed to create an account. " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-950 text-white px-4 relative pt-28 pb-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-md bg-brand-900 border border-brand-800 rounded-xl p-8 shadow-2xl z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group md:hidden"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-sm font-medium">Home</span>
        </Link>
        <h2 className="text-3xl font-heading mb-2 text-center text-white">
          Create <span className="text-action">Account</span>
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Join Kelvin's Grid to manage your system.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white text-brand-950 font-bold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors mb-6"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-brand-900 text-slate-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:border-action focus:outline-none focus:ring-1 focus:ring-action transition-colors"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:border-action focus:outline-none focus:ring-1 focus:ring-action transition-colors"
              placeholder="+234 (806) 000-0000"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:border-action focus:outline-none focus:ring-1 focus:ring-action transition-colors"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-slate-400 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 text-white focus:border-action focus:outline-none focus:ring-1 focus:ring-action transition-colors pr-10"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-white"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Password Strength Indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
            <div
              className={`flex items-center gap-1 ${
                hasLength ? "text-green-500" : ""
              }`}
            >
              <span>•</span> At least 8 characters
            </div>
            <div
              className={`flex items-center gap-1 ${
                hasUpper ? "text-green-500" : ""
              }`}
            >
              <span>•</span> One uppercase letter
            </div>
            <div
              className={`flex items-center gap-1 ${
                hasNumber ? "text-green-500" : ""
              }`}
            >
              <span>•</span> One number
            </div>
            <div
              className={`flex items-center gap-1 ${
                hasSpecial ? "text-green-500" : ""
              }`}
            >
              <span>•</span> One special character
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm text-slate-400 mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full bg-brand-950 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-action transition-colors pr-10
                ${
                  confirmPassword && !passwordsMatch
                    ? "border-red-500 focus:border-red-500"
                    : "border-brand-800 focus:border-action"
                }
              `}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-white"
            >
              {showConfirmPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full font-bold py-3 rounded-lg transition-all mt-2
              ${
                isFormValid
                  ? "bg-action text-brand-950 hover:bg-white cursor-pointer"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed opacity-50"
              }
            `}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-action hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
