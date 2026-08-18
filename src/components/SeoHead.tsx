import React, { useEffect } from 'react';
import { SeoSettings, ContactInfo } from '../types';

interface SeoHeadProps {
  seo: SeoSettings;
  contactInfo: ContactInfo;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ seo, contactInfo }) => {
  useEffect(() => {
    const siteTitle = seo.siteTitle || 'المهل للنقليات وخدمات النقل في مكة | نقل حاويات وبركسات وتريلات';
    const metaDescription = seo.metaDescription || 'شركة المهل للنقليات وخدمات النقل في مكة المكرمة - متخصصون في المهل للنقليات، نقليات مكة، خدمات النقل في مكة، نقل الحاويات، نقل البركسات، نقل الحديد، نقل المولدات، نقل المعدات الثقيلة والتريلات.';
    const canonicalUrl = 'https://almuhal.vercel.app/';

    // Update Title
    document.title = siteTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description & Keywords & Robots
    setMetaTag('name', 'description', metaDescription);
    if (seo.keywords && seo.keywords.length > 0) {
      setMetaTag('name', 'keywords', seo.keywords.join(', '));
    }
    setMetaTag('name', 'robots', 'index, follow');

    // Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // OpenGraph Tags
    setMetaTag('property', 'og:title', siteTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'المهل للنقليات وخدمات النقل');
    setMetaTag('property', 'og:locale', 'ar_SA');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', siteTitle);
    setMetaTag('name', 'twitter:description', metaDescription);

    // Schema.org JSON-LD
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': ['LogisticsService', 'LocalBusiness'],
      name: 'المهل للنقليات وخدمات النقل',
      description: metaDescription,
      url: canonicalUrl,
      telephone: contactInfo.phonePrimary || seo.schemaPhone || '+966501234567',
      email: contactInfo.email || 'info@almahl-transport.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'مكة المكرمة، منطقة مكة المكرمة، المملكة العربية السعودية',
        addressLocality: 'مكة المكرمة',
        addressRegion: 'منطقة مكة المكرمة',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '21.4440190',
        longitude: '39.8523705',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59',
      },
      priceRange: '$$',
      areaServed: [
        'مكة المكرمة',
        'جدة',
        'الطائف',
        'منطقة مكة المكرمة',
        'المملكة العربية السعودية',
      ],
      serviceType: [
        'نقل البركسات',
        'نقل الحاويات',
        'نقل الصبيات والخرسانة',
        'نقل الحديد والهياكل المعدنية',
        'نقل المولدات',
        'نقل المكيفات الكبيرة',
        'نقل المعدات الثقيلة',
        'خدمات النقل الثقيل',
        'تأجير التريلات'
      ],
    };

    let scriptTag = document.getElementById('schema-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData, null, 2);
  }, [seo, contactInfo]);

  return null;
};
