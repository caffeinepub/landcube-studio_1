import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bg = hero.querySelector(".hero-bg") as HTMLElement;
      if (bg) {
        bg.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPortfolio = () => {
    document
      .querySelector("#portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      <div className="hero-bg absolute inset-0 will-change-transform">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.jpg"
          alt="Architectural space"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="hero-eyebrow font-sans text-xs tracking-[0.35em] uppercase text-white/70 mb-6">
          Architecture & Design Studio
        </p>
        <h1 className="hero-headline font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-8">
          Landcube Studio
        </h1>
        <div className="hero-cta">
          <button
            type="button"
            onClick={scrollToPortfolio}
            className="inline-block border border-white/70 hover:bg-white hover:text-stone-950 text-white font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-400"
            data-ocid="hero.primary_button"
          >
            Explore Projects
          </button>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="font-sans text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown size={18} className="scroll-bounce" />
      </div>
    </section>
  );
}
