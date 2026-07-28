import LegalPageLayout from '../components/LegalPageLayout';
import { privacyContentData } from '../data/privacyContentData';
import { usePrivacyContent } from '../hooks/useContentQueries';

export default function PrivacyPage() {
  const { data: content = privacyContentData } = usePrivacyContent();

  return <LegalPageLayout content={content} />;
}
