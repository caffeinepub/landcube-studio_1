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
        <div className="animate-fade-up">
          {/* Our Story label */}
          <p className="font-sans text-xs tracking-[0.3em] text-stone-600 uppercase mb-6">
            Our Story
          </p>

          {/* About the Studio heading */}
          <h2 className="font-serif text-3xl md:text-5xl text-stone-950 mb-6">
            About the Studio
          </h2>
          <div className="w-12 h-px bg-stone-500 mb-10" />

          {/* Image */}
          <div className="relative overflow-hidden mb-12">
            <img
              src="/assets/uploads/0a40258e-3a6a-46eb-b8a7-77a9f8910fee-019d3d6c-1774-758a-acc6-d8b036bc7c1f-1.png"
              alt="Landcube Design Studio"
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 font-sans text-stone-700 leading-relaxed text-lg max-w-3xl">
            <p>
              LANDCUBE Design Studio is a creative and innovative architectural
              firm dedicated to transforming spaces with excellence and
              precision. With over 5 years of experience, we deliver
              sustainable, high-quality designs across residential, commercial,
              and public projects, crafting spaces that inspire and enhance
              human experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
