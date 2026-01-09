import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { motion } from "framer-motion";

export function MessagesList() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time Listener
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    // 👂 The Ear on the Wall
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(liveData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-slate-400 animate-pulse">Syncing inbox...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-heading font-bold text-white mb-8">
        Inbox{" "}
        <span className="text-sm font-sans font-normal text-slate-500 ml-2">
          ({messages.length})
        </span>
      </h2>

      <div className="bg-brand-900 border border-brand-800 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-brand-950 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b border-brand-800">Date/Status</th>
              <th className="p-4 border-b border-brand-800">Customer</th>
              <th className="p-4 border-b border-brand-800">Contact</th>
              <th className="p-4 border-b border-brand-800">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-800">
            {messages.map((msg, index) => (
              <motion.tr
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-brand-800/50 transition-colors group"
              >
                {/* 1. Date & Status */}
                <td className="p-4 align-top w-32">
                  <div className="flex flex-col gap-2">
                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide w-fit ${
                        msg.status === "new"
                          ? "bg-action text-brand-950"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {msg.status || "NEW"}
                    </span>
                    {/* Timestamp */}
                    <span className="text-xs text-slate-500">
                      {msg.createdAt?.seconds
                        ? new Date(
                            msg.createdAt.seconds * 1000
                          ).toLocaleDateString()
                        : "Just now"}
                    </span>
                  </div>
                </td>

                {/* 2. Customer Name */}
                <td className="p-4 align-top w-48 text-slate-200 font-medium">
                  {msg.name}
                </td>

                {/* 3. Contact Info (Email/Phone) */}
                <td className="p-4 align-top w-56">
                  <div className="flex flex-col gap-1 text-sm">
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-slate-300 hover:text-action transition-colors"
                    >
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="text-slate-500 hover:text-white transition-colors text-xs"
                      >
                        {msg.phone}
                      </a>
                    )}
                  </div>
                </td>

                {/* 4. Details (Service + Message) */}
                <td className="p-4 align-top">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-action uppercase tracking-widest opacity-80">
                      {msg.service}
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                      {msg.message}
                    </p>
                  </div>
                </td>
              </motion.tr>
            ))}

            {messages.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-500">
                  No messages yet. Inbox Zero. 📥
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
