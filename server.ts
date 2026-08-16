import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { defaultSiteData } from './src/data/defaultData';
import { SiteData, ContactRequest } from './src/types';

const DATA_FILE_PATH = path.join(process.cwd(), 'siteDataPersistent.json');
const REQUESTS_FILE_PATH = path.join(process.cwd(), 'contactRequestsPersistent.json');

// Helper to load stored data or write default
function loadSiteData(): SiteData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return { ...defaultSiteData, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Error reading siteDataPersistent.json, falling back to defaults', e);
  }
  return defaultSiteData;
}

function saveSiteData(data: SiteData): boolean {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving siteDataPersistent.json', e);
    return false;
  }
}

function loadContactRequests(): ContactRequest[] {
  try {
    if (fs.existsSync(REQUESTS_FILE_PATH)) {
      const raw = fs.readFileSync(REQUESTS_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading contactRequestsPersistent.json', e);
  }
  return [];
}

function saveContactRequests(requests: ContactRequest[]): boolean {
  try {
    fs.writeFileSync(REQUESTS_FILE_PATH, JSON.stringify(requests, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving contactRequestsPersistent.json', e);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Prevent browser caching on API routes so updates from PC immediately reflect on Mobile
  app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });

  // API Route: GET /api/site-data
  app.get('/api/site-data', (req, res) => {
    const data = loadSiteData();
    res.json(data);
  });

  // API Route: POST /api/site-data
  app.post('/api/site-data', (req, res) => {
    const updated = req.body as SiteData;
    if (!updated) {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    const success = saveSiteData(updated);
    res.json({ success });
  });

  // API Route: GET /api/contact-requests
  app.get('/api/contact-requests', (req, res) => {
    const reqs = loadContactRequests();
    res.json(reqs);
  });

  // API Route: POST /api/contact-requests
  app.post('/api/contact-requests', (req, res) => {
    const newReq = req.body as ContactRequest;
    if (!newReq || !newReq.customerName || !newReq.phone) {
      return res.status(400).json({ error: 'Name and phone required' });
    }

    const currentReqs = loadContactRequests();
    const fullReq: ContactRequest = {
      ...newReq,
      id: newReq.id || 'req-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      createdAt: newReq.createdAt || new Date().toISOString(),
      status: newReq.status || 'new',
    };

    saveContactRequests([fullReq, ...currentReqs]);
    res.json({ success: true, id: fullReq.id });
  });

  // API Route: PATCH /api/contact-requests/:id
  app.patch('/api/contact-requests/:id', (req, res) => {
    const reqId = req.params.id;
    const { status } = req.body;
    const currentReqs = loadContactRequests();
    const updated = currentReqs.map((r) => (r.id === reqId ? { ...r, status } : r));
    saveContactRequests(updated);
    res.json({ success: true });
  });

  // SEO Route: /sitemap.xml
  app.get('/sitemap.xml', (req, res) => {
    const data = loadSiteData();
    const baseUrl = process.env.APP_URL || 'https://almahl-transport.com';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

    xml += `\n</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // SEO Route: /robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://almahl-transport.com';
    const content = `User-agent: *
Allow: /
Disallow: /admin-login
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(content);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
