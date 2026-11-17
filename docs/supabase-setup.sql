-- ============================================================
--  Meridian Arts — Tech Portal :: Supabase schema + seed + RLS
--  Paste this whole file into the Supabase SQL Editor and Run.
--  Safe to re-run (tables use IF NOT EXISTS, seed uses ON CONFLICT).
--  Column names match the app's record fields (camelCase, quoted)
--  so the sync layer is a near-passthrough.
-- ============================================================

-- ---------- Tables ----------
create table if not exists public.users (
  "id" text primary key,
  "firstName" text, "lastName" text,
  "email" text unique,
  "position" text, "discipline" text,
  "status" text default 'active',
  "admin" boolean default false,
  "trainer" boolean default false
);

create table if not exists public.inventory (
  "id" text primary key,
  "tag" text, "name" text, "category" text, "location" text,
  "refNumber" text default '',
  "qrCode" text default '',
  "unitTrackers" jsonb default '[]'::jsonb,
  "unitTags" jsonb default '[]'::jsonb,
  "homeLocation" text default '',
  "previousLocation" text default '',
  "originLocation" text default '',
  "parentId" text default '',
  "splitQty" integer default null,
  "qty" integer default 0,
  "condition" text, "status" text default 'in',
  "heldBy" text default '', "outAt" text default '',
  "notes" text default '',
  "static" boolean default false,
  "movements" jsonb default '[]'::jsonb
);

create table if not exists public.maintenance (
  "id" text primary key,
  "equipment" text, "category" text, "priority" text,
  "status" text default 'Open', "space" text default '',
  "description" text default '',
  "itemId" text default '', "itemTag" text default '', "itemName" text default '',
  "parentId" text default '',
  "splitQty" integer default null,
  "previousLocation" text default '',
  "originLocation" text default '',
  "image" jsonb,
  "reportedBy" text default '',
  "resolution" text default '', "resolvedBy" text default '', "resolvedAt" text default '',
  "createdAt" bigint
);

create table if not exists public.advancing (
  "id" text primary key,
  "name" text, "category" text, "space" text,
  "date" text default '', "status" text,
  "startTime" text default '', "finishTime" text default '',
  "load_in" text default '',
  "soundcheck" text default '', "doors" text default '',
  "off_stage" text default '', "curfew" text default '', "load_out" text default '',
  "schedule_items" jsonb default '[]'::jsonb,
  "screening_starts_time" text default '',
  "film_duration" text default '',
  "media_type" text default '',
  "dcp_received" boolean default false,
  "checks_completed" boolean default false,
  "intermission" boolean default false,
  "qa" boolean default false,
  "dcp_tester_user_id" text default '',
  "dcp_test_datetime" text default '',
  "dcp_test_event_id" text default null,
  "parent_event_id" text default null,
  "groupId" text default null,
  "linked_maintenance_ids" jsonb default '[]'::jsonb,
  "lighting_notes" text default '',
  "floor_package" text default '',
  "floor_tags" jsonb default '[]'::jsonb,
  "specials" jsonb default '{}'::jsonb,
  "special_notes" text default '',
  "production_package" jsonb default '{}'::jsonb,
  "techUserId" text default '', "clientContact" text default '',
  "technicians" jsonb default '[]'::jsonb,
  "guestEngineer" boolean default false,
  "techInfo" text default '',
  "email_recipients" text default '',
  "tech_requirements" jsonb default '{}'::jsonb,
  "techSpec" jsonb,
  "checklist" jsonb default '{}'::jsonb,
  "crmBookingId" text,
  "crmHistory" jsonb default '[]'::jsonb
);

create table if not exists public.reports (
  "id" text primary key,
  "eventId" text, "crew" text default '', "shiftDate" text default '',
  "summary" text default '', "issues" text default '', "followUp" text default '',
  "author" text default '', "authorId" text default '',
  "submittedAt" text default '', "updatedAt" text default '', "updatedBy" text default ''
);

create table if not exists public.signoffs (
  "id" text primary key,
  "userId" text, "compId" text, "compLabel" text default '',
  "signedBy" text default '', "date" text default ''
);

create table if not exists public.procedures (
  "id" text primary key,
  "category" text, "title" text,
  "body" text default '', "icon" text default 'book'
);

create table if not exists public.patch_presets (
  "id" text primary key,
  "name" text not null,
  "type" text not null default 'input',
  "channels" jsonb not null default '[]'::jsonb,
  "createdAt" bigint,
  "updatedAt" bigint
);

create table if not exists public.availability (
  "id" text primary key,
  "userId" text,
  "userName" text default '',
  "date" text default '',
  "type" text default 'available',
  "dayPart" text default 'all_day',
  "startTime" text default '',
  "finishTime" text default '',
  "notes" text default '',
  "updatedAt" text default ''
);

create table if not exists public.bookings (
  "id" text primary key,
  "eventId" text default '',
  "eventName" text default '',
  "space" text default '',
  "date" text default '',
  "startTime" text default '',
  "finishTime" text default '',
  "userId" text default '',
  "userName" text default '',
  "role" text default 'Sound',
  "status" text default 'pencil',
  "rate" text default '',
  "notes" text default '',
  "isTakeover" boolean default false,
  "penciledAt" text default null,
  "confirmedAt" text default null,
  "cancelledAt" text default null,
  "cancellationReason" text default '',
  "updatedAt" text default ''
);

create table if not exists public.venues (
  "id" text primary key,
  "name" text not null,
  "capacity" text default '',
  "stageDimensions" text default '',
  "inventory" text default '',
  "basicCrew" integer default 1,
  "audio" jsonb default '{}'::jsonb,
  "dmx" jsonb default '[]'::jsonb,
  "createdAt" text
);

-- Venues resilient migration: handles legacy UUID foreign keys (e.g. venue_audio_trunks)
do $$
declare
  r record;
begin
  create temp table if not exists _tmp_venue_fkeys (
    schema_name text, table_name text, column_name text, constraint_name text
  ) on commit drop;
  truncate _tmp_venue_fkeys;

  for r in (
    select c.conname as constraint_name, ns.nspname as schema_name, cl.relname as table_name, att.attname as column_name, t.typname as data_type
    from pg_constraint c
    join pg_class cl on cl.oid = c.conrelid
    join pg_namespace ns on ns.oid = cl.relnamespace
    join pg_attribute att on att.attrelid = cl.oid and att.attnum = any(c.conkey)
    join pg_type t on t.oid = att.atttypid
    where c.confrelid = 'public.venues'::regclass and c.contype = 'f'
  ) loop
    insert into _tmp_venue_fkeys values (r.schema_name, r.table_name, r.column_name, r.constraint_name);
    execute format('alter table %I.%I drop constraint if exists %I', r.schema_name, r.table_name, r.constraint_name);
    if r.data_type = 'uuid' then
      execute format('alter table %I.%I alter column %I type text using %I::text', r.schema_name, r.table_name, r.column_name, r.column_name);
    end if;
  end loop;

  if exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' and table_name = 'venues' and column_name = 'id' and data_type = 'uuid'
  ) then
    alter table public.venues alter column "id" drop default;
    alter table public.venues alter column "id" type text using "id"::text;
  end if;

  for r in select * from _tmp_venue_fkeys loop
    begin
      execute format('update %I.%I t set %I = v.name from public.venues v where t.%I = v.id and v.name in (''Main Hall'', ''Studio Theatre'', ''Mezzanine'', ''Screen 1'', ''Screen 2'', ''Screen 3'', ''Foyer'', ''Cinema Lounge'', ''Rehearsal Lab'') and t.%I != v.name', r.schema_name, r.table_name, r.column_name, r.column_name, r.column_name);
    exception when others then null;
    end;
  end loop;

  update public.venues set "id" = name 
  where name in ('Main Hall', 'Studio Theatre', 'Mezzanine', 'Screen 1', 'Screen 2', 'Screen 3', 'Foyer', 'Cinema Lounge', 'Rehearsal Lab') and "id" != name;

  for r in select * from _tmp_venue_fkeys loop
    begin
      execute format('alter table %I.%I add constraint %I foreign key (%I) references public.venues("id") on update cascade on delete cascade', r.schema_name, r.table_name, r.constraint_name, r.column_name);
    exception when others then
      begin
        execute format('alter table %I.%I add constraint %I foreign key (%I) references public.venues("id") on update cascade on delete cascade not valid', r.schema_name, r.table_name, r.constraint_name, r.column_name);
      exception when others then null;
      end;
    end;
  end loop;
