import { useState } from "react";
import type { Product } from "../../types";

interface ProductEditorProps {
  initialData?: Product;
  onSave: (product: Partial<Product>) => Promise<void>;
  onCancel: () => void;
}

export function ProductEditor({
  initialData,
  onSave,
  onCancel,
}: ProductEditorProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      title: "",
      price: 0,
      priceWithoutPanels: undefined,
      category: "solar",
      description: "",
      usage: "",
      loadCapacity: "",
      components: [""],
      imageUrl: "",
      badge: "",
      isFeatured: false,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseFloat(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  // Dynamic Components List Handlers
  const handleComponentChange = (index: number, value: string) => {
    const newComponents = [...(formData.components || [])];
    newComponents[index] = value;
    setFormData((prev) => ({ ...prev, components: newComponents }));
  };

  const addComponent = () => {
    setFormData((prev) => ({
      ...prev,
      components: [...(prev.components || []), ""],
    }));
  };

  const removeComponent = (index: number) => {
    const newComponents = [...(formData.components || [])];
    newComponents.splice(index, 1);
    setFormData((prev) => ({ ...prev, components: newComponents }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-900 border border-brand-800 rounded-xl p-8 space-y-6 text-white"
    >
      <h3 className="text-xl font-heading text-action">
        {initialData ? "Edit Product" : "Add New Product"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
            placeholder="e.g. 5kVA Inverter System"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
          >
            <option value="solar">Solar System</option>
            <option value="Bundles">Bundle</option>
            <option value="Batteries">Batteries</option>
            <option value="Panels">Panels</option>
            <option value="Inverters">Inverter Only</option>
            <option value="starlink">Starlink</option>
            <option value="cctv">CCTV</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Price (₦)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
            required
          />
        </div>

        {/* Price Without Panels (Optional) */}
        {formData.category === "solar" && (
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Price w/o Panels (₦)
            </label>
            <input
              type="number"
              name="priceWithoutPanels"
              value={formData.priceWithoutPanels || ""}
              onChange={handleChange}
              className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
            />
          </div>
        )}

        {/* Load Capacity */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Load Capacity
          </label>
          <input
            name="loadCapacity"
            value={formData.loadCapacity || ""}
            onChange={handleChange}
            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
            placeholder="e.g. 5kVA or 10kWh"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
          placeholder="Brief product summary..."
        />
      </div>

      {/* Usage */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">
          Usage (Items powered)
        </label>
        <input
          name="usage"
          value={formData.usage || ""}
          onChange={handleChange}
          className="w-full bg-brand-950 border border-brand-800 rounded-lg px-4 py-3 focus:border-action outline-none"
          placeholder="e.g. Fan, light, TV, 1hp AC..."
        />
      </div>

      {/* Components List */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">
          Components / Features
        </label>
        <div className="space-y-3">
          {formData.components?.map((comp, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={comp}
                onChange={(e) => handleComponentChange(index, e.target.value)}
                className="flex-1 bg-brand-950 border border-brand-800 rounded-lg px-4 py-2 focus:border-action outline-none"
                placeholder="Component detail"
              />
              <button
                type="button"
                onClick={() => removeComponent(index)}
                className="text-red-400 hover:text-red-300 px-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addComponent}
            className="text-sm text-action hover:underline"
          >
            + Add Component
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-brand-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-action text-brand-950 font-bold hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
