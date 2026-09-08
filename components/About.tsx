"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/context/SiteContext";

type Statistic = {
  id: number;
  value: string | null;
  label: string | null;
  suffix: string | null;
};

type AboutData = {
  descriptionId: string | null;
  descriptionEn: string | null;
  statistics: Statistic[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

function AnimatedNumber({
  value,
  suffix,
}: {
  value: string;
  suffix?: string | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value, 10);

    if (Number.isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let current = 0;

    const duration = 900;
    const steps = Math.max(numericValue, 1);
    const incrementTime = duration / steps;

    const timer = setInterval(() => {
      current += 1;

      setDisplayValue(String(current));

      if (current >= numericValue) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function About() {
  const { sections } = useSite();

  const [about, setAbout] = useState<AboutData | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const section = sections.find(
    (item) => item.key === "about"
  );

  useEffect(() => {
    async function fetchAbout() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API_URL}/about`);

        if (!response.ok) {
          throw new Error("Failed to fetch about");
        }

        const result = await response.json();

        setAbout(result.data ?? null);
      } catch (error) {
        console.error("About API error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  /*
   * Fallback content
   * Digunakan jika API belum memiliki data.
   */
  const descriptionId =
    about?.descriptionId ||
    "Saya adalah web developer yang memiliki ketertarikan dalam membangun website modern, responsif, dan memiliki pengalaman pengguna yang baik. Saya senang mempelajari teknologi baru dan mengubah ide menjadi produk digital yang dapat digunakan.";

  const descriptionEn =
    about?.descriptionEn ||
    "I am a web developer interested in building modern, responsive websites with meaningful user experiences. I enjoy learning new technologies and turning ideas into useful digital products.";

  const fallbackStatistics: Statistic[] = [
    {
      id: 1,
      value: "3",
      label: "Projects Built",
      suffix: "+",
    },
    {
      id: 2,
      value: "4",
      label: "Technologies",
      suffix: "+",
    },
    {
      id: 3,
      value: "1",
      label: "Years Learning",
      suffix: "+",
    },
  ];

  const statistics =
    about?.statistics && about.statistics.length > 0
      ? about.statistics
      : fallbackStatistics;

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-[#111111] px-6 py-24 md:px-10 lg:px-16 lg:py-28"
    >
      {/* Background Grid */}
      <div className="futuristic-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[120px]" />

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
            {section?.number || "01"} —{" "}
            {section?.eyebrow || "About"}
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
            {section?.title || "About Me"}
          </h2>

          {section?.subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
              {section.subtitle}
            </p>
          )}
        </motion.div>

        {/* =========================
            CONTENT
        ========================== */}

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

          {/* =========================
              DESCRIPTION
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="space-y-6">
              {loading ? (
                <>
                  <div className="h-5 w-full animate-pulse rounded bg-white/5" />
                  <div className="h-5 w-11/12 animate-pulse rounded bg-white/5" />
                  <div className="h-5 w-4/5 animate-pulse rounded bg-white/5" />
                </>
              ) : error ? (
                <>
                  <p className="text-base leading-8 text-white/55">
                    {descriptionId}
                  </p>

                  <p className="text-sm leading-7 text-white/35">
                    {descriptionEn}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base leading-8 text-white/55">
                    {descriptionId}
                  </p>

                  <p className="text-sm leading-7 text-white/35">
                    {descriptionEn}
                  </p>
                </>
              )}
            </div>

            {/* Explore */}
            <a
              href="/#projects"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-xs font-medium text-white/60 transition-all duration-300 hover:border-white/25 hover:bg-white hover:text-black"
            >
              Explore my work

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* =========================
              STATISTICS
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-1"
          >
            {statistics.map((statistic) => (
              <div
                key={statistic.id}
                className="bg-[#181818] p-6 transition-colors duration-300 hover:bg-[#1b1b1b] sm:p-7 lg:p-8"
              >
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                  {statistic.value ? (
                    <AnimatedNumber
                      value={statistic.value}
                      suffix={statistic.suffix}
                    />
                  ) : (
                    "-"
                  )}
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                  {statistic.label || "Statistic"}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}