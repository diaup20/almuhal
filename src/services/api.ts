import { SiteData, ContactRequest } from '../types';
import { defaultSiteData } from '../data/defaultData';
import {
  db,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
} from './firebase';

const LOCAL_STORAGE_KEY = 'almahl_transport_site_data_v3';
const CONTACT_REQUESTS_KEY = 'almahl_transport_contact_requests_v2';
const ADMIN_TOKEN_KEY = 'almahl_transport_admin_token';

// Firestore collection & document identifiers
const SITE_DOC_COLLECTION = 'site_settings';
const SITE_DOC_ID = 'main_config';
const REQUESTS_COLLECTION = 'contact_requests';

// Helper to get initial local storage fallback
export function getStoredSiteData(): SiteData {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
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

// Fetch site data from Firebase Cloud Firestore (works everywhere on Vercel, Mobile, PC)
export async function fetchSiteData(): Promise<SiteData> {
  // 1. Try Firebase Firestore Cloud Database
  try {
    const docRef = doc(db, SITE_DOC_COLLECTION, SITE_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const cloudData = docSnap.data() as SiteData;
      const merged: SiteData = {
        ...defaultSiteData,
        ...cloudData,
        hero: { ...defaultSiteData.hero, ...(cloudData.hero || {}) },
        about: { ...defaultSiteData.about, ...(cloudData.about || {}) },
        contactInfo: { ...defaultSiteData.contactInfo, ...(cloudData.contactInfo || {}) },
        seo: { ...defaultSiteData.seo, ...(cloudData.seo || {}) },
        services: Array.isArray(cloudData.services) && cloudData.services.length > 0 ? cloudData.services : defaultSiteData.services,
        features: Array.isArray(cloudData.features) && cloudData.features.length > 0 ? cloudData.features : defaultSiteData.features,
        stats: Array.isArray(cloudData.stats) && cloudData.stats.length > 0 ? cloudData.stats : defaultSiteData.stats,
      };
      saveLocalSiteData(merged);
      return merged;
    } else {
      // First-time cloud init: seed defaultSiteData into Firestore
      await setDoc(docRef, defaultSiteData);
    }
  } catch (firestoreError) {
    console.warn('Firestore fetch failed, checking server API or local storage', firestoreError);
  }

  // 2. Fallback to Express API if running on custom server
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

// Update site data: Saves directly to Firebase Cloud Firestore & local cache & server API
export async function updateSiteData(updatedData: SiteData, pin?: string): Promise<boolean> {
  // Save locally first for instant feedback
  saveLocalSiteData(updatedData);

  let success = false;

  // 1. Save to Firebase Firestore Cloud (Accessible from any device, anywhere)
  try {
    const docRef = doc(db, SITE_DOC_COLLECTION, SITE_DOC_ID);
    await setDoc(docRef, updatedData);
    success = true;
  } catch (cloudErr) {
    console.error('Firestore save failed', cloudErr);
  }

  // 2. Also save to server API (if available)
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
      success = true;
    }
  } catch (serverErr) {
    console.info('Custom server save skipped or offline (using cloud database)');
  }

  return success || true;
}

// Fetch contact/quote requests from Cloud Firestore & server
export async function fetchContactRequests(): Promise<ContactRequest[]> {
  // 1. Fetch from Firestore
  try {
    const colRef = collection(db, REQUESTS_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const requests: ContactRequest[] = [];
      snapshot.forEach((d) => {
        requests.push({ id: d.id, ...(d.data() as Omit<ContactRequest, 'id'>) });
      });
      localStorage.setItem(CONTACT_REQUESTS_KEY, JSON.stringify(requests));
      return requests;
    }
  } catch (e) {
    console.warn('Firestore requests fetch failed, trying local/server', e);
  }

  // 2. Try Server API
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

  // 3. Fallback to local storage
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
  const generatedId = 'req-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const fullReq: ContactRequest = {
    ...newReq,
    id: generatedId,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // 1. Save to Firestore Cloud
  try {
    const docRef = doc(db, REQUESTS_COLLECTION, generatedId);
    await setDoc(docRef, fullReq);
  } catch (firestoreErr) {
    console.warn('Could not save contact request to Firestore directly', firestoreErr);
  }

  // 2. Save to local storage list
  try {
    const existing = await fetchContactRequests();
    const updated = [fullReq, ...existing.filter((r) => r.id !== fullReq.id)];
    localStorage.setItem(CONTACT_REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error caching request locally', e);
  }

  // 3. Save to server API if available
  try {
    await fetch('/api/contact-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullReq),
    });
  } catch (e) {
    console.info('Server API offline, request saved to Cloud Firestore / locally');
  }

  return { success: true, id: fullReq.id };
}

// Update status of a contact request (admin)
export async function updateRequestStatus(id: string, status: ContactRequest['status']): Promise<boolean> {
  // Update in Firestore
  try {
    const docRef = doc(db, REQUESTS_COLLECTION, id);
    await updateDoc(docRef, { status });
  } catch (e) {
    console.warn('Could not update Firestore request status', e);
  }

  // Update locally
  try {
    const existing = await fetchContactRequests();
    const updated = existing.map((r) => (r.id === id ? { ...r, status } : r));
    localStorage.setItem(CONTACT_REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Error updating local storage', e);
  }

  // Update in server API
  try {
    await fetch(`/api/contact-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  } catch (e) {
    console.info('Server API offline');
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
