import React, { useState, useRef } from 'react';
import { ArrowLeft, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { ServiceItem } from '../types';
import { IconRenderer } from './IconRenderer';

interface ServicesSectionProps {
  services: ServiceItem[];
  onRequestService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onRequestService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  // Extract unique categories
  const categories = ['الكل', ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices =
    selectedCategory === 'الكل'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const handleScroll = () => {
    if (mobileSliderRef.current) {
      const { scrollLeft, clientWidth } = mobileSliderRef.current;
      const scrollPos = Math.abs(scrollLeft);
      const index = Math.round(scrollPos / (clientWidth * 0.8));
      setActiveSlideIndex(Math.min(index, filteredServices.length - 1));
    }
  };

  const scrollSlider = (direction: 'prev' | 'next') => {
    if (mobileSliderRef.current) {
      const scrollAmount = mobileSliderRef.current.clientWidth * 0.8;
      const sign = direction === 'next' ? -1 : 1;
      mobileSliderRef.current.scrollBy({ left: sign * scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 border-t border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Decorative Light Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>خدمات النقل الشاملة والمتخصصة</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            خدمات المهل <span className="text-amber-600">للنقليات</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            نوفر أساطيل نقل ثقيل متكاملة بأعلى معايير السلامة والجودة لنقل البركسات، الحاويات، القواعد الخرسانية والمعدات.
          </p>
        </div>

        {/* Categories Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveSlideIndex(0);
                if (mobileSliderRef.current) {
                  mobileSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- MOBILE SLIDER VIEW (Carousel on mobile with Icon Badges) --- */}
        <div className="block md:hidden relative mb-8">
          <div
            ref={mobileSliderRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-2 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="w-[85vw] max-w-[320px] shrink-0 snap-center"
              >
                <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 relative h-full">
                  
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full shadow-md">
                      خدمة شائعة 🔥
                    </div>
                  )}

                  {/* Icon Badge & Category Header */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconRenderer name={service.iconName} className="w-7 h-7 stroke-[2.2]" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md inline-block">
                          {service.category}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 leading-snug">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="pt-4 border-t border-slate-100 mt-5">
                    <button
                      onClick={() => onRequestService(service.title)}
                      className="w-full py-3 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>اطلب الخدمة الآن</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Slider Mobile Navigation Controls */}
          <div className="flex items-center justify-between px-4 mt-2">
            <button
              onClick={() => scrollSlider('prev')}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-95 transition-transform"
              aria-label="الخدمة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {filteredServices.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeSlideIndex
                      ? 'w-6 bg-amber-500'
                      : 'w-1.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollSlider('next')}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-95 transition-transform"
              aria-label="الخدمة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- DESKTOP & TABLET GRID VIEW (Icons instead of images) --- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between p-7 relative h-full hover:-translate-y-1"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-5 left-5 z-10 px-3 py-1 bg-amber-500 text-slate-950 font-black text-[11px] rounded-full shadow-md">
                  خدمة شائعة 🔥
                </div>
              )}

              <div className="space-y-5">
                {/* Icon Header */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconRenderer name={service.iconName} className="w-8 h-8 stroke-[2.2]" />
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-xs font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md inline-block">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {service.shortDesc}
                </p>
              </div>

              {/* Card Action Button */}
              <div className="pt-5 border-t border-slate-100 mt-6">
                <button
                  onClick={() => onRequestService(service.title)}
                  className="w-full py-3 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-extrabold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-md"
                >
                  <span>اطلب هذه الخدمة الآن</span>
                  <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


