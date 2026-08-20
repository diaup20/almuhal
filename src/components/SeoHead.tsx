import React, { useEffect } from 'react';
import { SeoSettings, ContactInfo } from '../types';

interface SeoHeadProps {
  seo: SeoSettings;
  contactInfo: ContactInfo;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ seo, contactInfo }) => {
  useEffect(() => {
    const siteTitle = seo.siteTitle || 'المهل للنقليات وخدمات النقل في مكة | نقل بركسات وحاويات ومعدات ثقيلة';
    const metaDescription = seo.metaDescription || 'شركة المهل للنقليات وخدمات النقل الشاملة في مكة المكرمة والمملكة. متخصصون في نقل البركسات، نقل الحاويات، نقل الصبيات الخرسانية، نقل الحديد، نقل المولدات، والمعدات الثقيلة بأعلى معايير الأمان.';
    const canonicalUrl = 'https://almuhal.vercel.app/';
    const ogImageUrl = 'https://almuhal.vercel.app/og-image.jpg';

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
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

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
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:alt', 'شركة المهل للنقليات وخدمات النقل في مكة');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', siteTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', ogImageUrl);

    // Social Links for sameAs
    const socials = contactInfo.socials || {};
    const sameAsLinks = Object.values(socials).filter((url) => typeof url === 'string' && url.length > 0);

    // Schema.org JSON-LD
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LogisticsService', 'LocalBusiness'],
          '@id': 'https://almuhal.vercel.app/#organization',
          name: 'المهل للنقليات وخدمات النقل',
          legalName: 'شركة المهل للنقليات وخدمات النقل الشاملة',
          url: canonicalUrl,
          logo: 'https://almuhal.vercel.app/site-logo.jpg',
          image: ogImageUrl,
          description: metaDescription,
          telephone: contactInfo.phonePrimary || seo.schemaPhone || '+966501234567',
          email: contactInfo.email || 'info@almahl-transport.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: contactInfo.address || 'شارع حسين سرحان - بجانب رافعة ونش كرين مكة',
            addressLocality: 'مكة المكرمة',
            addressRegion: 'منطقة مكة المكرمة',
            postalCode: '24231',
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
              'Sunday',
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
            'دول الخليج العربي',
          ],
          serviceType: [
            'نقل البركسات والمباني الجاهزة',
            'نقل الحاويات والشحن اللوجستي',
            'نقل الصبيات والمجسمات الخرسانية',
            'نقل الحديد والهياكل المعدنية',
            'نقل المولدات الكهربائية والمحولات',
            'نقل المكيفات الكبيرة والمركزية',
            'نقل المعدات الثقيلة',
            'خدمات النقل الثقيل',
            'تأجير التريلات'
          ],
          sameAs: sameAsLinks.length > 0 ? sameAsLinks : [
            'https://facebook.com/almahltransport',
            'https://instagram.com/almahl_transport',
            'https://twitter.com/almahl_transport',
            'https://linkedin.com/company/almahl-transport'
          ],
        }
      ]
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

