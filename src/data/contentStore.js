import { supabase } from '../supabaseClient';

// Supabase is the single source of truth for page content. There is no local
// or bundled fallback: a failed request rejects so React Query keeps the page
// in its error state instead of silently rendering stale copy.
export const fetchPageContent = async (pageId) => {
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', pageId)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.content) {
    throw new Error(`No site content stored for page "${pageId}".`);
  }

  return data.content;
};
