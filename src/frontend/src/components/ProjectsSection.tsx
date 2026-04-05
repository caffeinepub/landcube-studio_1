import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { data: backendProjects, isLoading } = useGetAllProjects();

  const projects: Project[] = (backendProjects ?? []).map(mapBackendProject);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  const goTo = (index: number) => {
    if (animating || index === currentIndex) return;
    setAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setAnimating(false), 500);
  };

  const prev = () => {
    if (filtered.length === 0) return;
    goTo((currentIndex - 1 + filtered.length) % filtered.length);
  };

  const next = () => {
    if (filtered.length === 0) return;
    goTo((currentIndex + 1) % filtered.length);
  };

  const safeIndex = Math.min(currentIndex, Math.max(filtered.length - 1, 0));

  return (
    <section
      id="portfolio"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36"
    >
      {/* Header */}
      <div className="text-center mb-12 md:mb-20 px-6 lg:px-12">
        <h2 className="animate-fade-up font-serif text-3xl md:text-5xl text-stone-950">
          Projects
        </h2>
        <div className="animate-fade-up delay-100 w-12 h-px bg-stone-400 mx-auto mt-6" />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 px-6 lg:px-12">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
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
        <div className="px-6 lg:px-12" data-ocid="projects.loading_state">
          <Skeleton className="w-full h-[70vh] bg-stone-200" />
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

      {/* Slider */}
      {!isLoading && filtered.length > 0 && (
        <div className="relative">
          {/* Slide container */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "75vh" }}
          >
            {filtered.map((project, i) => {
              const isActive = i === safeIndex;
              return (
                <div
                  key={project.id}
                  className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Text overlay - animates up when active */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8 md:p-16 transition-all duration-700 ease-out"
                    style={{
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(2rem)",
                      opacity: isActive ? 1 : 0,
                      transitionDelay: isActive ? "150ms" : "0ms",
                    }}
                  >
                    <p className="font-sans text-xs tracking-[0.25em] text-white/60 uppercase mb-2">
                      {project.category} · {project.year}
                    </p>
                    <h3 className="font-serif text-white text-3xl md:text-5xl mb-6">
                      {project.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onProjectSelect(project)}
                      className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 group"
                      data-ocid={`portfolio.item.${i + 1}`}
                    >
                      <span>View Project</span>
                      <div className="w-8 h-px bg-white/50 group-hover:w-12 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/30 text-white/70 hover:text-white hover:border-white/70 transition-all duration-300 bg-black/20 backdrop-blur-sm z-10"
                data-ocid="projects.pagination_prev"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/30 text-white/70 hover:text-white hover:border-white/70 transition-all duration-300 bg-black/20 backdrop-blur-sm z-10"
                data-ocid="projects.pagination_next"
                aria-label="Next project"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {filtered.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {filtered.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === safeIndex
                      ? "w-6 h-1.5 bg-stone-950"
                      : "w-1.5 h-1.5 bg-stone-300 hover:bg-stone-500"
                  }`}
                  data-ocid="projects.toggle"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
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
