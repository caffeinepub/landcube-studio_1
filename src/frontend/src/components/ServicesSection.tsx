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
        <title>Residential Design</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    title: "Residential Design",
    description:
      "From intimate family homes to expansive private estates, we design residences that balance beauty with function — spaces you will love to inhabit for a lifetime.",
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
        <title>Commercial Design</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    ),
    title: "Commercial Design",
    description:
      "Workplaces, retail environments, and hospitality spaces designed to perform. We create commercial architecture that enhances productivity, brand identity, and human experience.",
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
      "Material, light, texture, and detail — our interior design service brings architecture to life from the inside out, creating environments that are as functional as they are beautiful.",
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
        <title>3D Visualisation</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    title: "3D Visualisation",
    description:
      "Photorealistic renders, immersive walkthroughs, and virtual reality experiences that communicate your design with clarity and conviction — supporting planning, marketing, and client approvals.",
  },
];

export function ServicesSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="services"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16 md:mb-24">
        <p className="animate-fade-up font-sans text-xs tracking-[0.3em] text-stone-600 uppercase mb-4">
          What We Offer
        </p>
        <h2 className="animate-fade-up delay-100 font-serif text-3xl md:text-5xl text-stone-950">
          Our Services
        </h2>
        <div className="animate-fade-up delay-200 w-12 h-px bg-stone-400 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-300">
        {services.map((service, i) => (
          <div
            key={service.title}
            className={`animate-fade-up bg-background p-10 lg:p-12 delay-${(i + 1) * 100}`}
          >
            <div className="text-stone-600 mb-8">{service.icon}</div>
            <h3 className="font-serif text-xl md:text-2xl text-stone-950 mb-4">
              {service.title}
            </h3>
            <div className="w-8 h-px bg-stone-400 mb-5" />
            <p className="font-sans text-sm text-stone-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
