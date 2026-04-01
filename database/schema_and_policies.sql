create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key,
  full_name text,
  phone text,
  created_at timestamp with time zone default now()
);

create table if not exists clinics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  name text not null,
  phone text,
  address text,
  working_hours text,
  consultation_price integer default 0,
  is_bot_enabled boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references clinics(id) on delete cascade,
  keyword text not null,
  answer text not null,
  created_at timestamp with time zone default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references clinics(id) on delete cascade,
  customer_name text,
  customer_phone text,
  message text,
  status text default 'new',
  created_at timestamp with time zone default now()
);

create table if not exists payment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  customer_name text not null,
  customer_phone text not null,
  plan_name text not null,
  amount integer not null,
  transaction_reference text not null,
  payment_method text default 'WE Cash',
  payment_phone text default '01515351143',
  status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  customer_phone text not null,
  customer_name text,
  plan_name text not null,
  status text default 'active',
  payment_request_id uuid unique references payment_requests(id) on delete set null,
  created_at timestamp with time zone default now()
);

insert into clinics (name, phone, address, working_hours, consultation_price, is_bot_enabled)
values
  ('Sleem Demo Clinic', '01000000000', 'Nasr City, Cairo', 'Sat-Thu 4PM to 10PM', 350, true);

alter table profiles enable row level security;
alter table clinics enable row level security;
alter table faq enable row level security;
alter table leads enable row level security;
alter table payment_requests enable row level security;
alter table subscriptions enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own"
on profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own"
on profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own"
on profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "clinics_select_own" on clinics;
create policy "clinics_select_own"
on clinics
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "clinics_insert_own" on clinics;
create policy "clinics_insert_own"
on clinics
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "clinics_update_own" on clinics;
create policy "clinics_update_own"
on clinics
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "faq_select_own_clinic" on faq;
create policy "faq_select_own_clinic"
on faq
for select
to authenticated
using (
  exists (
    select 1
    from clinics
    where clinics.id = faq.clinic_id
      and clinics.user_id = (select auth.uid())
  )
);

drop policy if exists "faq_insert_own_clinic" on faq;
create policy "faq_insert_own_clinic"
on faq
for insert
to authenticated
with check (
  exists (
    select 1
    from clinics
    where clinics.id = faq.clinic_id
      and clinics.user_id = (select auth.uid())
  )
);

drop policy if exists "faq_update_own_clinic" on faq;
create policy "faq_update_own_clinic"
on faq
for update
to authenticated
using (
  exists (
    select 1
    from clinics
    where clinics.id = faq.clinic_id
      and clinics.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from clinics
    where clinics.id = faq.clinic_id
      and clinics.user_id = (select auth.uid())
  )
);

drop policy if exists "faq_delete_own_clinic" on faq;
create policy "faq_delete_own_clinic"
on faq
for delete
to authenticated
using (
  exists (
    select 1
    from clinics
    where clinics.id = faq.clinic_id
      and clinics.user_id = (select auth.uid())
  )
);

drop policy if exists "leads_select_own_clinic" on leads;
create policy "leads_select_own_clinic"
on leads
for select
to authenticated
using (
  exists (
    select 1
    from clinics
    where clinics.id = leads.clinic_id
      and clinics.user_id = (select auth.uid())
  )
);

drop policy if exists "leads_insert_own_clinic" on leads;
create policy "leads_insert_own_clinic"
on leads
for insert
to authenticated
with check (
  exists (
    select 1
    from clinics
    where clinics.id = leads.clinic_id
      and clinics.user_id = (select auth.uid())
  )
);

drop policy if exists "leads_update_own_clinic" on leads;
create policy "leads_update_own_clinic"
on leads
for update
to authenticated
using (
  exists (
    select 1
    from clinics
    where clinics.id = leads.clinic_id
      and clinics.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from clinics
    where clinics.id = leads.clinic_id
      and clinics.user_id = (select auth.uid())
  )
);

drop policy if exists "payment_requests_select_own" on payment_requests;
create policy "payment_requests_select_own"
on payment_requests
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "payment_requests_insert_own" on payment_requests;
create policy "payment_requests_insert_own"
on payment_requests
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "payment_requests_update_own" on payment_requests;
create policy "payment_requests_update_own"
on payment_requests
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "subscriptions_select_own" on subscriptions;
create policy "subscriptions_select_own"
on subscriptions
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "subscriptions_insert_own" on subscriptions;
create policy "subscriptions_insert_own"
on subscriptions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "subscriptions_update_own" on subscriptions;
create policy "subscriptions_update_own"
on subscriptions
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
