import React, { useState, useEffect } from 'react';
import { SiteData } from './types';
import { defaultSiteData } from './data/defaultData';
import { fetchSiteData, isAdminAuthenticated } from './services/api';
import { SeoHead } from './components/SeoHead';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { FeaturesSection } from './components/FeaturesSection';
import { WhyUsStats } from './components/WhyUsStats';
import { ContactSection } from './components/ContactSection';
import { FloatingActions } from './components/FloatingActions';
import { QuoteModal } from './components/QuoteModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal states
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteServiceName, setQuoteServiceName] = useState<string>('');

  // Admin Dashboard view state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const loadData = async () => {
    const data = await fetchSiteData();
    setSiteData(data);
    setLoading(false);
  };

  const checkIsAdminRoute = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = window.location.hash.toLowerCase();
    return (
      path === '/admin/login' ||
      path === '/admin' ||
      path === '/admin-login' ||
      hash === '#admin' ||
      hash === '#/admin/login'
    );
  };

  useEffect(() => {
    loadData();

    // Auto-sync every 5 seconds so updates from PC reflect live on Mobile
    const syncInterval = setInterval(() => {
      loadData();
    }, 5000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadData();
      }
    };

    const handleLocationCheck = () => {
      if (checkIsAdminRoute()) {
        setIsAdminOpen(true);
      }
    };

    handleLocationCheck();

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', loadData);
    window.addEventListener('popstate', handleLocationCheck);
    window.addEventListener('hashchange', handleLocationCheck);

    return () => {
      clearInterval(syncInterval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', loadData);
      window.removeEventListener('popstate', handleLocationCheck);
      window.removeEventListener('hashchange', handleLocationCheck);
    };
  }, []);

  const handleOpenQuoteModal = (serviceName?: string) => {
    setQuoteServiceName(serviceName || 'نقل البركسات والمباني الجاهزة');
    setIsQuoteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-amber-400 font-extrabold space-y-4 dir-rtl">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm tracking-wide">جاري تحميل موقع المهل للنقليات...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Dynamic SEO Meta & Schema.org Handler */}
      <SeoHead seo={siteData.seo} contactInfo={siteData.contactInfo} />

      {/* Main Public Website Layout */}
      <Header
        contactInfo={siteData.contactInfo}
        onRequestQuote={() => handleOpenQuoteModal()}
        isAdminLoggedIn={isAdminAuthenticated()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        <Hero
          content={siteData.hero}
          contactInfo={siteData.contactInfo}
          onRequestQuote={() => handleOpenQuoteModal()}
        />

        <AboutSection content={siteData.about} />

        <ServicesSection
          services={siteData.services}
          onRequestService={(srvName) => handleOpenQuoteModal(srvName)}
        />

        <GallerySection gallery={siteData.gallery} />

        <FeaturesSection features={siteData.features} />

        <WhyUsStats stats={siteData.stats} />

        <ContactSection
          contactInfo={siteData.contactInfo}
          preselectedService={quoteServiceName}
        />
      </main>

      <Footer
        contactInfo={siteData.contactInfo}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Buttons (Phone & WhatsApp) */}
      <FloatingActions
        contactInfo={siteData.contactInfo}
        onRequestQuote={() => handleOpenQuoteModal()}
      />

      {/* Interactive Quick Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultServiceName={quoteServiceName}
      />

      {/* Secret Admin Dashboard View */}
      {isAdminOpen && (
        <AdminDashboard
          siteData={siteData}
          onRefreshData={loadData}
          onCloseAdmin={() => {
            setIsAdminOpen(false);
            if (checkIsAdminRoute()) {
              window.history.pushState('', document.title, '/');
            }
          }}
        />
      )}
    </div>
  );
}
