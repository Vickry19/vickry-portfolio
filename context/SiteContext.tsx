"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

export type SiteSettings = {
  siteName: string | null;
  logoText: string | null;
  email: string | null;
  whatsapp: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  cvUrl: string | null;
  profileImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  footerDescription: string | null;
  copyrightText: string | null;
};

export type SiteSection = {
  key: string;
  number: string | null;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
};

type SiteContextType = {
  settings: SiteSettings | null;
  sections: SiteSection[];
  loading: boolean;
  error: string | null;
};

const SiteContext = createContext<SiteContextType | undefined>(
  undefined
);

export function SiteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSiteContent() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/site-content`);

        if (!response.ok) {
          throw new Error("Failed to fetch site content");
        }

        const result = await response.json();

        setSettings(result.data?.settings ?? null);
        setSections(result.data?.sections ?? []);
      } catch (err) {
        console.error(err);
        setError("Failed to load site content");
      } finally {
        setLoading(false);
      }
    }

    fetchSiteContent();
  }, []);

  return (
    <SiteContext.Provider
      value={{
        settings,
        sections,
        loading,
        error,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error(
      "useSite must be used inside SiteProvider"
    );
  }

  return context;
}