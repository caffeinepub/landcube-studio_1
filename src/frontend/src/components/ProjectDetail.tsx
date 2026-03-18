import { ArrowLeft, X } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "./ProjectsSection";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="project-detail fixed inset-0 z-[100] bg-stone-50 overflow-y-auto"
      data-ocid="project.modal"
    >
      <div className="sticky top-0 z-10 bg-stone-50/95 backdrop-blur-sm border-b border-stone-300 flex items-center justify-between px-6 lg:px-12 h-16">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-stone-700 hover:text-stone-950 transition-colors"
          data-ocid="project.close_button"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-stone-700 hover:text-stone-950 transition-colors"
          aria-label="Close"
          data-ocid="project.cancel_button"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 px-6 lg:px-12 pb-10">
          <p className="font-sans text-xs tracking-[0.3em] text-white/60 uppercase mb-3">
            {project.category} · {project.year}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <section className="mb-20">
          <p className="font-sans text-xs tracking-[0.3em] text-stone-500 uppercase mb-6">
            01 — Concept
          </p>
          <div className="w-12 h-px bg-stone-400 mb-8" />
          <p className="font-sans text-stone-700 leading-relaxed text-lg">
            {project.concept}
          </p>
        </section>

        <section className="mb-20">
          <p className="font-sans text-xs tracking-[0.3em] text-stone-500 uppercase mb-6">
            02 — Design Process
          </p>
          <div className="w-12 h-px bg-stone-400 mb-8" />
          <p className="font-sans text-stone-700 leading-relaxed text-lg">
            {project.process}
          </p>
        </section>

        <section>
          <p className="font-sans text-xs tracking-[0.3em] text-stone-500 uppercase mb-6">
            03 — Gallery
          </p>
          <div className="w-12 h-px bg-stone-400 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-300">
            {project.gallery.map((img, i) => (
              <div
                key={`gallery-${project.id}-${i}`}
                className={`aspect-[4/3] overflow-hidden bg-stone-200 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <img
                  src={img}
                  alt={`${project.title} gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
