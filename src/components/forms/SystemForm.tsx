import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  Zap,
  Plus,
  X,
  Trash2,
  Server,
  Sun,
  Video,
  Wifi,
  Box,
} from "lucide-react";
import type { System, Location } from "../../types";

export function SystemForm() {
  const { user } = useAuth();
  const [systems, setSystems] = useState<System[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState<System["type"]>("Inverter");
  const [status, setStatus] = useState<System["status"]>("Active");
  const [locationId, setLocationId] = useState("");
  const [notes, setNotes] = useState("");

  // 1. Listen for Systems & Locations
  useEffect(() => {
    if (!user) return;

    // Listen to Systems
    const sysQuery = query(collection(db, "users", user.uid, "systems"));
    const unsubSys = onSnapshot(sysQuery, (snapshot) => {
      const sys: System[] = [];
      snapshot.forEach((doc) => {
        sys.push({ id: doc.id, ...doc.data() } as System);
      });
      setSystems(sys);
    });

    // Listen to Locations (for Dropdown)
    const locQuery = query(collection(db, "users", user.uid, "locations"));
    const unsubLoc = onSnapshot(locQuery, (snapshot) => {
      const locs: Location[] = [];
      snapshot.forEach((doc) => {
        locs.push({ id: doc.id, ...doc.data() } as Location);
      });
      setLocations(locs);
    });

    return () => {
      unsubSys();
      unsubLoc();
    };
  }, [user]);

  // 2. Add New System
  const handleAddSystem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setError(null);

    // Backend Validation
    if (!locationId) {
      setError("Please select a location.");
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "systems"), {
        name,
        type,
        status,
        locationId,
        notes,
        createdAt: new Date(),
      });
      setIsAdding(false);
      resetForm();
    } catch (err: any) {
      setError("Failed to add system: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Delete System
  const handleDelete = async (id: string) => {
    if (!user || !window.confirm("Delete this system?")) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "systems", id));
    } catch (err: any) {
      setError("Failed to delete: " + err.message);
    }
  };

  const resetForm = () => {
    setName("");
    setType("Inverter");
    setStatus("Active");
    setLocationId("");
    setNotes("");
  };

  const getTypeIcon = (type: System["type"]) => {
    switch (type) {
      case "Solar Panels":
        return <Sun size={18} />;
      case "CCTV":
        return <Video size={18} />;
      case "Starlink":
        return <Wifi size={18} />;
      case "Inverter":
        return <Zap size={18} />;
      default:
        return <Box size={18} />;
    }
  };

  const getLocationName = (id: string) => {
    const loc = locations.find((l) => l.id === id);
    return loc ? loc.name : "Unknown Location";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Server className="text-action" />
          My Systems
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-brand-800 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors border border-brand-700"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? "Cancel" : "Register New"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Add System Form */}
      {isAdding && (
        <form
          onSubmit={handleAddSystem}
          className="bg-brand-950/30 border border-brand-800 rounded-xl p-6 mb-8 animate-in slide-in-from-top-4 fade-in duration-300"
        >
          <h3 className="font-bold mb-4 text-action">New Asset Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                System Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. 5kVA Inverter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as System["type"])}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:border-action focus:outline-none"
              >
                <option value="Inverter">Inverter</option>
                <option value="Solar Panels">Solar Panels</option>
                <option value="CCTV">CCTV</option>
                <option value="Starlink">Starlink</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Location
              </label>
              <select
                required
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:border-action focus:outline-none"
              >
                <option value="">Select a location...</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              {locations.length === 0 && (
                <p className="text-xs text-amber-500 mt-1">
                  You need to add a Location first!
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as System["status"])}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:border-action focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-400 mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Serial number, installation date, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || locations.length === 0}
              className="bg-action text-brand-950 font-bold px-6 py-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Register System"}
            </button>
          </div>
        </form>
      )}

      {/* Systems List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systems.map((sys) => (
          <div
            key={sys.id}
            className="bg-brand-950 border border-brand-800 rounded-xl p-5 hover:border-action/50 transition-colors group relative"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-action">
                  {getTypeIcon(sys.type)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{sys.name}</h3>
                  <div className="flex gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        sys.status === "Active"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : sys.status === "Maintenance"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}
                    >
                      {sys.status}
                    </span>
                    <span className="text-xs text-slate-500 border border-brand-800 px-2 py-0.5 rounded-full">
                      {sys.type}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(sys.id)}
                className="text-slate-500 hover:text-red-500 transition-colors p-2"
                title="Delete System"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-1 ml-13 mt-2">
              <p className="text-slate-300 text-sm flex items-center gap-2">
                <span className="text-slate-500">at</span>
                {getLocationName(sys.locationId)}
              </p>
              {sys.notes && (
                <p className="text-slate-500 text-xs mt-2 border-t border-brand-800 pt-2">
                  {sys.notes}
                </p>
              )}
            </div>
          </div>
        ))}

        {systems.length === 0 && !isAdding && (
          <div className="md:col-span-2 text-center py-12 border border-dashed border-brand-800 rounded-xl bg-brand-900/20">
            <Server
              className="mx-auto text-slate-600 mb-3 opacity-50"
              size={48}
            />
            <p className="text-slate-400">No systems registered yet.</p>
            <button
              onClick={() => setIsAdding(true)}
              className="text-action hover:underline text-sm font-medium mt-2"
            >
              Register your first asset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
