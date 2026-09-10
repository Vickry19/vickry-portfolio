"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";

type HeroRole = {
  role: string;
};

type HeroData = {
  helloText: string | null;
  name: string | null;
  role: string | null;
  description: string | null;

  availabilityText: string | null;

  primaryButtonText: string | null;
  primaryButtonUrl: string | null;

  secondaryButtonText: string | null;
  secondaryButtonUrl: string | null;

  basedText: string | null;
  scrollText: string | null;

  profileImage: string | null;
  cvUrl: string | null;

  roles: HeroRole[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

export default function Hero() {
  const { settings } = useSite();
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    async function fetchHero() {
      try {
        const response = await fetch(`${API_URL}/hero`);

        if (!response.ok) {
          throw new Error("Failed to fetch hero");
        }

        const result = await response.json();

        setHero(result.data ?? null);
      } catch (error) {
        console.error("Hero API error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, []);

  useEffect(() => {
    if (!hero?.roles?.length) {
      return;
    }

    const interval = setInterval(() => {
      setRoleIndex((current) =>
        (current + 1) % hero.roles.length
      );
    }, 2800);

    return () => clearInterval(interval);
  }, [hero]);

  /*
  |--------------------------------------------------------------------------
  | Fallback
  |--------------------------------------------------------------------------
  */

  const helloText =
    hero?.helloText ?? "Hello, I'm";

  const name =
    hero?.name ?? "Vickry Kamaluddin.";

  const role =
    hero?.role ??
    "Web Developer & Informatics Student";

  const description =
    hero?.description ??
    "I build modern, responsive, and user-focused digital experiences using modern web technologies.";

  const availabilityText =
    hero?.availabilityText ??
    "Available for Internship & Freelance";

  const primaryButtonText =
    hero?.primaryButtonText ??
    "View Projects";

  const primaryButtonUrl =
    hero?.primaryButtonUrl ??
    "/#projects";

  const secondaryButtonText =
    hero?.secondaryButtonText ??
    "Download CV";

    const secondaryButtonUrl =
    hero?.cvUrl ??
    hero?.secondaryButtonUrl ??
    null;

  const basedText =
    hero?.basedText ??
    "Based in Indonesia";

  const scrollText =
    hero?.scrollText ??
    "Scroll to explore";

  const rotatingRoles =
    hero?.roles?.length
      ? hero.roles
      : [
          { role: "Web Developer" },
          { role: "React Developer" },
          { role: "Laravel Developer" },
          { role: "Full Stack Developer" },
          { role: "Informatics Student" },
          { role: "Mobile Developer" },
        ];

  const profileImage =
    hero?.profileImage ??
    "/images/profile/vickry.jpg";

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#111111] text-white"
    >

      {/* Background Grid */}
      <div className="absolute inset-0 futuristic-grid opacity-40" />

      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl" />


      {/* Main */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-24 pt-28 md:px-10 lg:px-16">

        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_420px]">

          {/* Left */}
          <div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
            >

              <span className="h-1.5 w-1.5 rounded-full bg-white" />

              <span className="text-xs text-white/55">
                {availabilityText}
              </span>

            </motion.div>


            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 text-sm text-white/40"
            >
              {helloText}
            </motion.p>


            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl"
            >
              {name}
            </motion.h1>


            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex min-h-8 items-center"
            >

              <AnimatePresence mode="wait">

                <motion.p
                  key={rotatingRoles[roleIndex]?.role}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="text-lg text-white/60 md:text-xl"
                >
                  {rotatingRoles[roleIndex]?.role}
                </motion.p>

              </AnimatePresence>

            </motion.div>


            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 max-w-2xl text-base leading-7 text-white/40 md:text-lg"
            >
              {description}
            </motion.p>


            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >

              <Link
                href={primaryButtonUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                {primaryButtonText}
                <ArrowUpRight size={16} />
              </Link>


              {secondaryButtonUrl && (
                <a
                  href={secondaryButtonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  {secondaryButtonText}
                </a>
              )}

            </motion.div>


            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 flex items-center gap-5"
            >

{settings?.githubUrl && (
  <a
    href={settings.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
    className="text-white/35 transition hover:text-white"
  >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.25 9.25 0 0 1 12 7.13c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
                </svg>
              </a>
              )}


{settings?.linkedinUrl && (
  <a
    href={settings.linkedinUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="text-white/35 transition hover:text-white"
  >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.2 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9.2h3.6V21H3.4V9.2Zm5.8 0h3.4v1.61h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4V21h-3.55v-5.88c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9.2V9.2Z" />
                </svg>
              </a>
)}

              <div className="h-4 w-px bg-white/10" />

              <div className="flex items-center gap-2 text-xs text-white/30">
                <MapPin size={13} />
                {basedText}
              </div>

            </motion.div>

          </div>


          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative mx-auto w-full max-w-[420px]"
          >

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#181818]">

              <div className="aspect-[4/5]">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-white/20">
                    Profile Image
                  </div>
                )}

              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />


              {/* Floating code */}
              <div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                <span className="font-mono text-xs text-white/50">
                  {"</>"}
                </span>
              </div>


              {/* Focus */}
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">

                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Focus
                </p>

                <p className="mt-1 text-sm text-white/70">
                  {role}
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>


      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >

        <a
          href="#about"
          className="group flex flex-col items-center gap-2"
        >

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/25 transition group-hover:text-white/50">
            {scrollText}
          </span>

          <ArrowDown
            size={15}
            className="text-white/25 transition group-hover:translate-y-1 group-hover:text-white/50"
          />

        </a>

      </motion.div>


      {/* Loading overlay */}
      {loading && (
        <div className="pointer-events-none absolute inset-0 bg-[#111111]/20" />
      )}

    </section>
  );
}