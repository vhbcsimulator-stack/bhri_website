import { useQuery } from '@tanstack/react-query';
import { getHomeContent } from '../data/homeContentManager';
import { getAboutContent } from '../data/aboutContentManager';
import { getCareerContent } from '../data/careerContentManager';
import { getContactContent } from '../data/contactContentManager';
import { getPrivacyContent } from '../data/privacyContentManager';
import { getTermsContent } from '../data/termsContentManager';
import { getCookiesContent } from '../data/cookiesContentManager';
import { getSitemapContent } from '../data/sitemapContentManager';
import { getAllProperties, getPropertyById } from '../data/propertiesManager';

export const useHomeContent = () =>
  useQuery({ queryKey: ['content', 'home'], queryFn: getHomeContent });

export const useAboutContent = () =>
  useQuery({ queryKey: ['content', 'about'], queryFn: getAboutContent });

export const useCareerContent = () =>
  useQuery({ queryKey: ['content', 'career'], queryFn: getCareerContent });

export const useContactContent = () =>
  useQuery({ queryKey: ['content', 'contact'], queryFn: getContactContent });

export const usePrivacyContent = () =>
  useQuery({ queryKey: ['content', 'privacy'], queryFn: getPrivacyContent });

export const useTermsContent = () =>
  useQuery({ queryKey: ['content', 'terms'], queryFn: getTermsContent });

export const useCookiesContent = () =>
  useQuery({ queryKey: ['content', 'cookies'], queryFn: getCookiesContent });

export const useSitemapContent = () =>
  useQuery({ queryKey: ['content', 'sitemap'], queryFn: getSitemapContent });

export const useProperties = () =>
  useQuery({ queryKey: ['properties'], queryFn: getAllProperties });

export const usePropertyById = (id) =>
  useQuery({
    queryKey: ['properties', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });
