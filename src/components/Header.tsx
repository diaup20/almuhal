import React, { useState, useEffect } from 'react';
import { Truck, Phone, Menu, X, Shield, ArrowLeft } from 'lucide-react';
import { ContactInfo } from '../types';
import siteLogoImg from '../assets/images/site_logo_gold_1786889577772.jpg';

interface HeaderProps {
  contactInfo: ContactInfo;
  onRequestQuote: () => void;
  isAdminLoggedIn?: boolean;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  contactInfo,
  onRequestQuote,
  isAdminLoggedIn,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'من نحن', href: '#about' },
    { label: 'خدماتنا', href: '#services' },
    { label: 'معرض الأعمال', href: '#gallery' },
    { label: 'مميزاتنا', href: '#features' },
    { label: 'لماذا المهل؟', href: '#why-us' },
    { label: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-amber-500/20 py-2.5'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo-link"
          >
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-xl shadow-amber-500/20 group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300 bg-slate-950 p-0.5 shrink-0">
              <img
                src={siteLogoImg}
                alt="شعار المهل للنقليات وخدمات النقل"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5 leading-tight">
                المهل <span className="text-amber-400 font-bold">للنقليات</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-300/90 font-bold tracking-wide">
                خدمات النقل الشاملة والشحن الثقيل
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-800/40 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 rounded-full hover:bg-slate-800/80 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
                title="لوحة التحكم"
              >
                <Shield className="w-3.5 h-3.5" />
                لوحة التحكم
              </button>
            )}

            <a
              href={`tel:${contactInfo.phonePrimary}`}
              className="flex items-center gap-2 text-xs lg:text-sm font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-400">
                <Phone className="w-4 h-4" />
              </div>
              <span dir="ltr">{contactInfo.phonePrimary}</span>
            </a>

            <button
              onClick={onRequestQuote}
              className="px-5 py-2.5 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>اطلب خدمة</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-200 hover:text-amber-400 border border-slate-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 px-4 bg-slate-900/98 border border-slate-800 rounded-2xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-amber-400 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
              <a
                href={`tel:${contactInfo.phonePrimary}`}
                className="flex items-center justify-center gap-2 py-3 bg-slate-800 text-slate-100 rounded-xl font-bold border border-slate-700"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span dir="ltr">{contactInfo.phonePrimary}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-center shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>اطلب خدمة نقل الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin?.();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  الانتقال إلى لوحة التحكم
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
