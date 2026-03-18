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
    category: "Residential",
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
    title: "The Glass Tower",
    category: "Commercial",
    year: "2023",
    image: "/assets/generated/project2.dim_800x600.jpg",
    concept:
      "The Glass Tower redefines the corporate workplace as a beacon of transparency and ambition. Its high-performance curtain wall system maximises natural light penetration while optimising thermal performance. The tower's tapered form reduces wind load while creating a distinctive silhouette on the urban skyline — a landmark that communicates the client's forward-thinking values.",
    process:
      "The design process involved extensive parametric modelling to optimise facade geometry for both structural efficiency and solar control. Wind tunnel testing informed the final tower profile. Collaboration with sustainability engineers delivered a LEED Platinum-targeted building with rainwater harvesting, photovoltaic cladding panels, and a rooftop garden accessible to all occupants.",
    gallery: [
      "/assets/generated/project2.dim_800x600.jpg",
      "/assets/generated/project1.dim_800x600.jpg",
      "/assets/generated/project4.dim_800x600.jpg",
    ],
  },
  {
    id: 3,
    title: "Urban Sanctuary",
    category: "Interior Design",
    year: "2024",
    image: "/assets/generated/project3.dim_800x600.jpg",
    concept:
      "Urban Sanctuary transforms a high-rise penthouse into a haven of calm within the city's energy. The interior language draws from Japanese wabi-sabi philosophy — celebrating imperfection, natural materials, and meditative space. Travertine floors, hand-plastered walls, and bespoke furniture in natural linen create an environment that quiets the mind and restores the spirit.",
    process:
      "Extensive material sourcing expeditions informed a palette of artisanal materials — quarried travertine from Turkey, hand-blown glass from Murano, solid oak joinery from sustainable forests. Space planning prioritised views and natural light. Custom millwork drawings were developed in close collaboration with craftspeople, ensuring every built-in element met the exacting quality standards of the project.",
    gallery: [
      "/assets/generated/project3.dim_800x600.jpg",
      "/assets/generated/project1.dim_800x600.jpg",
      "/assets/generated/project2.dim_800x600.jpg",
    ],
  },
  {
    id: 4,
    title: "Cultural Nexus",
    category: "3D Visualization",
    year: "2023",
    image: "/assets/generated/project4.dim_800x600.jpg",
    concept:
      "Cultural Nexus is an immersive visualisation project for a proposed civic arts centre at the heart of a regenerating urban district. The design proposes a building that acts as a connector — between neighbourhoods, between disciplines, between tradition and innovation. Its parametric facade is inspired by traditional geometric patterns, reinterpreted through computational design.",
    process:
      "The visualisation was produced using a combination of Rhino/Grasshopper for form generation, V-Ray for photorealistic rendering, and Unreal Engine for real-time walkthroughs. Extensive post-processing in Photoshop and After Effects ensured each frame communicated the design intent with cinematic quality, supporting the client's planning application and stakeholder engagement campaign.",
    gallery: [
      "/assets/generated/project4.dim_800x600.jpg",
      "/assets/generated/project2.dim_800x600.jpg",
      "/assets/generated/project3.dim_800x600.jpg",
    ],
  },
];

interface ProjectsSectionProps {
  onProjectSelect: (project: Project) => void;
}

export function ProjectsSection({ onProjectSelect }: ProjectsSectionProps) {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="portfolio"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16 md:mb-24">
        <p className="animate-fade-up font-sans text-xs tracking-[0.3em] text-stone-700 uppercase mb-4">
          Selected Work
        </p>
        <h2 className="animate-fade-up delay-100 font-serif text-3xl md:text-5xl text-stone-950">
          Portfolio
        </h2>
        <div className="animate-fade-up delay-200 w-12 h-px bg-stone-400 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-300">
        {projects.map((project, i) => (
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
