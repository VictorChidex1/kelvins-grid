import { useState, useRef } from "react";
import { useAuth, type UserProfile } from "../../context/AuthContext";
import { storage } from "../../lib/firebase"; // Ensure this is exported from lib/firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const {
    user,
    userProfile,
    updateUserProfile,
    updateUserPassword,
    deleteAccount,
  } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form States
  const [fullName, setFullName] = useState(userProfile?.fullName || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      await updateUserProfile({ fullName, phone });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: "Failed to update profile: " + error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
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
      await updateUserPassword(newPassword);
      setMessage({ type: "success", text: "Password updated successfully!" });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage({
        type: "error",
        text: "Failed to update password. You may need to re-login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsLoading(true);
    try {
      // Create a reference to 'profile_pictures/uid'
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateUserProfile({ photoURL });
      setMessage({ type: "success", text: "Profile picture updated!" });
    } catch (error: any) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to upload image." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
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
    <div className="min-h-screen bg-brand-950 text-white pt-24 px-6 pb-12 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-3xl mx-auto z-10 relative">
        <h1 className="text-3xl font-heading font-bold mb-8">
          Account <span className="text-action">Settings</span>
        </h1>

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

        {/* Profile Picture Section */}
        <div className="bg-brand-900 border border-brand-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-brand-800 border-2 border-brand-700 flex items-center justify-center overflow-hidden">
              {userProfile?.photoURL ? (
                <img
                  src={userProfile.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-brand-600">
                  {userProfile?.fullName?.[0] ||
                    user?.email?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="bg-brand-800 hover:bg-brand-700 text-white px-4 py-2 rounded-lg border border-brand-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Uploading..." : "Upload New Picture"}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <p className="text-xs text-slate-500 mt-2">
                Recommended: Square JPG, PNG. Max 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-brand-900 border border-brand-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Personal Details</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
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
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full bg-brand-950/50 border border-brand-800 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-action text-brand-950 font-bold px-6 py-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Security */}
        <div className="bg-brand-900 border border-brand-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Security</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isLoading || !newPassword}
                className="bg-brand-800 text-white font-bold px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 border border-brand-700"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-500 mb-2">Danger Zone</h2>
          <p className="text-sm text-slate-400 mb-6">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold px-6 py-2 rounded-lg transition-colors border border-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
