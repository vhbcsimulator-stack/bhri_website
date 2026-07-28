import LegalPageLayout from '../components/LegalPageLayout';
import { sitemapContentData } from '../data/sitemapContentData';
import { useSitemapContent } from '../hooks/useContentQueries';
import useSeo from '../hooks/useSeo';

export default function SitemapPage() {
  const { data: content = sitemapContentData } = useSitemapContent();

  useSeo({
    title: 'Sitemap',
    description: 'Find all pages, luxury leisure farm properties, and career opportunities at Bright Hermosa Realty Inc. (BHRI) through our visual sitemap.',
    keywords: 'Bright Hermosa sitemap, BHRI pages, properties list sitemap, real estate map'
  });

  return <LegalPageLayout content={content} />;
}
