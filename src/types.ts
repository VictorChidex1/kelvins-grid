export interface Location {
  id: string;
  name: string; // e.g. "Home", "The Farm"
  type: "Residential" | "Commercial" | "Industrial" | "Farm";
  address: string;
  city: string;
  accessNotes?: string; // e.g. "Gate code 1234"
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category:
    | "Bundles"
    | "Batteries"
    | "Panels"
    | "Inverters"
    | "solar"
    | "starlink"
    | "cctv"; // Expanded categories
  components: string[]; // Was features in seed
  usage?: string;
  priceWithoutPanels?: number;
  isFeatured?: boolean;
  loadCapacity?: string;
  badge?: string;
  imageUrl?: string;
  stock?: number;
}

export interface System {
  id: string;
  name: string;
  type: "Inverter" | "Solar Panels" | "CCTV" | "Starlink" | "Other";
  status: "Active" | "Maintenance" | "Offline";
  locationId: string;
  installedAt?: any; // Firestore Timestamp
  notes?: string;
}
