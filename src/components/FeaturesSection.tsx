import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { FeatureItem } from '../types';
import { IconRenderer } from './IconRenderer';

interface FeaturesSectionProps {
  features: FeatureItem[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (mobileSliderRef.current) {
      const { scrollLeft, clientWidth } = mobileSliderRef.current;
      const scrollPos = Math.abs(scrollLeft);
      const index = Math.round(scrollPos / (clientWidth * 0.8));
      setActiveSlideIndex(Math.min(index, features.length - 1));
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
    <section id="features" className="py-20 sm:py-24 bg-slate-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>لماذا نحن الخيار الأفضل؟</span>
          </div>

          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
            مميزات شركة <span className="text-amber-400">المهل للنقليات</span>
          </h2>

          <p className="text-xs sm:text-lg text-slate-400 leading-relaxed">
            نجمع بين الخبرة الطويلة والتقنيات الحديثة والأساطيل المتطورة لنمنح عملاءنا أقصى درجات الثقة والراحة.
          </p>
        </div>

        {/* --- MOBILE SLIDER VIEW (Features Carousel) --- */}
        <div className="block md:hidden relative mb-8">
          <div
            ref={mobileSliderRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-2 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {features.map((feature, idx) => (
              <div
                key={feature.id || idx}
                className="w-[82vw] max-w-[310px] shrink-0 snap-center"
              >
                <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                      <IconRenderer name={feature.iconName} className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-extrabold text-white">
                      {feature.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Navigation Controls */}
          <div className="flex items-center justify-between px-4 mt-2">
            <button
              onClick={() => scrollSlider('prev')}
              className="p-2 rounded-full bg-slate-950 border border-slate-800 text-slate-300 active:scale-95 transition-transform"
              aria-label="الميزة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {features.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeSlideIndex
                      ? 'w-6 bg-amber-500'
                      : 'w-1.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollSlider('next')}
              className="p-2 rounded-full bg-slate-950 border border-slate-800 text-slate-300 active:scale-95 transition-transform"
              aria-label="الميزة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- DESKTOP GRID VIEW --- */}
        <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.id || idx}
              className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-lg shadow-amber-500/10">
                <IconRenderer name={feature.iconName} className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
