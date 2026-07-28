import { useQuery } from '@tanstack/react-query';
import { fetchPageContent } from '../data/contentStore';
import { getAllProperties, getPropertyById } from '../data/propertiesManager';

// Every page reads its content straight from Supabase, cached by React Query.
const pageContentQuery = (pageId) => ({
  queryKey: ['content', pageId],
  queryFn: () => fetchPageContent(pageId),
});

export const useHomeContent = () => useQuery(pageContentQuery('home'));

export const useAboutContent = () => useQuery(pageContentQuery('about'));

export const useCareerContent = () => useQuery(pageContentQuery('career'));

export const useContactContent = () => useQuery(pageContentQuery('contact'));

export const usePrivacyContent = () => useQuery(pageContentQuery('privacy'));

export const useTermsContent = () => useQuery(pageContentQuery('terms'));

export const useCookiesContent = () => useQuery(pageContentQuery('cookies'));

export const useSitemapContent = () => useQuery(pageContentQuery('sitemap'));

export const useProperties = () =>
  useQuery({ queryKey: ['properties'], queryFn: getAllProperties });

export const usePropertyById = (id) =>
  useQuery({
    queryKey: ['properties', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });
