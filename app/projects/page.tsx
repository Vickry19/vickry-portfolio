import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects — Vickry Kamaluddin",
  description:
    "Selected projects and digital experiences developed by Vickry Kamaluddin.",
};

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

async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    return result.data ?? [];
  } catch (error) {
    console.error("Projects API error:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const featuredProject = projects.find(
    (project) => project.isFeatured
  );

  const otherProjects = projects.filter(
    (project) => !project.isFeatured
  );

  return (
    <main className="min-h-screen bg-[#111111] text-white">

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-16 pt-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mt-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/30">
              Selected Work
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Projects
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/45 md:text-lg">
              A selection of digital products, web applications,
              and experiences I have worked on.
            </p>
          </div>

        </div>
      </section>


      {/* Projects */}
      <section className="px-6 py-14 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">

          {projects.length === 0 ? (

            <div className="rounded-2xl border border-white/10 bg-[#181818] px-6 py-20 text-center">
              <p className="text-sm text-white/40">
                No projects available.
              </p>
            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2">

              {/* Featured */}
              {featuredProject && (
                <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#181818] transition-all duration-500 hover:border-white/20 md:col-span-2">

                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="block overflow-hidden"
                  >
                    <div className="relative aspect-[2.4/1] overflow-hidden bg-[#151515]">

                      {featuredProject.coverImage ? (
                        <img
                          src={featuredProject.coverImage}
                          alt={featuredProject.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-xs uppercase tracking-[0.2em] text-white/20">
                            No image
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {featuredProject.number && (
                        <span className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.2em] text-white/50">
                          {featuredProject.number}
                        </span>
                      )}

                    </div>
                  </Link>


                  <div className="p-6 md:p-8">

                    <div className="mb-4 flex items-center justify-between gap-4">

                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/35">

                        {featuredProject.category && (
                          <span>
                            {featuredProject.category}
                          </span>
                        )}

                        {featuredProject.category &&
                          featuredProject.year && (
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                          )}

                        {featuredProject.year && (
                          <span>
                            {featuredProject.year}
                          </span>
                        )}

                      </div>

                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-white/30">
                        Featured
                      </span>

                    </div>


                    <div className="flex items-start justify-between gap-6">

                      <div className="min-w-0">

                        <Link
                          href={`/projects/${featuredProject.slug}`}
                          className="text-2xl font-semibold tracking-[-0.025em] text-white transition hover:text-white/65 md:text-3xl"
                        >
                          {featuredProject.title}
                        </Link>

                        {featuredProject.description && (
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/40">
                            {featuredProject.description}
                          </p>
                        )}

                      </div>

                      <Link
                        href={`/projects/${featuredProject.slug}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white group-hover:text-black"
                        aria-label={`View ${featuredProject.title}`}
                      >
                        <ArrowUpRight size={18} />
                      </Link>

                    </div>


                    <div className="mt-6 flex flex-wrap gap-3">

                      <Link
                        href={`/projects/${featuredProject.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
                      >
                        Case Study
                        <ArrowUpRight size={13} />
                      </Link>

                      {featuredProject.liveUrl && (
                        <a
                          href={featuredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                        >
                          Live Demo
                          <ArrowUpRight size={13} />
                        </a>
                      )}

                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                        >
                          GitHub
                          <ArrowUpRight size={13} />
                        </a>
                      )}

                    </div>

                  </div>

                </article>
              )}


              {/* Other Projects */}
              {otherProjects.map((project) => (

                <article
                  key={project.slug}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#181818] transition-all duration-500 hover:border-white/20"
                >

                  <Link
                    href={`/projects/${project.slug}`}
                    className="block overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#151515]">

                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-xs uppercase tracking-[0.2em] text-white/20">
                            No image
                          </span>
                        </div>
                      )}

                      {project.number && (
                        <span className="absolute right-5 top-5 text-[10px] uppercase tracking-[0.2em] text-white/50">
                          {project.number}
                        </span>
                      )}

                    </div>
                  </Link>


                  <div className="p-5 md:p-6">

                    <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/35">

                      {project.category && (
                        <span>
                          {project.category}
                        </span>
                      )}

                      {project.category &&
                        project.year && (
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                        )}

                      {project.year && (
                        <span>
                          {project.year}
                        </span>
                      )}

                    </div>


                    <div className="flex items-start justify-between gap-5">

                      <div className="min-w-0">

                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-xl font-semibold tracking-[-0.02em] text-white transition hover:text-white/65 md:text-2xl"
                        >
                          {project.title}
                        </Link>

                        {project.description && (
                          <p className="mt-3 text-sm leading-6 text-white/40">
                            {project.description}
                          </p>
                        )}

                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white group-hover:text-black"
                        aria-label={`View ${project.title}`}
                      >
                        <ArrowUpRight size={17} />
                      </Link>

                    </div>


                    <div className="mt-6 flex flex-wrap gap-3">

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
                      >
                        Case Study
                        <ArrowUpRight size={13} />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
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
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                        >
                          GitHub
                          <ArrowUpRight size={13} />
                        </a>
                      )}

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
      </section>


      {/* Bottom Navigation */}
      <section className="border-t border-white/10 px-6 py-10 md:px-10 lg:px-16">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <Link
            href="/"
            className="text-sm text-white/45 transition hover:text-white"
          >
            Home
          </Link>

        </div>

      </section>

    </main>
  );
}