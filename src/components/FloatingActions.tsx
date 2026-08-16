import React from 'react';
import { Phone, MessageSquare, Truck } from 'lucide-react';
import { ContactInfo } from '../types';

interface FloatingActionsProps {
  contactInfo: ContactInfo;
  onRequestQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ contactInfo, onRequestQuote }) => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أرغب في طلب خدمة نقل لدى المهل للنقليات.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        
        {/* Floating WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 hover:scale-110 transition-all duration-300"
          aria-label="محادثة واتساب"
          title="واتساب المهل للنقليات"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none" />
          <MessageSquare className="w-7 h-7 fill-current" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-800">
            واتساب المهل للنقليات
          </span>
        </a>

        {/* Floating Call Button */}
        <a
          href={`tel:${contactInfo.phonePrimary}`}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/30 hover:scale-110 transition-all duration-300"
          aria-label="اتصال هاتفي"
          title="اتصل بالمهل للنقليات"
        >
          <Phone className="w-6 h-6 fill-current" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-800">
            اتصل بنا فوراً
          </span>
        </a>

        {/* Quick Quote Trigger (Mobile primary bar) */}
        <button
          onClick={onRequestQuote}
          className="sm:hidden flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-amber-400 font-extrabold text-xs shadow-2xl border border-amber-500/40 hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
        >
          <Truck className="w-4 h-4" />
          <span>اطلب خدمة نقل</span>
        </button>

      </div>
    </div>
  );
};
