import { useState } from "react";
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

const projects: Project[] = [
  {
    id: 1,
    title: "Villa Serenity",
    category: "Villas",
    year: "2024",
    image: "/assets/generated/project1.dim_800x600.jpg",
    concept:
      "Villa Serenity is a study in the interplay of light and materiality. Nestled against a hillside, the design responds to its natural surroundings through sweeping overhangs, extensive glazing, and a palette of raw concrete, timber, and stone. Each space is crafted to dissolve the boundary between inside and outside, inviting nature to become part of the living experience.",
    process:
      "Beginning with a deep analysis of site topography and solar orientation, the design evolved through iterative physical models and digital simulations. Material selection was guided by tactile experience and longevity. Structural collaboration allowed for column-free spans that maximize panoramic views. Interior finishes were specified alongside the architecture, ensuring a seamless continuity from envelope to interior detail.",
    gallery: [
      "/assets/generated/project1.dim_800x600.jpg",
      "/assets/generated/project3.dim_800x600.jpg",
      "/assets/generated/project4.dim_800x600.jpg",
    ],
  },
  {
    id: 2,
    title: "The Horizon Residence",
    category: "Residential buildings",
    year: "2023",
    image: "/assets/generated/project2.dim_800x600.jpg",
    concept:
      "The Horizon Residence redefines modern living with a bold interplay of form and function. Its façade celebrates transparency and ambition, maximising natural light while optimising thermal performance. The building's refined form creates a distinctive presence — a landmark that communicates the client's forward-thinking values.",
    process:
      "The design process involved extensive parametric modelling to optimise facade geometry for both structural efficiency and solar control. Collaboration with sustainability engineers delivered a high-performance building with rainwater harvesting and a rooftop garden accessible to all occupants.",
    gallery: [
      "/assets/generated/project2.dim_800x600.jpg",
      "/assets/generated/project1.dim_800x600.jpg",
      "/assets/generated/project4.dim_800x600.jpg",
    ],
  },
  {
    id: 3,
    title: "Urban Sanctuary",
    category: "Interior",
    year: "2024",
    image: "/assets/generated/project3.dim_800x600.jpg",
    concept:
      "Urban Sanctuary transforms a high-rise penthouse into a haven of calm within the city's energy. The interior language draws from Japanese wabi-sabi philosophy — celebrating imperfection, natural materials, and meditative space.",
    process:
      "Extensive material sourcing expeditions informed a palette of artisanal materials — quarried travertine, hand-blown glass, and solid oak joinery from sustainable forests. Custom millwork drawings were developed in close collaboration with craftspeople.",
    gallery: [
      "/assets/generated/project3.dim_800x600.jpg",
      "/assets/generated/project1.dim_800x600.jpg",
      "/assets/generated/project2.dim_800x600.jpg",
    ],
  },
  {
    id: 4,
    title: "Cultural Nexus",
    category: "Public",
    year: "2023",
    image: "/assets/generated/project4.dim_800x600.jpg",
    concept:
      "Cultural Nexus is a civic arts centre at the heart of a regenerating urban district. The design proposes a building that acts as a connector — between neighbourhoods, between disciplines, between tradition and innovation.",
    process:
      "The design involved extensive parametric modelling, wind analysis, and sustainability planning. Its parametric facade is inspired by traditional geometric patterns, reinterpreted through computational design, supporting the community's planning and stakeholder engagement.",
    gallery: [
      "/assets/generated/project4.dim_800x600.jpg",
      "/assets/generated/project2.dim_800x600.jpg",
      "/assets/generated/project3.dim_800x600.jpg",
    ],
  },
];

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
        <p className="animate-fade-up font-sans text-xs tracking-[0.3em] text-stone-700 uppercase mb-4">
          Selected Work
        </p>
        <h2 className="animate-fade-up delay-100 font-serif text-3xl md:text-5xl text-stone-950">
          Projects
        </h2>
        <div className="animate-fade-up delay-200 w-12 h-px bg-stone-400 mx-auto mt-6" />
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
          >
            {cat}
          </button>
        ))}
      </div>

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
    </section>
  );
}

export { projects };
