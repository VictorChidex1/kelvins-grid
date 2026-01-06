import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { type Product } from "../types";

import img1kva from "../assets/images/1kva-inverter.png";
import img2_5kva from "../assets/images/2.5kva inverter.png";
import img3_5kva from "../assets/images/3.5kva-inverter.png";
import img5kva from "../assets/images/5kva-inverter.png";
import img7_5kva from "../assets/images/7.5kva-inverter.png";
import img10kva from "../assets/images/10kva-inverter.png";
import imgStarlink from "../assets/images/starlink-installation.png";
import imgCCTV from "../assets/images/cctv-installation.png";

export const initialProducts: Product[] = [
  {
    id: "1kva-inverter-bundle",
    title: "1kVA Inverter",
    price: 980000,
    priceWithoutPanels: 710000,
    category: "solar",
    description: "Compact power solution for basics.",
    usage: "Fan, light, Tv, socket for charging phones and laptops",
    components: [
      "220ah battery",
      "PWM charge controller",
      "(2) 320W Solar panels",
    ],
    stock: 10,
    imageUrl: img1kva,
    loadCapacity: "1KVA",
  },
  {
    id: "2.5kva-inverter-bundle",
    title: "2.5kVA Inverter",
    price: 1950000,
    priceWithoutPanels: 1300000,
    category: "solar",
    description: "Standard home power solution.",
    usage:
      "Fan, light, Tv, blender, freezer, soundbar, washing machine, socket for charging laptop/phones",
    components: [
      "(2) 220ah batteries",
      "60amps MPPT charge controller",
      "(4) 320W solar panels",
    ],
    stock: 5,
    imageUrl: img2_5kva,
    loadCapacity: "2.5KVA",
    isFeatured: true,
  },
  {
    id: "3.5kva-inverter-bundle",
    title: "3.5kVA Inverter",
    price: 3600000,
    priceWithoutPanels: 2200000,
    category: "solar",
    description: "Heavy duty power solution.",
    usage:
      "TV, Standing fan, 1hp AC, Blender, Soundbar, Freezer, Washing Machine, Lights, Sockets for charging phones",
    components: [
      "(4) 220AH tubular batteries",
      "(12) 320W solar panels",
      "MPPT charge controller",
    ],
    stock: 3,
    imageUrl: img3_5kva,
    loadCapacity: "3.5KVA",
  },
  {
    id: "5kva-inverter-system",
    title: "5kVA Inverter System",
    price: 5800000,
    priceWithoutPanels: 3600000,
    category: "solar",
    description:
      "Advanced capacity for larger homes. Powers multiple ACs, Freezers, and heavy appliances.",
    usage: "Multiple ACs, Freezers, Pumping Machines, Heavy Appliances",
    components: [
      "10kWh Lithium Battery",
      "12x 400W Solar Panels",
      "MPPT Charge Controller",
      "Installation Included",
    ],
    stock: 6,
    imageUrl: img5kva,
    badge: "Premium",
    loadCapacity: "5kVA",
    isFeatured: true,
  },
  {
    id: "7.5kva-inverter-system",
    title: "7.5kVA Inverter System",
    price: 6400000,
    priceWithoutPanels: 3900000,
    category: "solar",
    description: "High capacity system for luxury homes and large offices.",
    usage: "Central ACs, Industrial Pumps, Office Buildings, Large Homes",
    components: [
      "10kWh Lithium Battery",
      "16x 400W Solar Panels",
      "MPPT Charge Controller",
      "Installation Included",
    ],
    stock: 5,
    imageUrl: img7_5kva,
    badge: "Premium",
    loadCapacity: "7.5kVA",
    isFeatured: true,
  },
  {
    id: "10kva-inverter-system",
    title: "10kVA Inverter System",
    price: 11000000,
    priceWithoutPanels: 7500000,
    category: "solar",
    description:
      "Industrial grade power solution for estates and commercial use.",
    usage: "Estate Infrastructure, Commercial Plazas, Factory Equipment",
    components: [
      "2 x 10kWh Lithium Battery",
      "16x 400W Solar Panels",
      "MPPT Charge Controller",
      "Installation Included",
    ],
    stock: 5,
    imageUrl: img10kva,
    badge: "Premium",
    loadCapacity: "10kVA",
    isFeatured: true,
  },
  {
    id: "starlink-installation",
    title: "Starlink Installation",
    price: 650000,
    category: "starlink",
    description: "Bringing You Reliable High-Speed Internet, Anywhere.",
    usage: "High-speed internet for rural and urban areas",
    components: [
      "Starlink Satellite Kit",
      "Professional Mounting",
      "Router Setup",
      "App Configuration",
    ],
    stock: 20,
    imageUrl: imgStarlink,
    badge: "Hot",
  },
  {
    id: "cctv-installation",
    title: "CCTV Installation",
    price: 450000,
    category: "cctv",
    description:
      "Protect What Matters Most with Advanced Surveillance Solutions.",
    usage: "24/7 Surveillance for home or business",
    components: [
      "HD Cameras",
      "DVR/NVR System",
      "Remote Viewing App",
      "Installation & Cabling",
    ],
    stock: 15,
    imageUrl: imgCCTV,
  },
];

export const seedDatabase = async () => {
  try {
    const productsCollection = collection(db, "products");

    // We removed the check for existing data to FORCE overwrite
    console.log("Starting seed process (Overwriting existing data)...");

    const batch = writeBatch(db);

    initialProducts.forEach((product) => {
      const docRef = doc(productsCollection, product.id);
      batch.set(docRef, product); // set() overwrites by default
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
