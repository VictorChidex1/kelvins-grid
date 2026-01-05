# KELVIN'S GRID 2.0 ⚡️

> **Serverless Solar Utility Platform** for renewable energy management in Nigeria.

![System Status](https://img.shields.io/badge/System-Operational-10B981) ![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Firestore-orange)

## 📌 Abstract

**KELVIN'S GRID** is a premium business application designed to facilitate the sale and management of solar inverter systems, Starlink installations, and CCTV security solutions. The platform is engineered for **speed** (client-side reads) and **security** (server-side writes) using a hybrid serverless architecture.

## 🛠 Tech Stack

- **Frontend:** React (Vite) + TypeScript
- **Styling:** Tailwind CSS v3.4 ("Deep Grid" Design System)
- **State:** Zustand (Data Caching)
- **Backend:** Vercel Serverless Functions
- **Database:** Google Cloud Firestore (NoSQL)
- **Storage:** Firebase Storage

## 🎨 Design System: "The Deep Grid"

The UI is built on a custom palette engineered to feel industrial and premium:

- **Midnight Navy (`#020617`):** The deep background representing the grid before power restoration.
- **Voltaic Amber (`#FFB800`):** Primary actions and energy highlights.
- **Space Grotesk:** Technical headings.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Firebase Project Credentials

### Installation

1. **Clone the repository:**

   ```bash
   git clone <YOUR_REPO_URL>
   cd kelvins-grid
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file in the root:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 🏗 Architecture

- **Reads:** The frontend connects directly to Firestore for instant product loading using the Firebase Client SDK.
- **Writes:** All administrative mutations (Price updates, Inventory) are routed through Next.js-style API routes (Vercel Functions) using `firebase-admin` for strict validation.

## 📂 Project Structure

```
/src
  /components/ui    # Reusable atoms (ProductCard, Buttons)
  /lib              # Firebase initialization
  /pages            # Route components
  /store            # Zustand state stores
```

---

© 2024 Kelvin's Grid. Engineered for Reliability.