end $$;

alter table public.venues add column if not exists "basicCrew" integer default 1;

insert into public.venues ("id", "name", "basicCrew")
values
  ('Main Hall', 'Main Hall', 2),
  ('Studio Theatre', 'Studio Theatre', 2),
  ('Mezzanine', 'Mezzanine', 1),
  ('Screen 1', 'Screen 1', 1),
  ('Screen 2', 'Screen 2', 1),
  ('Screen 3', 'Screen 3', 1),
  ('Foyer', 'Foyer', 1),
  ('Cinema Lounge', 'Cinema Lounge', 1),
  ('Rehearsal Lab', 'Rehearsal Lab', 1)
on conflict ("id") do update set "basicCrew" = excluded."basicCrew";

-- ---------- Migrations for already-live databases ----------
-- Safe to re-run. Only needed once per environment; adds new columns to tables created in earlier versions.

-- 1. Inventory unique QR codes, reference numbers, displacements & batch splitting
alter table public.inventory add column if not exists "refNumber" text default '';
alter table public.inventory add column if not exists "qrCode" text default '';
alter table public.inventory add column if not exists "unitTrackers" jsonb default '[]'::jsonb;
alter table public.inventory add column if not exists "unitTags" jsonb default '[]'::jsonb;
alter table public.inventory add column if not exists "homeLocation" text default '';
alter table public.inventory add column if not exists "previousLocation" text default '';
alter table public.inventory add column if not exists "originLocation" text default '';
alter table public.inventory add column if not exists "parentId" text default '';
alter table public.inventory add column if not exists "splitQty" integer default null;

-- Auto-backfill refNumber & qrCode for existing inventory rows
update public.inventory
set "refNumber" = coalesce(nullif("refNumber", ''), '#' || coalesce("tag", "id")),
    "qrCode" = coalesce(nullif("qrCode", ''), 'VTP-INV:' || coalesce("tag", "id"))
where "refNumber" is null or "refNumber" = '' or "qrCode" is null or "qrCode" = '';

-- 2. Maintenance fault tracking, parent-child splits & location restoration
alter table public.maintenance add column if not exists "parentId" text default '';
alter table public.maintenance add column if not exists "splitQty" integer default null;
alter table public.maintenance add column if not exists "previousLocation" text default '';
alter table public.maintenance add column if not exists "originLocation" text default '';

-- 3. Advancing: multi-technician, cinema screening, live schedule & DCP testing columns
alter table public.advancing add column if not exists "technicians" jsonb default '[]'::jsonb;
alter table public.advancing add column if not exists "screening_starts_time" text default '';
alter table public.advancing add column if not exists "film_duration" text default '';
alter table public.advancing add column if not exists "media_type" text default '';
alter table public.advancing add column if not exists "dcp_received" boolean default false;
alter table public.advancing add column if not exists "checks_completed" boolean default false;
alter table public.advancing add column if not exists "intermission" boolean default false;
alter table public.advancing add column if not exists "qa" boolean default false;
alter table public.advancing add column if not exists "load_in" text default '';
alter table public.advancing add column if not exists "off_stage" text default '';
alter table public.advancing add column if not exists "load_out" text default '';
alter table public.advancing add column if not exists "schedule_items" jsonb default '[]'::jsonb;
alter table public.advancing add column if not exists "dcp_tester_user_id" text default '';
alter table public.advancing add column if not exists "dcp_test_datetime" text default '';
alter table public.advancing add column if not exists "dcp_test_event_id" text default null;
alter table public.advancing add column if not exists "parent_event_id" text default null;
alter table public.advancing add column if not exists "linked_maintenance_ids" jsonb default '[]'::jsonb;
alter table public.advancing add column if not exists "lighting_notes" text default '';
alter table public.advancing add column if not exists "floor_package" text default '';
alter table public.advancing add column if not exists "floor_tags" jsonb default '[]'::jsonb;
alter table public.advancing add column if not exists "specials" jsonb default '{}'::jsonb;
alter table public.advancing add column if not exists "special_notes" text default '';
alter table public.advancing add column if not exists "production_package" jsonb default '{}'::jsonb;
alter table public.advancing add column if not exists "email_recipients" text default '';
alter table public.advancing add column if not exists "tech_requirements" jsonb default '{}'::jsonb;

create table if not exists public.patch_sheets (
  "id" text primary key,
  "name" text not null,
  "eventId" text default null,
  "eventName" text default '',
  "space" text default '',
  "date" text default '',
  "notes" text default '',
  "acts" jsonb not null default '[]'::jsonb,
  "patchPoints" jsonb not null default '[]'::jsonb,
  "stageboxes" jsonb not null default '[]'::jsonb,
  "repatches" jsonb not null default '[]'::jsonb,
  "homeRun" jsonb not null default '{}'::jsonb,
  "createdAt" bigint,
  "updatedAt" bigint
);

alter table public.patch_sheets add column if not exists "homeRun" jsonb not null default '{}'::jsonb;

create table if not exists public.patch_presets (
  "id" text primary key,
  "name" text not null,
  "type" text not null default 'input',
  "category" text default 'General',
  "description" text default '',
  "channels" jsonb not null default '[]'::jsonb,
  "capacityIn" integer default 0,
  "capacityOut" integer default 0,
  "createdAt" bigint,
  "updatedAt" bigint
);

alter table public.patch_presets add column if not exists "category" text default 'General';
alter table public.patch_presets add column if not exists "description" text default '';
alter table public.patch_presets add column if not exists "capacityIn" integer default 0;
alter table public.patch_presets add column if not exists "capacityOut" integer default 0;

alter table public.patch_presets enable row level security;
drop policy if exists rw_all_patch_presets on public.patch_presets;
create policy rw_all_patch_presets on public.patch_presets for all to authenticated using (true) with check (true);

alter table public.patch_sheets enable row level security;
drop policy if exists rw_all_patch_sheets on public.patch_sheets;
create policy rw_all_patch_sheets on public.patch_sheets for all to authenticated using (true) with check (true);

-- Global system configuration & recipient rules (optional persistence table for app-wide settings)
create table if not exists public.app_settings (
  "key" text primary key,
  "value" jsonb not null,
  "updatedAt" timestamptz default now()
);

-- Seed default category-routed report recipients
insert into public.app_settings ("key", "value") values
  ('report_recipients', '[
    {"email": "tech@meridian-arts.example", "category": "All"},
    {"email": "dutymanager@meridian-arts.example", "category": "All"},
    {"email": "production@meridian-arts.example", "category": "Programme"},
    {"email": "cinema@meridian-arts.example", "category": "Cinema"},
    {"email": "events@meridian-arts.example", "category": "Private Hires"}
  ]'::jsonb)
on conflict ("key") do nothing;

alter table public.app_settings enable row level security;
drop policy if exists rw_all_settings on public.app_settings;
create policy rw_all_settings on public.app_settings for all to authenticated using (true) with check (true);

-- ---------- Role helpers (map the signed-in email -> profile) ----------
create or replace function public.is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select coalesce((select "admin" from public.users
     where lower("email") = lower(auth.jwt() ->> 'email') and "status" = 'active' limit 1), false);
$$;

create or replace function public.is_trainer() returns boolean
  language sql stable security definer set search_path = public as $$
  select coalesce((select "trainer" from public.users
     where lower("email") = lower(auth.jwt() ->> 'email') and "status" = 'active' limit 1), false);
$$;

-- ---------- Enable RLS ----------
alter table public.users       enable row level security;
alter table public.inventory   enable row level security;
alter table public.maintenance enable row level security;
alter table public.advancing   enable row level security;
alter table public.reports     enable row level security;
alter table public.signoffs    enable row level security;
alter table public.procedures  enable row level security;

