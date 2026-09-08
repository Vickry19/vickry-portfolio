"use client";

import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/context/SiteContext";

export default function Footer() {
  const { settings, sections } = useSite();

  const currentYear = new Date().getFullYear();

  const logoText = settings?.logoText || "VICKRY";

  const footerDescription =
    settings?.footerDescription ||
    "Web Developer focused on building modern, responsive, and meaningful digital experiences.";

  const copyright =
    settings?.copyrightText ||
    `© ${currentYear} ${logoText}. All rights reserved.`;

  /*
   * Navigation
   * Mengambil section dari CMS Laravel.
   */
  const allowedSections = [
    "about",
    "skills",
    "experience",
    "projects",
    "certificates",
    "contact",
  ];

  const navigationLinks = sections
    .filter((section) =>
      allowedSections.includes(section.key)
    )
    .map((section) => ({
      name:
        section.title ||
        section.eyebrow ||
        section.key.charAt(0).toUpperCase() +
          section.key.slice(1),
      href: `/#${section.key}`,
    }));

  /*
   * Fallback navigation
   * Digunakan ketika API belum mengembalikan sections.
   */
  const fallbackLinks = [
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Skills",
      href: "/#skills",
    },
    {
      name: "Experience",
      href: "/#experience",
    },
    {
      name: "Projects",
      href: "/#projects",
    },
    {
      name: "Certificates",
      href: "/#certificates",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];

  const links =
    navigationLinks.length > 0
      ? navigationLinks
      : fallbackLinks;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#151515]">
      {/* =========================
          BACKGROUND
      ========================== */}

      <div className="futuristic-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[140px]" />

      {/* =========================
          CONTENT
      ========================== */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* =========================
            MAIN FOOTER
        ========================== */}

        <div className="py-16 lg:py-20">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_0.6fr_0.7fr]">

            {/* =========================
                BRAND
            ========================== */}

            <div>
              <a
                href="/#home"
                className="group inline-block"
              >
                <span className="block text-5xl font-semibold tracking-[-0.06em] text-white transition-colors duration-300 sm:text-6xl lg:text-7xl">
                  {logoText}
                  <span className="text-white/20 transition-colors duration-300 group-hover:text-white/50">
                    .
                  </span>
                </span>
              </a>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                {footerDescription}
              </p>

              {/* =========================
                  SOCIAL
              ========================== */}

              <div className="mt-7 flex items-center gap-3">

                {/* GitHub */}
                {settings?.githubUrl && (
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-white/25 hover:bg-white hover:text-black"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.465-1.11-1.465-.908-.621.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.6 9.6 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
                    </svg>
                  </a>
                )}

                {/* LinkedIn */}
                {settings?.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-white/25 hover:bg-white hover:text-black"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V8.999h3.414v1.561h.046c.476-.9 1.637-1.849 3.37-1.849 3.602 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.555 20.452h3.563V8.999H3.555v11.453Z" />
                    </svg>
                  </a>
                )}

                {/* Instagram */}
                {settings?.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-white/25 hover:bg-white hover:text-black"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-300 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                      />

                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="0.8"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* =========================
                NAVIGATION
            ========================== */}

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                Navigation
              </p>

              <nav className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex w-fit items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}

                    <ArrowUpRight
                      size={13}
                      className="text-white/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50"
                    />
                  </a>
                ))}
              </nav>
            </div>

            {/* =========================
                CONNECT
            ========================== */}

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                Connect
              </p>

              <div className="mt-5 space-y-3">

                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="block break-all text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    {settings.email}
                  </a>
                )}

                {settings?.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    WhatsApp
                  </a>
                )}

                {settings?.location && (
                  <p className="text-sm text-white/30">
                    {settings.location}
                  </p>
                )}

                <a
                  href="/#contact"
                  className="group mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60 transition-colors duration-300 hover:text-white"
                >
                  Let&apos;s talk

                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            DIVIDER
        ========================== */}

        <div className="border-t border-white/10" />

        {/* =========================
            BOTTOM
        ========================== */}

        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-5 text-white/25">
            {copyright}
          </p>

          <a
            href="/#home"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white"
          >
            Back to top

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/25 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight
                size={12}
                className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}