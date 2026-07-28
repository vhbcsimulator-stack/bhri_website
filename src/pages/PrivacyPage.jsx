import LegalPageLayout from '../components/LegalPageLayout';
import { PageLoader, PageLoadError } from '../components/PageState';
import { usePrivacyContent } from '../hooks/useContentQueries';
import useSeo from '../hooks/useSeo';

export default function PrivacyPage() {
  const { data: content, isPending, isError, refetch } = usePrivacyContent();

  useSeo({
    title: 'Privacy Policy',
    description: 'Privacy Policy for Bright Hermosa Realty Inc. (BHRI). Learn how we collect, protect, and use your personal information.',
    keywords: 'Bright Hermosa privacy policy, BHRI privacy, data privacy real estate'
  });

  if (isError) return <PageLoadError onRetry={refetch} />;
  if (isPending || !content) return <PageLoader />;

  return <LegalPageLayout content={content} />;
}
