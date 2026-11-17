# Moving CRM Sync to a Supabase Edge Function

When hosting the front-end on a static host, a Node.js backend proxy is not required. To keep the EventSync CRM API sync working securely (without exposing API credentials to the browser), the backend logic runs inside a **Supabase Edge Function** (`crm-sync`).

The front-end (`js/views/advancing.js`) calls the Supabase function named `crm-sync`.

## Step 1: Add Your CRM Credentials as Secrets
Securely store your EventSync CRM credentials in your Supabase project so the function can read them without exposing them in client code.

1. Open your project in the [Supabase Dashboard](https://app.supabase.com/).
2. Go to **Project Settings → Edge Functions**.
3. Under **Secrets**, add the following secrets:
   * Name: `CRM_API_KEY` | Value: *(Your CRM API key)*
   * Name: `CRM_USERNAME` | Value: `ops@meridian-arts.example`
   * Name: `CRM_PASSWORD` | Value: *(Your CRM password)*
   * Name: `CRM_API_URL` | Value: `https://api.eventsync-crm.example`

## Step 2: Create the Edge Function
1. In the Supabase Dashboard sidebar, click **Edge Functions**.
2. Click **Create a new Edge Function** and name it `crm-sync`.
3. Configure **Enforce JWT Verification** according to your team's auth policy.

## Step 3: Deploy the Function Code
Deploy `supabase/functions/crm-sync/index.ts` via CLI (`supabase functions deploy crm-sync`) or paste its source into the inline dashboard editor and save.
