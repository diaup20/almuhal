import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Award } from 'lucide-react';
import { CompanyStat } from '../types';
import { IconRenderer } from './IconRenderer';

interface WhyUsStatsProps {
  stats: CompanyStat[];
}

export const WhyUsStats: React.FC<WhyUsStatsProps> = ({ stats }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (mobileSliderRef.current) {
      const { scrollLeft, clientWidth } = mobileSliderRef.current;
      const scrollPos = Math.abs(scrollLeft);
      const index = Math.round(scrollPos / (clientWidth * 0.75));
      setActiveSlideIndex(Math.min(index, stats.length - 1));
    }
  };

  const scrollSlider = (direction: 'prev' | 'next') => {
    if (mobileSliderRef.current) {
      const scrollAmount = mobileSliderRef.current.clientWidth * 0.75;
      const sign = direction === 'next' ? -1 : 1;
      mobileSliderRef.current.scrollBy({ left: sign * scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-slate-950 text-slate-100 relative overflow-hidden border-y border-slate-800">
      
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>حقائق وأرقام تتحدث عنا</span>
          </div>

          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
            لماذا يختار العملاء <span className="text-amber-400">المهل للنقليات؟</span>
          </h2>

          <p className="text-xs sm:text-base text-slate-400">
            أرقام تعكس ثقة مئات الشركات والشركاء في أدائنا اللوجستي والالتزام الدائم بالجودة.
          </p>
        </div>

        {/* --- MOBILE SLIDER VIEW (Stats Carousel) --- */}
        <div className="block md:hidden relative mb-6">
          <div
            ref={mobileSliderRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-2 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="w-[75vw] max-w-[280px] shrink-0 snap-center"
              >
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-3 shadow-xl backdrop-blur-md">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400">
                    <IconRenderer name={stat.iconName} className="w-6 h-6" />
                  </div>

                  <div className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-1 font-mono">
                    <span className="text-amber-400">{stat.value}</span>
                    {stat.suffix && <span className="text-amber-500 text-2xl">{stat.suffix}</span>}
                  </div>

                  <div className="text-xs font-extrabold text-slate-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between px-4 mt-2">
            <button
              onClick={() => scrollSlider('prev')}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 active:scale-95 transition-transform"
              aria-label="السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {stats.map((_, idx) => (
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
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 active:scale-95 transition-transform"
              aria-label="التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- DESKTOP STATS GRID --- */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 text-center space-y-3 shadow-2xl backdrop-blur-md hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400">
                <IconRenderer name={stat.iconName} className="w-6 h-6" />
              </div>

              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-1 font-mono">
                <span className="text-amber-400">{stat.value}</span>
                {stat.suffix && <span className="text-amber-500 text-2xl sm:text-3xl">{stat.suffix}</span>}
              </div>

              <div className="text-xs sm:text-sm font-extrabold text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
