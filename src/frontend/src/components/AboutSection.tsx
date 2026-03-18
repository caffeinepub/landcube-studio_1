import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function AboutSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 bg-stone-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <p className="font-sans text-xs tracking-[0.3em] text-stone-600 uppercase mb-6">
            Our Story
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-950 mb-6">
            About the Studio
          </h2>
          <div className="w-12 h-px bg-stone-500 mb-10" />

          <div className="space-y-6 font-sans text-stone-700 leading-relaxed text-lg">
            <p>
              LANDCUBE Design Studio is a creative and innovative architectural
              firm dedicated to transforming spaces with excellence and
              precision. With over 5 years of experience, we deliver
              sustainable, high-quality designs across residential, commercial,
              and public projects, crafting spaces that inspire and enhance
              human experience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-stone-400 pt-10">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "3", label: "Project Types" },
              { value: "100%", label: "Sustainable Focus" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl md:text-4xl text-stone-950 mb-1">
                  {stat.value}
                </p>
                <p className="font-sans text-xs tracking-[0.15em] text-stone-600 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
