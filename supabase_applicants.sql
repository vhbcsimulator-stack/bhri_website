-- ============================================================================
-- Supabase PostgreSQL Schema — Job Applications (Careers Apply Modal)
-- Project: Bright Hermosa Realty Inc. (BHRI)
-- Description: Table schema, RLS policies, and Storage bucket for resumes
--              submitted through the public Careers "Apply" modal, plus the
--              admin dashboard that reviews/manages them.
-- ============================================================================

-- 1. JOB APPLICATIONS TABLE
-- ============================================================================
create table if not exists public.job_applications (
  id uuid primary key default uuid_generate_v4(),
  job_id text,
  job_title text,
  full_name text not null,
  email text not null,
  phone text,
  message text,
  resume_path text not null,
  resume_filename text,
  cover_letter_path text,
  cover_letter_filename text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.job_applications is 'Applications submitted through the public Careers apply form.';

-- ============================================================================
-- 2. ROW-LEVEL SECURITY (RLS) FOR JOB_APPLICATIONS TABLE
-- ============================================================================
alter table public.job_applications enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

drop policy if exists "Allow public insert" on public.job_applications;
drop policy if exists "Allow admin read access" on public.job_applications;
drop policy if exists "Allow admin update access" on public.job_applications;
drop policy if exists "Allow admin delete access" on public.job_applications;

-- Policy A: Allow anyone (public/anonymous applicants) to submit an application
create policy "Allow public insert" on public.job_applications
  for insert to anon, authenticated
  with check (
    status = 'new'
    and char_length(full_name) between 2 and 150
    and char_length(email) between 3 and 320
    and char_length(coalesce(phone, '')) <= 40
    and char_length(coalesce(message, '')) <= 3000
    and char_length(resume_path) between 1 and 255
  );

-- Policy B: Only authenticated admins can view submitted applications
create policy "Allow admin read access" on public.job_applications
  for select to authenticated
  using ((select public.is_admin()));

-- Policy C: Only authenticated admins can update application status
create policy "Allow admin update access" on public.job_applications
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Policy D: Only authenticated admins can delete applications
create policy "Allow admin delete access" on public.job_applications
  for delete to authenticated
  using ((select public.is_admin()));

-- ============================================================================
-- 3. SUPABASE STORAGE BUCKET CONFIGURATION (private — resumes are not public)
-- ============================================================================
do $$
begin
  if not exists (select 1 from storage.buckets where id = 'applicant-resumes') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'applicant-resumes',
      'applicant-resumes',
      false,
      3145728, -- 3MB file limit, matches ApplyModal client-side validation
      array[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    );
  end if;
end $$;

-- Keep limits correct when the bucket already existed before this script ran.
update storage.buckets
set public = false,
    file_size_limit = 3145728,
    allowed_mime_types = array[
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
where id = 'applicant-resumes';

drop policy if exists "Allow public insert into resumes bucket" on storage.objects;
drop policy if exists "Allow admin read from resumes bucket" on storage.objects;
drop policy if exists "Allow admin delete from resumes bucket" on storage.objects;

-- RLS Policies for Storage Objects (resume/cover letter files)
-- Policy A: Allow anyone (public applicants) to upload into the bucket
create policy "Allow public insert into resumes bucket" on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id = 'applicant-resumes'
    and lower(storage.extension(name)) in ('pdf', 'doc', 'docx')
  );

-- Policy B: Only authenticated admins can read/download files (used for signed URLs)
create policy "Allow admin read from resumes bucket" on storage.objects
  for select to authenticated
  using (bucket_id = 'applicant-resumes' and (select public.is_admin()));

-- Policy C: Only authenticated admins can delete files
create policy "Allow admin delete from resumes bucket" on storage.objects
  for delete to authenticated
  using (bucket_id = 'applicant-resumes' and (select public.is_admin()));
