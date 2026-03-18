import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = el.querySelectorAll(".animate-fade-up, .animate-fade-in");
    for (const element of Array.from(elements)) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
