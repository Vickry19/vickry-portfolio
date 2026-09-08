const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const result = await response.json();

  return result.data;
}

export async function getProject(slug: string) {
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

  return result.data;
}

export async function getSiteContent() {
  const response = await fetch(
    `${API_URL}/site-content`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch site content");
  }

  const result = await response.json();

  return result.data;
}

export function getSection(
    sections: any[],
    key: string
  ) {
    return sections.find(
      (section) => section.key === key
    );
  }

export async function getHero() {
    const response = await fetch(`${API_URL}/hero`, {
      cache: "no-store",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch hero");
    }
  
    const result = await response.json();
  
    return result.data;
  }