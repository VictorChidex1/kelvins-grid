export interface Product {
  id: string;
  title: string;
  price: number;
  priceWithPanels?: number;
  description: string;
  category: "solar" | "starlink" | "cctv";
  components: string[];
  isFeatured: boolean;
  // Additional fields for UI display that might be calculated or part of metadata later
  loadCapacity?: string;
  badge?: string;
}
