export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  imageUrl: string;
  description: string;
  challenge: string;
  solution: string;
  gallery: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export type Theme = "light" | "dark";
