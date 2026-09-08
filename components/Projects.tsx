"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";

type Project = {
  slug: string;
  number: string | null;
  title: string;
  category: string | null;
  year: string | null;
  description: string | null;
  coverImage: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  isFeatured: boolean;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

export default function Projects() {
  const { sections } = useSite();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const section = sections.find(
    (item) => item.key === "projects"
  );

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API_URL}/projects`);

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();

        setProjects(result.data ?? []);
      } catch (error) {
        console.error("Projects API error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  /*
   * Featured project ditentukan dari CMS.
   *
   * Jika ada project yang memiliki isFeatured = true,
   * project tersebut akan menjadi featured.
   *
   * Project lainnya tetap ditampilkan sebagai project biasa.
   */
  const featuredProject = projects.find(
    (project) => project.isFeatured
  );

  const otherProjects = projects.filter(
    (project) => !project.isFeatured
  );

  /*
   * Jika tidak ada featured project,
   * tampilkan maksimal 3 project biasa.
   *
   * Jika ada featured project,
   * tampilkan featured + maksimal 2 project lainnya.
   */
  const displayedProjects = featuredProject
    ? [featuredProject, ...otherProjects.slice(0, 2)]
    : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-white/10 bg-[#111111] px-6 py-24 md:px-10 lg:px-16 lg:py-28"
    >
      {/* Background Grid */}
      <div className="futuristic-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute right-[-180px] top-[20%] h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/35">
              {section?.number || "05"} —{" "}
              {section?.eyebrow || "Selected Work"}
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              {section?.title || "Projects"}
            </h2>

            {section?.subtitle && (
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
                {section.subtitle}
              </p>
            )}
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
          >
            View all projects

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

        </div>

        {/* =========================
            LOADING
        ========================== */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-[#181818] ${
                  item === 1 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`bg-white/5 ${
                    item === 1
                      ? "aspect-[2.4/1]"
                      : "aspect-[16/10]"
                  }`}
                />

                <div className="space-y-3 p-5 md:p-6">
                  <div className="h-3 w-24 rounded bg-white/10" />
                  <div className="h-6 w-2/3 rounded bg-white/10" />
                  <div className="h-4 w-full rounded bg-white/5" />
                  <div className="h-4 w-4/5 rounded bg-white/5" />
                </div>
              </div>
            ))}

          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}
        {!loading && error && (
          <div className="rounded-2xl border border-white/10 bg-[#181818] px-6 py-14 text-center">
            <p className="text-sm text-white/40">
              Unable to load projects right now.
            </p>
          </div>
        )}

        {/* =========================
            EMPTY
        ========================== */}
        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#181818] px-6 py-14 text-center">
              <p className="text-sm text-white/40">
                No projects available.
              </p>
            </div>
          )}

        {/* =========================
            PROJECTS
        ========================== */}
        {!loading &&
          !error &&
          displayedProjects.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">

              {displayedProjects.map((project, index) => {

                /*
                 * Hanya project yang benar-benar ditandai
                 * Featured dari CMS yang dibuat besar.
                 *
                 * Jika tidak ada featured project,
                 * card pertama tetap menjadi fallback visual.
                 */
                const isFeaturedLayout =
                  featuredProject
                    ? project.isFeatured
                    : index === 0;

                return (
                  <article
                    key={project.slug}
                    className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#181818] transition-all duration-500 hover:border-white/20 ${
                      isFeaturedLayout
                        ? "md:col-span-2"
                        : ""
                    }`}
                  >

                    {/* =========================
                        IMAGE
                    ========================== */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block overflow-hidden"
                    >
                      <div
                        className={`relative overflow-hidden bg-[#151515] ${
                          isFeaturedLayout
                            ? "aspect-[2.4/1]"
                            : "aspect-[16/10]"
                        }`}
                      >

                        {project.coverImage ? (
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/20">
                              No image
                            </span>
                          </div>
                        )}

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Project Number */}
                        {project.number && (
                          <span className="absolute right-5 top-5 text-[10px] uppercase tracking-[0.2em] text-white/50">
                            {project.number}
                          </span>
                        )}

                      </div>
                    </Link>

                    {/* =========================
                        CONTENT
                    ========================== */}
                    <div className="p-5 md:p-6">

                      {/* Meta */}
                      <div className="mb-4 flex items-center justify-between gap-4">

                        <div className="flex min-w-0 items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/35">

                          {project.category && (
                            <span className="truncate">
                              {project.category}
                            </span>
                          )}

                          {project.category &&
                            project.year && (
                              <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
                            )}

                          {project.year && (
                            <span>{project.year}</span>
                          )}

                        </div>

                        {/* Featured Badge */}
                        {project.isFeatured && (
                          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-white/30">
                            Featured
                          </span>
                        )}

                      </div>

                      {/* Title + Arrow */}
                      <div className="flex items-start justify-between gap-5">

                        <div className="min-w-0">

                          <Link
                            href={`/projects/${project.slug}`}
                            className="text-xl font-semibold tracking-[-0.02em] text-white transition-colors duration-300 hover:text-white/65 md:text-2xl"
                          >
                            {project.title}
                          </Link>

                          {project.description && (
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                              {project.description}
                            </p>
                          )}

                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white group-hover:text-black"
                          aria-label={`View ${project.title}`}
                        >
                          <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>

                      </div>

                      {/* =========================
                          ACTIONS
                      ========================== */}
                      <div className="mt-6 flex flex-wrap items-center gap-3">

                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:bg-white/90"
                        >
                          Case Study

                          <ArrowUpRight size={13} />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition-all duration-300 hover:border-white/25 hover:bg-white/5 hover:text-white"
                          >
                            Live Demo

                            <ArrowUpRight size={13} />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition-all duration-300 hover:border-white/25 hover:bg-white/5 hover:text-white"
                          >
                            GitHub

                            <ArrowUpRight size={13} />
                          </a>
                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

      </div>
    </section>
  );
}
