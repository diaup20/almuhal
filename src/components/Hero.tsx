import React from 'react';
import { Truck, Phone, ShieldCheck, Clock, ArrowLeft, Star, ChevronDown } from 'lucide-react';
import { HeroContent, ContactInfo } from '../types';
import siteLogoImg from '../assets/images/site_logo_gold_1786889577772.jpg';

interface HeroProps {
  content: HeroContent;
  contactInfo: ContactInfo;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, contactInfo, onRequestQuote }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex items-center bg-slate-950 overflow-hidden">
      {/* Background Hero Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.heroImageUrl}
          alt="المهل للنقليات أسطول الشاحنات"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
        />
        {/* Dark Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text Content */}
          <div className="lg:col-span-8 space-y-8 text-right">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>{content.badgeText}</span>
            </div>

            {/* Main Title - Mobile Optimized Font Sizing */}
            <h1 className="text-2xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-snug sm:leading-[1.15]">
              {content.headline}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl">
              {content.subheadline}
            </p>

            {/* Key Service Tags Quick Bar */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-1 text-xs sm:text-sm font-semibold text-slate-300">
              {['نقل البركسات', 'نقل الحاويات', 'نقل الصبيات', 'نقل الحديد', 'نقل المولدات', 'المكيفات الكبيرة'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-amber-300 text-[11px] sm:text-sm hover:border-amber-500/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons - Arranged side-by-side in one row on mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-3">
              <button
                onClick={onRequestQuote}
                className="px-2.5 sm:px-8 py-3 sm:py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-lg font-black rounded-xl sm:rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-3 group cursor-pointer whitespace-nowrap"
                id="hero-request-quote-btn"
              >
                <span>{content.primaryCtaText}</span>
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform shrink-0" />
              </button>

              <a
                href="#contact"
                className="px-2.5 sm:px-8 py-3 sm:py-4 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 text-xs sm:text-lg font-bold rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2.5 backdrop-blur-md whitespace-nowrap"
                id="hero-contact-btn"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span>{content.secondaryCtaText}</span>
              </a>
            </div>

          </div>

          {/* Left Visual Card Badges (Desktop) */}
          <div className="lg:col-span-4 hidden lg:block space-y-6">
            
            {/* Official Logo Emblem Showcase Card */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 backdrop-blur-xl text-center space-y-4 relative overflow-hidden group hover:border-amber-400 transition-colors">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative mx-auto w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20 bg-slate-950 p-1 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={siteLogoImg}
                  alt="شعار المهل للنقليات وخدمات النقل"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">المهل للنقليات</h3>
                <p className="text-xs text-amber-400 font-bold mt-1">الشعار الرسمي المعتمد لخدمات النقل</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-center text-xs font-bold text-slate-300">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-amber-400 font-extrabold">{content.trucksCountBadge}</div>
                  <div className="text-[10px] text-slate-400">أسطول حديث</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-amber-400 font-extrabold">{content.deliveriesCountBadge}</div>
                  <div className="text-[10px] text-slate-400">عملية نقل تم تنفيذها</div>
                </div>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="p-5 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl backdrop-blur-xl space-y-2 transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">جودة واعتمادية عالية</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    نلتزم بضمان سلامة المنقولات والتسليم الدقيق وفق أعلى المعايير.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 hover:text-amber-400 flex flex-col items-center gap-1 transition-colors group"
      >
        <span className="text-xs font-semibold">اكتشف المزيد</span>
        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
      </a>
    </section>
  );
};
