"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useSite } from "@/context/SiteContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { settings, sections } = useSite();

  /*
   * Section yang ditampilkan di navbar.
   * Urutan mengikuti sort_order dari CMS Laravel.
   */
  const allowedSections = [
    "about",
    "skills",
    "experience",
    "projects",
    "certificates",
  ];

  const links = sections
    .filter((section) => allowedSections.includes(section.key))
    .map((section) => ({
      name:
        section.title ||
        section.eyebrow ||
        section.key.charAt(0).toUpperCase() + section.key.slice(1),
      href: `/#${section.key}`,
    }));

  /*
   * Fallback supaya navbar tetap tampil
   * ketika API belum tersedia.
   */
  const fallbackLinks = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Certificates", href: "/#certificates" },
  ];

  const navigationLinks =
    links.length > 0 ? links : fallbackLinks;

  const logoText = settings?.logoText || "VICKRY";

  const cvUrl =
    settings?.cvUrl || "/cv/Vickry-Kamaluddin-CV.pdf";

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-7xl">
        <div className="border border-white/10 bg-[#151515]/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-5 md:px-7">

            {/* Logo */}
            <a
              href="/#home"
              onClick={handleLinkClick}
              className="group flex items-center gap-2"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-white">
                {logoText}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-7 md:flex">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium text-white/55 transition-colors hover:text-white"
                >
                  {link.name}
                </a>
              ))}

              {/* CV */}
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-xs font-medium text-white/70 transition-colors hover:text-white"
              >
                CV
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Let's Talk */}
              <a
                href="/#contact"
                className="group flex items-center gap-2 border border-white/20 px-4 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white hover:text-black"
              >
                Let&apos;s Talk

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center border border-white/10 text-white transition-colors hover:border-white/30 md:hidden"
              aria-label={
                isOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={18} strokeWidth={1.7} />
              ) : (
                <Menu size={18} strokeWidth={1.7} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
                className="overflow-hidden border-t border-white/10 md:hidden"
              >
                <div className="flex flex-col px-5 py-4">
                  {navigationLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      className="border-b border-white/5 py-4 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      <span className="flex items-center justify-between">
                        {link.name}

                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.7}
                          className="text-white/25"
                        />
                      </span>
                    </motion.a>
                  ))}

                  {/* Mobile CV */}
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center justify-between border-b border-white/5 py-4 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    CV

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.7}
                      className="text-white/25"
                    />
                  </a>

                  {/* Mobile Let's Talk */}
                  <a
                    href="/#contact"
                    onClick={handleLinkClick}
                    className="mt-4 flex items-center justify-center gap-2 border border-white/20 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
                  >
                    Let&apos;s Talk

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.7}
                    />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}