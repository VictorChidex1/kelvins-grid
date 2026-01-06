import { collection, getDocs, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { type Product } from "../types";

export const initialProducts: Product[] = [
  {
    id: "5kva-silence-bundle",
    title: "5KVA Silence Bundle",
    price: 5800000,
    category: "Bundles",
    description:
      "Complete autonomy for 3-bedroom apartments. Powers Inverter ACs, Freezers, and Pumping Machines silently.",
    components: [
      "5KVA Hybrid Inverter (Pure Sine Wave)",
      "10kWh Lithium Battery Bank",
      "8x 450W Monocrystalline Panels",
      "Smart Monitoring App",
    ],
    stock: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1592833159057-65a2845730ee?auto=format&fit=crop&q=80&w=1000",
    badge: "Best Seller",
    loadCapacity: "5KVA",
    isFeatured: true,
  },
  {
    id: "10kva-estate-bundle",
    title: "10KVA Estate Pro",
    price: 12500000,
    category: "Bundles",
    description:
      "Designed for duplexes and large estates. Handles heavy inductive loads including multiple ACs and pumps.",
    components: [
      "10KVA Industrial Inverter",
      "20kWh LiFePO4 Battery Storage",
      "16x 550W Half-Cut Panels",
      "Precision ATS Integration",
    ],
    stock: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&q=80&w=1000",
    badge: "Premium",
    loadCapacity: "10KVA",
  },
  {
    id: "lithium-pack-5kwh",
    title: "5kWh Lithium Module",
    price: 2100000,
    category: "Batteries",
    description:
      "Expandable energy storage with 6000+ cycle life. Rack-mountable and maintenance-free.",
    components: [
      "48V System",
      "Built-in BMS",
      "10-Year Warranty",
      "Stackable Design",
    ],
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=1000",
    loadCapacity: "5kWh",
  },
  {
    id: "canadian-solar-550w",
    title: "Canadian Solar 550W",
    price: 185000,
    category: "Panels",
    description:
      "High-efficiency monocrystalline solar panel with half-cut cell technology for better shade tolerance.",
    components: [
      "21.5% Efficiency",
      "Half-Cut Cell",
      "Heavy Snow/Wind Load",
      "25-Year Output Warranty",
    ],
    stock: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
    loadCapacity: "550W",
  },
  {
    id: "inverter-5kva-hybrid",
    title: "Kelvin's 5KVA Hybrid",
    price: 850000,
    category: "Inverters",
    description:
      "Next-gen hybrid inverter with built-in MPPT charge controller and Wi-Fi monitoring.",
    components: [
      "Parallel Capability",
      "Zero Transfer Time",
      "Touchscreen Interface",
      "Generator Support",
    ],
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1000",
    loadCapacity: "5KVA",
  },
  {
    id: "sme-starter-kit",
    title: "SME Starter Kit",
    price: 2800000,
    category: "Bundles",
    description:
      "Perfect for small offices and shops. Keeps laptops, printers, and lights running 24/7.",
    components: [
      "3.5KVA Inverter",
      "5kWh Lithium Battery",
      "4x Panels",
      "Installation Included",
    ],
    stock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
    loadCapacity: "3.5KVA",
  },
];

export const seedDatabase = async () => {
  try {
    const productsCollection = collection(db, "products");

    // Check if empty to avoid duplicates
    const snapshot = await getDocs(productsCollection);
    if (!snapshot.empty) {
      console.log("Database already has data. Skipping seed.");
      return { success: false, message: "Database not empty" };
    }

    const batch = writeBatch(db);

    initialProducts.forEach((product) => {
      const docRef = doc(productsCollection, product.id);
      batch.set(docRef, product);
    });

    await batch.commit();
    console.log("Database seeded successfully!");
    return {
      success: true,
      message: `Seeded ${initialProducts.length} products.`,
    };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, message: "Error seeding database.", error };
  }
};
