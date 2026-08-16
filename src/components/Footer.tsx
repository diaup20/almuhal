import React from 'react';
import { Phone, Mail, MapPin, Lock, MessageSquare, ExternalLink, Navigation } from 'lucide-react';
import { ContactInfo } from '../types';
import siteLogoImg from '../assets/images/site_logo_gold_1786889577772.jpg';

interface FooterProps {
  contactInfo: ContactInfo;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contactInfo, onOpenAdmin }) => {
  const facebookUrl = contactInfo.socials.facebook || 'https://facebook.com/almahltransport';
  const instagramUrl = contactInfo.socials.instagram || 'https://instagram.com/almahl_transport';
  const twitterUrl = contactInfo.socials.twitter || 'https://twitter.com/almahl_transport';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-12 sm:pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Subtle Accent Lights */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-4xl h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- MOBILE FOOTER VIEW (md:hidden) --- */}
        <div className="flex md:hidden flex-col gap-8 pb-10 border-b border-slate-800/80">

          {/* 1. SECTION: Logo & Name (الشعار والاسم) */}
          <div className="flex flex-col items-center text-center space-y-3">
            <a href="#hero" className="inline-flex flex-col items-center gap-2.5 group">
              <div className="w-16 h-16 rounded-2xl border-2 border-amber-500/50 overflow-hidden bg-slate-900 p-0.5 shadow-2xl shadow-amber-500/20 group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300">
                <img
                  src={siteLogoImg}
                  alt="شعار شركة المهل للنقليات وخدمات النقل"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white tracking-tight leading-tight">
                  المهل <span className="text-amber-400">للنقليات</span>
                </span>
                <span className="text-xs text-amber-400/90 font-bold tracking-wide mt-0.5">
                  وخدمات النقل الشاملة
                </span>
              </div>
            </a>

            {/* 2. SECTION: Description (الوصف) */}
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
              شركة المهل للنقليات وخدمات النقل - الشريك اللوجستي المعتمد لنقل البركسات، الحاويات، الصبيات الخرسانية، الحديد والمعدات الثقيلة بأمان تام وسرعة عالية في جميع مناطق المملكة.
            </p>

            {/* 3. SECTION: Social Icons (فيس انستا تويتر) */}
            <div className="pt-2 flex items-center justify-center gap-2.5">
              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك المهل للنقليات"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-900/90 transition-all text-xs font-bold shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 fill-current text-blue-500" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>فيسبوك</span>
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="انستقرام المهل للنقليات"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-500/40 hover:bg-slate-900/90 transition-all text-xs font-bold shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 fill-current text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>انستقرام</span>
              </a>

              {/* Twitter / X */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تويتر المهل للنقليات"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all text-xs font-bold shadow-md active:scale-95"
              >
                <svg className="w-3.5 h-3.5 fill-current text-slate-200" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>تويتر</span>
              </a>
            </div>
          </div>

          {/* 4 & 5. SECTIONS GRID: موقعنا & اتصل بنا */}
          <div className="grid grid-cols-1 gap-4 w-full pt-1">
            
            {/* Our Location (موقعنا) */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3 shadow-lg">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>موقعنا والمقر الرئيسي📍</span>
                </div>
                <div className="text-xs font-extrabold text-white leading-snug">
                  {contactInfo.address}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {contactInfo.cityRegion}
                </div>
              </div>

              <a
                href={contactInfo.googleMapsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-slate-950 hover:bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:border-amber-500/60 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>افتح الموقع في خرائط جوجل</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Contact Us (اتصل بنا) - MOBILE */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3 shadow-lg">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>اتصل بنا مباشرة 📞</span>
                </div>

                <div className="text-base font-black text-white" dir="ltr">
                  {contactInfo.phonePrimary}
                </div>
              </div>

              {/* Call Action Button */}
              <div className="pt-1">
                <a
                  href={`tel:${contactInfo.phonePrimary.replace(/\s+/g, '')}`}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>اتصل الآن {contactInfo.phonePrimary}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Quick Links Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-400 border-t border-slate-800/60 w-full text-center">
            <a href="#hero" className="hover:text-amber-400 transition-colors">الرئيسية</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">من نحن</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">خدمات النقل</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">معرض الأعمال</a>
            <a href="#features" className="hover:text-amber-400 transition-colors">مميزاتنا</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">طلب تسعير</a>
          </div>

        </div>

        {/* --- DESKTOP FOOTER VIEW (hidden md:grid) --- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Logo & Socials (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="inline-flex items-center gap-3.5 group">
              <div className="w-14 h-14 rounded-2xl border-2 border-amber-500/50 overflow-hidden bg-slate-900 p-0.5 shadow-xl shadow-amber-500/10 group-hover:border-amber-400 transition-all duration-300">
                <img
                  src={siteLogoImg}
                  alt="شعار شركة المهل للنقليات"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight leading-tight">
                  المهل <span className="text-amber-400">للنقليات</span>
                </span>
                <span className="text-xs text-amber-400/90 font-bold tracking-wide mt-0.5">
                  وخدمات النقل الشاملة
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
              شركة المهل للنقليات - الشريك اللوجستي الأول لنقل البركسات، الحاويات، الصبيات الخرسانية والمعدات الثقيلة بأعلى معايير الأمان والدقة بكافة مدن المملكة.
            </p>

            {/* Social Icons Row */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك المهل للنقليات"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="انستقرام المهل للنقليات"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:bg-pink-500/10 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تويتر المهل للنقليات"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-all shadow-md"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white border-r-2 border-amber-500 pr-2.5">
              روابط السريعة
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span className="text-amber-500/60">▪</span> الرئيسية</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span className="text-amber-500/60">▪</span> من نحن</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span className="text-amber-500/60">▪</span> خدمات النقل</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span className="text-amber-500/60">▪</span> معرض الأعمال</a></li>
              <li><a href="#features" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span className="text-amber-500/60">▪</span> مميزاتنا</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span className="text-amber-500/60">▪</span> تواصل معنا</a></li>
            </ul>
          </div>

          {/* Column 3: Specialized Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white border-r-2 border-amber-500 pr-2.5">
              خدمات النقل المتخصصة
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><a href="#services" className="hover:text-amber-400 transition-colors block">نقل البركسات والمكاتب الجاهزة</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors block">نقل الحاويات التجارية والشحن</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors block">نقل القواعد والصبيات الخرسانية</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors block">نقل الهياكل الصلبة والحديد</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors block">تأجير الكرينات والشاحنات الثقيلة</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location Info (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white border-r-2 border-amber-500 pr-2.5">
              التواصل والمقر
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-white">{contactInfo.address}</div>
                  <div className="text-[11px] text-slate-400">{contactInfo.cityRegion}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-extrabold text-white" dir="ltr">{contactInfo.phonePrimary}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300 font-medium">{contactInfo.email}</span>
              </div>
            </div>

            <a
              href={contactInfo.googleMapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-2.5 px-3 bg-slate-900 hover:bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:border-amber-500/60 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>موقعنا في خرائط جوجل</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Bottom Bar & Rights */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 text-center sm:text-right">
          <div>
            © {new Date().getFullYear()} شركة المهل للنقليات وخدمات النقل. جميع الحقوق محفوظة.
          </div>

          {/* Secret/Discreet Admin Link */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-slate-600 hover:text-amber-400 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-900 cursor-pointer"
            title="دخول المشرف"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>بوابة الإدارة</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

