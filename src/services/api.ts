import { SiteData, ContactRequest, ServiceItem, SeoSettings } from '../types';
import { defaultSiteData } from '../data/defaultData';

const LOCAL_STORAGE_KEY = 'almahl_transport_site_data_v3';
const CONTACT_REQUESTS_KEY = 'almahl_transport_contact_requests_v2';
const ADMIN_TOKEN_KEY = 'almahl_transport_admin_token';

// Helper to get initial local storage fallback
export function getStoredSiteData(): SiteData {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge in case new properties were added
      return {
        ...defaultSiteData,
        ...parsed,
        hero: { ...defaultSiteData.hero, ...(parsed.hero || {}) },
        about: { ...defaultSiteData.about, ...(parsed.about || {}) },
        contactInfo: { ...defaultSiteData.contactInfo, ...(parsed.contactInfo || {}) },
        seo: { ...defaultSiteData.seo, ...(parsed.seo || {}) },
        services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : defaultSiteData.services,
        features: Array.isArray(parsed.features) && parsed.features.length > 0 ? parsed.features : defaultSiteData.features,
        stats: Array.isArray(parsed.stats) && parsed.stats.length > 0 ? parsed.stats : defaultSiteData.stats,
      };
    }
  } catch (e) {
    console.warn('Failed to parse local site data, using defaults', e);
  }
  return defaultSiteData;
}

export function saveLocalSiteData(data: SiteData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving site data locally', e);
  }
}

// Fetch site data from Server or Local fallback
export async function fetchSiteData(): Promise<SiteData> {
  try {
    const res = await fetch(`/api/site-data?_t=${Date.now()}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    if (res.ok) {
      const data = await res.json();
      saveLocalSiteData(data);
      return data;
    }
  } catch (e) {
    console.info('Server API offline, using cached or default data', e);
  }
  return getStoredSiteData();
}

// Update site data
export async function updateSiteData(updatedData: SiteData, pin?: string): Promise<boolean> {
  // Save locally first for instant feedback
  saveLocalSiteData(updatedData);

  try {
    const res = await fetch('/api/site-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': pin || localStorage.getItem(ADMIN_TOKEN_KEY) || '',
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      return true;
    } else {
      console.error('Server rejected site data save', res.status, res.statusText);
      return false;
    }
  } catch (e) {
    console.error('Server save failed due to network or connection issue', e);
    return false;
  }
}

// Fetch contact/quote requests
export async function fetchContactRequests(): Promise<ContactRequest[]> {
  try {
    const res = await fetch(`/api/contact-requests?_t=${Date.now()}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    if (res.ok) {
      const requests = await res.json();
      localStorage.setItem(CONTACT_REQUESTS_KEY, JSON.stringify(requests));
      return requests;
    }
  } catch (e) {
    console.warn('Using local contact requests cache');
  }

  try {
    const local = localStorage.getItem(CONTACT_REQUESTS_KEY);
    return local ? JSON.parse(local) : [];
  } catch {
    return [];
  }
}

// Submit a new service quote or contact request
export async function submitContactRequest(
  newReq: Omit<ContactRequest, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id: string }> {
  const fullReq: ContactRequest = {
    ...newReq,
    id: 'req-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // Save to local storage list
  try {
    const existing = await fetchContactRequests();
    const updated = [fullReq, ...existing];
    localStorage.setItem(CONTACT_REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error caching request locally', e);
  }

  try {
    const res = await fetch('/api/contact-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullReq),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, id: data.id || fullReq.id };
    }
  } catch (e) {
    console.warn('Server endpoint offline, request saved locally', e);
  }

  return { success: true, id: fullReq.id };
}

// Update status of a contact request (admin)
export async function updateRequestStatus(id: string, status: ContactRequest['status']): Promise<boolean> {
  try {
    const existing = await fetchContactRequests();
    const updated = existing.map((r) => (r.id === id ? { ...r, status } : r));
    localStorage.setItem(CONTACT_REQUESTS_KEY, JSON.stringify(updated));

    await fetch(`/api/contact-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  } catch (e) {
    console.warn('Updated status locally');
  }
  return true;
}

// Admin auth verify
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const currentData = await fetchSiteData();
  const expectedUser = currentData.adminUsername || 'almhal';
  const expectedPass = currentData.adminPassword || currentData.adminPin || 'almhal!@#123';

  const valid = username.trim() === expectedUser && password.trim() === expectedPass;
  if (valid) {
    localStorage.setItem(ADMIN_TOKEN_KEY, `${username.trim()}:${password.trim()}`);
  }
  return valid;
}

export async function verifyAdminPin(pin: string): Promise<boolean> {
  const currentData = await fetchSiteData();
  const expectedPass = currentData.adminPassword || currentData.adminPin || 'almhal!@#123';
  const valid = pin.trim() === expectedPass || pin.trim() === (currentData.adminPin || '');
  if (valid) {
    localStorage.setItem(ADMIN_TOKEN_KEY, pin);
  }
  return valid;
}

export function isAdminAuthenticated(): boolean {
  return !!localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}
