import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navigation } from "./components/Navigation";
import { ProjectDetail } from "./components/ProjectDetail";
import { ProjectsSection } from "./components/ProjectsSection";
import type { Project } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { WhatsAppButton } from "./components/WhatsAppButton";

const queryClient = new QueryClient();

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Navigation />

        <main>
          <HeroSection />
          <ProjectsSection onProjectSelect={setSelectedProject} />
          <AboutSection />
          <ServicesSection />
          <ContactSection />
        </main>

        <Footer />
        <WhatsAppButton />
        <Toaster />

        {/* Project Detail Overlay */}
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}
