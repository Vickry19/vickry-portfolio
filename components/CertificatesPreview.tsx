"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

type Certificate = {
  id: number;
  title: string | null;
  issuer: string | null;
  issuedAt: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  file: string | null;
  fileType: string | null;
  description: string | null;
};

export default function CertificatesPreview() {
  const { sections } = useSite();

  const section = sections.find(
    (item) => item.key === "certificates"
  );

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/certificates`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch certificates");
        }

        const result = await response.json();

        setCertificates(result.data ?? []);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates.");
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  return (
    <section
      id="certificates"
      className="border-t border-white/10 bg-[#111111] px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-14 grid gap-8 md:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              {section?.number || "06"}
            </p>

            <p className="mt-2 text-sm text-white/50">
              {section?.eyebrow || "Certificates"}
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {section?.title || "Certificates"}
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
              Loading certificates...
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
        {!loading &&
          !error &&
          certificates.length === 0 && (
            <div className="border-y border-white/10 py-12">
              <p className="text-sm text-white/40">
                No certificates available.
              </p>
            </div>
          )}


        {/* Certificate List */}
        {!loading &&
          !error &&
          certificates.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {certificates.map((certificate, index) => (
                <article
                  key={certificate.id}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#151515] p-6 transition duration-300 hover:border-white/20 hover:bg-[#181818]"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-5">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <FileText
                        size={19}
                        strokeWidth={1.5}
                        className="text-white/50"
                      />
                    </div>

                    <span className="text-xs text-white/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>


                  {/* Content */}
                  <div className="mt-6">

                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {certificate.title || "Certificate"}
                    </h3>

                    {certificate.issuer && (
                      <p className="mt-2 text-sm text-white/45">
                        {certificate.issuer}
                      </p>
                    )}

                    {certificate.issuedAt && (
                      <p className="mt-1 text-xs text-white/30">
                        {certificate.issuedAt}
                      </p>
                    )}

                    {certificate.description && (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/40">
                        {certificate.description}
                      </p>
                    )}

                  </div>


                  {/* Credential */}
                  {certificate.credentialId && (
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/25">
                        Credential ID
                      </p>

                      <p className="mt-1 truncate text-xs text-white/40">
                        {certificate.credentialId}
                      </p>
                    </div>
                  )}


                  {/* Actions */}
                  {(certificate.file ||
                    certificate.credentialUrl) && (
                    <div className="mt-6 flex flex-wrap gap-2">

                      {certificate.file && (
                        <a
                          href={certificate.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/60 transition hover:bg-white/[0.08] hover:text-white"
                        >
                          View Certificate

                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.5}
                          />
                        </a>
                      )}

                      {certificate.credentialUrl && (
                        <a
                          href={certificate.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-white/40 transition hover:bg-white/[0.05] hover:text-white/70"
                        >
                          Credential

                          <ExternalLink
                            size={13}
                            strokeWidth={1.5}
                          />
                        </a>
                      )}

                    </div>
                  )}

                </article>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}