import { supabase } from '../config/supabase.js';

const mapVideo = (video) => ({
  videoId: video.id,
  creatorId: video.creator_id,
  contentId: video.content_id,
  status: video.status,
  videoUrl: video.video_url,
  createdAt: video.created_at,
});

export const videoService = {
  getById: async (id) => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return data ? mapVideo(data) : null;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data.map(mapVideo);
  },

  generate: async ({
    creatorId,
    contentId,
    title,
    script,
    aspectRatio = '9:16',
    visualStyle = 'minimal_tech',
    voiceProfile,
  }) => {
    const { data: video, error } = await supabase
      .from('videos')
      .insert({
        creator_id: creatorId,
        content_id: contentId || null,
        status: 'processing',
        video_url: null,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      ...mapVideo(video),
      title,
      script,
      aspectRatio,
      visualStyle,
      voiceProfile: voiceProfile || 'conversational_neutral',
      progressPercentage: 35,
      estimatedDurationSeconds: 50,
      message: 'Video generation storyboard initiated',
    };
  },
};
