import React, { useState, useRef, useEffect } from 'react';
import { GalleryItem } from '../types';
import { Camera, ChevronRight, ChevronLeft, Maximize2, X, Sparkles, Layers } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const items = gallery || [];
  const categories: string[] = ['الكل', ...(Array.from(new Set(items.map((item) => item.category))) as string[])];

  const filteredItems =
    selectedCategory === 'الكل'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollPos = Math.abs(scrollLeft);
      const cardWidth = clientWidth > 640 ? 380 : clientWidth * 0.85;
      const index = Math.round(scrollPos / cardWidth);
      setActiveSlideIndex(Math.min(index, filteredItems.length - 1));
    }
  };

  const scrollSlider = (direction: 'prev' | 'next') => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.clientWidth > 640 ? 380 : sliderRef.current.clientWidth * 0.85;
      // In RTL, next moves left (-), prev moves right (+)
      const sign = direction === 'next' ? -1 : 1;
      sliderRef.current.scrollBy({ left: sign * cardWidth, behavior: 'smooth' });
    }
  };

  // Reset slider index when category changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setActiveSlideIndex(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold">
            <Camera className="w-3.5 h-3.5" />
            <span>توثيق عملياتنا الميدانية</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            معرض <span className="text-amber-400">أعمالنا</span> بالنقل
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            صور حية من أسطول المهل للنقليات أثناء تنفيذ عمليات نقل البركسات، الحاويات، الصبيات والمعدات الثقيلة بمختلف مناطق المملكة.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- PHOTO GALLERY CAROUSEL SLIDER --- */}
        <div className="relative group/gallery">
          
          {/* Slider Container */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-2 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="w-[85vw] sm:w-[380px] shrink-0 snap-center"
              >
                <div className="group bg-slate-900 rounded-3xl border border-slate-800 hover:border-amber-500/50 shadow-xl overflow-hidden transition-all duration-300 flex flex-col h-full relative">
                  
                  {/* Photo Frame */}
                  <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                    {/* Category Pill */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-black rounded-lg border border-slate-800/80 shadow-md">
                      {item.category}
                    </div>

                    {/* Zoom Lightbox Trigger */}
                    <button
                      onClick={() => setLightboxImage(item)}
                      className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-amber-400 flex items-center justify-center opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
                      title="تكبير الصورة"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Caption Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center justify-between px-2 mt-4">
            <button
              onClick={() => scrollSlider('prev')}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 active:scale-95 transition-all shadow-md cursor-pointer"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (sliderRef.current) {
                      const cardWidth = sliderRef.current.clientWidth > 640 ? 380 : sliderRef.current.clientWidth * 0.85;
                      sliderRef.current.scrollTo({ left: -idx * cardWidth, behavior: 'smooth' });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeSlideIndex
                      ? 'w-8 bg-amber-500'
                      : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`شريحة ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollSlider('next')}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 active:scale-95 transition-all shadow-md cursor-pointer"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold rounded-lg">
                  {lightboxImage.category}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-white truncate max-w-md">
                  {lightboxImage.title}
                </h4>
              </div>

              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image View */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Lightbox Description Footer */}
            {lightboxImage.description && (
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900 text-xs sm:text-sm text-slate-300">
                {lightboxImage.description}
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
