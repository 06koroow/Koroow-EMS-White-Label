# Pulling events from EventSync CRM into the Tech Portal

This wires EventSync CRM (the venue's booking source of truth) to the Portal's **Advancing**
list. It runs as a **Supabase Edge Function** so the CRM API key stays
server-side and never touches the browser. It's one-way: EventSync CRM owns the booking
facts (what/where/when/who booked); the Portal's own fields (assigned tech, tech
info, tech spec) are preserved on every sync.

```
EventSync CRM  →  crm-sync (Edge Function, secret key)  →  Supabase `advancing`  →  the Portal reads it
```

## 0. What you need
- The **Supabase CLI** installed (`npm i -g supabase`), and your project ref.
- A **CRM API key** and your EventSync CRM URL (`https://api.eventsync-crm.example`).

## 1. Add the `crmBookingId` and `crmHistory` columns (existing databases)
Fresh setups get it from `supabase-setup.sql`. If your `advancing` table already
exists, run this once in the Supabase SQL Editor:
```sql
alter table public.advancing add column if not exists "crmBookingId" text;
alter table public.advancing add column if not exists "crmHistory" jsonb default '[]'::jsonb;
create unique index if not exists advancing_crm_uniq
  on public.advancing ("crmBookingId") where "crmBookingId" is not null;
```

## 2. Point the function at EventSync CRM
Open `supabase/functions/crm-sync/index.ts` and configure:
- **`ROOM_TO_SPACE`** — map your exact CRM room names to the venue spaces (`Main Hall`, `Studio Theatre`, `Mezzanine`, `Screen 1`, `Screen 2`, `Screen 3`, `Foyer`, `Cinema Lounge`, `Rehearsal Lab`).
- **`fetchCrmInstances()`** — set the endpoint, query params and response field names for your CRM instance.

## 3. Set the secrets
```bash
supabase login
supabase link --project-ref <your-supabase-project-ref>
supabase secrets set CRM_API_URL="https://api.eventsync-crm.example"
supabase secrets set CRM_API_KEY="<your CRM API key>"
supabase secrets set CRM_USERNAME="<your CRM username>"
supabase secrets set CRM_PASSWORD="<your CRM password>"
```
(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically to the
function — don't set those.)

## 4. Deploy
```bash
supabase functions deploy crm-sync
```

## 5. Test it
- In the app, sign in as an admin → **Advancing → Sync CRM**. You'll get
  a toast like "EventSync CRM: 12 added, 3 updated", and the events appear in the list.
- Or from the CLI: `supabase functions invoke crm-sync` and read the JSON
  (`created` / `updated` / `skipped`). `skipped` counts events in rooms that aren't
  mapped.

## 6. Schedule it (optional)
In the Supabase dashboard, enable the **pg_cron** and **pg_net** extensions, then schedule an invoke every 20 min:
```sql
select cron.schedule('crm-sync', '*/20 * * * *', $$
  select net.http_post(
    url := 'https://<your-supabase-project-ref>.functions.supabase.co/crm-sync',
    headers := jsonb_build_object('Authorization', 'Bearer <SUPABASE_ANON_OR_SERVICE_KEY>')
  );
$$);
```

---

### How it behaves
- **Tech fields are safe.** On each sync the function updates only booking fields
  (name, space, date, times, contact, status) on existing rows and leaves
  `techInfo`, `techSpec`, assigned crew, and any linked reports untouched.
- **No duplicates.** Rows are matched on `crmBookingId`, so re-running updates in place.
- **Cancellations** in EventSync CRM set the event's status to `Cancelled` (they're not
  deleted, so you keep the history and any tech notes).
