import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { Project as BackendProject } from "../backend";
import { useGetAllProjects } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  concept: string;
  process: string;
  gallery: string[];
}

function mapBackendProject(p: BackendProject): Project {
  return {
    id: Number(p.id),
    title: p.title,
    category: p.category,
    year: p.year,
    image: p.coverImageId,
    concept: p.concept,
    process: p.process,
    gallery: p.galleryImageIds,
  };
}

const categories = [
  "All",
  "Residential buildings",
  "Interior",
  "Public",
  "Villas",
];

interface ProjectsSectionProps {
  onProjectSelect: (project: Project) => void;
}

export function ProjectsSection({ onProjectSelect }: ProjectsSectionProps) {
  const sectionRef = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: backendProjects, isLoading } = useGetAllProjects();

  const projects: Project[] = (backendProjects ?? []).map(mapBackendProject);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="text-center mb-12 md:mb-20">
        <h2 className="animate-fade-up font-serif text-3xl md:text-5xl text-stone-950">
          Projects
        </h2>
        <div className="animate-fade-up delay-100 w-12 h-px bg-stone-400 mx-auto mt-6" />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-stone-950 text-white border-stone-950"
                : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-600 hover:text-stone-900"
            }`}
            data-ocid="projects.filter.tab"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-300"
          data-ocid="projects.loading_state"
        >
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[4/3] bg-stone-200" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && projects.length === 0 && (
        <div
          className="flex items-center justify-center py-24 text-stone-400"
          data-ocid="projects.empty_state"
        >
          <p className="font-sans text-sm tracking-[0.2em] uppercase">
            No projects yet
          </p>
        </div>
      )}

      {/* Projects grid */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-300">
          {filtered.map((project, i) => (
            <button
              type="button"
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className={`animate-fade-up project-card relative overflow-hidden aspect-[4/3] bg-stone-200 cursor-pointer group text-left delay-${(i + 1) * 100}`}
              data-ocid={`portfolio.item.${i + 1}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <p className="font-sans text-xs tracking-[0.2em] text-white/60 uppercase mb-1">
                  {project.category}
                </p>
                <p className="font-serif text-white text-lg md:text-xl">
                  {project.title}
                </p>
              </div>
              <div className="project-overlay absolute inset-0 bg-stone-950/80 flex flex-col items-center justify-center gap-3">
                <p className="font-sans text-xs tracking-[0.25em] text-white/60 uppercase">
                  {project.category} · {project.year}
                </p>
                <p className="font-serif text-white text-2xl md:text-3xl">
                  {project.title}
                </p>
                <div className="w-8 h-px bg-white/50 mt-2" />
                <p className="font-sans text-xs tracking-[0.2em] text-white/60 uppercase mt-1">
                  View Project
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Filtered empty state */}
      {!isLoading && projects.length > 0 && filtered.length === 0 && (
        <div className="flex items-center justify-center py-16 text-stone-400">
          <p className="font-sans text-sm tracking-[0.2em] uppercase">
            No projects in this category
          </p>
        </div>
      )}
    </section>
  );
}

export { mapBackendProject };
