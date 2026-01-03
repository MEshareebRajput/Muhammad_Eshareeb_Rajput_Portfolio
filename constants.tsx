import { 
  ShoppingBag, 
  Code, 
  BarChart, 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram, 
  Mail,
  Smartphone,
  Brush,
  Video,
  Film,
  Layers
} from 'lucide-react';
import { Project, Skill, Service, Experience, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Muhammad Eshareeb",
  title: "WORDPRESS | SHOPIFY | DIGITAL MARKETING",
  bio: "I’m a web developer focused on WordPress, with experience in Shopify and building complete websites. I also work on digital marketing and branding, creating impactful online solutions that help businesses grow.",
  location: "Karachi, Pakistan",
  email: "muhammadeshareeb986@gmail.com",
  phone: "+92 328 2300151"
};
export const SKILLS: Skill[] = [
  // TECH
  { name: "WordPress", level: 95, category: "Tech" },
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

  { name: "UGC Video Creation", level: 92, category: "Video" },
{ name: "Video Editing", level: 92, category: "Video" },
{ name: "Animated Video Creation", level: 90, category: "Video" },
{ name: "Short-Form Videos (Reels / Ads)", level: 92, category: "Video" },
];


export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Shopify Development',
    description: 'Building and customizing Shopify stores to enhance user experience and drive sales.',
    icon: ShoppingBag
  },
  {
    id: '2',
    title: 'WordPress Customization',
    description: 'Professional WordPress websites optimized for performance, SEO, and conversions.',
    icon: Code
  },

  // MARKETING
  {
    id: '3',
    title: 'Digital Marketing & Branding',
    description: 'Result-driven digital marketing, branding, and social media growth strategies.',
    icon: BarChart
  },

  // DESIGN
  {
    id: '4',
    title: 'Canva & Graphic Design',
    description: 'Professional designs including posters, flyers, logos, business cards, banners, and social media graphics.',
    icon: Brush
  },

  // VIDEO
  {
    id: '5',
    title: 'UGC Video Creation',
    description: 'Authentic UGC-style videos that build trust and boost conversions for e-commerce brands.',
    icon: Smartphone
  },
 {
  id: '6',
  title: 'Video Editing',
  description: 'Professional short-form video editing for reels, ads, and brand content.',
  icon: Video
},
  {
    id: '7',
    title: 'Animated Videos',
    description: 'Eye-catching animated videos and motion graphics for ads, promos, and brand storytelling.',
    icon: Layers
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Sukoon Mental Health Website',
    description: 'A modern and fully responsive WordPress website designed for mental health services.',
    category: 'WordPress',
    imageUrl: 'https://scontent.fkhi8-1.fna.fbcdn.net/v/t39.30808-6/590752097_122183874116512663_6639185566910054252_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MuuUEPrZM6QQ7kNvwGYMst1&_nc_oc=AdmDdWZwst_HClbmayE6l8sINnPJgrQ1NbvU2aDJz9qhU-7dwSsdMA4l2uNalWKKAgE&_nc_zt=23&_nc_ht=scontent.fkhi8-1.fna&_nc_gid=RLKB33L9FNcvu6HyknrBNA&oh=00_AfrQfz_Y8AlfmL5kESslZZV5bXIsY3fwV6k5A07pNlEBLw&oe=695F575A',
    link: 'https://sukoonmentalhealth.com/'
  },
  {
    id: '2',
    title: 'Unique Aesthetic Clinic Website',
    description: 'A clean and elegant WordPress site built for an aesthetic clinic to improve online presence.',
    category: 'WordPress',
    imageUrl: 'https://scontent.fkhi8-1.fna.fbcdn.net/v/t39.30808-6/590354468_122183874494512663_8541853880289647152_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XoL5KUk2FVsQ7kNvwGKk-I8&_nc_oc=AdnlFhQ2MwmN4jSiwmfRRcHfACorlYcKQfsYKnFPHjgxRCQvOOqa6vhQ8aAkBqEPKhw&_nc_zt=23&_nc_ht=scontent.fkhi8-1.fna&_nc_gid=LKjWETlQBwiDx-ijrWkfcg&oh=00_AfoXXLO_l1C_57kBOBl9bqdgsZHYfEX38sJ7NXlh1sCwpw&oe=695F4C29',
    link: 'https://uniqueaesthetic.ca/'
  },
  {
    id: '3',
    title: 'DM E-Commerce Store',
    description: 'A fully functional Shopify store with theme customization, product setup, and optimized checkout flow. (Password: 123456)',
    category: 'Shopify',
    imageUrl: 'https://scontent.fkhi8-1.fna.fbcdn.net/v/t39.30808-6/590752097_122183874116512663_6639185566910054252_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MuuUEPrZM6QQ7kNvwGYMst1&_nc_oc=AdmDdWZwst_HClbmayE6l8sINnPJgrQ1NbvU2aDJz9qhU-7dwSsdMA4l2uNalWKKAgE&_nc_zt=23&_nc_ht=scontent.fkhi8-1.fna&_nc_gid=_90KrqkaB4B8DlXvmoLMdA&oh=00_Afq6rLls3W3nZyg3sFTJSHKft3kP9MSU8rWrJXZOnT_Fpw&oe=695F575A',
    link: 'https://dm-muhammadeshareeb-24-10-2025-443660.myshopify.com/'
  },
  {
    id: '4',
    title: 'Logo Designing',
    description: 'Professional modern, minimal, and vintage logo designing for brands, startups, and businesses.',
    category: 'Design',
    imageUrl: 'https://thumbs.dreamstime.com/b/collection-modern-creative-logos-representing-technology-business-innovation-transportation-vibrant-presented-ideal-393468020.jpg',
    link: 'https://drive.google.com/drive/folders/1dWtCPsmro1CS2tRNWt8frVItcgEVpoJr?usp=drive_link'
  },
  {
    id: '5',
    title: 'Poster Designing',
    description: 'Custom poster designs for branding, events, promotions, and marketing campaigns.',
    category: 'Design',
    imageUrl: 'https://media.istockphoto.com/id/1421500820/vector/layout-template-for-events-or-business-related.jpg?s=612x612&w=0&k=20&c=ajcbHT54t4IndJsaxbRkkB9ic5CyPgw0r9Kg7M4fRtE=',
    link: 'https://drive.google.com/drive/folders/15zyJtRHnXwYEJoV8pDLVCAVKFdi-PcqZ?usp=sharing'
  },
  {
    id: '6',
    title: 'Flyer Designing',
    description: 'Creative flyer designs for marketing, advertisement, and business promotions.',
    category: 'Design',
    imageUrl: 'https://static-cse.canva.com/blob/1142712/Theultimateguidetoflyerdesign_featuredimage.bb4df331.jpg',
    link: 'https://drive.google.com/drive/folders/15zyJtRHnXwYEJoV8pDLVCAVKFdi-PcqZ?usp=sharing'
  },
  {
    id: '7',
    title: 'UGC Video Ads for E-commerce',
    description: 'High-converting UGC ads designed for Facebook and Instagram to increase ROAS.',
    category: 'Video',
    imageUrl: 'https://cdn.sanity.io/images/xcatvyn0/production/1197e57e428cfe54bb17cac02cf84440b50fa4b6-1801x1201.png?fit=max&auto=format',
    link: 'https://drive.google.com/drive/folders/15u2aKT8_lswSlEhU0f31lxuYQowhclPa?usp=sharing'
  },
  {
    id: '8',
    title: 'Animated Promo Videos',
    description: 'Creative animated videos for promotions, ads, and social media branding.',
    category: 'Video',
    imageUrl: 'https://img.freepik.com/free-psd/fashion-influencer-character-design_23-2151642550.jpg?semt=ais_hybrid&w=740&q=80',
    link: 'https://drive.google.com/drive/folders/10Iy_IxM7TlBH_cIZqS1h5rjlNM_tbCXU?usp=sharing'
  },
  {
    id: '9',
    title: 'Video Editing',
    description: 'Professional video editing for ads, reels, and brand content to enhance engagement and conversions.',
    category: 'Video',
    imageUrl: 'https://img.freepik.com/premium-vector/video-editing-software-program-editing-video-project-sound-color-adjustment_681307-92.jpg',
    link: 'https://drive.google.com/drive/folders/1MHqfFjK4_QMKtUHN2uux8CLWzqqu-PCa?usp=sharing'
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
    role: 'WordPress Developer Intern',
    company: 'Marcos Technology',
    description: 'Built SEO-optimized WordPress websites aligned with business goals.'
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
    description: 'Learning advanced digital marketing, UGC ads, social media strategy, and e-commerce campaigns.'
  }
];

// ================== BRAND & MARKETING EXPERIENCE ==================
export const BRAND_EXPERIENCE: Experience[] = [
  {
    id: '1',
    year: '2025',
    role: 'Social Media & Brand Marketing',
    company: 'Chills Spice',
    description: 'Managed social media accounts, ran Facebook & Instagram ad campaigns, created UGC content, and designed promotional graphics to increase brand awareness and engagement.'
  },
  {
    id: '2',
    year: '2025',
    role: 'Social Media Manager & Designer',
    company: 'Flex Wear',
    description: 'Handled Instagram and Facebook pages, created engaging posts, designed marketing visuals, and coordinated ad campaigns to drive online sales and brand growth.'
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