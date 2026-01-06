export function Dashboard() {
  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-heading text-white">Dashboard</h2>
          <p className="text-slate-400">Manage your products and inventory</p>
        </div>
        <button className="bg-action text-brand-950 font-bold px-6 py-2 rounded-lg hover:bg-white transition-colors">
          + Add New Product
        </button>
      </header>

      {/* Stub for Product List */}
      <div className="bg-brand-900 border border-brand-800 rounded-xl p-8 text-center text-slate-500">
        <p>Product management interface loading...</p>
      </div>
    </div>
  );
}
