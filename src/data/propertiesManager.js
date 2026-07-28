import { supabase } from '../supabaseClient';

// Map database column names (snake_case) to client properties (camelCase)
const mapDbToProperty = (dbRow) => {
  if (!dbRow) return null;
  return {
    id: dbRow.id,
    title: dbRow.title,
    subtitle: dbRow.subtitle,
    heroImage: dbRow.hero_image,
    location: dbRow.location,
    locationFull: dbRow.location_full,
    badgeLocation: dbRow.badge_location,
    badgeStatus: dbRow.badge_status,
    type: dbRow.type,
    typeFull: dbRow.type_full,
    cardImage: dbRow.card_image,
    description: dbRow.description,
    iconName: dbRow.icon_name,
    highlightText: dbRow.highlight_text,
    intro: dbRow.intro,
    facilities: dbRow.facilities,
    developments: dbRow.developments,
    investment: dbRow.investment
  };
};

// Properties come from Supabase only, cached by React Query. A failed request
// rejects so the caller can show an error instead of bundled placeholder data.
export const getAllProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;

  return (data || []).map(mapDbToProperty);
};

export const getPropertyById = async (id) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return mapDbToProperty(data);
};
