import { supabase } from '../config/supabase.js';

const mapContent = (content) => ({
  contentId: content.id,
  creatorId: content.creator_id,
  topic: content.topic,
  platform: content.platform,
  contentType: content.content_type,
  hook: content.hook || '',
  script: content.script || '',
  caption: content.caption || '',
  hashtags: content.hashtags || [],
  createdAt: content.created_at,
});

export const contentService = {
  getById: async (id) => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return data ? mapContent(data) : null;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data.map(mapContent);
  },

  generate: async ({ creatorId, topic, platform, contentType, tone }) => {
    const { data: twin, error: twinError } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('creator_id', creatorId)
      .maybeSingle();

    if (twinError) throw twinError;

    const effectiveTone =
      tone ||
      twin?.tone_details?.primary ||
      twin?.tone ||
      'friendly';

    const creatorName = twin?.creator_name || 'Creator';

    const newContent = {
      creator_id: creatorId,
      topic,
      platform,
      content_type: contentType,
      hook: `Stop making this common mistake with ${topic}! Here is what actually works.`,
      script: `[0:00 - 0:03] Quick visual hook highlighting ${topic}.\n[0:03 - 0:20] The #1 reason people struggle with this.\n[0:20 - 0:45] The 3-step action plan to master ${topic}.\n[0:45 - 0:60] Summary and call to action for ${platform}.`,
      caption: `Master ${topic} with this breakdown by ${creatorName}. Drop your questions below and save this for reference!`,
      hashtags: [
        `#${topic.replace(/\s+/g, '')}`,
        `#${platform}Creator`,
        '#CreatorAI',
        '#GrowthHacks',
        '#Mastery',
      ],
    };

    const { data: content, error } = await supabase
      .from('content')
      .insert(newContent)
      .select()
      .single();

    if (error) throw error;

    return {
      ...mapContent(content),
      tone: effectiveTone,
      status: 'ready_for_production',
    };
  },
};
