import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, Key } from "lucide-react";

export function SecurityForm() {
  const { updateUserPassword, deleteAccount, reauthenticate } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);
    try {
      await reauthenticate(currentPassword);
      await updateUserPassword(newPassword);
      setMessage({ type: "success", text: "Password updated successfully!" });
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (error: any) {
      console.error(error);
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setMessage({ type: "error", text: "Incorrect current password." });
      } else {
        setMessage({
          type: "error",
          text: "Failed to update password: " + error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you absolutely sure? This action cannot be undone. All your data will be permanently removed."
      )
    ) {
      try {
        setIsLoading(true);
        await deleteAccount();
        navigate("/");
      } catch (error: any) {
        setMessage({
          type: "error",
          text: "Failed to delete account. " + error.message,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Shield className="text-action" />
        Login & Security
      </h2>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.type === "success"
              ? "bg-green-500/10 text-green-500 border border-green-500"
              : "bg-red-500/10 text-red-500 border border-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Password Change Section */}
      <div className="bg-brand-950/30 border border-brand-800 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Key size={20} className="text-slate-400" />
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:border-action focus:ring-1 focus:ring-action focus:outline-none transition-all"
              placeholder="Required to verify identity"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:border-action focus:ring-1 focus:ring-action focus:outline-none transition-all"
                placeholder="Min 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:border-action focus:ring-1 focus:ring-action focus:outline-none transition-all"
                placeholder="Retype password"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isLoading || !newPassword || !currentPassword}
              className="bg-brand-800 text-white font-bold px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 border border-brand-700"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-red-500 mb-2 flex items-center gap-2">
          <AlertTriangle size={20} />
          Danger Zone
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Permanently remove your account and all of its contents from the
          Kelvin's Grid platform. This action is not reversible.
        </p>
        <div className="flex justify-start">
          <button
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className="text-red-500 hover:text-white hover:bg-red-600 font-medium px-6 py-2 rounded-lg transition-colors border border-red-500/50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
