export type Project = {
    slug: string;
    number: string;
    title: string;
    category: string;
    year: string;
    description: string;
    longDescription: string;
    problem: string;
    solution: string;
    role: string;
    status: string;
    technologies: string[];
    features: string[];
    images: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
  
  export const projects: Project[] = [
    {
      slug: "nutriscan",
      number: "01",
      title: "NutriScan",
      category: "AI / Web Application",
      year: "2026",
  
      description:
        "An AI-powered web application designed to help users understand nutritional information from packaged food.",
  
      longDescription:
        "NutriScan explores how AI and image recognition can simplify the process of understanding food products. Users can scan food packaging and receive nutritional information through a simple and accessible interface.",
  
      problem:
        "Understanding nutritional information from packaged food can be difficult because labels often contain a large amount of information that is not immediately easy to interpret.",
  
      solution:
        "NutriScan provides a simple scanning experience that transforms food packaging information into easier-to-understand nutritional insights.",
  
      role: "Full Stack Developer",
  
      status: "Prototype",
  
      technologies: [
        "React",
        "TypeScript",
        "AI",
        "API",
      ],
  
      features: [
        "Food packaging scanning",
        "AI-powered analysis",
        "Nutritional information",
        "Responsive interface",
        "Simple user experience",
      ],
  
      images: [
        "/images/projects/nutriscan.png",
        "/images/projects/nutriscan.png",
        "/images/projects/nutriscan.png",
      ],

      githubUrl: "#",
      liveUrl: "#",
    },
  
    {
      slug: "architecture-wahyudi",
      number: "02",
      title: "Architecture Wahyudi",
      category: "Company Profile",
      year: "2026",
  
      description:
        "A professional company profile website for an architecture and construction business.",
  
      longDescription:
        "Architecture Wahyudi is a company profile website designed to establish a professional online presence and communicate the company's services, projects, and capabilities.",
  
      problem:
        "The company needed a professional digital presence where potential clients could easily understand its services and view completed projects.",
  
      solution:
        "A responsive company profile website was created with structured information, service sections, project showcases, and an interface designed to communicate the company's identity clearly.",
  
      role: "Web Developer",
  
      status: "Completed",
  
      technologies: [
        "Laravel",
        "Blade",
        "MySQL",
        "Tailwind CSS",
      ],
  
      features: [
        "Company profile",
        "Project showcase",
        "Service information",
        "Responsive design",
        "Content management",
      ],
  
      images: [
        "/images/projects/architecture-wahyudi.png",
        "/images/projects/architecture-wahyudi.png",
        "/images/projects/architecture-wahyudi.png",
      ],

      githubUrl: "#",
      liveUrl: "#",
    },
  
    {
      slug: "food-ordering",
      number: "03",
      title: "Food Ordering",
      category: "Mobile Application",
      year: "2026",
  
      description:
        "A modern food ordering application inspired by popular food delivery platforms.",
  
      longDescription:
        "Food Ordering is a mobile application concept focused on providing a simple end-to-end food ordering experience, from discovering menus to checkout and order history.",
  
      problem:
        "Users need a simple way to discover food, manage their cart, choose payment methods, and track previous orders without unnecessary complexity.",
  
      solution:
        "The application combines menu browsing, search, categories, cart management, checkout, payment selection, and order history into one streamlined experience.",
  
      role: "Mobile Developer",
  
      status: "Prototype",
  
      technologies: [
        "Flutter",
        "Dart",
        "Provider",
        "Firebase",
      ],
  
      features: [
        "Food menu",
        "Search and categories",
        "Shopping cart",
        "Checkout",
        "Payment method",
        "Order history",
      ],
  
      images: [
        "/images/projects/food-ordering.png",
        "/images/projects/food-ordering.png",
        "/images/projects/food-ordering.png",
      ],

      githubUrl: "#",
      liveUrl: "#",
    },
  ];