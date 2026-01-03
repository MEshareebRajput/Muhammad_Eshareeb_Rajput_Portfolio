import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'WordPress' | 'Shopify' | 'Marketing'   | 'Design' | 'Video';
  imageUrl: string;
  link: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Tech' | 'Marketing' | 'Design' | 'Video';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export enum RoutePath {
  HOME = '/',
  ABOUT = '/about',
  SKILLS = '/skills',
  EDUCATION = '/education',
  SERVICES = '/services',
  PORTFOLIO = '/portfolio',
  CONTACT = '/contact',
}
