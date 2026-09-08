export type Certificate = {
    id: string;
    title: string;
    issuer: string;
    year: string;
    category: string;
    description: string;
    image: string;
    credentialUrl?: string;
  };
  
  export const certificates: Certificate[] = [
    {
      id: "01",
      title: "Certificate of Completion",
      issuer: "Dicoding Indonesia",
      year: "2026",
      category: "Web Development",
      description:
        "Certificate earned after completing a web development learning program.",
      image: "/images/certificates/certificate-1.png",
      credentialUrl: "#",
    },
  
    {
      id: "02",
      title: "Web Development Certificate",
      issuer: "Online Learning Platform",
      year: "2026",
      category: "Development",
      description:
        "Certificate recognizing completion of a web development course.",
      image: "/images/certificates/certificate-2.png",
      credentialUrl: "#",
    },
  
    {
      id: "03",
      title: "Programming Certificate",
      issuer: "Online Learning Platform",
      year: "2025",
      category: "Programming",
      description:
        "Certificate obtained after completing a programming course.",
      image: "/images/certificates/certificate-3.png",
      credentialUrl: "#",
    },
  ];