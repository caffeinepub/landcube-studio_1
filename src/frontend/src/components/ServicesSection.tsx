import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const services = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
        aria-hidden="true"
      >
        <title>Architectural Design</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    title: "Architectural Design",
    description:
      "From concept to construction, we craft architecture that balances aesthetics with purpose — creating iconic structures that stand the test of time.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
        aria-hidden="true"
      >
        <title>3D Visualization & Rendering</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    title: "3D Visualization & Rendering",
    description:
      "Photorealistic renders and immersive visual experiences that communicate your design with clarity — supporting planning, marketing, and client approvals.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
        aria-hidden="true"
      >
        <title>Interior Design</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
        />
      </svg>
    ),
    title: "Interior Design",
    description:
      "Material, light, texture, and detail — our interior design service brings architecture to life from the inside out, creating environments that are functional and beautiful.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
        aria-hidden="true"
      >
        <title>Concept Development</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
    title: "Concept Development",
    description:
      "We translate your vision into a compelling architectural concept — exploring ideas, narratives, and spatial strategies that guide the entire design journey.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
        aria-hidden="true"
      >
        <title>Walkthrough Animation</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
        />
      </svg>
    ),
    title: "Walkthrough Animation",
    description:
      "Cinematic animated walkthroughs that immerse clients inside the design before it is built — delivering an unmatched sense of scale, atmosphere, and spatial experience.",
  },
];

export function ServicesSection() {
  const sectionRef = useScrollAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16 md:mb-24">
        <h2 className="animate-fade-up font-serif text-3xl md:text-5xl text-stone-950">
          Our Services
        </h2>
        <div className="animate-fade-up delay-100 w-12 h-px bg-stone-400 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-stone-300">
        {services.map((service, i) => (
          <div
            key={service.title}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`animate-fade-up relative overflow-hidden bg-background p-10 lg:p-12 delay-${(i + 1) * 100} transition-all duration-500 ease-out cursor-default ${
              hoveredIndex === i
                ? "bg-stone-950 text-white"
                : "bg-white text-stone-950"
            }`}
          >
            {/* Animated background fill */}
            <div
              className={`absolute inset-0 bg-stone-950 transition-transform duration-500 ease-out origin-bottom ${
                hoveredIndex === i ? "scale-y-100" : "scale-y-0"
              }`}
            />

            <div className="relative z-10">
              <div
                className={`mb-8 transition-colors duration-500 ${
                  hoveredIndex === i ? "text-stone-300" : "text-stone-600"
                }`}
              >
                {service.icon}
              </div>
              <h3
                className={`font-serif text-xl md:text-2xl mb-4 transition-colors duration-500 ${
                  hoveredIndex === i ? "text-white" : "text-stone-950"
                }`}
              >
                {service.title}
              </h3>
              <div
                className={`w-8 h-px mb-5 transition-colors duration-500 ${
                  hoveredIndex === i ? "bg-stone-500" : "bg-stone-400"
                }`}
              />
              <p
                className={`font-sans text-sm leading-relaxed transition-colors duration-500 ${
                  hoveredIndex === i ? "text-stone-300" : "text-stone-600"
                }`}
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
