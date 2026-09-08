"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import type { Certificate } from "@/lib/certificates";

type CertificateCardProps = {
  certificate: Certificate;
  onPreview: (certificate: Certificate) => void;
};

export default function CertificateCard({
  certificate,
  onPreview,
}: CertificateCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-white/25"
    >
      {/* Image */}
      <button
        type="button"
        onClick={() => onPreview(certificate)}
        className="relative block w-full cursor-zoom-in text-left"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-black">

          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/5" />

          {/* Number */}
          <span className="absolute left-5 top-5 text-xs text-white/70">
            {certificate.id}
          </span>

          {/* Open */}
          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/70 backdrop-blur transition-all duration-500 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={17} />
          </div>

        </div>
      </button>

      {/* Information */}
      <div className="p-7">

        <div className="flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-white/30">
            {certificate.category}
          </span>

          <span className="text-xs text-white/20">
            {certificate.year}
          </span>
        </div>

        <h2 className="mt-4 text-xl font-medium">
          {certificate.title}
        </h2>

        <p className="mt-2 text-sm text-white/40">
          {certificate.issuer}
        </p>

        <p className="mt-5 text-sm leading-6 text-white/30">
          {certificate.description}
        </p>

      </div>

      <div className="h-px w-0 bg-white transition-all duration-700 group-hover:w-full" />
    </motion.article>
  );
}