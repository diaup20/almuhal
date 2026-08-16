export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string; // e.g. 'Truck', 'Container', 'Box', 'Zap', 'Building2', 'ShieldCheck'
  imageUrl: string;
  category: string;
  popular?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CompanyStat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  iconName: string;
}

export interface ContactInfo {
  phonePrimary: string;
  phoneSecondary?: string;
  whatsappNumber: string; // e.g. "966500000000"
  email: string;
  address: string;
  cityRegion: string;
  workingHours: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  socials: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  badgeText: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImageUrl: string;
  trucksCountBadge: string;
  deliveriesCountBadge: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  descriptionParagraph1: string;
  descriptionParagraph2: string;
  experienceYears: string;
  highlights: string[];
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  schemaOrgName: string;
  schemaPhone: string;
  schemaAddress: string;
}

export interface ContactRequest {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  serviceType: string;
  pickupLocation: string;
  deliveryLocation: string;
  cargoDetails?: string;
  preferredDate?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export interface SiteData {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  features: FeatureItem[];
  stats: CompanyStat[];
  gallery: GalleryItem[];
  contactInfo: ContactInfo;
  seo: SeoSettings;
  adminPin: string;
  adminUsername?: string;
  adminPassword?: string;
}
