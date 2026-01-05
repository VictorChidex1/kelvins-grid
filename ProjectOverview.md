# Project Textbook: "KELVIN'S GRID 2.0" – Serverless Solar Utility Platform

## Abstract

**KELVIN'S GRID 2.0** is a premium, high-performance business application designed for a renewable energy utility provider in Nigeria. It facilitates the sale of solar inverter systems, Starlink installations, and CCTV security solutions.

The platform utilizes a **Hybrid Serverless Architecture** that rigorously separates concerns between speed and security:

1.  **Client-Side Reads:** The React frontend connects directly to **Google Firestore** for instant product catalogs and portfolio galleries.
2.  **Server-Side Writes:** Administrative actions (changing prices, uploading portfolio projects) are routed through **Vercel Serverless Functions** to ensure strict validation and data integrity via the Firebase Admin SDK.

**Core Objective:** Empower the business owner (Kelvin) to manage his digital inventory and portfolio via a secure dashboard, while delivering a "blazing fast," engineered experience to customers on Nigerian mobile networks.

**Tech Stack:**

- **Frontend:** React (Vite) + TypeScript.
- **Styling:** Tailwind CSS (v3.4) + Custom "Deep Grid" Design System.
- **State Management:** Zustand (Global Client State & Caching).
- **Backend Logic:** Vercel Serverless Functions (Node.js/TypeScript).
- **Database:** Google Cloud Firestore (NoSQL).
- **Storage:** Firebase Storage (for Portfolio Images).

---

## Chapter 1: Architecture & Data Flow

### 1.1 The "Client-Read / Server-Write" Pattern

We strictly separate how data is _consumed_ vs. how it is _modified_.

- **Public User Flow (READS):**

  - **User** visits `kelvinsgrid.com.ng`.
  - **React** uses the `firebase-client-sdk` to fetch data directly from Firestore.
  - **Benefit:** Zero server latency. Reads are handled by Google's global CDN edges. This is free (up to 50k reads/day) and highly performant.

- **Admin Flow (WRITES):**
  - **Kelvin** logs into the Admin Dashboard (`/admin`).
  - **Kelvin** updates the price of a "5kVA Inverter".
  - **React** sends a `POST` request to `/api/products/update` (Vercel Function).
  - **Vercel** verifies the request (Auth check), then uses the `firebase-admin-sdk` to write to Firestore.
  - **Benefit:** Security. The public frontend _never_ has permission to write to the database.

### 1.2 System Diagram

