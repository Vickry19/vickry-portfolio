import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

type Project = {
  slug: string;
  number: string | null;
  title: string;
  category: string | null;
  year: string | null;
  description: string | null;
  longDescription: string | null;
  problem: string | null;
  solution: string | null;
  role: string | null;
  status: string | null;
  technologies: string[];
  features: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  coverImage: string | null;
  images: string[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(
      `${API_URL}/projects/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return result.data ?? null;
  } catch {
    return null;
  }
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/*
|--------------------------------------------------------------------------
| Dynamic SEO Metadata
|--------------------------------------------------------------------------
*/

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found — Vickry Portfolio",
      description:
        "The requested project could not be found.",
    };
  }

  const title = `${project.title} — Vickry Kamaluddin`;

  const description =
    project.description ||
    project.longDescription ||
    `Explore ${project.title}, a project developed by Vickry Kamaluddin.`;

  const metadata: Metadata = {
    title,
    description,
  };

  /*
   * Open Graph
   */
  if (project.coverImage) {
    metadata.openGraph = {
      title,
      description,
      type: "website",
      images: [
        {
          url: project.coverImage,
          alt: project.title,
        },
      ],
    };

    /*
     * Twitter Card
     */
    metadata.twitter = {
      card: "summary_large_image",
      title,
      description,
      images: [project.coverImage],
    };
  } else {
    metadata.openGraph = {
      title,
      description,
      type: "website",
    };

    metadata.twitter = {
      card: "summary",
      title,
      description,
    };
  }

  return metadata;
}

export default async function ProjectDetail({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = await getProject(slug);
  const heroImage =
  project?.coverImage ||
  project?.images?.[0] ||
  null;

  if (!project) {
    return (
      <main className="min-h-screen bg-[#111111] px-6 py-24 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">

          <Link
            href="/#projects/"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mt-20 rounded-2xl border border-white/10 bg-[#181818] px-6 py-16 text-center">
            <h1 className="text-2xl font-semibold">
              Project Not Found
            </h1>

            <p className="mt-3 text-sm text-white/40">
              The project you're looking for doesn't exist or is no longer available.
            </p>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white">

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-12 pt-28 md:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>

              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/35">

                {project.number && (
                  <span>{project.number}</span>
                )}

                {project.category && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>{project.category}</span>
                  </>
                )}

                {project.year && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>{project.year}</span>
                  </>
                )}

              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                {project.title}
              </h1>

              {project.description && (
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/50 md:text-lg">
                  {project.description}
                </p>
              )}

            </div>

            <div className="flex flex-wrap gap-3">

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Live Demo
                  <ArrowUpRight size={16} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  GitHub
                  <ArrowUpRight size={16} />
                </a>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Cover */}
{heroImage && (
  <section className="px-6 py-10 md:px-10 lg:px-16">

    <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#181818]">

      <div className="aspect-[2.2/1]">

        <img
          src={heroImage}
          alt={project.title}
          className="h-full w-full object-cover"
        />

      </div>

    </div>

  </section>
)}

      {/* Main Content */}
      <section className="px-6 py-14 md:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* Content */}
            <div className="space-y-14">

              {/* Overview */}
              {project.longDescription && (
                <div>

                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                    Overview
                  </p>

                  <p className="max-w-3xl text-base leading-8 text-white/60">
                    {project.longDescription}
                  </p>

                </div>
              )}

              {/* Problem & Solution */}
              {(project.problem || project.solution) && (
                <div className="grid gap-10 md:grid-cols-2">

                  {project.problem && (
                    <div>

                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                        Problem
                      </p>

                      <p className="text-sm leading-7 text-white/50">
                        {project.problem}
                      </p>

                    </div>
                  )}

                  {project.solution && (
                    <div>

                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                        Solution
                      </p>

                      <p className="text-sm leading-7 text-white/50">
                        {project.solution}
                      </p>

                    </div>
                  )}

                </div>
              )}

              {/* Features */}
              {project.features.length > 0 && (
                <div>

                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                    Key Features
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">

                    {project.features.map((feature) => (

                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#181818] px-4 py-4"
                      >

                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10">
                          <Check size={12} />
                        </span>

                        <span className="text-sm leading-6 text-white/55">
                          {feature}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>
              )}

              {/* Gallery */}
              {project.images.length > 0 && (
                <div>

                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                    Project Gallery
                  </p>

                  <div className="grid gap-5 md:grid-cols-2">

                    {project.images.map((image, index) => (

                      <div
                        key={`${image}-${index}`}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818]"
                      >

                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="h-auto w-full object-cover"
                        />

                      </div>

                    ))}

                  </div>

                </div>
              )}

            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">

              <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">

                <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                  Project Details
                </p>

                <dl className="space-y-5">

                  {project.role && (
                    <div>
                      <dt className="text-xs text-white/30">
                        Role
                      </dt>

                      <dd className="mt-1 text-sm text-white/70">
                        {project.role}
                      </dd>
                    </div>
                  )}

                  {project.status && (
                    <div>
                      <dt className="text-xs text-white/30">
                        Status
                      </dt>

                      <dd className="mt-1 text-sm text-white/70">
                        {project.status}
                      </dd>
                    </div>
                  )}

                  {project.year && (
                    <div>
                      <dt className="text-xs text-white/30">
                        Year
                      </dt>

                      <dd className="mt-1 text-sm text-white/70">
                        {project.year}
                      </dd>
                    </div>
                  )}

                </dl>

                {project.technologies.length > 0 && (
                  <div className="mt-7 border-t border-white/10 pt-6">

                    <p className="mb-4 text-xs text-white/30">
                      Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {project.technologies.map((technology) => (

                        <span
                          key={technology}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/55"
                        >
                          {technology}
                        </span>

                      ))}

                    </div>

                  </div>
                )}

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* Bottom Navigation */}
      <section className="border-t border-white/10 px-6 py-10 md:px-10 lg:px-16">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          <Link
            href="/"
            className="text-sm text-white/45 transition hover:text-white"
          >
            Back to Home
          </Link>

        </div>

      </section>

    </main>
  );
}