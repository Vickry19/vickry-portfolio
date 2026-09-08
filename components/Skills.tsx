"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";

type Skill = {
  id: number;
  name: string;
  icon: string | null;
};

type SkillCategory = {
  id: number;
  name: string;
  skills: Skill[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

export default function Skills() {
  const { sections } = useSite();

  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const section = sections.find(
    (item) => item.key === "skills"
  );

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API_URL}/skills`);

        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        const result = await response.json();

        setCategories(result.data ?? []);
      } catch (error) {
        console.error("Skills API error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-white/10 bg-[#111111] px-6 py-24 md:px-10 lg:px-16 lg:py-28"
    >
      {/* Background Grid */}
      <div className="futuristic-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* =========================
            HEADER
        ========================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/35">
            {section?.number || "02"} —{" "}
            {section?.eyebrow || "Expertise"}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
            {section?.title || "Skills"}
          </h2>

          {section?.subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
              {section.subtitle}
            </p>
          )}
        </motion.div>

        {/* =========================
            LOADING
        ========================== */}

        {loading && (
          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse bg-[#181818] p-6 md:p-8"
              >
                <div className="h-4 w-28 rounded bg-white/10" />

                <div className="mt-7 flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((skill) => (
                    <div
                      key={skill}
                      className="h-9 w-24 rounded-full bg-white/5"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {!loading && error && (
          <div className="mt-14 rounded-2xl border border-white/10 bg-[#181818] px-6 py-14 text-center">
            <p className="text-sm text-white/40">
              Unable to load skills right now.
            </p>
          </div>
        )}

        {/* =========================
            EMPTY
        ========================== */}

        {!loading &&
          !error &&
          categories.length === 0 && (
            <div className="mt-14 rounded-2xl border border-white/10 bg-[#181818] px-6 py-14 text-center">
              <p className="text-sm text-white/40">
                No skills available.
              </p>
            </div>
          )}

        {/* =========================
            SKILLS
        ========================== */}

        {!loading &&
          !error &&
          categories.length > 0 && (
            <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: categoryIndex * 0.08,
                  }}
                  className="group bg-[#181818] p-6 transition-colors duration-300 hover:bg-[#1b1b1b] md:p-8"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
                      {category.name}
                    </h3>

                    <span className="text-[10px] text-white/20">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Skills */}
                  {category.skills.length > 0 ? (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="group/skill inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3.5 py-2.5 transition-all duration-300 hover:border-white/25 hover:bg-white hover:text-black"
                        >
                          {skill.icon && (
                            <span className="text-xs text-white/30 transition-colors group-hover/skill:text-black/50">
                              {skill.icon}
                            </span>
                          )}

                          <span className="text-xs text-white/55 transition-colors group-hover/skill:text-black">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-7 text-xs text-white/25">
                      No skills listed.
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}