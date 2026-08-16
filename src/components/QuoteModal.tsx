import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactRequest } from '../services/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceName?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultServiceName }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    serviceType: defaultServiceName || 'نقل البركسات والمباني الجاهزة',
    pickupLocation: 'مكة المكرمة',
    deliveryLocation: '',
    cargoDetails: '',
    preferredDate: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultServiceName) {
      setFormData((prev) => ({ ...prev, serviceType: defaultServiceName }));
    }
  }, [defaultServiceName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setErrorMsg('يرجى تعبئة الاسم ورقم الجوال لتلقي عرض السعر.');
      return;
    }

    setLoading(true);
    try {
      await submitContactRequest(formData);
      setSubmitted(true);
    } catch (e) {
      setErrorMsg('تعذر الإرسال، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white">طلب خدمة نقل السريع</h3>
            <p className="text-xs text-amber-400 font-semibold">شركة المهل للنقليات وخدمات النقل</p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white">تم استلام طلبكم!</h4>
              <p className="text-sm text-slate-300">
                سيقوم فريق المهل للنقليات بمراجعة الشحنة والتواصل معكم فوراً بخصوص السعر والتأكيد.
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-3 bg-amber-500 text-slate-950 font-black rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="أدخل اسمك"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">رقم الجوال *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الخدمة المطلوبة</label>
                <input
                  type="text"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-bold text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">موقع التحميل</label>
                  <input
                    type="text"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    placeholder="المدينة / الموقع"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">موقع التنزيل</label>
                  <input
                    type="text"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    placeholder="الوجهة"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">تفاصيل الشحنة / الوزن</label>
                <textarea
                  rows={2}
                  value={formData.cargoDetails}
                  onChange={(e) => setFormData({ ...formData, cargoDetails: e.target.value })}
                  placeholder="وصف مختصر للمنقولات"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>جاري الإرسال...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>تأكيد طلب الخدمة والتسعير</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
