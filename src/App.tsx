import "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./pages/Services";
import { ServicesSection } from "./components/ServicesSection";
import { Seed } from "./pages/Seed";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { Settings } from "./pages/Settings";

import { CustomerDashboard } from "./pages/dashboard/CustomerDashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="relative min-h-screen bg-brand-950 font-sans selection:bg-action selection:text-brand-950 overflow-x-hidden">
          {/* Background Grid Pattern (Global) */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          </div>

          {/* Global Navbar is conditionally rendered or we accept it shows on login page too? 
              Usually Admin has its own layout. If we put Navbar outside Routes it shows everywhere.
              Let's keep Navbar for public pages. AdminLayout has its own sidebar.
              We can make a wrapper for public routes or just accept Navbar everywhere.
              Actually, for Admin, we likely DON'T want the public Navbar.
              I will structure it so Navbar is only on public routes.
          */}

          <Routes>
            {/* Public Routes with Navbar */}
            <Route
              element={
                <>
                  <Navbar />
                  <main className="relative z-10 w-full">
                    <Outlet />
                  </main>
                </>
              }
            >
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <ServicesSection />
                  </>
                }
              />
              <Route path="/services" element={<Services />} />
              <Route path="/seed" element={<Seed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Admin Routes (Protected, No Public Navbar) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
