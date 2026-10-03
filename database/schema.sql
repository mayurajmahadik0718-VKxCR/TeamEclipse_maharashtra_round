-- CreatorAI database schema
--
-- Source of truth: the current backend services in backend/src/services.
-- This file intentionally does not mirror the older planning schema in
-- docs/database.md, whose table and column names differ from the code.
--
-- Run this script in the Supabase SQL Editor against a fresh project. It does
-- not grant UPDATE or DELETE permissions to the anon role because the current
-- backend does not perform those operations.

begin;

create extension if not exists pgcrypto;

create table if not exists public.creators (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  email text not null unique,
  bio text not null default '',
  niche text not null,
  social_handles jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.digital_twins (
  id text primary key default gen_random_uuid()::text,
  creator_id text not null unique references public.creators(id) on delete cascade,
  creator_name text not null,
  niche text not null,
  target_audience jsonb not null default '{}'::jsonb,
  tone text not null default 'friendly',
  tone_details jsonb not null default '{}'::jsonb,
  platforms text[] not null default array[]::text[],
  interests text[] not null default array[]::text[],
  content_style text not null default '',
  content_style_details jsonb not null default '{}'::jsonb,
  preferences jsonb not null default '{}'::jsonb,
  past_content_reference jsonb not null default '[]'::jsonb,
  last_updated timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.content (
  id text primary key default gen_random_uuid()::text,
  creator_id text not null references public.creators(id) on delete cascade,
  topic text not null,
  platform text not null,
  content_type text not null,
  hook text not null default '',
  script text not null default '',
  caption text not null default '',
  hashtags text[] not null default array[]::text[],
  created_at timestamptz not null default now()
);

create table if not exists public.analytics (
  id text primary key default gen_random_uuid()::text,
  creator_id text not null references public.creators(id) on delete cascade,
  content_id text references public.content(id) on delete set null,
  views bigint not null default 0 check (views >= 0),
  likes bigint not null default 0 check (likes >= 0),
  comments bigint not null default 0 check (comments >= 0),
  engagement numeric(8, 4) not null default 0 check (engagement >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id text primary key default gen_random_uuid()::text,
  creator_id text not null references public.creators(id) on delete cascade,
  content_id text references public.content(id) on delete set null,
  status text not null default 'processing',
  video_url text,
  created_at timestamptz not null default now()
);

create index if not exists content_creator_id_created_at_idx
  on public.content (creator_id, created_at desc);

create index if not exists analytics_creator_id_created_at_idx
  on public.analytics (creator_id, created_at desc);

create index if not exists analytics_content_id_idx
  on public.analytics (content_id);

create index if not exists videos_creator_id_created_at_idx
  on public.videos (creator_id, created_at desc);

-- Seed data used by the frontend's default creator identifier and by the AI
-- context loader. The INSERTs are safe to re-run without replacing data.
insert into public.creators (
  id, name, email, bio, niche, social_handles
) values (
  'creator_001',
  'Aarav Sharma',
  'aarav.sharma@example.com',
  'Creator and educator sharing practical, approachable AI workflows.',
  'AI productivity',
  '{"instagram":"@aaravcreates","youtube":"@aaravcreates","linkedin":"aarav-sharma"}'::jsonb
) on conflict (id) do nothing;

insert into public.digital_twins (
  id, creator_id, creator_name, niche, target_audience, tone, tone_details,
  platforms, interests, content_style, content_style_details, preferences,
  past_content_reference, last_updated
) values (
  'twin_001',
  'creator_001',
  'Aarav Sharma',
  'AI productivity',
  '{"demographic":"Early-career professionals and creators","painPoints":["Too many AI tools","Not enough time to experiment"],"skillLevel":"Beginner to intermediate"}'::jsonb,
  'friendly',
  '{"primary":"friendly","attributes":["approachable","informative","encouraging"]}'::jsonb,
  array['instagram', 'youtube', 'linkedin']::text[],
  array['AI productivity', 'creator education', 'workflow automation']::text[],
  'Fast and clear',
  '{"hookStyle":"Direct question or intriguing insight","pacing":"Fast and clear","visualAesthetics":"Clean modern design","signaturePhrases":["Let’s dive in!"]}'::jsonb,
  '{"emojiDensity":"moderate","defaultVideoFormat":"9:16 vertical reel","callToAction":"Follow for more insights","hashtagStrategy":"5 niche tags"}'::jsonb,
  '[]'::jsonb,
  now()
) on conflict (creator_id) do nothing;

insert into public.content (
  id, creator_id, topic, platform, content_type, hook, script, caption, hashtags
) values
  (
    'content_001', 'creator_001', 'Three AI prompts that save an hour a day',
    'instagram', 'reel',
    'Still spending an hour on tasks AI can help you finish in minutes?',
    'Start with a daily planning prompt, then turn meeting notes into action items, and finish by asking AI to draft your first version. Keep the final judgment human.',
    'Three simple AI prompts to reclaim time without losing your voice. Save this for your next busy day.',
    array['#AIProductivity', '#CreatorTips', '#WorkSmarter', '#AIFirst', '#Productivity']::text[]
  ),
  (
    'content_002', 'creator_001', 'A beginner workflow for repurposing one video',
    'youtube', 'short',
    'One video can become five useful posts.',
    'Record one helpful explanation. Pull out the strongest insight, turn it into a carousel, a LinkedIn post, an email tip, and a short follow-up video.',
    'A simple repurposing workflow for creators who want consistency without creating from scratch every day.',
    array['#ContentRepurposing', '#CreatorWorkflow', '#YouTubeShorts', '#AIForCreators']::text[]
  ),
  (
    'content_003', 'creator_001', 'How to choose an AI tool without tool fatigue',
    'linkedin', 'post',
    'The best AI tool is the one that removes a repeated task this week.',
    'Pick one recurring task, define what a good result looks like, test one tool for seven days, and keep it only if it makes the workflow measurably easier.',
    'Avoid tool fatigue by evaluating AI tools against a real recurring task, not a feature list.',
    array['#ArtificialIntelligence', '#Productivity', '#CreatorEconomy', '#Workflow']::text[]
  )
on conflict (id) do nothing;

insert into public.analytics (
  id, creator_id, content_id, views, likes, comments, engagement, created_at
) values
  ('analytics_001', 'creator_001', 'content_001', 12450, 1080, 86, 9.3655, now() - interval '7 days'),
  ('analytics_002', 'creator_001', 'content_002', 8750, 690, 54, 8.5029, now() - interval '4 days'),
  ('analytics_003', 'creator_001', 'content_003', 6320, 512, 73, 9.2563, now() - interval '2 days')
on conflict (id) do nothing;

-- The current video service reads a job by ID and the frontend references
-- video_001, so seed one completed job even though videos are not AI context.
insert into public.videos (
  id, creator_id, content_id, status, video_url
) values (
  'video_001', 'creator_001', 'content_001', 'completed', null
) on conflict (id) do nothing;

-- The backend currently creates its Supabase client with SUPABASE_ANON_KEY.
-- These grants and policies therefore permit exactly the operations its
-- services perform: reads everywhere and inserts for creator/twin/content/video
-- creation. Analytics, UPDATE, and DELETE are intentionally not writable.
grant usage on schema public to anon;
grant select on public.creators, public.digital_twins, public.content,
  public.analytics, public.videos to anon;
grant insert on public.creators, public.digital_twins, public.content,
  public.videos to anon;

alter table public.creators enable row level security;
alter table public.digital_twins enable row level security;
alter table public.content enable row level security;
alter table public.analytics enable row level security;
alter table public.videos enable row level security;

drop policy if exists "anon_read_creators" on public.creators;
create policy "anon_read_creators" on public.creators
  for select to anon using (true);
drop policy if exists "anon_create_creators" on public.creators;
create policy "anon_create_creators" on public.creators
  for insert to anon with check (true);

drop policy if exists "anon_read_digital_twins" on public.digital_twins;
create policy "anon_read_digital_twins" on public.digital_twins
  for select to anon using (true);
drop policy if exists "anon_create_digital_twins" on public.digital_twins;
create policy "anon_create_digital_twins" on public.digital_twins
  for insert to anon with check (true);

drop policy if exists "anon_read_content" on public.content;
create policy "anon_read_content" on public.content
  for select to anon using (true);
drop policy if exists "anon_create_content" on public.content;
create policy "anon_create_content" on public.content
  for insert to anon with check (true);

drop policy if exists "anon_read_analytics" on public.analytics;
create policy "anon_read_analytics" on public.analytics
  for select to anon using (true);

drop policy if exists "anon_read_videos" on public.videos;
create policy "anon_read_videos" on public.videos
  for select to anon using (true);
drop policy if exists "anon_create_videos" on public.videos;
create policy "anon_create_videos" on public.videos
  for insert to anon with check (true);

commit;
