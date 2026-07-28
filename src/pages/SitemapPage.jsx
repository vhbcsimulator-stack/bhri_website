import LegalPageLayout from '../components/LegalPageLayout';
import { PageLoader, PageLoadError } from '../components/PageState';
import { useSitemapContent } from '../hooks/useContentQueries';
import useSeo from '../hooks/useSeo';

export default function SitemapPage() {
  const { data: content, isPending, isError, refetch } = useSitemapContent();

  useSeo({
    title: 'Sitemap',
    description: 'Find all pages, luxury leisure farm properties, and career opportunities at Bright Hermosa Realty Inc. (BHRI) through our visual sitemap.',
    keywords: 'Bright Hermosa sitemap, BHRI pages, properties list sitemap, real estate map'
  });

  if (isError) return <PageLoadError onRetry={refetch} />;
  if (isPending || !content) return <PageLoader />;

  return <LegalPageLayout content={content} />;
}
