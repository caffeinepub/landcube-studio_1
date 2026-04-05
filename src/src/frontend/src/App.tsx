import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { AdminPanel } from "./components/AdminPanel";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navigation } from "./components/Navigation";
import { ProjectDetail } from "./components/ProjectDetail";
import { ProjectsSection } from "./components/ProjectsSection";
import type { Project } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useIsAdmin } from "./hooks/useQueries";

const queryClient = new QueryClient();

function AppInner() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: isAdmin } = useIsAdmin();

  const handleAdminDashboard = () => {
    if (isAuthenticated && isAdmin) {
      setAdminPanelOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation onAdminDashboard={handleAdminDashboard} />

      <main>
        <HeroSection />
        <ProjectsSection onProjectSelect={setSelectedProject} />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
      <Toaster />

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {adminPanelOpen && isAdmin && (
        <AdminPanel onClose={() => setAdminPanelOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
