import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactInfo } from '../types';
import { submitContactRequest } from '../services/api';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo, preselectedService }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    serviceType: preselectedService || 'نقل البركسات',
    pickupLocation: 'مكة المكرمة',
    deliveryLocation: '',
    cargoDetails: '',
    preferredDate: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const serviceOptions = [
    'نقل البركسات والمباني الجاهزة',
    'نقل الحاويات والشحن اللوجستي',
    'نقل الصبيات والمجسمات الخرسانية',
    'نقل الحديد والهياكل المعدنية',
    'نقل المولدات الكهربائية والمحولات',
    'نقل المكيفات الكبيرة والمركزية',
    'جميع خدمات النقل العام والشحن الثقيل',
    'طلب خدمة نقل مخصصة'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setErrorMsg('يرجى كتابة الاسم ورقم الجوال بشكل صحيح.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitContactRequest(formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({
          customerName: '',
          phone: '',
          serviceType: 'نقل البركسات',
          pickupLocation: 'مكة المكرمة',
          deliveryLocation: '',
          cargoDetails: '',
          preferredDate: '',
          notes: '',
        });
      }
    } catch (err) {
      setErrorMsg('حدث خطأ أثناء إرسال الطلب، يمكنك التواصل معنا مباشرة عبر الواتساب أو الهاتف.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Phone className="w-3.5 h-3.5" />
            <span>تواصل مباشر وتسعير فوري</span>
          </div>

          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
            تواصل مع <span className="text-amber-400">المهل للنقليات</span>
          </h2>

          <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
            فريق العمل في خدمتك على مدار الساعة لتقديم عروض الأسعار والإجابة على كافة استفسارات النقل.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Phone Card */}
            <a
              href={`tel:${contactInfo.phonePrimary}`}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex items-center gap-4 sm:gap-5 group shadow-xl"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">الهاتف الرئيسي المباشر</span>
                <div className="text-base sm:text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors" dir="ltr">
                  {contactInfo.phonePrimary}
                </div>
                {contactInfo.phoneSecondary && (
                  <div className="text-[11px] sm:text-xs text-slate-400 font-semibold" dir="ltr">
                    خط إضافي: {contactInfo.phoneSecondary}
                  </div>
                )}
              </div>
            </a>

            {/* WhatsApp Direct Card */}
            <a
              href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أرغب في الاستفسار عن خدمات النقل لدى شركة المهل للنقليات.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex items-center gap-4 sm:gap-5 group shadow-xl"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shrink-0">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">محادثة واتساب فورية</span>
                <div className="text-sm sm:text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                  اضغط للتحدث الآن عبر الواتساب
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400">استجابة سريعة من قسم المبيعات والخدمات</div>
              </div>
            </a>

            {/* Address Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 flex items-center gap-4 sm:gap-5 shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">العنوان والمقر الرئيسي</span>
                <div className="text-xs sm:text-sm font-extrabold text-white">{contactInfo.address}</div>
                <div className="text-[11px] sm:text-xs text-slate-400">{contactInfo.cityRegion}</div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 flex items-center gap-4 sm:gap-5 shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">أوقات العمل والتنفيذ</span>
                <div className="text-xs sm:text-sm font-extrabold text-white">{contactInfo.workingHours}</div>
                <div className="text-[11px] sm:text-xs text-amber-400 font-semibold">تجهيز أساطيل النقل في أي وقت بمواعيد مسبقة</div>
              </div>
            </div>

          </div>

          {/* Right Interactive Quote / Contact Form */}
          <div className="lg:col-span-7 bg-slate-950 p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl relative">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5 sm:mb-2">طلب نقل / عرض سعر فوري</h3>
            <p className="text-xs text-slate-400 mb-5 sm:mb-6">
              قم بتعبئة بيانات الشحنة وسيقوم ممثلنا بالتواصل معك بخصوص التسعير والموعد المناسب.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-white">تم إرسال طلبكم بنجاح!</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  شكراً لتواصلك مع المهل للنقليات. تم تسليم طلبك إلى الفريق اللوجستي وسيتم التواصل معكم خلال وقت قصير عبر الهاتف أو الواتساب.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">اسم العميل / الشركة *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="أدخل الاسم الكامل"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">رقم الجوال / الواتساب *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-2">نوع الخدمة المطلوبة</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">موقع التحميل (المدينة)</label>
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="مثال: مكة المكرمة - شارع حسين سرحان"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">موقع التنزيل (الوجهة)</label>
                    <input
                      type="text"
                      value={formData.deliveryLocation}
                      onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                      placeholder="مثال: جدة / الدمام / نيوم"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">تفاصيل الشحنة / الأبعاد والوزن</label>
                    <input
                      type="text"
                      value={formData.cargoDetails}
                      onChange={(e) => setFormData({ ...formData, cargoDetails: e.target.value })}
                      placeholder="مثال: بركس 12*3.5 م، أو حاوية 40 قدم"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-300 mb-2">الموعد المستهدف للنقل</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-300 mb-2">ملاحظات أو متطلبات خاصة</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="أي تعليمات خاصة بخصوص الكرين، التثبيت، أو تصاريح الطرق..."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>جاري إرسال الطلب...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>إرسال طلب التسعير والنقل الآن</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Interactive Location Map Representation */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
          <div className="p-4 bg-slate-900 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>خريطة موقع مقر شركة المهل للنقليات</span>
            </div>
            <a
              href={contactInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              فتح في خرائط Google ↗
            </a>
          </div>

          <div className="h-80 w-full relative">
            <iframe
              src={contactInfo.mapEmbedUrl}
              className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
              title="موقع شركة المهل للنقليات"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </section>
  );
};
