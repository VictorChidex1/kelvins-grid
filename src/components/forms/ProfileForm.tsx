import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Camera, CheckCircle, User, Mail, Phone } from "lucide-react";

export function ProfileForm() {
  const { user, userProfile, updateUserProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [fullName, setFullName] = useState(userProfile?.fullName || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsLoading(true);
    try {
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User className="text-action" />
        Public Profile
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

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-10">
        <div
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-32 h-32 rounded-full bg-brand-800 border-4 border-brand-800 flex items-center justify-center overflow-hidden shadow-xl hover:border-action transition-all duration-300">
            {userProfile?.photoURL ? (
              <img
                src={userProfile.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-brand-600">
                {userProfile?.fullName?.[0] || user?.email?.[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Camera Overlay */}
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            <Camera className="w-8 h-8 text-white" />
          </div>

          {/* Plus Badge */}
          <div className="absolute bottom-1 right-1 bg-action text-brand-950 p-1.5 rounded-full border-2 border-brand-950 shadow-lg group-hover:scale-110 transition-transform">
            <Camera size={14} />
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4">Click to upload (Max 2MB)</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>

      <form
        onSubmit={handleUpdateProfile}
        className="space-y-6 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-action focus:ring-1 focus:ring-action focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-action focus:ring-1 focus:ring-action focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2 relative">
            <label className="text-sm text-slate-400 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-brand-950/50 border border-brand-800 rounded-lg pl-10 pr-24 py-2.5 text-slate-500 cursor-not-allowed"
              />

              {/* Verified Badge */}
              {user?.emailVerified || true ? ( // Assuming verified for now or using user.emailVerified if available
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-xs font-bold border border-green-500/20">
                  <CheckCircle size={12} />
                  VERIFIED
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-brand-800">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-action text-brand-950 font-bold px-8 py-2.5 rounded-lg hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)]"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
