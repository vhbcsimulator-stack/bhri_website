import LegalPageLayout from '../components/LegalPageLayout';
import { PageLoader, PageLoadError } from '../components/PageState';
import { useTermsContent } from '../hooks/useContentQueries';
import useSeo from '../hooks/useSeo';

export default function TermsPage() {
  const { data: content, isPending, isError, refetch } = useTermsContent();

  useSeo({
    title: 'Terms of Service',
    description: 'Terms of Service and conditions for using the Bright Hermosa Realty Inc. (BHRI) website and property services.',
    keywords: 'Bright Hermosa terms of service, BHRI terms, real estate terms and conditions'
  });

  if (isError) return <PageLoadError onRetry={refetch} />;
  if (isPending || !content) return <PageLoader />;

  return <LegalPageLayout content={content} />;
}
