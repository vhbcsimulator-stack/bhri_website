import LegalPageLayout from '../components/LegalPageLayout';
import { cookiesContentData } from '../data/cookiesContentData';
import { useCookiesContent } from '../hooks/useContentQueries';

export default function CookiesPage() {
  const { data: content = cookiesContentData } = useCookiesContent();

  return <LegalPageLayout content={content} />;
}
