export interface Project {
  id: string;
  title: string;
  category: 'Commercial' | 'Residential' | 'Emergency' | 'Drain & Pipe';
  location: string;
  summary: string;
  duration: string;
  image: string;
  client: string;
  fullDescription: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  type: 'text' | 'video';
  comment?: string;
  rating: number;
  image?: string;
  avatar?: string;
  videoDuration?: string;
  videoSnippet?: string;
  date: string;
  serviceUsed: string;
}

export interface PlumbingService {
  id: string;
  title: string;
  description: string;
  features: string[];
  startingPrice: string;
  estimatedTime: string;
  iconName: string;
  badge?: string;
}
