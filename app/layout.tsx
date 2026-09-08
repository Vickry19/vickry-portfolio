import type { Metadata } from "next";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

type SiteSettings = {
  seoTitle: string | null;
  seoDescription: string | null;
};

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await fetch(`${API_URL}/site-content`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return result.settings ?? null;
  } catch (error) {
    console.error("Site settings API error:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title =
    settings?.seoTitle ||
    "Vickry Kamaluddin — Web Developer";

  const description =
    settings?.seoDescription ||
    "Portfolio website of Vickry Kamaluddin, a web developer focused on building modern digital experiences.";

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "website",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}