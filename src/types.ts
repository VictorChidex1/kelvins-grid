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
  isFeatured?: boolean;
  loadCapacity?: string;
  badge?: string;
  imageUrl?: string;
  stock?: number;
}
