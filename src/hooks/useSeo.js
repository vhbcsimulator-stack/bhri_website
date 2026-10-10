import { useEffect } from 'react';

/**
 * Custom React hook to dynamically manage document metadata, Open Graph, Twitter, and JSON-LD structured data for SEO.
 * @param {Object} options
 * @param {string} options.title - The title prefix for the page.
 * @param {string} [options.description] - Page-specific meta description.
 * @param {string} [options.keywords] - Page-specific meta keywords.
 * @param {string} [options.image] - Custom Open Graph image URL.
 * @param {string} [options.url] - Canonical URL override.
 * @param {string} [options.type] - og:type override (e.g. 'article', 'website').
 * @param {Object} [options.structuredData] - JSON-LD Schema.org object.
 */
export default function useSeo({ title, description, keywords, image, url, type = 'website', structuredData }) {
  useEffect(() => {
    // 1. Set Document Title
    const siteTitle = 'Bright Hermosa Realty Inc.';
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Premium Real Estate`;
    document.title = fullTitle;

    // Helper to safely select/create and update/set a meta tag in document head
    const updateMetaTag = (attrName, attrVal, content) => {
      if (content === undefined || content === null) return;
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Default fallbacks for main pages
    const defaultDesc = 'Bright Hermosa Realty Inc. (BHRI) is a premier real estate developer offering luxury leisure farm lots and mountain view resort communities in Cavite and Batangas.';
    const defaultKeywords = 'Bright Hermosa Realty, BHRI, luxury farm communities, leisure farm lots, Cavite properties, Batangas properties, East West Breeze, Mountain View Nasugbu';

    const effectiveDesc = description || defaultDesc;
    const effectiveKeywords = keywords || defaultKeywords;

    // 2. Set Meta Description & Keywords
    updateMetaTag('name', 'description', effectiveDesc);
    updateMetaTag('name', 'keywords', effectiveKeywords);
    
    // 3. Set Open Graph (Social Media Cards) Tags
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:title', title ? `${title} | ${siteTitle}` : siteTitle);
    updateMetaTag('property', 'og:description', effectiveDesc);
    if (image) {
      updateMetaTag('property', 'og:image', image);
    }
    
    const currentUrl = url || window.location.href;
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:site_name', 'Bright Hermosa Realty');
    
    // 4. Set Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title ? `${title} | ${siteTitle}` : siteTitle);
    updateMetaTag('name', 'twitter:description', effectiveDesc);
    if (image) {
      updateMetaTag('name', 'twitter:image', image);
    }

    // 5. Set Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 6. JSON-LD Structured Data
    const SCRIPT_ID = 'seo-structured-data';
    let scriptTag = document.getElementById(SCRIPT_ID);

    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup script tag on unmount if appropriate
      const existing = document.getElementById(SCRIPT_ID);
      if (existing) existing.remove();
    };

  }, [title, description, keywords, image, url, type, structuredData]);
}
