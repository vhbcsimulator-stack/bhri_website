import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Helper to load env vars from .env file manually
const loadEnv = () => {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Remove surrounding quotes if any
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
};

loadEnv();

// Base URL (VITE_SITE_URL in .env, fallback to default production domain)
const siteUrl = process.env.VITE_SITE_URL || 'https://bhri.com.ph';
console.log(`Generating sitemaps for site URL: ${siteUrl}`);

const publicDir = path.resolve(__dirname, '../public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 2. Read everything from Supabase. There is no static fallback: emitting a
// sitemap built from stale bundled data would publish wrong URLs, so a failed
// fetch fails the build instead.
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabaseGet = async (query) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required to generate the sitemaps.');
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/${query}`, {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  });

  if (!res.ok) {
    throw new Error(`Supabase request "${query}" failed with status ${res.status}: ${await res.text()}`);
  }

  return res.json();
};

const fetchProperties = async () => {
  console.log('Fetching live properties from Supabase database...');
  const rows = await supabaseGet('properties?select=id,updated_at&order=created_at.asc');
  console.log(`Fetched ${rows.length} active properties from Supabase.`);

  return rows.map(p => ({
    id: p.id,
    updatedAt: p.updated_at ? p.updated_at.split('T')[0] : new Date().toISOString().split('T')[0]
  }));
};

const fetchCareerRoles = async () => {
  console.log('Fetching live career roles from Supabase database...');
  const rows = await supabaseGet('site_content?select=content&id=eq.career');
  const roles = rows[0]?.content?.roles?.items ?? [];
  console.log(`Fetched ${roles.length} career roles from Supabase.`);

  return roles;
};

const main = async () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [properties, roles] = await Promise.all([fetchProperties(), fetchCareerRoles()]);

  // A. Generate sitemap_index.xml
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-main.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-properties.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-careers.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexXml.trim());
  console.log('Created: public/sitemap_index.xml');

  // B. Generate sitemap-main.xml
  const mainPages = [
    { path: '', changefreq: 'weekly', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/properties', changefreq: 'weekly', priority: '0.9' },
    { path: '/careers', changefreq: 'monthly', priority: '0.7' },
    { path: '/contact', changefreq: 'monthly', priority: '0.8' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms', changefreq: 'yearly', priority: '0.3' },
    { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
    { path: '/sitemap', changefreq: 'monthly', priority: '0.4' }
  ];

  const sitemapMainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), sitemapMainXml.trim());
  console.log('Created: public/sitemap-main.xml');

  // C. Generate sitemap-properties.xml
  const sitemapPropertiesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${properties.map(p => `  <url>
    <loc>${siteUrl}/properties/${p.id}</loc>
    <lastmod>${p.updatedAt || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap-properties.xml'), sitemapPropertiesXml.trim());
  console.log('Created: public/sitemap-properties.xml');

  // D. Generate sitemap-careers.xml
  const sitemapCareersXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${roles.map(role => `  <url>
    <loc>${siteUrl}/careers/${role.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap-careers.xml'), sitemapCareersXml.trim());
  console.log('Created: public/sitemap-careers.xml');

  // E. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap_index.xml
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim());
  console.log('Created: public/robots.txt');

  console.log('All sitemap files and robots.txt have been generated successfully.');
};

main().catch(err => {
  console.error('Fatal error generating sitemaps:', err);
  process.exit(1);
});
