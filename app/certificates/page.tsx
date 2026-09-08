"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

import CertificateCard from "@/components/CertificateCard";
import CertificateModal from "@/components/CertificateModal";

import {
  certificates,
  type Certificate,
} from "@/lib/certificates";

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [activeYear, setActiveYear] =
    useState("All");

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const categories = [
    "All",
    ...Array.from(
      new Set(certificates.map((item) => item.category))
    ),
  ];

  const years = [
    "All",
    ...Array.from(
      new Set(certificates.map((item) => item.year))
    ).sort((a, b) => Number(b) - Number(a)),
  ];

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const categoryMatch =
        activeCategory === "All" ||
        certificate.category === activeCategory;

      const yearMatch =
        activeYear === "All" ||
        certificate.year === activeYear;

      return categoryMatch && yearMatch;
    });
  }, [activeCategory, activeYear]);

  return (
    <main className="min-h-screen bg-[#070707] text-white">

      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <nav className="flex items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl">

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                V
              </div>

              <span className="hidden text-sm tracking-wide sm:block">
                VICKRY
              </span>
            </Link>

            <Link
              href="/#certificates"
              className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              <ArrowLeft size={15} />
              Back 
            </Link>

          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40 lg:px-8">

        <div className="futuristic-grid absolute inset-0 opacity-50" />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <p className="text-xs uppercase tracking-[0.35em] text-white/30">
            05 — Certificates
          </p>

          <h1 className="mt-8 max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-8xl lg:text-[110px]">
            LEARNING
            <br />
            <span className="text-white/30">
              NEVER
            </span>
            <br />
            STOPS.
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-8 text-white/40">
            A collection of certificates and learning
            achievements that represent my continuous
            development as a developer.
          </p>

        </div>
      </section>

      {/* Filter */}
      <section className="border-t border-white/5 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Categories */}
          <div className="flex flex-wrap gap-2">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                  activeCategory === category
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* Years */}
          <div className="flex flex-wrap gap-2">

            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setActiveYear(year)}
                className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                  activeYear === year
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}

          </div>

        </div>
      </section>

      {/* Certificates */}
      <section className="px-6 pb-32 pt-8 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-center justify-between">

            <p className="text-sm text-white/30">
              {filteredCertificates.length}{" "}
              {filteredCertificates.length === 1
                ? "certificate"
                : "certificates"}
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <AnimatePresence mode="popLayout">

              {filteredCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onPreview={setSelectedCertificate}
                />
              ))}

            </AnimatePresence>

          </div>

          {filteredCertificates.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-white/10">
              <p className="text-sm text-white/30">
                No certificates found.
              </p>
            </div>
          )}

        </div>

      </section>

      {/* Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-white/30 sm:flex-row">
          <span>
            © 2026 Vickry Kamaluddin
          </span>

          <span>
            Continuous learning.
          </span>
        </div>
      </footer>

    </main>
  );
}