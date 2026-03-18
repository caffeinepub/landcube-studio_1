import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/15550123456"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-pulse fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20b858] transition-colors duration-300"
      aria-label="Chat on WhatsApp"
      data-ocid="contact.button"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
