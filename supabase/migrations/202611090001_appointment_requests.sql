-- Appointment requests are written only by the private Vercel API using a Supabase secret key.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to service_role;

create table if not exists private.booking_rate_limits (
  ip_hash text primary key check (ip_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1 check (request_count between 1 and 9)
);

create index if not exists booking_rate_limits_window_idx
  on private.booking_rate_limits (window_started_at);

revoke all on table private.booking_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on table private.booking_rate_limits to service_role;

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (phone ~ '^[0-9]{10,15}$'),
  service text not null check (service in (
    'Corte', 'Corte y barba', 'Solo barba', 'Delineado de ceja', 'Línea extra'
  )),
  requested_date date not null,
  requested_time time without time zone not null,
  style text check (style is null or style in (
    'Moderno', 'Clásico', 'Degradado / fade', 'Taper', 'Crop texturizado',
    'Ejecutivo', 'Otro (lo platicamos por WhatsApp)'
  )),
  note text check (note is null or char_length(note) <= 240),
  status text not null default 'requested' check (status in ('requested', 'confirmed', 'cancelled', 'completed')),
  constraint appointment_requests_open_day check (extract(isodow from requested_date) between 1 and 6),
  constraint appointment_requests_business_hours check (
    (extract(isodow from requested_date) between 1 and 5 and requested_time between time '14:00' and time '21:30')
    or (extract(isodow from requested_date) = 6 and requested_time between time '13:00' and time '20:30')
  ),
  constraint appointment_requests_half_hour check (
    extract(minute from requested_time)::integer % 30 = 0
  )
);

alter table public.appointment_requests enable row level security;
revoke all on table public.appointment_requests from public, anon, authenticated;
grant select, insert, update, delete on table public.appointment_requests to service_role;

create or replace function public.consume_booking_rate_limit(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_count integer;
begin
  if p_ip_hash !~ '^[0-9a-f]{64}$' then
    return false;
  end if;

  delete from private.booking_rate_limits
  where window_started_at < now() - interval '24 hours';

  insert into private.booking_rate_limits as limits (ip_hash, window_started_at, request_count)
  values (p_ip_hash, now(), 1)
  on conflict (ip_hash) do update
    set window_started_at = case
          when limits.window_started_at <= now() - interval '1 hour' then now()
          else limits.window_started_at
        end,
        request_count = case
          when limits.window_started_at <= now() - interval '1 hour' then 1
          else least(limits.request_count + 1, 9)
        end
  returning request_count into current_count;

  return current_count <= 8;
end;
$$;

revoke all on function public.consume_booking_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_booking_rate_limit(text) to service_role;
