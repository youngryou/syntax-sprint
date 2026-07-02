-- Code Typer schema (T05)
-- Run in the Supabase SQL Editor or via SQLTools against the pooler connection.

-- users.user_id is NOT generated independently — it must equal the id of the
-- corresponding row in Supabase's own auth.users table. The FK below enforces
-- that and cascades deletes if an auth user is removed.
create table public.users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  profile_image text,
  joined_at timestamptz not null default now()
);

create table public.snippets (
  snippet_id uuid primary key default gen_random_uuid(),
  language text not null,
  code_text text not null,
  logic_hint text,
  difficulty text not null
);

create table public.scores (
  score_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (user_id) on delete cascade,
  cpm numeric not null check (cpm >= 0),
  accuracy numeric not null check (accuracy >= 0 and accuracy <= 100),
  points numeric not null default 0 check (points >= 0),
  difficulty text,
  played_at timestamptz not null default now()
);

-- Speeds up "scores for this user" / leaderboard-by-user lookups.
create index scores_user_id_idx on public.scores (user_id);

-- All reads/writes go through the Express API using the service_role key
-- (T07), which bypasses RLS entirely. Enabling RLS with no policies blocks
-- any direct anon/authenticated access via the Supabase client libraries,
-- forcing every request through the API.
alter table public.users enable row level security;
alter table public.snippets enable row level security;
alter table public.scores enable row level security;