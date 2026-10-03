import { supabase } from '../config/supabase.js';

const mapCreator = (creator) => ({
  id: creator.id,
  name: creator.name,
  email: creator.email,
  bio: creator.bio || '',
  primaryNiche: creator.niche || '',
  socialHandles: creator.social_handles || {},
  createdAt: creator.created_at,
});

const mapDigitalTwin = (twin) => ({
  twinId: twin.id,
  creatorId: twin.creator_id,
  creatorName: twin.creator_name || '',
  niche: twin.niche || '',
  targetAudience: twin.target_audience || {},
  tone: twin.tone_details || {},
  preferredPlatforms: twin.platforms || [],
  contentStyle: twin.content_style_details || {},
  interests: twin.interests || [],
  preferences: twin.preferences || {},
  pastContentReference: twin.past_content_reference || [],
  lastUpdated: twin.last_updated || twin.created_at,
});

export const creatorService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data.map(mapCreator);
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return data ? mapCreator(data) : null;
  },

  create: async (data) => {
    const { data: creator, error } = await supabase
      .from('creators')
      .insert({
        name: data.name,
        email: data.email,
        bio: data.bio || '',
        niche: data.primaryNiche,
        social_handles: data.socialHandles || {},
      })
      .select()
      .single();

    if (error) throw error;

    const { error: twinError } = await supabase
      .from('digital_twins')
      .insert({
        creator_id: creator.id,
        creator_name: creator.name,
        niche: creator.niche,
        target_audience: {
          demographic: `People interested in ${creator.niche}`,
          painPoints: [
            'Looking for actionable advice',
            'Needs clear examples'
          ],
          skillLevel: 'Beginner',
        },
        tone: 'friendly',
        tone_details: {
          primary: 'friendly',
          attributes: ['approachable', 'informative', 'encouraging'],
        },
        platforms: ['instagram', 'youtube', 'linkedin'],
        interests: [creator.niche],
        content_style: 'Fast and clear',
        content_style_details: {
          hookStyle: 'Direct question or intriguing insight',
          pacing: 'Fast and clear',
          visualAesthetics: 'Clean modern design',
          signaturePhrases: ['Let’s dive in!'],
        },
        preferences: {
          emojiDensity: 'moderate',
          defaultVideoFormat: '9:16 vertical reel',
          callToAction: 'Follow for more insights',
          hashtagStrategy: '5 niche tags',
        },
        past_content_reference: [],
        last_updated: new Date().toISOString(),
      });

    if (twinError) throw twinError;

    return mapCreator(creator);
  },

  getDigitalTwin: async (creatorId) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('creator_id', creatorId)
      .maybeSingle();

    if (error) throw error;

    return data ? mapDigitalTwin(data) : null;
  },
};
