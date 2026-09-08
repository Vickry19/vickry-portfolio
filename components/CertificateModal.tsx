"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";

import type { Certificate } from "@/lib/certificates";

type CertificateModalProps = {
  certificate: Certificate | null;
  onClose: () => void;
};

export default function CertificateModal({
  certificate,
  onClose,
}: CertificateModalProps) {
  if (!certificate) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-3xl border border-white/10 bg-[#0b0b0b] p-3 sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate preview"
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 backdrop-blur transition hover:bg-white hover:text-black"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between gap-6 px-2 pb-2 pt-6 sm:flex-row sm:items-center">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/30">
              {certificate.category} · {certificate.year}
            </p>

            <h2 className="mt-2 text-xl font-medium">
              {certificate.title}
            </h2>

            <p className="mt-1 text-sm text-white/40">
              {certificate.issuer}
            </p>
          </div>

          {certificate.credentialUrl &&
            certificate.credentialUrl !== "#" && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
              >
                Verify Credential
                <ExternalLink size={15} />
              </a>
            )}

        </div>

      </div>
    </div>
  );
}