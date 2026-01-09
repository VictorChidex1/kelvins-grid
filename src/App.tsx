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
import { ProcessSection } from "./components/ProcessSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { WhatsAppWidget } from "./components/ui/WhatsAppWidget";
import { Footer } from "./components/Footer";
import { Seed } from "./pages/Seed";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { ClientsList } from "./pages/admin/ClientsList";
import { MessagesList } from "./pages/admin/MessagesList";
import { ClientDetail } from "./pages/admin/ClientDetail";
import { Settings } from "./pages/Settings";
import { Contact } from "./pages/Contact";

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

          <Routes>
            {/* Public Routes with Navbar */}
            <Route
              element={
                <>
                  <Navbar />
                  <ScrollToTop />
                  <WhatsAppWidget />
                  <main className="relative z-10 w-full">
                    <Outlet />
                  </main>
                  <Footer />
                </>
              }
            >
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <ServicesSection />
                    <ProcessSection />
                    <PortfolioSection />
                    <TestimonialsSection />
                  </>
                }
              />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
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
              <Route path="clients" element={<ClientsList />} />
              <Route path="clients/:userId" element={<ClientDetail />} />
              <Route path="messages" element={<MessagesList />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
