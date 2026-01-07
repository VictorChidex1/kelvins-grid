import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import {
  ArrowLeft,
  MapPin,
  Server,
  Shield,
  Mail,
  Phone,
  Zap,
  Sun,
  Video,
  Wifi,
  Box,
} from "lucide-react";
import type { UserProfile } from "../../context/AuthContext";
import type { Location, System } from "../../types";

export function ClientDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<UserProfile | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch User Profile
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setClient(userDoc.data() as UserProfile);
        }

        // 2. Fetch Locations
        const locSnapshot = await getDocs(
          collection(db, "users", userId, "locations")
        );
        const locs: Location[] = [];
        locSnapshot.forEach((d) =>
          locs.push({ id: d.id, ...d.data() } as Location)
        );
        setLocations(locs);

        // 3. Fetch Systems
        const sysSnapshot = await getDocs(
          collection(db, "users", userId, "systems")
        );
        const sys: System[] = [];
        sysSnapshot.forEach((d) =>
          sys.push({ id: d.id, ...d.data() } as System)
        );
        setSystems(sys);
      } catch (error) {
        console.error("Error loading client data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const getSystemIcon = (type: System["type"]) => {
    switch (type) {
      case "Solar Panels":
        return <Sun size={16} />;
      case "CCTV":
        return <Video size={16} />;
      case "Starlink":
        return <Wifi size={16} />;
      case "Inverter":
        return <Zap size={16} />;
      default:
        return <Box size={16} />;
    }
  };

  const getLocationName = (id: string) => {
    return locations.find((l) => l.id === id)?.name || "Unknown Location";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-action">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-action"></div>
      </div>
    );
  }

  if (!client) {
    return <div className="text-white">Client not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/admin/clients")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Registry
        </button>
        <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
          {client.fullName || "Unnamed Client"}
          <span className="text-sm font-sans font-normal px-2 py-1 bg-brand-800 rounded-full border border-brand-700 text-slate-300">
            {client.role}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Contact Info */}
        <div className="space-y-6">
          <div className="bg-brand-900 border border-brand-800 rounded-xl p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Contact Info
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-brand-950 flex items-center justify-center text-action">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm text-slate-500">Email Address</p>
                  <p className="truncate" title={client.email}>
                    {client.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-brand-950 flex items-center justify-center text-action">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p>{client.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-brand-950 flex items-center justify-center text-action">
                  <Shield size={16} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Account ID</p>
                  <p className="text-xs font-mono text-slate-400 truncate w-32">
                    {userId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Systems (Assets) */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Server className="text-action" size={20} />
                Registered Assets
                <span className="bg-brand-800 text-xs px-2 py-1 rounded-full">
                  {systems.length}
                </span>
              </h2>
            </div>

            {systems.length === 0 ? (
              <div className="bg-brand-900/50 border border-dashed border-brand-800 rounded-xl p-8 text-center text-slate-500">
                Client has not registered any systems yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {systems.map((sys) => (
                  <div
                    key={sys.id}
                    className="bg-brand-900 border border-brand-800 rounded-lg p-4 flex justify-between items-center group hover:border-brand-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-950 border border-brand-800 flex items-center justify-center text-action group-hover:scale-110 transition-transform">
                        {getSystemIcon(sys.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{sys.name}</h3>
                        <p className="text-sm text-slate-400 flex items-center gap-2">
                          {sys.type} • Installed at{" "}
                          <span className="text-white">
                            {getLocationName(sys.locationId)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                          sys.status === "Active"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}
                      >
                        {sys.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Locations */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-action" size={20} />
                Service Locations
                <span className="bg-brand-800 text-xs px-2 py-1 rounded-full">
                  {locations.length}
                </span>
              </h2>
            </div>

            {locations.length === 0 ? (
              <div className="bg-brand-900/50 border border-dashed border-brand-800 rounded-xl p-8 text-center text-slate-500">
                No locations found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="bg-brand-900 border border-brand-800 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-slate-200">{loc.name}</h4>
                      <span className="text-xs bg-brand-950 px-2 py-0.5 rounded text-slate-500">
                        {loc.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{loc.address}</p>
                    <p className="text-sm text-slate-500">{loc.city}</p>
                    {loc.accessNotes && (
                      <p className="text-xs text-amber-500 mt-2 pt-2 border-t border-brand-800/50">
                        🔔 Note: {loc.accessNotes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