```mermaid
graph TD
    User[Customer] -->|Reads Website| ReactApp
    Kelvin[Admin] -->|Updates Price| ReactApp

    subgraph Frontend [Vite + React]
        ReactApp[Client App]
        Zustand[Zustand Store]
    end

    subgraph Vercel [Serverless Backend]
        API_Update[POST /api/products/update]
        API_Portfolio[POST /api/portfolio/create]
        Env[Env Vars: FIREBASE_SERVICE_ACCOUNT]
    end

    subgraph GoogleCloud [Data Layer]
        Firestore[(Firestore DB)]
        Storage[Firebase Storage]
    end

    %% Read Path
    ReactApp -->|Direct Read (Web SDK)| Firestore

    %% Write Path
    ReactApp -->|Secure Request| API_Update
    API_Update -->|Privileged Write (Admin SDK)| Firestore

    ------

    Chapter 2: Database Schema (Firestore)
2.1 Collection: products
Stores the solar packages and installation services.

id (string): Slugified ID (e.g., 5kva-solar-system).

title (string): Display name (e.g., "5KVA Inverter System").

price (number): Raw integer (e.g., 5800000).

priceWithPanels (number): Optional secondary price.

description (string): Short marketing copy.

category (string): "solar" | "starlink" | "cctv".

components (array<string>): List of hardware included (e.g., ["10kwh Lithium battery", "12x 400W panels"]).

isFeatured (boolean): If true, appears on the Homepage hero section.

2.2 Collection: portfolio
Stores the "Recent Projects" gallery.

id (string): Auto-generated UUID.

title (string): Project name (e.g., "5KVA Installation in Delta State").

location (string): City/State (e.g., "Asaba, Delta").

imageUrl (string): Public download URL from Firebase Storage.

dateCompleted (timestamp): Sortable date field.

-----

Chapter 3: Vercel Serverless Logic (The Backend)
Located in the /api directory of the root folder.

3.1 Endpoint: POST /api/products/update
Purpose: Allows Kelvin to change prices or descriptions.

Security: Checks for x-admin-secret header (or session token).

Logic:

Initialize firebase-admin.

Validate payload (price must be a number).

Execute firestore.collection('products').doc(id).update(...).

Return 200 OK.

3.2 Endpoint: POST /api/portfolio/create
Purpose: Finalize a portfolio upload.

Logic:

Frontend uploads image to Firebase Storage first.

Frontend sends the resulting imageUrl to this API.

API creates a new document in the portfolio collection with the image URL and metadata.

3.3 Endpoint: POST /api/contact
Purpose: Lead Generation.

Logic:

Accepts name, phone, serviceInterest.

Uses an email provider (e.g., Resend) to email info@kelvinsgrid.com.ng.

----

Chapter 4: Frontend Implementation Strategy
4.1 Visual Identity: "The Deep Grid"
The design language is engineered to feel premium, industrial, and reliable. It avoids generic "tech startup" aesthetics in favor of a heavy, utility-focused look suitable for high-value infrastructure.

Color Palette (Tailwind Config)
Primary Background ("Midnight Navy"): brand-950 -> #020617

Concept: The deep, dark canvas. Represents the "Grid" offline before power is restored. Used for the global body background and heavy footers.

Surface / Cards ("Slate Navy"): brand-900 -> #0f172a

Concept: The structural elements. Used for product cards, navigation bars, and modal backgrounds. Slightly lighter than the background to create depth.

Primary Action ("Voltaic Amber"): action-DEFAULT -> #FFB800

Concept: Energy and Power. Used for "Order Now" buttons, pricing highlights, and call-to-action elements.

Text / Content ("Signal White"): #F8FAFC (Slate 50)

Concept: Clarity. Used for primary headings and body text.

Status Indicators:

Success (Battery Full): #10B981 (Emerald 500)

Danger (Low Stock): #EF4444 (Red 500)

Typography
Headings: Space Grotesk

Usage: Product titles, pricing, and hero statements.

Vibe: Technical, geometric, squarish curves. Looks like technical schematics.

Body: Inter

Usage: Descriptions, specs, and blog content.

Vibe: Clean, legible, neutral.

UI Geometry
Shapes: Slightly squared corners (rounded-md). No fully pill-shaped buttons. We mimic the rectangular geometry of solar panels and batteries.

Depth: Heavy, dark shadows (shadow-xl or shadow-2xl) to lift elements off the dark background.

Glassmorphism: Minimal usage (e.g., bg-brand-900/50 backdrop-blur-md) for sticky headers only.

4.2 State Management (Zustand)
We use Zustand to cache product data so the user doesn't re-download the same solar packages when navigating between pages.

interface ProductState {
  products: Product[];
  lastFetched: number; // Timestamp
  fetchProducts: () => Promise<void>; // Only fetches if (Now - lastFetched > 5 mins)
}

4.3 Directory Structure (Vite Standard)

/root
  /api                 <-- Vercel Functions (Backend)
    /products
      update.ts
    /portfolio
      create.ts
  /src                 <-- React App (Frontend)
    /components
      /ui              <-- Reusable atoms (Buttons, Cards)
      /layout          <-- Navbar, Footer
    /pages
      /admin           <-- Protected Dashboard
      /public          <-- Home, Services, Portfolio
    /store             <-- Zustand stores
    /lib
      firebase.ts      <-- Client SDK Init
  vercel.json          <-- Routing & Headers

-----

Chapter 5: Security & Keys
5.1 Client-Side (.env.local)
VITE_FIREBASE_API_KEY: Safe to expose. Restricted by HTTP Referrer (domain name) in the Google Cloud Console.

VITE_FIREBASE_PROJECT_ID: Identifies the project.

5.2 Server-Side (Vercel Dashboard)
FIREBASE_SERVICE_ACCOUNT_KEY: CRITICAL SECRET. A JSON string containing the full Admin credentials.

ADMIN_PASSWORD: A simple shared secret for Kelvin to access the dashboard.

RESEND_API_KEY: For sending email notifications.

------

Chapter 6: Development Roadmap
Setup: Initialize Vite + TypeScript. Install Tailwind and configure "Deep Grid" colors.

Database: Create Firestore project. Seed "Solar Packages" (1kVA, 2.5kVA, etc.) based on legacy data.

Read Layer (Frontend): Build the "Services" page using useProductStore to fetch and display packages.

Admin Layer (Backend): Build the /api/products/update function.

Admin UI: Create the /admin page with a table of products and "Edit" buttons.

Portfolio: Implement Firebase Storage upload for images and the portfolio gallery grid.

Launch: Deploy to Vercel production.

🧠 Project Context: Kelvin's Grid (Serverless Solar Utility)
```
