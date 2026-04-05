import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSubmitContact } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function ContactSection() {
  const sectionRef = useScrollAnimation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending, isError } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setForm({ name: "", email: "", phone: "", message: "" });
        },
      },
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 bg-stone-950 text-white"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 md:mb-24">
          <p className="animate-fade-up font-sans text-xs tracking-[0.3em] text-white/50 uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="animate-fade-up delay-100 font-serif text-3xl md:text-5xl text-white mb-6">
            Start a Project
          </h2>
          <div className="animate-fade-up delay-200 w-12 h-px bg-white/30 mx-auto" />
        </div>

        <div className="animate-fade-up delay-300 max-w-2xl mx-auto">
          {submitted ? (
            <div
              className="flex flex-col items-center gap-6 py-16 text-center"
              data-ocid="contact.success_state"
            >
              <CheckCircle size={48} className="text-white/60" />
              <h3 className="font-serif text-2xl text-white">Thank You</h3>
              <p className="font-sans text-white/60">
                We've received your message and will be in touch shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors border-b border-white/30 pb-0.5 mt-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-3 block"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-white/60 rounded-none h-12"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-3 block"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-white/60 rounded-none h-12"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-3 block"
                >
                  Phone Number
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+1 234 567 8900"
                  className="bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-white/60 rounded-none h-12"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 mb-3 block"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your project..."
                  rows={6}
                  className="bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-white/60 rounded-none resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              {isError && (
                <p
                  className="font-sans text-sm text-red-400"
                  data-ocid="contact.error_state"
                >
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-stone-950 font-sans text-xs tracking-[0.25em] uppercase py-4 hover:bg-stone-200 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                data-ocid="contact.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Start a Project"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
