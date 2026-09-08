"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/context/SiteContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

type EducationItem = {
  id: number;
  period: string | null;
  degree: string | null;
  institution: string | null;
  description: string | null;
  focus: string | null;
};

export default function Education() {
  const { sections } = useSite();

  const section = sections.find(
    (item) => item.key === "education"
  );

  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEducation() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/education`);

        if (!response.ok) {
          throw new Error("Failed to fetch education");
        }

        const result = await response.json();

        setEducations(result.data ?? []);
      } catch (err) {
        console.error("Education API error:", err);
        setError("Failed to load education data.");
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  return (
    <section
      id="education"
      className="border-t border-white/10 bg-[#151515] px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-16 grid gap-8 md:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              {section?.number || "04"}
            </p>

            <p className="mt-2 text-sm text-white/50">
              {section?.eyebrow || "Education"}
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {section?.title || "Education"}
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
              Loading education...
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
          educations.length === 0 && (
            <div className="border-y border-white/10 py-12">
              <p className="text-sm text-white/40">
                No education data available.
              </p>
            </div>
          )}

        {/* =========================
            EDUCATION LIST
        ========================== */}

        {!loading &&
          !error &&
          educations.length > 0 && (
            <div className="border-y border-white/10">
              {educations.map((education) => (
                <article
                  key={education.id}
                  className="group grid gap-8 border-b border-white/10 py-10 last:border-b-0 md:grid-cols-[180px_1fr_40px]"
                >

                  {/* Period */}

                  <div>
                    <p className="text-sm text-white/40">
                      {education.period || "—"}
                    </p>
                  </div>

                  {/* Content */}

                  <div>
                    {education.degree && (
                      <h3 className="text-xl font-medium tracking-tight text-white">
                        {education.degree}
                      </h3>
                    )}

                    {education.institution && (
                      <p className="mt-2 text-base text-white/50">
                        {education.institution}
                      </p>
                    )}

                    {education.description && (
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/50">
                        {education.description}
                      </p>
                    )}

                    {education.focus && (
                      <div className="mt-5">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50">
                          Focus: {education.focus}
                        </span>
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