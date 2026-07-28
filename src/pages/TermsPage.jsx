import LegalPageLayout from '../components/LegalPageLayout';
import { termsContentData } from '../data/termsContentData';
import { useTermsContent } from '../hooks/useContentQueries';

export default function TermsPage() {
  const { data: content = termsContentData } = useTermsContent();

  return <LegalPageLayout content={content} />;
}
