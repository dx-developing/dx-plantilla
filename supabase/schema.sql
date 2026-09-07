create extension if not exists pgcrypto;

create type public.project_status as enum ('draft', 'published');
create type public.member_role as enum ('owner', 'editor');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.member_role not null default 'editor',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.projects (
  id text primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  client text not null,
  category text not null default 'Negocio local',
  status public.project_status not null default 'draft',
  theme jsonb not null default '{}'::jsonb,
  sections jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_organization_updated_idx on public.projects(organization_id, updated_at desc);

create or replace function public.is_org_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where organization_id = target_org and user_id = auth.uid()
  );
$$;

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.projects enable row level security;

create policy "Members can view their organizations"
  on public.organizations for select
  using (public.is_org_member(id));

create policy "Members can view membership"
  on public.organization_members for select
  using (user_id = auth.uid() or public.is_org_member(organization_id));

create policy "Members can view projects"
  on public.projects for select
  using (public.is_org_member(organization_id));

create policy "Anyone can view published projects"
  on public.projects for select
  using (status = 'published');

create policy "Editors can create projects"
  on public.projects for insert
  with check (public.is_org_member(organization_id));

create policy "Editors can update projects"
  on public.projects for update
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Owners can delete projects"
  on public.projects for delete
  using (exists (
    select 1 from public.organization_members
    where organization_id = projects.organization_id
      and user_id = auth.uid()
      and role = 'owner'
  ));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
 declare new_org uuid;
 begin
   insert into public.organizations (name, slug)
   values (coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), gen_random_uuid()::text)
   returning id into new_org;
   insert into public.organization_members (organization_id, user_id, role)
   values (new_org, new.id, 'owner');
   return new;
 end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
