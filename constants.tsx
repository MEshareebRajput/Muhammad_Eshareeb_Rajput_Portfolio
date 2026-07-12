import { 
  ShoppingBag, 
  BarChart, 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram, 
  Mail,
  Smartphone
} from 'lucide-react';
import { Project, Skill, Service, Experience, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Muhammad Eshareeb",
  title: "SHOPIFY | DIGITAL MARKETING | SOCIAL MEDIA",
  bio: "I'm a Shopify developer with experience in building complete websites. I also work on digital marketing and branding, creating impactful online solutions that help businesses grow.",
  location: "Karachi, Pakistan",
  email: "muhammadeshareeb986@gmail.com",
  phone: "+92 328 2300151"
};
export const SKILLS: Skill[] = [
  // TECH
  { name: "Shopify", level: 90, category: "Tech" },
  
  // MARKETING
  { name: "Digital Marketing", level: 92, category: "Marketing" },
  { name: "Social Media Management", level: 90, category: "Marketing" },
  { name: "Campaign Management", level: 88, category: "Marketing" },
  { name: "Facebook & Instagram Paid Ads", level: 85, category: "Marketing" },
  { name: "Social Media Strategy", level: 90, category: "Marketing" },
  { name: "Content Marketing", level: 88, category: "Marketing" },
  { name: "Marketing Analytics", level: 82, category: "Marketing" },
  { name: "A/B Testing for Campaigns", level: 80, category: "Marketing" },
  { name: "Reels / Short Form Content Strategy", level: 85, category: "Marketing" },

  // DESIGN
  { name: "Brand Identity & Visual Branding", level: 86, category: "Design" },
  { name: "Ad Creatives Designing", level: 90, category: "Design" },
  { name: "Canva Pro Designing", level: 94, category: "Design" },
  { name: "Poster Designing", level: 92, category: "Design" },
  { name: "Logo Designing", level: 90, category: "Design" },
];


export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Shopify Development',
    description: 'Building and customizing Shopify stores to enhance user experience and drive sales.',
    icon: ShoppingBag
  },

  // MARKETING
  {
    id: '2',
    title: 'Digital Marketing & Branding',
    description: 'Result-driven digital marketing, branding, and social media growth strategies.',
    icon: BarChart
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'MR Clothing Craft',
    description: 'A fully functional Shopify store for a clothing brand with theme customization, product setup, and a seamless shopping experience.',
    category: 'Shopify',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    link: 'https://mrclothingcraft.com/'
  },
  {
    id: '2',
    title: 'DM E-Commerce Store',
    description: 'A fully functional Shopify store with theme customization, product setup, and optimized checkout flow. (Password: 123456)',
    category: 'Shopify',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    link: 'https://dm-muhammadeshareeb-24-10-2025-443660.myshopify.com/'
  },
  {
    id: '3',
    title: 'Logo Designing',
    description: 'Professional modern, minimal, and vintage logo designing for brands, startups, and businesses.',
    category: 'Design',
    imageUrl: 'https://thumbs.dreamstime.com/b/collection-modern-creative-logos-representing-technology-business-innovation-transportation-vibrant-presented-ideal-393468020.jpg',
    link: 'https://drive.google.com/drive/folders/1dWtCPsmro1CS2tRNWt8frVItcgEVpoJr?usp=drive_link'
  },
  {
    id: '4',
    title: 'Poster Designing',
    description: 'Custom poster designs for branding, events, promotions, and marketing campaigns.',
    category: 'Design',
    imageUrl: 'https://media.istockphoto.com/id/1421500820/vector/layout-template-for-events-or-business-related.jpg?s=612x612&w=0&k=20&c=ajcbHT54t4IndJsaxbRkkB9ic5CyPgw0r9Kg7M4fRtE=',
    link: 'https://drive.google.com/drive/folders/15zyJtRHnXwYEJoV8pDLVCAVKFdi-PcqZ?usp=sharing'
  },
  {
    id: '5',
    title: 'Flyer Designing',
    description: 'Creative flyer designs for marketing, advertisement, and business promotions.',
    category: 'Design',
    imageUrl: 'https://static-cse.canva.com/blob/1142712/Theultimateguidetoflyerdesign_featuredimage.bb4df331.jpg',
    link: 'https://drive.google.com/drive/folders/15zyJtRHnXwYEJoV8pDLVCAVKFdi-PcqZ?usp=sharing'
  }
];

// ================== INTERNSHIPS ==================
export const INTERNSHIPS: Experience[] = [
  {
    id: '1',
    year: '2024',
    role: 'MERN Stack Developer Intern',
    company: 'Eflex Solution',
    description: 'Developed and executed comprehensive applications using the MERN stack aligned with company objectives.'
  },
  {
    id: '2',
    year: '2025',
    role: 'Social Media Manager & Shopify Developer Intern',
    company: 'MR Clothing Craft',
    description: 'Completed a 4-month internship managing social media accounts and developing the Shopify store. Handled content creation, ad campaigns, theme customization, and product setup to grow the brand online.'
  }
];

// ================== CERTIFICATIONS ==================
export const CERTIFICATIONS: Experience[] = [
  {
    id: '1',
    year: '2023',
    role: 'Frontend Development Certification',
    company: 'Jawan Pakistan',
    description: '4 months course on HTML, CSS, JavaScript, and React basics.'
  },
  {
    id: '2',
    year: '2023-2024',
    role: 'Diploma in IT (Web Development – MERN)',
    company: 'Saylani Mass IT Training Program',
    description: 'Comprehensive training in MongoDB, Express, React, Node.js, and project deployment.'
  },
  {
    id: '3',
    year: '2025',
    role: 'Digital Marketing Course (In Progress)',
    company: 'Saylani Mass IT Training Program',
    description: 'Learning advanced digital marketing, social media strategy, and e-commerce campaigns.'
  }
];

// ================== BRAND & MARKETING EXPERIENCE ==================
export const BRAND_EXPERIENCE: Experience[] = [
  {
    id: '1',
    year: '2025',
    role: 'Social Media & Brand Marketing',
    company: 'Chills Spice',
    description: 'Managed social media accounts, ran Facebook & Instagram ad campaigns, and designed promotional graphics to increase brand awareness and engagement.'
  },
  {
    id: '2',
    year: '2025',
    role: 'Social Media Manager & Designer',
    company: 'Flex Wear',
    description: 'Handled Instagram and Facebook pages, created engaging posts, designed marketing visuals, and coordinated ad campaigns to drive online sales and brand growth.'
  },
  {
    id: '3',
    year: '2025',
    role: 'Social Media Manager & Shopify Developer',
    company: 'MR Clothing Craft',
    description: 'Worked for 4 months as Social Media Manager and Shopify Developer. Managed and grew social media accounts, created engaging content, and built & customized the Shopify store to enhance user experience and drive online sales.'
  }
];

// ================== EDUCATION ==================
export const EDUCATION: Experience[] = [
  {
    id: '1',
    year: '2023-2025',
    role: 'Intermediate in Pre-Engineering',
    company: 'Govt. Boys College 11-A North Karachi',
  }
];


export const SOCIALS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammadeshareeb986/', icon: Linkedin },
  { platform: 'GitHub', url: 'https://github.com/MEshareebRajput', icon: Github },
  { platform: 'Email', url: `mailto:${PERSONAL_INFO.email}`, icon: Mail },
  { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61565379902641', icon: Facebook },
  { platform: 'Instagram', url: 'https://www.instagram.com/eshareebrajput/', icon: Instagram },
  { platform: 'WhatsApp', url: 'https://wa.me/923282300151', icon: Smartphone },
];
