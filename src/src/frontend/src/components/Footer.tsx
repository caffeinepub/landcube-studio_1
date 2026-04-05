import { Mail, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-stone-200 border-t border-stone-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pb-12 border-b border-stone-400">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-18-at-2.41.43-PM-1-1.jpeg"
                alt="Landcube Design Studio"
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="font-serif text-xl tracking-widest text-stone-950">
                LANDCUBE STUDIO
              </p>
            </div>
            <p className="font-sans text-sm text-stone-600 leading-relaxed max-w-xs">
              Architecture & Design practice committed to crafting spaces that
              inspire, endure, and transform the way people live and work.
            </p>
          </div>

          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-stone-600 mb-6">
              Contact
            </p>
            <div className="space-y-3 font-sans text-sm text-stone-700">
              <a
                href="mailto:landcube0@gmail.com"
                className="flex items-center gap-2 hover:text-stone-950 transition-colors"
              >
                <Mail size={14} />
                landcube0@gmail.com
              </a>
              <a
                href="tel:+971558336172"
                className="flex items-center gap-2 hover:text-stone-950 transition-colors"
              >
                <Phone size={14} />
                +971 55 833 6172
              </a>
              <a
                href="tel:+918296541957"
                className="flex items-center gap-2 hover:text-stone-950 transition-colors"
              >
                <Phone size={14} />
                +91 82965 41957
              </a>
              <a
                href="https://wa.me/971558336172"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs hover:bg-[#20b858] transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={13} fill="white" strokeWidth={0} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-stone-600">
          <p>© {year} Landcube Studio. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-950 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
