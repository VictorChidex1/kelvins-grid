import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import type { QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Product } from "../types";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchProducts: () => Promise<void>;
}

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchProducts: async () => {
    const { products, lastFetched, isLoading } = get();
    const now = Date.now();

    // prevent duplicate fetch if already loading
    if (isLoading) return;

    // Cache check: Return early if data is fresh
    if (
      products.length > 0 &&
      lastFetched &&
      now - lastFetched < CACHE_DURATION
    ) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, "products")
      );

      const fetchedProducts: Product[] = [];

      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });

      set({
        products: fetchedProducts,
        isLoading: false,
        lastFetched: now,
      });
    } catch (err) {
      console.error("Failed to fetch products:", err);
      set({
        error: "Failed to load products. Please check your connection.",
        isLoading: false,
      });
    }
  },
}));
