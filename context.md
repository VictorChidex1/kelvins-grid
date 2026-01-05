# 🧠 Project Context: KELVIN'S GRID (Serverless Solar Utility)

## 📌 Project Overview

We are building a **High-Performance Utility & Solar Platform** for a Nigerian renewable energy brand.

- **Goal:** Transform a static brochure site into a dynamic Single Page Application (SPA) where the business owner can manage inventory and portfolio instantly.
- **Core Challenge:** Delivering instant page loads on 3G/4G mobile networks while securing business data (pricing/orders).
- **Target Audience:** Homeowners and businesses in Port Harcourt seeking reliable power solutions (Inverters, Starlink, CCTV).
- **Constraint:** Must run effectively on **Vercel Hobby Tier** (Serverless Functions) + **Firebase Spark Plan** (Firestore/Storage).

---

## 🤝 AI Collaboration Protocol (Strict)

**1. PERMISSION FIRST:**
You (the AI) must **always** ask for explicit permission before implementing complex logic (e.g., Database Writes, Auth implementation), refactoring core architecture, or adding new dependencies.

**2. THE "WHY" RULE:**
Before suggesting any architectural change, you must provide:

- **The Risk:** What happens if we don't do it? (e.g., Security vulnerability, Poor SEO).
- **The Value:** What do we gain? (e.g., Admin autonomy, Faster load times).
- **The Plan:** Briefly explain the implementation steps.

---

## 🛠 Tech Stack (Strict)

- **Frontend:** React (Vite) + TypeScript.
- **State Management:** Zustand (Global Client State & Data Caching).
- **Styling:** Tailwind CSS (v3.4).
- **Backend:** Vercel Serverless Functions (Node.js / TypeScript).
  - _Critical:_ We use Vercel for backend logic (API Routes), NOT Firebase Cloud Functions.
- **Database:** Google Cloud Firestore (Web SDK for Reads, Admin SDK for Writes).
- **Storage:** Firebase Storage (For Portfolio Images).
- **Email:** Resend / SendGrid (For Contact Forms).

---

## 🎨 Design System (Strict)

**Theme:** "The Deep Grid" (Industrial, Engineered, Premium).
**NO** generic "SaaS Blue" or "Playful" colors.

- **Background:** Midnight Navy (`brand-950` / `#020617`)
  - _Usage:_ Main application background. Represents the grid before power is restored.
- **Surface:** Slate Navy (`brand-900` / `#0F172A`)
  - _Usage:_ Product Cards, Sticky Headers, Admin Modals.
- **Primary Accent:** Voltaic Amber (`action` / `#FFB800`)
  - _Usage:_ "Order Now" Buttons, Pricing Highlights, Key Icons.
  - _Hover:_ `#E5A500`.
- **Status Colors (Critical for Logic):**
  - **Success:** `emerald-500` (Battery Full / In Stock)
  - **Danger:** `red-500` (Low Voltage / Out of Stock)
- **Typography:**
  - Headings: `Space Grotesk` (Technical, Geometric, Circuitry-like).
  - Body: `Inter` (Clean, Readable on mobile).

---

## 🏗 Architecture & Data Flow

**The "Client-Read / Server-Write" Model:**

1.  **Frontend (Read-Heavy):**
    - Connects _directly_ to Firestore using `getDocs` or `onSnapshot`.
    - _Constraint:_ Frontend has **Read-Only** access to `products` and `portfolio`.
    - _Caching:_ Uses Zustand to store data after the first fetch to minimize database reads.
2.  **Backend (Write-Critical):**
    - Frontend calls Vercel API Routes (e.g., `/api/products/update`).
    - Vercel Function verifies the "Admin-Secret" header.
    - Uses `firebase-admin` to perform the database write.
    - **Logic:** Validates payload (e.g., price is a number) -> Updates Firestore -> Returns success.
3.  **Media Uploads:**
    - Frontend uploads images directly to Firebase Storage.
    - Frontend sends the resulting "Download URL" to the Vercel API to save it in the database.

---

## 📝 Coding Guidelines

1.  **TypeScript:** Strictly typed. No `any`. Define interfaces for `Product`, `PortfolioItem`.
2.  **API Boundaries:**
    - **NEVER** write to Firestore from the client (React).
    - Always use `fetch('/api/...')` for admin updates.
3.  **Security:**
    - Client-side: Uses `VITE_FIREBASE_API_KEY` (Public).
    - Server-side: Uses `FIREBASE_SERVICE_ACCOUNT` (Private Environment Variable).
4.  **Error Handling:**
    - UI must handle network failures gracefully (e.g., "Could not update price. Check internet connection.").

---

## 📂 Folder Structure

- `/api`: Vercel Serverless Functions (Backend Logic).
  - `/api/products/update.ts`: Admin price changes.
  - `/api/portfolio/create.ts`: New project uploads.
- `/src`: Frontend React code.
  - `/src/lib/firebase.ts`: Client SDK initialization.
  - `/src/store`: Zustand stores (`useProductStore`).
  - `/src/components/ui`: Reusable atoms (Buttons, Badges).
- `vercel.json`: Header rules and routing config.

---

## 📍 Current Phase: Phase 1 (Setup & Visuals)

- [x] Initialize React + Vite project.
- [ ] Configure Tailwind with "Deep Grid" palette.
- [ ] Build `ProductCard` component (Visual only).
- [ ] **Next Step:** Implementing the "Deep Grid" theme in `tailwind.config.ts`.

---

## 💬 Code Commenting Standards (Strict)

**Goal:** Code should look written by a Senior Engineer, not an AI tutorial.

**1. THE "NO NOISE" RULE:**

- **FORBIDDEN:** Do not explain _what_ the code is doing if it is obvious.
  - _Bad:_ `// Set loading to true` -> `setLoading(true)`
- **REQUIRED:** Only comment on _why_ a specific decision was made (business logic or architectural constraint).

**2. EXPLAIN "WHY", NOT "WHAT":**

- _Bad:_ `// Fetch products from firestore`
- _Good:_ `// Direct client-side read used here to reduce server latency and leverage CDN caching.`

**3. SUBTLETY:**

- Keep comments punchy. Use `// TODO:` for missing logic.

```typescript
// ✅ GOOD (Professional Example):
const updatePrice = async (productId: string, newPrice: number) => {
  // Optimistic UI: Update store immediately so admin feels instant response
  setProductPrice(productId, newPrice);

  try {
    await fetch("/api/products/update", {
      method: "POST",
      headers: { "x-admin-secret": ADMIN_SECRET },
      body: JSON.stringify({ productId, newPrice }),
    });
  } catch (err) {
    // Rollback if server write fails
    revertProductPrice(productId);
    toast.error("Update failed. Reverting.");
  }
};
```