-- ---------- Starter policies (PERMISSIVE — every signed-in user can
--            read + write everything). Get the app working first, then
--            tighten using the commented examples at the bottom. ----------
do $$
declare t text;
begin
  foreach t in array array['users','inventory','maintenance','advancing','reports','signoffs','procedures'] loop
    execute format('drop policy if exists rw_all on public.%I', t);
    execute format('create policy rw_all on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- ---------- Seed data ----------
insert into public.users ("id", "firstName", "lastName", "email", "position", "discipline", "status", "admin", "trainer") values
  ('user-1', 'Alex', 'Morgan', 'alex@meridian.local', 'Technical Manager', 'Sound', 'active', true, true),
  ('user-2', 'Priya', 'Shah', 'priya@meridian.local', 'Senior Tech', 'Lighting', 'active', true, true),
  ('user-3', 'Sam', 'Okafor', 'sam@meridian.local', 'Duty Tech', 'Sound', 'active', false, false),
  ('user-4', 'Danny', 'Cole', 'danny@meridian.local', 'Duty Tech', 'Cinema', 'active', false, true)
on conflict ("id") do nothing;

insert into public.inventory ("id", "tag", "name", "category", "location", "qty", "condition", "status", "heldBy", "outAt", "notes", "static", "movements") values
  ('inv-mh-001', 'MH-001', 'Behringer Wing', 'Sound - Console/Stageboxes', 'Main Hall', 1, 'Good', 'in', '', '', 'Digital FOH mixing console', true, '[]'::jsonb),
  ('inv-mh-002', 'MH-002', 'Midas S16', 'Sound - Console/Stageboxes', 'Main Hall', 2, 'Good', 'in', '', '', 'Digital stagebox (32 in / 16 out total across 2 units)', true, '[]'::jsonb),
  ('inv-mh-003', 'MH-003', '8-way XLR input stage box', 'Sound - Console/Stageboxes', 'Main Hall', 4, 'Good', 'in', '', '', 'Sub-snake stage drops', true, '[]'::jsonb),
  ('inv-mh-004', 'MH-004', 'JBL VRX918SP', 'Sound - PA/Speakers', 'Main Hall', 4, 'Good', 'in', '', '', 'Powered 18" bass-reflex subwoofer (under-stage)', true, '[]'::jsonb),
  ('inv-mh-005', 'MH-005', 'JBL VRX932LAP', 'Sound - PA/Speakers', 'Main Hall', 6, 'Good', 'in', '', '', 'Powered 12" line-array element (3 per side)', true, '[]'::jsonb),
  ('inv-mh-006', 'MH-006', 'RCF NX10-SMA', 'Sound - PA/Speakers', 'Main Hall', 6, 'Good', 'in', '', '', 'Active coaxial stage monitor, 400W', true, '[]'::jsonb),
  ('inv-mh-007', 'MH-007', 'RCF NX12-SMA', 'Sound - PA/Speakers', 'Main Hall', 2, 'Good', 'in', '', '', 'Active drum fill / side monitor, 700W', true, '[]'::jsonb),
  ('inv-mh-sm58', 'MH-008', 'Shure SM58', 'Sound - Microphones', 'Main Hall', 8, 'Good', 'in', '', '', 'Dynamic vocal microphone', false, '[]'::jsonb),
  ('inv-mh-009', 'MH-009', 'Shure Beta 58A', 'Sound - Microphones', 'Main Hall', 1, 'Good', 'in', '', '', 'Super-cardioid vocal dynamic microphone', false, '[]'::jsonb),
  ('inv-mh-010', 'MH-010', 'Shure SM57', 'Sound - Microphones', 'Main Hall', 8, 'Good', 'in', '', '', 'Dynamic instrument microphone', false, '[]'::jsonb),
  ('inv-mh-011', 'MH-011', 'Shure Beta 91A', 'Sound - Microphones', 'Main Hall', 1, 'Good', 'in', '', '', 'Boundary kick drum condenser', false, '[]'::jsonb),
  ('inv-mh-012', 'MH-012', 'Sennheiser MD 421-II', 'Sound - Microphones', 'Main Hall', 2, 'Good', 'in', '', '', 'Large-diaphragm dynamic microphone', false, '[]'::jsonb),
  ('inv-mh-013', 'MH-013', 'Sennheiser E906', 'Sound - Microphones', 'Main Hall', 1, 'Good', 'in', '', '', 'Guitar cabinet dynamic microphone', false, '[]'::jsonb),
  ('inv-mh-014', 'MH-014', 'Sennheiser E602', 'Sound - Microphones', 'Main Hall', 2, 'Good', 'in', '', '', 'Kick / bass cabinet dynamic microphone', false, '[]'::jsonb),
  ('inv-mh-015', 'MH-015', 'Sennheiser E604', 'Sound - Microphones', 'Main Hall', 6, 'Good', 'in', '', '', 'Clip-on tom/snare dynamic microphone', false, '[]'::jsonb),
  ('inv-mh-016', 'MH-016', 'Sennheiser E614', 'Sound - Microphones', 'Main Hall', 4, 'Good', 'in', '', '', 'Small-diaphragm instrument condenser', false, '[]'::jsonb),
  ('inv-mh-017', 'MH-017', 'AKG 300B/CK91', 'Sound - Microphones', 'Main Hall', 1, 'Good', 'in', '', '', 'Cardioid condenser capsule', false, '[]'::jsonb),
  ('inv-mh-018', 'MH-018', 'Sennheiser EW-DX', 'Sound - Microphones', 'Main Hall', 4, 'Good', 'in', '', '', 'Digital wireless microphone channels', false, '[]'::jsonb),
  ('inv-mh-019', 'MH-019', 'Active DI box', 'Sound - DI/Stands', 'Main Hall', 7, 'Good', 'in', '', '', 'Radial J48 / BSS active DI', false, '[]'::jsonb),
  ('inv-mh-020', 'MH-020', 'K&M Microphone stand pack', 'Sound - DI/Stands', 'Main Hall', 1, 'Good', 'in', '', '', 'Assorted tall & short boom stands', false, '[]'::jsonb),
  ('inv-mh-021', 'MH-021', 'Yamaha Stage Custom', 'Backline', 'Main Hall', 1, 'Good', 'in', '', '', 'House drum shell pack, 20" kick (no breakables)', false, '[]'::jsonb),
  ('inv-mh-022', 'MH-022', 'Fender Deluxe', 'Backline', 'Main Hall', 1, 'Good', 'in', '', '', 'Guitar combo amplifier', false, '[]'::jsonb),
  ('inv-mh-023', 'MH-023', 'Markbass CMD 103', 'Backline', 'Main Hall', 1, 'Good', 'in', '', '', 'Bass combo amplifier', false, '[]'::jsonb),
  ('inv-mh-024', 'MH-024', 'Pioneer DJM900NXS2', 'DJ Equipment', 'Main Hall', 1, 'Good', 'in', '', '', '4-channel club DJ mixer', false, '[]'::jsonb),
  ('inv-mh-025', 'MH-025', 'Pioneer CDJ2000NXS2', 'DJ Equipment', 'Main Hall', 2, 'Good', 'in', '', '', 'Multi-player DJ deck', false, '[]'::jsonb),
  ('inv-mh-026', 'MH-026', 'Technics 1210 Mk5', 'DJ Equipment', 'Main Hall', 2, 'Good', 'in', '', '', 'Direct-drive turntable', false, '[]'::jsonb),
  ('inv-mh-027', 'MH-027', 'FBT Jolly 8BA', 'DJ Equipment', 'Main Hall', 1, 'Good', 'in', '', '', 'Powered DJ booth monitor', false, '[]'::jsonb),
  ('inv-mh-028', 'MH-028', 'Avolites Tiger Touch II', 'Lighting - Control', 'Main Hall', 1, 'Good', 'in', '', '', 'House lighting control console', true, '[]'::jsonb),
  ('inv-mh-029', 'MH-029', '15A dimmer channel', 'Lighting - Control', 'Main Hall', 54, 'Good', 'in', '', '', 'Installed dimmer rack channels', true, '[]'::jsonb),
  ('inv-mh-030', 'MH-030', 'DMX & sACN tie-line points', 'Lighting - Control', 'Main Hall', 2, 'Good', 'in', '', '', 'FOH & Stage Left control wall plates', true, '[]'::jsonb),
  ('inv-mh-031', 'MH-031', 'House working lights', 'Lighting - Control', 'Main Hall', 1, 'Good', 'in', '', '', 'Independent architectural working-light relay', true, '[]'::jsonb),
  ('inv-mh-032', 'MH-032', 'Prolights Studio CobFC', 'Lighting - Fixtures', 'Main Hall', 12, 'Good', 'in', '', '', 'LED RGBW 150W COB parcan', true, '[]'::jsonb),
  ('inv-mh-033', 'MH-033', 'Prolights Diamond 19', 'Lighting - Fixtures', 'Main Hall', 6, 'Good', 'in', '', '', 'LED RGBW moving wash fixture', true, '[]'::jsonb),
  ('inv-mh-034', 'MH-034', 'Prolights CromoSpot500', 'Lighting - Fixtures', 'Main Hall', 6, 'Good', 'in', '', '', 'Moving spot profile fixture', true, '[]'::jsonb),
  ('inv-mh-035', 'MH-035', 'Prolights EclFresnel TW', 'Lighting - Fixtures', 'Main Hall', 2, 'Good', 'in', '', '', 'LED tuneable white stage wash', true, '[]'::jsonb),
  ('inv-mh-036', 'MH-036', '500W Tungsten Fresnel', 'Lighting - Fixtures', 'Main Hall', 9, 'Good', 'in', '', '', 'Rigged on FOH & mid-stage bars', true, '[]'::jsonb),
  ('inv-mh-037', 'MH-037', 'Panasonic PT-DZ770EK', 'AV - Projection/Screens', 'Main Hall', 1, 'Good', 'in', '', '', 'WUXGA 1920x1200 installation projector', true, '[]'::jsonb),
  ('inv-mh-038', 'MH-038', 'Motorised 5m ceiling projection screen', 'AV - Projection/Screens', 'Main Hall', 1, 'Good', 'in', '', '', 'Projection area 3.5m x 4.2m', true, '[]'::jsonb),
  ('inv-mh-039', 'MH-039', '55" stage confidence display', 'AV - Projection/Screens', 'Main Hall', 2, 'Good', 'in', '', '', 'Repeater feeds via SDI distribution', true, '[]'::jsonb),
  ('inv-mh-040', 'MH-040', 'Extron DTP matrix switcher', 'AV - Projection/Screens', 'Main Hall', 1, 'Good', 'in', '', '', 'Main Hall HDMI/HDBaseT routing', true, '[]'::jsonb),
  ('inv-st-001', 'ST-001', 'Allen & Heath SQ-5', 'Sound - Console/Stageboxes', 'Studio Theatre', 1, 'Good', 'in', '', '', '48-channel digital mixing console', true, '[]'::jsonb),
  ('inv-st-002', 'ST-002', 'Digital Stagebox 16x8', 'Sound - Console/Stageboxes', 'Studio Theatre', 2, 'Good', 'in', '', '', '16 XLR in / 8 XLR out via Cat5e', true, '[]'::jsonb),
  ('inv-st-003', 'ST-003', 'KV2 Audio EX10', 'Sound - PA/Speakers', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Active full-range main speaker, 500W', true, '[]'::jsonb),
  ('inv-st-004', 'ST-004', 'KV2 Audio EX10 (Wedge)', 'Sound - PA/Speakers', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Active stage monitor, 500W', true, '[]'::jsonb),
  ('inv-st-005', 'ST-005', 'RCF ART 705-AS', 'Sound - PA/Speakers', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Active 15" subwoofer, 800W', true, '[]'::jsonb),
  ('inv-st-006', 'ST-006', 'RCF ART 312-A', 'Sound - PA/Speakers', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Active floor wedge, 400W', true, '[]'::jsonb),
  ('inv-st-007', 'ST-007', 'Sennheiser EW-D Handheld', 'Sound - Microphones', 'Studio Theatre', 3, 'Good', 'in', '', '', 'Digital wireless handheld channel', false, '[]'::jsonb),
  ('inv-st-008', 'ST-008', 'Sennheiser EW-D Beltpack', 'Sound - Microphones', 'Studio Theatre', 3, 'Good', 'in', '', '', 'Bodypack wireless receiver & lavalier/headset', false, '[]'::jsonb),
  ('inv-st-009', 'ST-009', 'Shure SM58', 'Sound - Microphones', 'Studio Theatre', 4, 'Good', 'in', '', '', 'Vocal dynamic microphone', false, '[]'::jsonb),
  ('inv-st-010', 'ST-010', 'Shure SM57', 'Sound - Microphones', 'Studio Theatre', 4, 'Good', 'in', '', '', 'Instrument dynamic microphone', false, '[]'::jsonb),
  ('inv-st-011', 'ST-011', 'Passive Stereo DI Box', 'Sound - DI/Stands', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Studio Theatre DI kit', false, '[]'::jsonb),
  ('inv-st-012', 'ST-012', 'Tascam CD-200', 'Sound - Playback', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Rack-mounted media/CD player', false, '[]'::jsonb),
  ('inv-st-013', 'ST-013', 'Pioneer DJM-850', 'DJ Equipment', 'Studio Theatre', 1, 'Good', 'in', '', '', '4-channel DJ mixer', false, '[]'::jsonb),
  ('inv-st-014', 'ST-014', 'Pioneer CDJ-2000', 'DJ Equipment', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Digital DJ deck', false, '[]'::jsonb),
  ('inv-st-015', 'ST-015', 'Technics 1210 Mk5', 'DJ Equipment', 'Studio Theatre', 2, 'Fair', 'in', '', '', 'Direct-drive turntable', false, '[]'::jsonb),
  ('inv-st-016', 'ST-016', 'ETC Element 60', 'Lighting - Control', 'Studio Theatre', 1, 'Good', 'in', '', '', 'Theatre lighting control console', true, '[]'::jsonb),
  ('inv-st-017', 'ST-017', 'Zero88 Chilli Dimmer', 'Lighting - Control', 'Studio Theatre', 48, 'Good', 'in', '', '', '2kW dimmer channels (36 overhead + 12 floor)', true, '[]'::jsonb),
  ('inv-st-018', 'ST-018', '13A non-dimmed hard power', 'Lighting - Control', 'Studio Theatre', 8, 'Good', 'in', '', '', 'Rigging grid hard power outlets', true, '[]'::jsonb),
  ('inv-st-019', 'ST-019', 'DMX grid tie-line', 'Lighting - Control', 'Studio Theatre', 4, 'Good', 'in', '', '', 'Grid & stage floor DMX ports', true, '[]'::jsonb),
  ('inv-st-020', 'ST-020', 'Prolights EclFresnel', 'Lighting - Fixtures', 'Studio Theatre', 12, 'Good', 'in', '', '', 'LED stage fresnel fixture', true, '[]'::jsonb),
  ('inv-st-021', 'ST-021', 'Prolights Diamond 7', 'Lighting - Fixtures', 'Studio Theatre', 8, 'Good', 'in', '', '', 'Compact RGBW moving wash', true, '[]'::jsonb),
  ('inv-st-022', 'ST-022', 'Prolights Studio CobFC', 'Lighting - Fixtures', 'Studio Theatre', 12, 'Good', 'in', '', '', 'LED RGBW 150W parcan', true, '[]'::jsonb),
  ('inv-st-023', 'ST-023', 'ETC Source Four Jr Zoom', 'Lighting - Fixtures', 'Studio Theatre', 12, 'Good', 'in', '', '', '25/50 degree profile spotlight', true, '[]'::jsonb),
  ('inv-st-024', 'ST-024', '800W Theatre Fresnel', 'Lighting - Fixtures', 'Studio Theatre', 18, 'Good', 'in', '', '', 'Overhead rig fresnel', true, '[]'::jsonb),
  ('inv-st-025', 'ST-025', '500W Compact Fresnel', 'Lighting - Fixtures', 'Studio Theatre', 12, 'Good', 'in', '', '', 'Grid bar fresnel', true, '[]'::jsonb),
  ('inv-st-026', 'ST-026', 'Par64 Can (CP62)', 'Lighting - Fixtures', 'Studio Theatre', 12, 'Good', 'in', '', '', 'Overhead wash can', true, '[]'::jsonb),
  ('inv-st-027', 'ST-027', 'Short-nose Floor Can', 'Lighting - Fixtures', 'Studio Theatre', 6, 'Good', 'in', '', '', 'Uplighter / shin-buster fixture', true, '[]'::jsonb),
  ('inv-st-028', 'ST-028', '500W Symmetric Flood', 'Lighting - Fixtures', 'Studio Theatre', 4, 'Good', 'in', '', '', 'Cyc wash unit', true, '[]'::jsonb),
  ('inv-st-029', 'ST-029', 'Tank trap with 3m aluminium boom', 'Lighting - Rigging/Other', 'Studio Theatre', 6, 'Good', 'in', '', '', 'Vertical floor boom hardware', false, '[]'::jsonb),
  ('inv-st-030', 'ST-030', 'Floor H-stand', 'Lighting - Rigging/Other', 'Studio Theatre', 6, 'Good', 'in', '', '', 'Single fixture floor base', false, '[]'::jsonb),
  ('inv-st-031', 'ST-031', '15A TRS cable trunk', 'Lighting - Rigging/Other', 'Studio Theatre', 1, 'Good', 'in', '', '', 'Assorted stage extension leads', false, '[]'::jsonb),
  ('inv-st-032', 'ST-032', 'Panasonic PT-DZ770EK', 'AV - Projection/Screens', 'Studio Theatre', 1, 'Good', 'in', '', '', 'WUXGA 1920x1200 rig projector (3m x 4m back wall throw)', true, '[]'::jsonb),
  ('inv-st-033', 'ST-033', 'Harlequin dance floor roll', 'Staging/Flooring', 'Studio Theatre', 4, 'Good', 'in', '', '', 'Black vinyl performance flooring, 2m x 10m', true, '[]'::jsonb),
  ('inv-st-034', 'ST-034', 'Modular stage deck (1m x 1m)', 'Staging/Flooring', 'Studio Theatre', 8, 'Good', 'in', '', '', '30cm riser height', true, '[]'::jsonb),
  ('inv-st-035', 'ST-035', 'Black masking flat (3.5m x 1.5m)', 'Staging/Flooring', 'Studio Theatre', 2, 'Good', 'in', '', '', 'Freestanding wing flat', true, '[]'::jsonb),
  ('inv-mz-001', 'MZ-001', 'Soundcraft EPM12', 'Sound - Console/Stageboxes', 'Mezzanine', 1, 'Good', 'in', '', '', '12-channel analog mixing console', true, '[]'::jsonb),
  ('inv-mz-002', 'MZ-002', 'KV2 Audio EX10', 'Sound - PA/Speakers', 'Mezzanine', 2, 'Good', 'in', '', '', 'Active main loudspeaker', true, '[]'::jsonb),
  ('inv-mz-003', 'MZ-003', 'Tascam CD-200', 'Sound - Playback', 'Mezzanine', 1, 'Good', 'in', '', '', 'Rack CD / line playback deck', false, '[]'::jsonb),
  ('inv-mz-004', 'MZ-004', 'Sennheiser EW-D Receiver', 'Sound - Microphones', 'Mezzanine', 2, 'Good', 'in', '', '', 'Dual wireless handheld kit', false, '[]'::jsonb),
  ('inv-mz-005', 'MZ-005', 'Wired speech microphone pack', 'Sound - Microphones', 'Mezzanine', 1, 'Good', 'in', '', '', '4x handheld mics & desk stands', false, '[]'::jsonb),
  ('inv-mz-006', 'MZ-006', 'Stereo DI Kit', 'Sound - DI/Stands', 'Mezzanine', 2, 'Good', 'in', '', '', 'Passive laptop DI boxes', false, '[]'::jsonb),
  ('inv-mz-007', 'MZ-007', '6-way LED controller', 'Lighting - Control', 'Mezzanine', 1, 'Good', 'in', '', '', 'Simple DMX fader wing', true, '[]'::jsonb),
  ('inv-mz-008', 'MZ-008', '4-channel architectural dimmer', 'Lighting - Control', 'Mezzanine', 3, 'Good', 'in', '', '', '5A dimmer packs', true, '[]'::jsonb),
  ('inv-mz-009', 'MZ-009', 'ETC Source Four Jr', 'Lighting - Fixtures', 'Mezzanine', 1, 'Good', 'in', '', '', 'Lectern/spot track fixture', true, '[]'::jsonb),
  ('inv-mz-010', 'MZ-010', 'LED RGBW 36W Wash Par', 'Lighting - Fixtures', 'Mezzanine', 4, 'Good', 'in', '', '', 'Fixed architectural mood wash', true, '[]'::jsonb),
  ('inv-mz-011', 'MZ-011', 'Panasonic PT-LB90NT', 'AV - Projection/Screens', 'Mezzanine', 1, 'Good', 'in', '', '', 'Installation projector, 3500 ANSI lumens', true, '[]'::jsonb),
  ('inv-mz-012', 'MZ-012', 'Portable flooring roll (2m x 6m)', 'Staging/Flooring', 'Mezzanine', 3, 'Good', 'in', '', '', 'Black vinyl performance mat', true, '[]'::jsonb),
  ('inv-mz-013', 'MZ-013', 'Modular stage block (1m x 1m)', 'Staging/Flooring', 'Mezzanine', 8, 'Good', 'in', '', '', '30cm portable stage platform', true, '[]'::jsonb),
  ('inv-s1-001', 'S1-001', 'Behringer X Air XR12', 'Sound - Console/Stageboxes', 'Screen 1', 1, 'Excellent', 'in', '', '', '12-channel Q&A digital mixer · Booth rack', true, '[]'::jsonb),
  ('inv-s1-002', 'S1-002', 'Control Tablet 11"', 'Sound - Control', 'Screen 1', 1, 'Excellent', 'in', '', '', 'Wireless mixer tablet · Booth shelf', false, '[]'::jsonb),
  ('inv-s1-003', 'S1-003', 'Christie Vive Audio LS5S', 'Sound - PA/Speakers', 'Screen 1', 12, 'Good', 'in', '', '', 'Passive cinema surround array · Auditorium', true, '[]'::jsonb),
  ('inv-s1-004', 'S1-004', 'Martin Audio Screen 3', 'Sound - PA/Speakers', 'Screen 1', 3, 'Good', 'in', '', '', 'Behind-screen LCR loudspeaker array', true, '[]'::jsonb),
  ('inv-s1-005', 'S1-005', 'Martin Audio Sub 1A', 'Sound - PA/Speakers', 'Screen 1', 1, 'Good', 'in', '', '', 'Cinema LFE subwoofer · Screen pit', true, '[]'::jsonb),
  ('inv-s1-amp', 'S1-006', 'Christie Vive Audio CDA5 5000W', 'Sound - PA/Speakers', 'Screen 1', 6, 'Good', 'in', '', '', 'Cinema rack amplifiers · Booth 1', true, '[]'::jsonb),
  ('inv-s1-007', 'S1-007', 'Dolby AP20', 'Sound - PA/Speakers', 'Screen 1', 1, 'Good', 'in', '', '', '7.1 cinema sound processor · Booth 1', true, '[]'::jsonb),
  ('inv-s1-008', 'S1-008', 'Sennheiser EW-D Wireless Mic', 'Sound - Microphones', 'Screen 1', 2, 'Good', 'in', '', '', 'Q&A handheld radio mic kit · Booth 1', false, '[]'::jsonb),
  ('inv-s1-009', 'S1-009', 'Shure SM58', 'Sound - Microphones', 'Screen 1', 4, 'Good', 'in', '', '', 'Wired Q&A microphones · Booth 1', false, '[]'::jsonb),
  ('inv-s1-010', 'S1-010', 'Transcension SDC-6 DMX Controller', 'Lighting - Control', 'Screen 1', 1, 'Good', 'in', '', '', 'Stage bar DMX desk · Booth 1', true, '[]'::jsonb),
  ('inv-s1-011', 'S1-011', '1kW Q&A Stage Flood', 'Lighting - Fixtures', 'Screen 1', 2, 'Good', 'in', '', '', 'Screen 1 front stage bar', true, '[]'::jsonb),
  ('inv-s1-012', 'S1-012', '500W Q&A Fresnel', 'Lighting - Fixtures', 'Screen 1', 2, 'Good', 'in', '', '', 'Screen 1 front stage bar', true, '[]'::jsonb),
  ('inv-s1-013', 'S1-013', 'LED Lectern Profile Spot', 'Lighting - Fixtures', 'Screen 1', 1, 'Good', 'in', '', '', 'Screen 1 front stage bar', true, '[]'::jsonb),
  ('inv-s1-014', 'S1-014', 'Christie CP4220', 'AV - Projection/Screens', 'Screen 1', 1, 'Good', 'in', '', '', '4K DLP digital cinema projector · Booth 1', true, '[]'::jsonb),
  ('inv-s1-015', 'S1-015', 'Auxiliary Media Interface', 'AV - Projection/Screens', 'Screen 1', 1, 'Good', 'in', '', '', 'Alternative content scaling rack unit', true, '[]'::jsonb),
  ('inv-s1-016', 'S1-016', '24ft Cinema Projection Screen', 'AV - Projection/Screens', 'Screen 1', 1, 'Good', 'in', '', '', 'Perforated cinema screen · Auditorium 1', true, '[]'::jsonb),
  ('inv-s1-017', 'S1-017', 'Kramer VP-444', 'AV - Projection/Screens', 'Screen 1', 1, 'Good', 'in', '', '', 'HDMI presentation switcher · Booth 1 rack', true, '[]'::jsonb),
  ('inv-s2-001', 'S2-001', 'Behringer X Air XR12', 'Sound - Console/Stageboxes', 'Screen 2', 1, 'Excellent', 'in', '', '', '12-channel Q&A digital mixer · Booth 2', true, '[]'::jsonb),
  ('inv-s2-002', 'S2-002', 'Control Tablet 11"', 'Sound - Control', 'Screen 2', 1, 'Good', 'in', '', '', 'Wireless mixer tablet · Booth 2 shelf', false, '[]'::jsonb),
  ('inv-s2-003', 'S2-003', 'Christie Vive Audio LS3S', 'Sound - PA/Speakers', 'Screen 2', 12, 'Good', 'in', '', '', 'Passive cinema surround speakers · Auditorium 2', true, '[]'::jsonb),
  ('inv-s2-004', 'S2-004', 'Turbosound Impact 50', 'Sound - PA/Speakers', 'Screen 2', 2, 'Good', 'in', '', '', 'Rear fill surround speakers', true, '[]'::jsonb),
  ('inv-s2-005', 'S2-005', 'Martin Audio Screen 2', 'Sound - PA/Speakers', 'Screen 2', 3, 'Good', 'in', '', '', 'Behind-screen LCR loudspeakers', true, '[]'::jsonb),
  ('inv-s2-006', 'S2-006', 'Martin Audio Sub 1A', 'Sound - PA/Speakers', 'Screen 2', 1, 'Good', 'in', '', '', 'Cinema LFE subwoofer · Auditorium 2', true, '[]'::jsonb),
  ('inv-s2-007', 'S2-007', 'Christie Vive Audio CDA5 5000W', 'Sound - PA/Speakers', 'Screen 2', 4, 'Good', 'in', '', '', 'Cinema rack amplifiers · Booth 2', true, '[]'::jsonb),
  ('inv-s2-008', 'S2-008', 'Dolby AP20', 'Sound - PA/Speakers', 'Screen 2', 1, 'Good', 'in', '', '', '5.1 cinema sound processor · Booth 2', true, '[]'::jsonb),
  ('inv-s2-009', 'S2-009', 'Sennheiser EW-D Wireless Mic', 'Sound - Microphones', 'Screen 2', 2, 'Good', 'in', '', '', 'Q&A handheld radio mic kit · Booth 2', false, '[]'::jsonb),
  ('inv-s2-010', 'S2-010', 'Shure SM58', 'Sound - Microphones', 'Screen 2', 4, 'Good', 'in', '', '', 'Wired Q&A microphones · Booth 2', false, '[]'::jsonb),
  ('inv-s2-011', 'S2-011', 'Transcension SDC-6 DMX Controller', 'Lighting - Control', 'Screen 2', 1, 'Good', 'in', '', '', 'Stage bar DMX desk · Booth 2', true, '[]'::jsonb),
  ('inv-s2-012', 'S2-012', '1kW Q&A Stage Flood', 'Lighting - Fixtures', 'Screen 2', 2, 'Good', 'in', '', '', 'Screen 2 front stage bar', true, '[]'::jsonb),
  ('inv-s2-013', 'S2-013', '500W Q&A Fresnel', 'Lighting - Fixtures', 'Screen 2', 2, 'Good', 'in', '', '', 'Screen 2 front stage bar', true, '[]'::jsonb),
  ('inv-s2-014', 'S2-014', 'Christie CP4220', 'AV - Projection/Screens', 'Screen 2', 1, 'Good', 'in', '', '', '4K DLP digital cinema projector · Booth 2', true, '[]'::jsonb),
  ('inv-s2-015', 'S2-015', 'Auxiliary Media Interface', 'AV - Projection/Screens', 'Screen 2', 1, 'Good', 'in', '', '', 'Alternative content scaling rack unit', true, '[]'::jsonb),
  ('inv-s2-016', 'S2-016', '23ft Cinema Projection Screen', 'AV - Projection/Screens', 'Screen 2', 1, 'Good', 'in', '', '', 'Perforated cinema screen · Auditorium 2', true, '[]'::jsonb),
  ('inv-s2-017', 'S2-017', 'Kramer VP-444', 'AV - Projection/Screens', 'Screen 2', 1, 'Good', 'in', '', '', 'HDMI presentation switcher · Booth 2 rack', true, '[]'::jsonb),
  ('inv-s3-001', 'S3-001', 'Turbosound Impact 50', 'Sound - PA/Speakers', 'Screen 3', 8, 'Good', 'in', '', '', 'Cinema surround speakers · Auditorium 3', true, '[]'::jsonb),
  ('inv-s3-002', 'S3-002', 'EV EVID 6.2', 'Sound - PA/Speakers', 'Screen 3', 2, 'Good', 'in', '', '', 'Rear surround loudspeakers', true, '[]'::jsonb),
  ('inv-s3-003', 'S3-003', 'Martin Audio Screen 2', 'Sound - PA/Speakers', 'Screen 3', 3, 'Good', 'in', '', '', 'Behind-screen LCR speakers', true, '[]'::jsonb),
  ('inv-s3-004', 'S3-004', '18" Cinema Subwoofer', 'Sound - PA/Speakers', 'Screen 3', 1, 'Good', 'in', '', '', 'Passive cinema LFE sub · Auditorium 3', true, '[]'::jsonb),
  ('inv-s3-005', 'S3-005', 'QSC RMX Series', 'Sound - PA/Speakers', 'Screen 3', 3, 'Good', 'in', '', '', 'Cinema rack amplifiers · Booth 3', true, '[]'::jsonb),
  ('inv-s3-006', 'S3-006', 'Dolby CP750', 'Sound - PA/Speakers', 'Screen 3', 1, 'Good', 'in', '', '', 'Digital cinema processor · Booth 3', true, '[]'::jsonb),
  ('inv-s3-007', 'S3-007', 'Booth Audio Monitor', 'Sound - PA/Speakers', 'Screen 3', 1, 'Good', 'in', '', '', 'Rack-mounted booth cue speaker', true, '[]'::jsonb),
  ('inv-s3-008', 'S3-008', '6-Channel Dimmer Pack', 'Lighting - Control', 'Screen 3', 2, 'Good', 'in', '', '', 'Auditorium & stage dimmer · Booth 3', true, '[]'::jsonb),
  ('inv-s3-009', 'S3-009', '1kW Q&A Stage Flood', 'Lighting - Fixtures', 'Screen 3', 4, 'Good', 'in', '', '', 'Screen 3 front stage bar', true, '[]'::jsonb),
  ('inv-s3-010', 'S3-010', '500W Compact Fresnel', 'Lighting - Fixtures', 'Screen 3', 1, 'Good', 'in', '', '', 'Screen 3 front stage bar', true, '[]'::jsonb),
  ('inv-s3-011', 'S3-011', 'LED Birdie Pinspot', 'Lighting - Fixtures', 'Screen 3', 1, 'Good', 'in', '', '', 'Screen 3 front stage bar', true, '[]'::jsonb),
  ('inv-s3-012', 'S3-012', 'Christie CP2215', 'AV - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', '2K DLP digital cinema projector · Booth 3', true, '[]'::jsonb),
  ('inv-s3-013', 'S3-013', '16ft Cinema Projection Screen', 'AV - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', 'Perforated cinema screen · Auditorium 3', true, '[]'::jsonb),
  ('inv-s3-014', 'S3-014', 'Kramer VP-444', 'AV - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', 'HDMI presentation switcher · Booth 3 rack', true, '[]'::jsonb),
  ('inv-s3-015', 'S3-015', 'TMS Server Host', 'Network - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', 'Theatre Management System control workstation · Central rack', true, '[]'::jsonb),
  ('inv-s3-016', 'S3-016', 'Media Storage Array (22TB RAID)', 'Network - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', '2U RAID content library & CRU ingest dock', true, '[]'::jsonb),
  ('inv-s3-017', 'S3-017', 'D-Link DGS-3100-24 Managed Switch', 'Network - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', 'Cinema projection VLAN switch', true, '[]'::jsonb),
  ('inv-s3-018', 'S3-018', 'DVB-S2 Satellite Receiver', 'Network - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', 'Live event cinema satellite IRD · Central rack', true, '[]'::jsonb),
  ('inv-s3-019', 'S3-019', 'APC Smart-UPS 1500RM', 'Power', 'Screen 3', 1, 'Good', 'in', '', '', '2U rack uninterruptible power supply', true, '[]'::jsonb),
  ('inv-s3-020', 'S3-020', 'Cinema VLAN Router', 'Network - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', 'Gateway router for KDM & DCP delivery', true, '[]'::jsonb),
  ('inv-s3-021', 'S3-021', 'Electronic Content Delivery Node (12TB)', 'Network - Projection/Screens', 'Screen 3', 1, 'Good', 'in', '', '', 'Automated satellite/fibre DCP ingest storage', true, '[]'::jsonb)
on conflict ("id") do nothing;

insert into public.advancing ("id", "name", "category", "space", "date", "status", "startTime", "finishTime", "soundcheck", "doors", "curfew", "techUserId", "clientContact", "guestEngineer", "techInfo") values
  ('evt-1', 'Harbour Brass Collective — Live', 'Programme', 'Main Hall', '2026-07-31', 'Confirmed', '19:00', '23:00', '17:00', '19:30', '23:00', 'user-3', 'Tour manager — Jess', true, 'Guest FOH engineer touring with the band. 32-way split needed. Backline hired in.'),
  ('evt-2', 'Private hire — product launch', 'Private Hires', 'Studio Theatre', '2026-07-31', 'Confirmed', '18:00', '22:00', '', '18:30', '22:00', 'user-4', 'Client — Aria Events', false, 'Speeches + playback from a laptop. Two handhelds, a lectern mic, HDMI to the projector.'),
  ('evt-3', 'Short film premiere', 'Cinema', 'Screen 1', '2026-08-01', 'Advancing', '19:30', '22:00', '', '19:00', '', 'user-3', 'Producer — Sam', false, 'DCP arriving day before — ingest and test in Screen 1. Q&A after with two radio mics.'),
  ('evt-4', 'Summer gala reception', 'Private Hires', 'Mezzanine', '2026-08-03', 'Advancing', '17:00', '00:00', '', '', '00:00', '', 'Client — Harbour Foundation', false, 'DJ on later, playback earlier. Needs uplighters and a couple of radio mics for speeches.'),
  ('evt-5', 'Late-night jazz quartet', 'Programme', 'Main Hall', '2026-07-25', 'Complete', '20:00', '23:00', '18:30', '19:30', '23:00', 'user-3', '', false, 'House engineer. Standard jazz input list.')
on conflict ("id") do nothing;

insert into public.procedures ("id", "category", "title", "body", "icon") values
  ('venue-open', 'Opening & Closing', 'Venue opening checklist', '', 'power'),
  ('night-close', 'Opening & Closing', 'End-of-night shutdown', '', 'power'),
  ('pa-powerup', 'Sound', 'PA power-up sequence', '', 'wave'),
  ('foh-dlive', 'Sound', 'FOH desk (dLive) startup', '', 'wave'),
  ('monitors', 'Sound', 'Monitor world setup', '', 'wave'),
  ('rf-management', 'Sound', 'Radio mic / IEM management', '', 'wave'),
  ('lx-startup', 'Lighting', 'Lighting desk startup', '', 'bulb'),
  ('house-lights', 'Lighting', 'House lights & presets', '', 'bulb'),
  ('haze', 'Lighting', 'Haze / smoke operation', '', 'bulb'),
  ('projector', 'AV & Presentation', 'Projector & screen setup', '', 'screen'),
  ('patching', 'AV & Presentation', 'Laptop / HDMI patching', '', 'screen'),
  ('hybrid', 'AV & Presentation', 'Hybrid / streamed event setup', '', 'screen'),
  ('get-in', 'Stage & Rigging', 'Stage build & get-in', '', 'box'),
  ('rigging', 'Stage & Rigging', 'Rigging & flying points', '', 'box'),
  ('get-out', 'Stage & Rigging', 'Get-out procedure', '', 'box'),
  ('evac', 'Health & Safety', 'Fire & evacuation procedure', '', 'shield'),
  ('height', 'Health & Safety', 'Working at height', '', 'shield'),
  ('handling', 'Health & Safety', 'Manual handling', '', 'shield'),
  ('incident', 'Health & Safety', 'Incident reporting', '', 'shield'),
  ('pat', 'Health & Safety', 'Electrical safety (PAT)', '', 'shield')
on conflict ("id") do nothing;

-- maintenance, reports + signoffs start empty (created in-app).


-- ------------------------------------------------------------
-- DMX Lighting Patches & Fixture Personalities
-- ------------------------------------------------------------
create table if not exists public.dmx_personalities (
  "id" text primary key,
  "manufacturer" text not null,
  "model" text not null,
  "mode" text not null default 'Standard',
  "channels" integer not null default 1,
  "category" text not null default 'Fixtures',
  "isFactory" boolean not null default false,
  "notes" text default '',
  "createdAt" bigint,
  "updatedAt" bigint
);

create table if not exists public.dmx_patches (
  "id" text primary key,
  "title" text not null default 'DMX Lighting Patch',
  "eventId" text default null,
  "eventName" text default '',
  "space" text default '',
  "date" text default '',
  "notes" text default '',
  "fixtures" jsonb not null default '[]'::jsonb,
  "createdAt" bigint,
  "updatedAt" bigint
);

alter table public.advancing add column if not exists "dmx_fixtures" jsonb default '[]'::jsonb;
alter table public.patch_sheets add column if not exists "dmx_fixtures" jsonb default '[]'::jsonb;

alter table public.availability enable row level security;
alter table public.bookings enable row level security;
alter table public.venues enable row level security;

drop policy if exists rw_all_availability on public.availability;
create policy rw_all_availability on public.availability for all to authenticated, anon using (true) with check (true);

drop policy if exists rw_all_bookings on public.bookings;
create policy rw_all_bookings on public.bookings for all to authenticated, anon using (true) with check (true);

drop policy if exists rw_all_venues on public.venues;
create policy rw_all_venues on public.venues for all to authenticated, anon using (true) with check (true);

alter table public.dmx_personalities enable row level security;
alter table public.dmx_patches enable row level security;

drop policy if exists rw_all_dmx_personalities on public.dmx_personalities;
create policy rw_all_dmx_personalities on public.dmx_personalities for all to authenticated, anon using (true) with check (true);

drop policy if exists rw_all_dmx_patches on public.dmx_patches;
create policy rw_all_dmx_patches on public.dmx_patches for all to authenticated, anon using (true) with check (true);

-- ---------- Tasks (Jobs List) ----------
create table if not exists public.tasks (
  "id" text primary key,
  "title" text not null,
  "description" text default '',
  "category" text default 'General',
  "space" text default '',
  "priority" text default 'Medium',
  "status" text default 'Pending',
  "assignedTechId" text default '',
  "assignedTechName" text default '',
  "reportedBy" text default '',
  "source" text default 'manual',
  "linkedScreeningId" text default '',
  "linkedEventId" text default '',
  "filmTitle" text default '',
  "screen" text default '',
  "dueDate" text default '',
  "dueTime" text default '',
  "mediaType" text default '',
  "linkedFaultId" text default '',
  "linkedReportId" text default '',
  "taggedUserIds" jsonb default '[]'::jsonb,
  "taggedUserNames" jsonb default '[]'::jsonb,
  "completedBy" text default '',
  "completedAt" text default null,
  "createdAt" bigint,
  "updatedAt" bigint
);

alter table public.tasks add column if not exists "linkedFaultId" text default '';
alter table public.tasks add column if not exists "linkedReportId" text default '';
alter table public.tasks add column if not exists "taggedUserIds" jsonb default '[]'::jsonb;
alter table public.tasks add column if not exists "taggedUserNames" jsonb default '[]'::jsonb;

alter table public.tasks enable row level security;
drop policy if exists rw_all_tasks on public.tasks;
create policy rw_all_tasks on public.tasks for all to authenticated, anon using (true) with check (true);

-- ---------- DCPs & Pre-Screenings ----------
create table if not exists public.dcps (
  "id" text primary key,
  "eventId" text default '',
  "eventName" text default '',
  "filmTitle" text default '',
  "mediaType" text default '',
  "eventDate" text default '',
  "eventStartTime" text default '',
  "eventFinishTime" text default '',
  "screen" text default '',
  "targetHardware" text default '',
  "mediaReceived" boolean default false,
  "kdmCplReceived" boolean default false,
  "playlistMade" boolean default false,
  "tested" boolean default false,
  "holdingSlidesReady" boolean default false,
  "subsAudioSync" boolean default false,
  "issuesNoted" text default '',
  "outcome" text default 'Pending',
  "hasFurtherAction" boolean default false,
  "furtherAction" text default '',
  "linkedTaskId" text default '',
  "testedByUserId" text default '',
  "testedByUserName" text default '',
  "testDateTime" text default '',
  "clientName" text default '',
  "pictureFormat" text default 'Flat (1.85:1)',
  "audioFormat" text default '5.1 Surround',
  "deadlineDate" text default '',
  "qc_criteria" jsonb default '{}'::jsonb,
  "outcomeManualOverride" boolean default false,
  "lastReportId" text default '',
  "reportGeneratedAt" text default '',
  "createdAt" text default '',
  "updatedAt" text default ''
);

alter table public.dcps add column if not exists "clientName" text default '';
alter table public.dcps add column if not exists "pictureFormat" text default 'Flat (1.85:1)';
alter table public.dcps add column if not exists "audioFormat" text default '5.1 Surround';
alter table public.dcps add column if not exists "deadlineDate" text default '';
alter table public.dcps add column if not exists "qc_criteria" jsonb default '{}'::jsonb;
alter table public.dcps add column if not exists "outcomeManualOverride" boolean default false;
alter table public.dcps add column if not exists "lastReportId" text default '';
alter table public.dcps add column if not exists "reportGeneratedAt" text default '';

alter table public.dcps enable row level security;
drop policy if exists rw_all_dcps on public.dcps;
create policy rw_all_dcps on public.dcps for all to authenticated, anon using (true) with check (true);

-- Ensure reports table supports DCP QC reports
alter table public.reports add column if not exists "type" text default 'duty_report';
alter table public.reports add column if not exists "title" text default '';
alter table public.reports add column if not exists "screeningId" text default '';
alter table public.reports add column if not exists "filmTitle" text default '';
alter table public.reports add column if not exists "screen" text default '';
alter table public.reports add column if not exists "date" text default '';
alter table public.reports add column if not exists "outcome" text default '';
alter table public.reports add column if not exists "testerName" text default '';
alter table public.reports add column if not exists "clientName" text default '';
alter table public.reports add column if not exists "emailSubject" text default '';
alter table public.reports add column if not exists "emailBody" text default '';
alter table public.reports add column if not exists "createdAt" text default '';


insert into public.dmx_personalities ("id", "manufacturer", "model", "mode", "channels", "category", "isFactory", "createdAt", "updatedAt")
values
  ('fix-robe-spiider-27', 'Robe', 'Spiider', 'Mode 1 (Standard Wash/Beam)', 27, 'Moving Wash / Beam', true, 1700000000000, 1700000000000),
  ('fix-robe-spiider-49', 'Robe', 'Spiider', 'Mode 2 (Enhanced FX)', 49, 'Moving Wash / Beam', true, 1700000000000, 1700000000000),
  ('fix-robe-pointe-16', 'Robe', 'Pointe', 'Mode 1 (Standard Beam/Spot)', 16, 'Moving Beam / Spot', true, 1700000000000, 1700000000000),
  ('fix-robe-pointe-24', 'Robe', 'Pointe', 'Mode 2 (Extended)', 24, 'Moving Beam / Spot', true, 1700000000000, 1700000000000),
  ('fix-chauvet-mav-force-s', 'Chauvet Professional', 'Maverick Force S Spot', 'Standard (24ch)', 24, 'Moving Spot / Profile', true, 1700000000000, 1700000000000),
  ('fix-chauvet-colorado-1-quad-12', 'Chauvet Professional', 'COLORado 1-Quad Zoom', 'TOUR (12ch)', 12, 'LED Par / Wash', true, 1700000000000, 1700000000000),
  ('fix-chauvet-colorado-1-quad-7', 'Chauvet Professional', 'COLORado 1-Quad Zoom', 'ARC.2 (7ch)', 7, 'LED Par / Wash', true, 1700000000000, 1700000000000),
  ('fix-etc-s4-led-s3-10', 'ETC', 'Source Four LED Series 3', 'Lustr X8 Direct (10ch)', 10, 'Profile / Leko', true, 1700000000000, 1700000000000),
  ('fix-etc-s4-led-s2-8', 'ETC', 'Source Four LED Series 2', 'Lustr Direct (8ch)', 8, 'Profile / Leko', true, 1700000000000, 1700000000000),
  ('fix-astera-titan-4', 'Astera', 'Titan Tube (FP1)', 'RGB CCT Dim 8-bit (4ch)', 4, 'Battery / Wireless Pixel Tube', true, 1700000000000, 1700000000000),
  ('fix-astera-titan-16px', 'Astera', 'Titan Tube (FP1)', '16 Pixels RGB (48ch)', 48, 'Battery / Wireless Pixel Tube', true, 1700000000000, 1700000000000),
  ('fix-martin-mac-aura-xb-14', 'Martin', 'MAC Aura XB', 'Standard Mode (14ch)', 14, 'Moving Wash', true, 1700000000000, 1700000000000),
  ('fix-martin-mac-quantum-prof-27', 'Martin', 'MAC Quantum Profile', 'Extended Mode (27ch)', 27, 'Moving Profile', true, 1700000000000, 1700000000000),
  ('fix-claypaky-mythos2-30', 'Clay Paky', 'Mythos 2', 'Standard (30ch)', 30, 'Moving Hybrid Beam/Spot', true, 1700000000000, 1700000000000),
  ('fix-chauvet-intimidator-375z', 'Chauvet DJ', 'Intimidator Spot 375Z', '15 Channel Mode', 15, 'Moving Spot', true, 1700000000000, 1700000000000),
  ('fix-generic-dimmer-1', 'Generic', 'Dimmer / Conventional', '1 Channel (0-100% Intensity)', 1, 'Conventional / Tungsten', true, 1700000000000, 1700000000000),
  ('fix-generic-rgbw-4', 'Generic', 'LED Par RGBW', '4 Channel (R/G/B/W)', 4, 'LED Par / Wash', true, 1700000000000, 1700000000000),
  ('fix-generic-rgbwa-uv-6', 'Generic', 'LED Par RGBWA+UV', '6 Channel (R/G/B/W/A/UV)', 6, 'LED Par / Wash', true, 1700000000000, 1700000000000),
  ('fix-showtec-sunstrip-10', 'Showtec', 'Sunstrip Active DMX', '10 Channel (Individual Cell)', 10, 'Batten / Blinder', true, 1700000000000, 1700000000000),
  ('fix-look-unique-hazer-2', 'Look Solutions', 'Unique 2.1 Hazer', '2 Channel (Pump / Fan)', 2, 'Atmospheric / FX', true, 1700000000000, 1700000000000),
  ('fix-look-viper-smoke-1', 'Look Solutions', 'Viper NT Fogger', '1 Channel (Pump)', 1, 'Atmospheric / FX', true, 1700000000000, 1700000000000)
on conflict ("id") do update set
  "manufacturer" = excluded."manufacturer",
  "model" = excluded."model",
  "mode" = excluded."mode",
  "channels" = excluded."channels",
  "category" = excluded."category",
  "isFactory" = excluded."isFactory";

-- ============================================================
--  OPTIONAL: tighten security once it's working.
--  Replace the permissive rw_all policies per table, e.g.:
--
--  drop policy if exists rw_all on public.signoffs;
--  create policy sel on public.signoffs for select to authenticated using (true);
--  create policy ins on public.signoffs for insert to authenticated with check (public.is_trainer());
--  create policy del on public.signoffs for delete to authenticated using (public.is_admin());
--
--  drop policy if exists rw_all on public.maintenance;
--  create policy sel on public.maintenance for select to authenticated using (true);
--  create policy ins on public.maintenance for insert to authenticated with check (true);
--  create policy upd on public.maintenance for update to authenticated using (true) with check (true);
--  -- (resolving is app-gated; enforce here with is_admin() if you want it hard)
--
--  drop policy if exists rw_all on public.users;
--  create policy sel on public.users for select to authenticated using (true);
--  create policy ins on public.users for insert to authenticated with check (true);   -- self sign-up (pending)
--  create policy upd on public.users for update to authenticated using (public.is_admin()) with check (public.is_admin());
-- ============================================================

