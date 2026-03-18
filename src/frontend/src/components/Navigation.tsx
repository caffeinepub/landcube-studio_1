import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#portfolio" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "CONTACT", href: "#contact" },
];

interface NavigationProps {
  onAdminDashboard?: () => void;
}

export function Navigation({ onAdminDashboard }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: isAdmin } = useIsAdmin();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dialog after successful login
  useEffect(() => {
    if (isAuthenticated) {
      setLoginDialogOpen(false);
    }
  }, [isAuthenticated]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    setLoginDialogOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-stone-50/95 backdrop-blur-sm shadow-xs border-b border-stone-300"
            : "bg-white/80 backdrop-blur-sm"
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
                  className="font-sans text-xs tracking-[0.2em] text-stone-950 hover:text-stone-600 transition-colors duration-200 uppercase font-semibold"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {!isInitializing && !isAuthenticated && (
              <button
                type="button"
                onClick={() => setLoginDialogOpen(true)}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-stone-600 transition-colors duration-200"
                data-ocid="nav.admin.button"
              >
                Admin
              </button>
            )}
            {isAuthenticated && isAdmin && (
              <button
                type="button"
                onClick={onAdminDashboard}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-800 transition-colors duration-200 border-b border-stone-300 pb-px"
                data-ocid="nav.dashboard.button"
              >
                Dashboard
              </button>
            )}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-stone-600 transition-colors duration-200"
                data-ocid="nav.logout.button"
              >
                Logout
              </button>
            )}
          </div>

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
                className="font-sans text-xs tracking-[0.2em] text-stone-950 hover:text-stone-600 text-left uppercase font-semibold"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setLoginDialogOpen(true);
                }}
                className="font-sans text-xs tracking-[0.2em] text-stone-400 hover:text-stone-600 text-left uppercase"
                data-ocid="nav.admin.button"
              >
                Admin Login
              </button>
            )}
            {isAuthenticated && isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onAdminDashboard?.();
                }}
                className="font-sans text-xs tracking-[0.2em] text-stone-500 hover:text-stone-800 text-left uppercase"
                data-ocid="nav.dashboard.button"
              >
                Dashboard
              </button>
            )}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="font-sans text-xs tracking-[0.2em] text-stone-400 hover:text-stone-600 text-left uppercase"
                data-ocid="nav.logout.button"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent
          className="max-w-sm bg-stone-50 border-stone-200 rounded-none"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-stone-950 tracking-wide">
              Admin Access
            </DialogTitle>
            <DialogDescription className="font-sans text-sm text-stone-500">
              Sign in with Internet Identity to access the admin dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-stone-950 text-white font-sans text-xs tracking-[0.25em] uppercase py-3.5 hover:bg-stone-800 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
              data-ocid="admin.login.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Connecting...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
