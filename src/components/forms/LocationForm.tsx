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
  updateDoc,
} from "firebase/firestore";
import {
  MapPin,
  Plus,
  X,
  Trash2,
  Home,
  Briefcase,
  Factory,
  Tractor,
} from "lucide-react";
import type { Location } from "../../types";

export function LocationForm() {
  const { user } = useAuth();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState<Location["type"]>("Residential");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [accessNotes, setAccessNotes] = useState("");

  // 1. Listen for Locations (Real-time)
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "users", user.uid, "locations"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const locs: Location[] = [];
      snapshot.forEach((doc) => {
        locs.push({ id: doc.id, ...doc.data() } as Location);
      });
      setLocations(locs);
    });

    return () => unsubscribe();
  }, [user]);

  // 2. Add New Location
  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "users", user.uid, "locations"), {
        name,
        type,
        address,
        city,
        accessNotes,
        createdAt: new Date(),
      });
      setIsAdding(false);
      resetForm();
    } catch (err: any) {
      setError("Failed to add location: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Delete Location
  const handleDelete = async (id: string) => {
    if (!user || !window.confirm("Delete this location?")) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "locations", id));
    } catch (err: any) {
      setError("Failed to delete: " + err.message);
    }
  };

  const resetForm = () => {
    setName("");
    setType("Residential");
    setAddress("");
    setCity("");
    setAccessNotes("");
  };

  const getTypeIcon = (type: Location["type"]) => {
    switch (type) {
      case "Commercial":
        return <Briefcase size={18} />;
      case "Industrial":
        return <Factory size={18} />;
      case "Farm":
        return <Tractor size={18} />;
      default:
        return <Home size={18} />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="text-action" />
          My Locations
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-brand-800 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors border border-brand-700"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? "Cancel" : "Add New"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Add Location Form */}
      {isAdding && (
        <form
          onSubmit={handleAddLocation}
          className="bg-brand-950/30 border border-brand-800 rounded-xl p-6 mb-8 animate-in slide-in-from-top-4 fade-in duration-300"
        >
          <h3 className="font-bold mb-4 text-action">New Location Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Location Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Home, My Office"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as Location["type"])}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2.5 text-white focus:border-action focus:outline-none"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Farm">Farm</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-400 mb-1">
                Street Address
              </label>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                City / Area
              </label>
              <input
                required
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Access Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Gate code, dog warning..."
                value={accessNotes}
                onChange={(e) => setAccessNotes(e.target.value)}
                className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 text-white focus:border-action focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-action text-brand-950 font-bold px-6 py-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Location"}
            </button>
          </div>
        </form>
      )}

      {/* Locations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-brand-950 border border-brand-800 rounded-xl p-5 hover:border-action/50 transition-colors group relative"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-action">
                  {getTypeIcon(loc.type)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{loc.name}</h3>
                  <span className="text-xs text-slate-400 bg-brand-900 px-2 py-0.5 rounded-full border border-brand-800">
                    {loc.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(loc.id)}
                className="text-slate-500 hover:text-red-500 transition-colors p-2"
                title="Delete Location"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-1 ml-13 mt-2">
              <p className="text-slate-300 text-sm">{loc.address}</p>
              <p className="text-slate-400 text-sm">{loc.city}</p>
              {loc.accessNotes && (
                <p className="text-amber-500/80 text-xs italic mt-2 border-l-2 border-amber-500/30 pl-2">
                  "{loc.accessNotes}"
                </p>
              )}
            </div>
          </div>
        ))}

        {locations.length === 0 && !isAdding && (
          <div className="md:col-span-2 text-center py-12 border border-dashed border-brand-800 rounded-xl bg-brand-900/20">
            <MapPin
              className="mx-auto text-slate-600 mb-3 opacity-50"
              size={48}
            />
            <p className="text-slate-400">No locations added yet.</p>
            <button
              onClick={() => setIsAdding(true)}
              className="text-action hover:underline text-sm font-medium mt-2"
            >
              Add your first location
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
