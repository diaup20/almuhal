import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  PhoneCall,
  Search,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  LogOut,
  Save,
  Key,
  Globe,
  Sparkles,
  Inbox,
  Clock,
  Eye,
  AlertCircle,
  BarChart3,
  Upload,
  Image
} from 'lucide-react';
import { SiteData, ServiceItem, ContactRequest, FeatureItem, CompanyStat, SeoSettings, GalleryItem } from '../../types';
import { updateSiteData, fetchContactRequests, updateRequestStatus, logoutAdmin, verifyAdminPin, verifyAdminCredentials } from '../../services/api';
import { IconRenderer } from '../IconRenderer';

interface AdminDashboardProps {
  siteData: SiteData;
  onRefreshData: () => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  siteData,
  onRefreshData,
  onCloseAdmin,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'requests' | 'services' | 'gallery' | 'hero_about' | 'stats_features' | 'contact_info' | 'seo' | 'security'
  >('requests');

  // Requests state
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(false);

  // Form states for site data edits
  const [editableData, setEditableData] = useState<SiteData>(siteData);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Service Edit Modal
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Gallery Edit Modal
  const [editingGalleryItem, setEditingGalleryItem] = useState<Partial<GalleryItem> | null>(null);
  const [isNewGalleryItem, setIsNewGalleryItem] = useState(false);

