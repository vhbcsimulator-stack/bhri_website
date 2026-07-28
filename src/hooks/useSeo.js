import { useEffect } from 'react';

/**
 * Custom React hook to dynamically manage document metadata and Open Graph tags for SEO.
 * @param {Object} options
 * @param {string} options.title - The title prefix for the page.
 * @param {string} [options.description] - Page-specific meta description.
 * @param {string} [options.keywords] - Page-specific meta keywords.
 * @param {string} [options.image] - Custom Open Graph image URL.
 * @param {string} [options.url] - Canonical URL override.
 */
export default function useSeo({ title, description, keywords, image, url }) {
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

    // 2. Set Meta Description & Keywords
    updateMetaTag('name', 'description', description || defaultDesc);
    updateMetaTag('name', 'keywords', keywords || defaultKeywords);
    
    // 3. Set Open Graph (Social Media Cards) Tags
    updateMetaTag('property', 'og:title', title ? `${title} | ${siteTitle}` : siteTitle);
    updateMetaTag('property', 'og:description', description || defaultDesc);
    if (image) {
      updateMetaTag('property', 'og:image', image);
    }
    
    const currentUrl = url || window.location.href;
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:site_name', 'Bright Hermosa Realty');
    
    // 4. Set Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

  }, [title, description, keywords, image, url]);
}
