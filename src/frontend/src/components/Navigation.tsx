import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#portfolio" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-stone-50/95 backdrop-blur-sm shadow-xs border-b border-stone-300"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/WhatsApp-Image-2026-03-18-at-2.41.43-PM-1.jpeg"
            alt="Landcube Design Studio"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-serif text-lg md:text-xl tracking-widest text-stone-950 font-semibold hidden sm:block">
            LANDCUBE STUDIO
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="font-sans text-xs tracking-[0.2em] text-stone-700 hover:text-stone-950 transition-colors duration-200 uppercase"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-stone-950"
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-stone-50 border-t border-stone-300 px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-sans text-xs tracking-[0.2em] text-stone-700 hover:text-stone-950 text-left uppercase"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