  // Selected Request Detail Modal
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);

  useEffect(() => {
    setEditableData(siteData);
  }, [siteData]);

  useEffect(() => {
    // Check if previously logged in
    const cachedToken = localStorage.getItem('almahl_transport_admin_token');
    const expectedUser = siteData.adminUsername || 'almhal';
    const expectedPass = siteData.adminPassword || siteData.adminPin || 'almhal!@#123';
    if (
      cachedToken &&
      (cachedToken === `${expectedUser}:${expectedPass}` ||
        cachedToken === expectedPass ||
        cachedToken === siteData.adminPin)
    ) {
      setIsAuthenticated(true);
      loadRequests();
    }
  }, [siteData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    // Try username + password login
    const validCreds = await verifyAdminCredentials(usernameInput, passwordInput);
    if (validCreds) {
      setIsAuthenticated(true);
      loadRequests();
      return;
    }

    // Fallback try pin/password
    const validPin = await verifyAdminPin(passwordInput || usernameInput);
    if (validPin) {
      setIsAuthenticated(true);
      loadRequests();
      return;
    }

    setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
  };

  const loadRequests = async () => {
    setLoadingReqs(true);
    const data = await fetchContactRequests();
    setRequests(data);
    setLoadingReqs(false);
  };

  const handleSaveAllData = async (newDataToSave?: SiteData) => {
    setSaveStatus('saving');
    const targetData = newDataToSave || editableData;
    const ok = await updateSiteData(targetData, editableData.adminPin);
    if (ok) {
      setSaveStatus('saved');
      onRefreshData();
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
    }
  };

  const handleStatusChange = async (reqId: string, status: ContactRequest['status']) => {
    await updateRequestStatus(reqId, status);
    loadRequests();
    if (selectedRequest?.id === reqId) {
      setSelectedRequest((prev) => (prev ? { ...prev, status } : null));
    }
  };

  // Service CRUD logic
  const handleSaveService = () => {
    if (!editingService?.title || !editingService?.shortDesc) return;

    let updatedServices = [...editableData.services];
    if (isNewService) {
      const newSrv: ServiceItem = {
        id: 'srv-' + Date.now(),
        title: editingService.title || '',
        shortDesc: editingService.shortDesc || '',
        fullDesc: editingService.fullDesc || editingService.shortDesc || '',
        iconName: editingService.iconName || 'Truck',
        imageUrl: editingService.imageUrl || editableData.hero.heroImageUrl,
        category: editingService.category || 'نقل عام',
        popular: !!editingService.popular,
      };
      updatedServices.push(newSrv);
    } else {
      updatedServices = updatedServices.map((s) =>
        s.id === editingService.id ? ({ ...s, ...editingService } as ServiceItem) : s
      );
    }

    const newFullData = { ...editableData, services: updatedServices };
    setEditableData(newFullData);
    handleSaveAllData(newFullData);
    setEditingService(null);
  };

  const handleDeleteService = (srvId: string) => {
    if (!window.confirm('هل أنت تأكد من حذف هذه الخدمة؟')) return;
    const updatedServices = editableData.services.filter((s) => s.id !== srvId);
    const newFullData = { ...editableData, services: updatedServices };
    setEditableData(newFullData);
    handleSaveAllData(newFullData);
  };

  const handleServiceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة بحجم أقل من 5 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setEditingService((prev) => (prev ? { ...prev, imageUrl: reader.result as string } : null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Gallery CRUD logic
  const handleSaveGalleryItem = () => {
    if (!editingGalleryItem?.title || !editingGalleryItem?.imageUrl) {
      alert('يرجى كتابة عنوان الصورة وإضافة رابط أو رفع صورة.');
      return;
    }

    let updatedGallery = [...(editableData.gallery || [])];
    if (isNewGalleryItem) {
      const newGalItem: GalleryItem = {
        id: 'gal-' + Date.now(),
        title: editingGalleryItem.title || '',
        category: editingGalleryItem.category || 'عام',
        imageUrl: editingGalleryItem.imageUrl || '',
        description: editingGalleryItem.description || '',
      };
      updatedGallery.push(newGalItem);
    } else {
      updatedGallery = updatedGallery.map((g) =>
        g.id === editingGalleryItem.id ? ({ ...g, ...editingGalleryItem } as GalleryItem) : g
      );
    }

    const newFullData = { ...editableData, gallery: updatedGallery };
    setEditableData(newFullData);
    handleSaveAllData(newFullData);
    setEditingGalleryItem(null);
  };

  const handleDeleteGalleryItem = (galId: string) => {
    if (!window.confirm('هل أنت تأكد من حذف هذه الصورة من معرض الأعمال؟')) return;
    const updatedGallery = (editableData.gallery || []).filter((g) => g.id !== galId);
    const newFullData = { ...editableData, gallery: updatedGallery };
    setEditableData(newFullData);
    handleSaveAllData(newFullData);
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة بحجم أقل من 5 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setEditingGalleryItem((prev) => (prev ? { ...prev, imageUrl: reader.result as string } : null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/98 backdrop-blur-xl animate-in fade-in duration-200 text-slate-100 dir-rtl">
        <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <button
            onClick={onCloseAdmin}
            className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="العودة للموقع الرئيسي"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">تسجيل دخول المشرف</h2>
            <p className="text-xs text-slate-400">
              لوحة إدارة شركة المهل للنقليات وخدمات النقل
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم المستخدم (Username)</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">كلمة المرور (Password)</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none pl-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs font-bold py-1 px-1.5 rounded"
                >
                  {showPassword ? 'إخفاء' : 'إظهار'}
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between items-center">
                <span>اسم المستخدم الافتراضي:</span>
                <span className="font-mono text-amber-400 font-extrabold dir-ltr">almhal</span>
              </div>
              <div className="flex justify-between items-center">
                <span>كلمة المرور الافتراضية:</span>
                <span className="font-mono text-amber-400 font-extrabold dir-ltr">almhal!@#123</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              تسجيل الدخول إلى لوحة التحكم
            </button>

            <button
              type="button"
              onClick={onCloseAdmin}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              العودة للموقع الرئيسي
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white flex items-center gap-2">
              لوحة تحكم إدارية <span className="text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">المهل للنقليات</span>
            </h1>
            <p className="text-xs text-slate-400">إدارة الخدمات، المحتوى، إعدادات SEO، وطلبات النقل الواردة</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              تم الحفظ بنجاح
            </span>
          )}

          <button
            onClick={() => handleSaveAllData()}
            disabled={saveStatus === 'saving'}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>حفظ جميع التغييرات</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="تسجيل الخروج"
          >
            <LogOut className="w-5 h-5" />
          </button>

          <button
            onClick={onCloseAdmin}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="إغلاق والعودة للموقع"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-slate-900/60 border-l border-slate-800 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase px-3 pb-2">أقسام اللوحة</div>

            {[
              { id: 'requests', label: 'طلبات النقل الواردة', icon: Inbox, badge: requests.filter((r) => r.status === 'new').length },
              { id: 'services', label: 'إدارة الخدمات (7+)', icon: Truck },
              { id: 'gallery', label: 'معرض الأعمال (صور)', icon: Image, badge: editableData.gallery?.length },
              { id: 'hero_about', label: 'الواجهة والتعريف', icon: LayoutDashboard },
              { id: 'stats_features', label: 'الإحصائيات والمميزات', icon: BarChart3 },
              { id: 'contact_info', label: 'بيانات الاتصال والعنوان', icon: PhoneCall },
              { id: 'seo', label: 'إعدادات SEO والميتاتاغ', icon: Globe },
              { id: 'security', label: 'الأمان والرمز السري', icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && tab.badge > 0 ? (
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-red-500 text-white">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-extrabold text-amber-400">حالة النظام: متصل 🟢</div>
            <div>تحديثات فورية وسحب تلقائي</div>
          </div>
        </aside>

        {/* Content View Body */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-950">
          
          {/* TAB 1: Incoming Contact Requests */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">طلبات عروض الأسعار والنقل الواردة</h2>
                  <p className="text-xs text-slate-400">إدارة الطلبات المستلمة من طلبات العملاء بالموقع</p>
                </div>
                <button
                  onClick={loadRequests}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  تحديث القائمة
                </button>
              </div>

              {loadingReqs ? (
                <div className="p-12 text-center text-slate-400 text-sm">جاري تحميل الطلبات...</div>
              ) : requests.length === 0 ? (
                <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
                  <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-lg font-bold text-white">لا توجد طلبات واردة حالياً</h3>
                  <p className="text-xs text-slate-400">الطلبات الجديدة التي يرسلها الزوار ستظهر هنا فوراً.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {requests.map((req) => (
                    <div
                      key={req.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        req.status === 'new'
                          ? 'bg-slate-900 border-amber-500/40 shadow-lg'
                          : 'bg-slate-900/50 border-slate-800 opacity-80'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-white text-base">{req.customerName}</span>
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-black rounded-full ${
                              req.status === 'new'
                                ? 'bg-amber-500 text-slate-950'
                                : req.status === 'contacted'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            {req.status === 'new' ? 'جديد' : req.status === 'contacted' ? 'تم التواصل' : 'مكتمل'}
                          </span>
                        </div>

                        <div className="text-xs text-amber-400 font-bold">
                          الخدمة: {req.serviceType}
                        </div>

                        <div className="text-xs text-slate-300 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                          <span>📱 <span dir="ltr">{req.phone}</span></span>
                          {req.pickupLocation && <span>📍 من: {req.pickupLocation}</span>}
                          {req.deliveryLocation && <span>🏁 إلى: {req.deliveryLocation}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`السلام عليكم أستاذ ${req.customerName}، بخصوص طلبكم لنقل (${req.serviceType}) لدى المهل للنقليات.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-emerald-400 transition-colors"
                        >
                          واتساب العميل
                        </a>

                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="px-3 py-1.5 bg-slate-800 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          التفاصيل
                        </button>

                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-2 py-1.5 rounded-lg focus:outline-none"
                        >
                          <option value="new">جديد</option>
                          <option value="contacted">تم التواصل</option>
                          <option value="completed">مكتمل</option>
                          <option value="archived">أرشيف</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Services CRUD */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">إدارة خدمات النقل المتخصصة</h2>
                  <p className="text-xs text-slate-400">إضافة، تعديل، أو حذف الخدمات والصور والعناوين والوصف</p>
                </div>

                <button
                  onClick={() => {
                    setEditingService({
                      title: '',
                      shortDesc: '',
                      fullDesc: '',
                      category: 'خدمات النقل',
                      iconName: 'Truck',
                      imageUrl: editableData.hero.heroImageUrl,
                      popular: false,
                    });
                    setIsNewService(true);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة خدمة جديدة</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {editableData.services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <IconRenderer name={srv.iconName} className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-white text-base">{srv.title}</h3>
                          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400 font-bold">
                            {srv.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{srv.shortDesc}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">الصورة: {srv.imageUrl ? 'معينة ✅' : 'الافتراضية'}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingService(srv);
                            setIsNewService(false);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-bold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2.5: Gallery (معرض الأعمال) CRUD */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Image className="w-5 h-5 text-amber-400" />
                    <span>إدارة صور معرض الأعمال</span>
                  </h2>
                  <p className="text-xs text-slate-400">إضافة، تعديل، أو حذف صور العمليات الميدانية والأسطول</p>
                </div>

                <button
                  onClick={() => {
                    setEditingGalleryItem({
                      title: '',
                      category: 'نقل البركسات',
                      imageUrl: editableData.hero.heroImageUrl,
                      description: '',
                    });
                    setIsNewGalleryItem(true);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة صورة جديدة المعرض</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(editableData.gallery || []).map((gal) => (
                  <div
                    key={gal.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-3">
                      <div className="relative h-40 w-full rounded-xl bg-slate-950 overflow-hidden border border-slate-800">
                        <img
                          src={gal.imageUrl}
                          alt={gal.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold rounded-md border border-slate-800">
                          {gal.category}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-white text-sm line-clamp-1">{gal.title}</h3>
                        {gal.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{gal.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setEditingGalleryItem(gal);
                          setIsNewGalleryItem(false);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryItem(gal.id)}
                        className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-bold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Hero & About Editable Content */}
          {activeTab === 'hero_about' && (
            <div className="space-y-8 max-w-4xl">
              
              {/* Hero Section Form */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5" />
                  محتوى الصفحة الرئيسية (Hero)
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">العنوان الرئيسي (Headline)</label>
                  <input
                    type="text"
                    value={editableData.hero.headline}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        hero: { ...editableData.hero, headline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الوصف الفرعي (Subheadline)</label>
                  <textarea
                    rows={3}
                    value={editableData.hero.subheadline}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        hero: { ...editableData.hero, subheadline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">نص الشارة العلوية</label>
                    <input
                      type="text"
                      value={editableData.hero.badgeText}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          hero: { ...editableData.hero, badgeText: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">نص زر الطلب الرئيسي</label>
                    <input
                      type="text"
                      value={editableData.hero.primaryCtaText}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          hero: { ...editableData.hero, primaryCtaText: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* About Section Form */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  قسم "من نحن والتعريف"
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">عنوان قسم من نحن</label>
                  <input
                    type="text"
                    value={editableData.about.title}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        about: { ...editableData.about, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الفقرة الأولى</label>
                  <textarea
                    rows={3}
                    value={editableData.about.descriptionParagraph1}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        about: { ...editableData.about, descriptionParagraph1: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الفقرة الثانية</label>
                  <textarea
                    rows={3}
                    value={editableData.about.descriptionParagraph2}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        about: { ...editableData.about, descriptionParagraph2: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm resize-none"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Stats & Features */}
          {activeTab === 'stats_features' && (
            <div className="space-y-8 max-w-4xl">
              
              {/* Stats Section */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-black text-amber-400">إدارة الإحصائيات والأرقام (لماذا المهل؟)</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {editableData.stats.map((st, idx) => (
                    <div key={st.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                        <span>إحصائية #{idx + 1}</span>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">عنوان الإحصائية</label>
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const newStats = [...editableData.stats];
                            newStats[idx].label = e.target.value;
                            setEditableData({ ...editableData, stats: newStats });
                          }}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">القيمة الرقمية</label>
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const newStats = [...editableData.stats];
                              newStats[idx].value = e.target.value;
                              setEditableData({ ...editableData, stats: newStats });
                            }}
                            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">الرمز / اللاحقة</label>
                          <input
                            type="text"
                            value={st.suffix || ''}
                            onChange={(e) => {
                              const newStats = [...editableData.stats];
                              newStats[idx].suffix = e.target.value;
                              setEditableData({ ...editableData, stats: newStats });
                            }}
                            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: Contact Info */}
          {activeTab === 'contact_info' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-3xl">
              <h3 className="text-lg font-black text-amber-400">بيانات الاتصال والعنوان المباشر</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف الرئيسي</label>
                  <input
                    type="text"
                    value={editableData.contactInfo.phonePrimary}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        contactInfo: { ...editableData.contactInfo, phonePrimary: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الواتساب (بالصيغة الدولية بدون +)</label>
                  <input
                    type="text"
                    value={editableData.contactInfo.whatsappNumber}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        contactInfo: { ...editableData.contactInfo, whatsappNumber: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={editableData.contactInfo.email}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      contactInfo: { ...editableData.contactInfo, email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">عنوان المقر الرئيسي</label>
                <input
                  type="text"
                  value={editableData.contactInfo.address}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      contactInfo: { ...editableData.contactInfo, address: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-sm font-extrabold text-amber-400">روابط منصات التواصل الاجتماعي (الفيسبوك، الانستقرام، التويتر)</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">رابط الفيسبوك (Facebook)</label>
                    <input
                      type="text"
                      value={editableData.contactInfo.socials?.facebook || ''}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          contactInfo: {
                            ...editableData.contactInfo,
                            socials: {
                              ...(editableData.contactInfo.socials || {}),
                              facebook: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                      placeholder="https://facebook.com/almahltransport"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">رابط الانستقرام (Instagram)</label>
                    <input
                      type="text"
                      value={editableData.contactInfo.socials?.instagram || ''}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          contactInfo: {
                            ...editableData.contactInfo,
                            socials: {
                              ...(editableData.contactInfo.socials || {}),
                              instagram: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                      placeholder="https://instagram.com/almahl_transport"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">رابط التويتر / X (Twitter)</label>
                    <input
                      type="text"
                      value={editableData.contactInfo.socials?.twitter || ''}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          contactInfo: {
                            ...editableData.contactInfo,
                            socials: {
                              ...(editableData.contactInfo.socials || {}),
                              twitter: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                      placeholder="https://twitter.com/almahl_transport"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SEO Settings */}
          {activeTab === 'seo' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-3xl">
              <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                إعدادات محركات البحث (SEO & Meta Tags)
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">عنوان الصفحة (Meta Title)</label>
                <input
                  type="text"
                  value={editableData.seo.siteTitle}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      seo: { ...editableData.seo, siteTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">وصف الصفحة (Meta Description)</label>
                <textarea
                  rows={3}
                  value={editableData.seo.metaDescription}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      seo: { ...editableData.seo, metaDescription: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الكلمات المفتاحية (مفصولة بفاصلة)</label>
                <input
                  type="text"
                  value={editableData.seo.keywords.join(', ')}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      seo: {
                        ...editableData.seo,
                        keywords: e.target.value.split(',').map((k) => k.trim()),
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">اسم المنشأة في Schema.org</label>
                <input
                  type="text"
                  value={editableData.seo.schemaOrgName}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      seo: { ...editableData.seo, schemaOrgName: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB 7: Security PIN & Credentials */}
          {activeTab === 'security' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 max-w-md">
              <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                <Key className="w-5 h-5" />
                تغيير بيانات الدخول للوحة التحكم
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم المستخدم (Username)</label>
                <input
                  type="text"
                  value={editableData.adminUsername || 'almhal'}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      adminUsername: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
                  placeholder="almhal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">كلمة المرور الجديدة (Password)</label>
                <input
                  type="text"
                  value={editableData.adminPassword || editableData.adminPin || 'almhal!@#123'}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      adminPassword: e.target.value,
                      adminPin: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none font-mono"
                  placeholder="almhal!@#123"
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                تأكد من حفظ البيانات واحتفاظك باسم المستخدم وكلمة المرور في مكان آمن لاستخدامهما عند دخول رابط الإدارة مستقبلاً.
              </p>
            </div>
          )}

        </main>
      </div>

      {/* Edit Service Modal Dialog */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-lg">
                {isNewService ? 'إضافة خدمة جديدة' : 'تعديل الخدمة'}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {/* Service Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">اسم الخدمة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: نقل البركسات والمباني الجاهزة"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Service Category */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">تصنيف الخدمة *</label>
                <input
                  type="text"
                  placeholder="مثال: نقل بركسات، نقل حاويات..."
                  value={editingService.category || ''}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {['نقل بركسات', 'نقل حاويات', 'نقل صبيات', 'نقل حديد', 'نقل طاقة', 'نقل تكييف', 'نقل عام'].map((catPreset) => (
                    <button
                      type="button"
                      key={catPreset}
                      onClick={() => setEditingService({ ...editingService, category: catPreset })}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 border border-slate-800 text-[11px] rounded-lg transition-colors cursor-pointer"
                    >
                      + {catPreset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Short Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الوصف المختصر *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="وصف مختصر ومباشر يظهر في بطاقة الخدمة..."
                  value={editingService.shortDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              {/* Service Image Upload & URL */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <label className="block text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                  <Image className="w-4 h-4" />
                  <span>صورة الخدمة 📸</span>
                </label>

                {/* Image Preview */}
                {editingService.imageUrl && (
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img
                      src={editingService.imageUrl}
                      alt="معاينة الخدمة"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-[10px] text-emerald-400 font-bold rounded-lg border border-slate-800">
                      معاينة الصورة الحالية ✅
                    </div>
                  </div>
                )}

                {/* Upload File Input */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>رفع صورة من الجهاز</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleServiceImageUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-slate-500">أو</span>

                  <input
                    type="text"
                    placeholder="ضع رابط صورة (URL)..."
                    value={editingService.imageUrl || ''}
                    onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                    className="flex-1 w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={!!editingService.popular}
                  onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="popularCheck" className="text-xs font-bold text-slate-300 cursor-pointer">
                  تمييز كـ "خدمة شائعة 🔥" في الواجهة
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveService}
                className="px-5 py-2 bg-amber-500 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-400"
              >
                حفظ الخدمة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Item Edit Modal */}
      {editingGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-base">
                {isNewGalleryItem ? 'إضافة صورة جديدة لمعرض الأعمال' : 'تعديل صورة معرض الأعمال'}
              </h3>
              <button
                onClick={() => setEditingGalleryItem(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان العملية / الصورة *</label>
                <input
                  type="text"
                  value={editingGalleryItem.title || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium focus:border-amber-500 outline-none"
                  placeholder="مثال: نقل أسطول بركسات ومكاتب متنقلة"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">التصنيف *</label>
                <select
                  value={editingGalleryItem.category || 'نقل البركسات'}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium focus:border-amber-500 outline-none cursor-pointer"
                >
                  <option value="نقل البركسات">نقل البركسات</option>
                  <option value="نقل الحاويات">نقل الحاويات</option>
                  <option value="النقل الثقيل">النقل الثقيل</option>
                  <option value="نقل الصبيات">نقل الصبيات</option>
                  <option value="نقل المعدات">نقل المعدات</option>
                  <option value="عام">عام</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">صورة العملية *</label>
                
                {/* Upload Image Button */}
                <div className="flex items-center gap-3 mb-2">
                  <label className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-extrabold cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>رفع صورة من الجهاز</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">أو ألصق رابط الصورة أدناه</span>
                </div>

                <input
                  type="text"
                  value={editingGalleryItem.imageUrl || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium focus:border-amber-500 outline-none"
                  placeholder="رابط الصورة (https://...)"
                />

                {editingGalleryItem.imageUrl && (
                  <div className="mt-2 h-32 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img src={editingGalleryItem.imageUrl} alt="معاينة" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">وصف مختصر للعملية (اختياري)</label>
                <textarea
                  rows={2}
                  value={editingGalleryItem.description || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium focus:border-amber-500 outline-none"
                  placeholder="وصف إضافي لعملية النقل، التجهيزات والموقع..."
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingGalleryItem(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveGalleryItem}
                className="px-5 py-2 bg-amber-500 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-400 cursor-pointer"
              >
                حفظ الصورة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Request View Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-lg">تفاصيل الطلب #{selectedRequest.id.slice(-6)}</h3>
              <button onClick={() => setSelectedRequest(null)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <div className="font-extrabold text-amber-400 text-sm">{selectedRequest.customerName}</div>
                <div>رقم الجوال: <span dir="ltr">{selectedRequest.phone}</span></div>
                <div>تاريخ الطلب: {new Date(selectedRequest.createdAt).toLocaleString('ar-SA')}</div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-400">الخدمة: <span className="text-white">{selectedRequest.serviceType}</span></div>
                {selectedRequest.pickupLocation && <div>موقع التحميل: {selectedRequest.pickupLocation}</div>}
                {selectedRequest.deliveryLocation && <div>الوجهة: {selectedRequest.deliveryLocation}</div>}
                {selectedRequest.cargoDetails && <div>تفاصيل الشحنة: {selectedRequest.cargoDetails}</div>}
                {selectedRequest.notes && <div>ملاحظات العميل: {selectedRequest.notes}</div>}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
