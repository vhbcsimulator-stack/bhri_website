import LegalPageLayout from '../components/LegalPageLayout';
import { PageLoader, PageLoadError } from '../components/PageState';
import { useCookiesContent } from '../hooks/useContentQueries';
import useSeo from '../hooks/useSeo';

export default function CookiesPage() {
  const { data: content, isPending, isError, refetch } = useCookiesContent();

  useSeo({
    title: 'Cookie Policy',
    description: 'Cookie Policy for Bright Hermosa Realty Inc. (BHRI). Learn how we use cookies to improve your user experience on our website.',
    keywords: 'Bright Hermosa cookie policy, BHRI cookies, website cookie settings'
  });

  if (isError) return <PageLoadError onRetry={refetch} />;
  if (isPending || !content) return <PageLoader />;

  return <LegalPageLayout content={content} />;
}
