import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Phone, Calendar, ArrowRight, Search } from "lucide-react";
import type { UserProfile } from "../../context/AuthContext";

export function ClientsList() {
  const [clients, setClients] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // In a real app with thousands of users, we'd paginate.
        // For now, fetching all is fine for the MVP.
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const users: UserProfile[] = [];
        querySnapshot.forEach((doc) => {
          // Add ID to the object (assuming UserProfile doesn't have it explicitly yet, though usually it's the doc ID)
          // We'll cast it for now.
          users.push({ uid: doc.id, ...doc.data() } as any);
        });

        // Filter for customers on client side if needed, or query above
        // For now let's show everyone who is a 'customer'
        const customers = users.filter((u) => u.role === "customer");
        setClients(customers);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white">
            Client Registry
          </h2>
          <p className="text-slate-400">View and manage your customer base</p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
        <input
          type="text"
          className="bg-brand-900 border border-brand-800 text-white text-sm rounded-lg focus:ring-action focus:border-action block w-full pl-10 p-2.5 placeholder-slate-500"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto rounded-xl border border-brand-800 shadow-xl">
        <table className="w-full text-sm text-left text-slate-400">
          <thead className="text-xs text-slate-300 uppercase bg-brand-900 border-b border-brand-800">
            <tr>
              <th scope="col" className="px-6 py-4">
                Client Name
              </th>
              <th scope="col" className="px-6 py-4">
                Contact
              </th>
              <th scope="col" className="px-6 py-4">
                Joined
              </th>
              <th scope="col" className="px-6 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center bg-brand-950">
                  <div className="flex justify-center items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-action"></div>
                    Loading clients...
                  </div>
                </td>
              </tr>
            ) : filteredClients.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center bg-brand-950">
                  No clients found.
                </td>
              </tr>
            ) : (
              filteredClients.map((client: any) => (
                <tr
                  key={client.uid}
                  className="bg-brand-950 border-b border-brand-800/50 hover:bg-brand-900/50 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/admin/clients/${client.uid}`)}
                >
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-action font-bold">
                      {client.fullName?.[0] || client.email[0].toUpperCase()}
                    </div>
                    {client.fullName || "Unnamed User"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-300">{client.email}</span>
                      {client.phone && (
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Phone size={10} /> {client.phone}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-600" />
                      {client.createdAt
                        ? new Date(client.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-action hover:text-white transition-colors">
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
