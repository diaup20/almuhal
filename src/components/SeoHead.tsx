import React, { useEffect } from 'react';
import { SeoSettings, ContactInfo } from '../types';

interface SeoHeadProps {
  seo: SeoSettings;
  contactInfo: ContactInfo;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ seo, contactInfo }) => {
  useEffect(() => {
    // Update Title
    if (seo.siteTitle) {
      document.title = seo.siteTitle;
    }

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.metaDescription || '');
    }

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && seo.keywords) {
      metaKeywords.setAttribute('content', seo.keywords.join(', '));
    }

    // OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.siteTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.metaDescription);

    // Schema.org JSON-LD
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'LogisticsService',
      name: seo.schemaOrgName || 'المهل للنقليات وخدمات النقل',
      description: seo.metaDescription,
      url: seo.canonicalUrl || window.location.origin,
      telephone: seo.schemaPhone || contactInfo.phonePrimary,
      address: {
        '@type': 'PostalAddress',
        streetAddress: seo.schemaAddress || contactInfo.address,
        addressLocality: 'مكة المكرمة',
        addressRegion: 'منطقة مكة المكرمة',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '21.4440190',
        longitude: '39.8523705',
      },
      openingHours: 'Mo-Su 00:00-23:59',
      priceRange: '$$',
      areaServed: ['السعودية', 'الرياض', 'جدة', 'الدمام', 'المنطقة الشرقية', 'دول الخليج'],
      serviceType: [
        'نقل البركسات',
        'نقل الحاويات',
        'نقل الصبيات والخرسانة',
        'نقل الحديد والهياكل المعدنية',
        'نقل المولدات الكهربائية',
        'نقل المكيفات الكبيرة',
        'خدمات النقل الثقيل'
      ]
    };

    let scriptTag = document.getElementById('schema-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [seo, contactInfo]);

  return null;
};
