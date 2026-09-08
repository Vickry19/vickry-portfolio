"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

type ExploringItem = {
  id: number;
  title: string | null;
  description: string | null;
  icon: string | null;
  label: string | null;
};

function getIcon(icon: string | null) {
  const value = icon?.toLowerCase();

  if (value === "ai" || value === "brain") {
    return BrainCircuit;
  }

  if (value === "code" || value === "development") {
    return Code2;
  }

  if (value === "layers" || value === "fullstack") {
    return Layers3;
  }

  return Sparkles;
}

export default function CurrentlyExploring() {
  const { sections } = useSite();

  const section = sections.find(
    (item) => item.key === "exploring"
  );

  const [items, setItems] = useState<ExploringItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExploring() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/exploring`);

        if (!response.ok) {
          throw new Error("Failed to fetch exploring items");
        }

        const result = await response.json();

        setItems(result.data ?? []);
      } catch (err) {
        console.error(err);
        setError("Failed to load exploring items.");
      } finally {
        setLoading(false);
      }
    }

    fetchExploring();
  }, []);

  return (
    <section
      id="exploring"
      className="border-t border-white/10 bg-[#151515] px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-14 grid gap-8 md:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              {section?.number || "07"}
            </p>

            <p className="mt-2 text-sm text-white/50">
              {section?.eyebrow || "Currently Exploring"}
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {section?.title || "Currently Exploring"}
            </h2>

            {section?.subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/50">
                {section.subtitle}
              </p>
            )}
          </div>
        </div>


        {/* Loading */}
        {loading && (
          <div className="border-y border-white/10 py-12">
            <p className="text-sm text-white/40">
              Loading...
            </p>
          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="border-y border-white/10 py-12">
            <p className="text-sm text-white/40">
              {error}
            </p>
          </div>
        )}


        {/* Empty */}
        {!loading && !error && items.length === 0 && (
          <div className="border-y border-white/10 py-12">
            <p className="text-sm text-white/40">
              No exploring items available.
            </p>
          </div>
        )}


        {/* Items */}
        {!loading && !error && items.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, index) => {
              const Icon = getIcon(item.icon);

              return (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#111111] p-6 transition duration-300 hover:border-white/20 hover:bg-[#181818]"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <Icon
                        size={19}
                        strokeWidth={1.5}
                        className="text-white/50 transition-colors duration-300 group-hover:text-white/80"
                      />
                    </div>

                    <span className="text-xs text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>


                  {/* Content */}
                  <div className="mt-7">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-lg font-medium tracking-tight text-white">
                        {item.title || "Exploring"}
                      </h3>

                      {item.label && (
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/35">
                          {item.label}
                        </span>
                      )}

                    </div>

                    {item.description && (
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                        {item.description}
                      </p>
                    )}

                  </div>


                  {/* Bottom */}
                  <div className="mt-8 flex justify-end border-t border-white/10 pt-4">
  <ArrowUpRight
    size={16}
    strokeWidth={1.5}
    className="text-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60"
  />
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