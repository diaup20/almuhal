import React from 'react';
import { ShieldCheck, Award, Truck, Clock, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { AboutContent } from '../types';

interface AboutSectionProps {
  content: AboutContent;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-900 text-slate-100 relative overflow-hidden border-y border-slate-800/80">
      {/* Subtle Glowing Background Lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Visual Feature Box & Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative">
              
              {/* Primary Experience Card */}
              <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex flex-col items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none">{content.experienceYears}</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold mt-0.5">عاماً</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">خبرة عريقة وريادة</h3>
                    <p className="text-xs text-amber-400 font-bold mt-0.5">في النقل اللوجستي والأحمال الثقيلة</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  نحن في شركة المهل للنقليات نقدم حلول نقل متكاملة وآمنة تعتمد على أحدث أساطيل المقطورات والكرينات مع فريق من أفضل الكوادر والسائقين المحترفين.
                </p>

                {/* Key Value Badges */}
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-slate-800/80 text-xs font-bold text-slate-200">
                  <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>سلامة وأمان 100%</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>سائقون محترفون</span>
                  </div>
                </div>
              </div>

              {/* Fleet & Coverage Sub-Card */}
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-500 text-slate-950 shadow-xl flex items-center gap-4 font-extrabold">
                <div className="w-12 h-12 rounded-xl bg-slate-950/10 flex items-center justify-center text-slate-950 shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="text-xs sm:text-sm leading-snug">
                  أسطول حديث ومجهز بالكامل بالكرينات القوية والمقطورات الثقيلة للنقل المباشر والسريع.
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Main Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Subtitle Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{content.subtitle || 'عن المهل للنقليات'}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {content.title}
            </h2>

            {/* Paragraph 1 */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
              {content.descriptionParagraph1}
            </p>

            {/* Paragraph 2 */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-400 leading-relaxed font-normal">
              {content.descriptionParagraph2}
            </p>

            {/* Feature Stat Highlights (Re-styled grid without 'ركائز تميزنا' title) */}
            <div className="pt-2 grid sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">سرعة وانضباط المواعيد</h4>
                  <p className="text-[11px] text-slate-400">التزام تام بالجداول الزمانية</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">تغطية شاملة</h4>
                  <p className="text-[11px] text-slate-400">جميع مدن ومناطق المملكة</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

