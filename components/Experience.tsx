"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/context/SiteContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

type ExperienceItem = {
  id: number;
  period: string | null;
  position: string | null;
  organization: string | null;
  description: string | null;
  technologies: string | null;
};

export default function Experience() {
  const { sections } = useSite();

  const section = sections.find(
    (item) => item.key === "experience"
  );

  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/experience`);

        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }

        const result = await response.json();

        setExperiences(result.data ?? []);
      } catch (err) {
        console.error("Experience API error:", err);
        setError("Failed to load experience data.");
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="border-t border-white/10 bg-[#111111] px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-16 grid gap-8 md:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              {section?.number || "03"}
            </p>

            <p className="mt-2 text-sm text-white/50">
              {section?.eyebrow || "Experience"}
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {section?.title || "Experience"}
            </h2>

            {section?.subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/50">
                {section.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* =========================
            LOADING
        ========================== */}

        {loading && (
          <div className="border-y border-white/10 py-12">
            <p className="text-sm text-white/40">
              Loading experience...
            </p>
          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {!loading && error && (
          <div className="border-y border-white/10 py-12">
            <p className="text-sm text-white/40">
              {error}
            </p>
          </div>
        )}

        {/* =========================
            EMPTY
        ========================== */}

        {!loading &&
          !error &&
          experiences.length === 0 && (
            <div className="border-y border-white/10 py-12">
              <p className="text-sm text-white/40">
                No experience available.
              </p>
            </div>
          )}

        {/* =========================
            EXPERIENCE LIST
        ========================== */}

        {!loading &&
          !error &&
          experiences.length > 0 && (
            <div className="border-y border-white/10">
              {experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="group grid gap-8 border-b border-white/10 py-10 last:border-b-0 md:grid-cols-[180px_1fr_40px]"
                >

                  {/* Period */}

                  <div>
                    <p className="text-sm text-white/40">
                      {experience.period || "—"}
                    </p>
                  </div>

                  {/* Content */}

                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {experience.position && (
                        <h3 className="text-xl font-medium tracking-tight text-white">
                          {experience.position}
                        </h3>
                      )}

                      {experience.organization && (
                        <>
                          {experience.position && (
                            <span className="text-white/20">
                              —
                            </span>
                          )}

                          <span className="text-base text-white/50">
                            {experience.organization}
                          </span>
                        </>
                      )}
                    </div>

                    {experience.description && (
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/50">
                        {experience.description}
                      </p>
                    )}

                    {experience.technologies && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {experience.technologies
                          .split(",")
                          .map((technology) => technology.trim())
                          .filter(Boolean)
                          .map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50"
                            >
                              {technology}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}

                  <div className="hidden md:flex md:justify-end">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="text-white/20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60"
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}