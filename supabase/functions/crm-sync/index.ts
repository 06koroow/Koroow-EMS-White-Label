// ============================================================
//  crm-sync — Supabase Edge Function
//  Pulls events from EventSync CRM and upserts them into the `advancing`
//  table. Runs SERVER-SIDE so the CRM API key (a secret) never
//  reaches the browser. One-way: EventSync CRM owns the booking facts;
//  the Tech Portal's own fields (assigned tech, tech info, tech spec)
//  are preserved on every sync.
//
//  Secrets (set with `supabase secrets set ...`):
//    CRM_API_URL        e.g. https://api.eventsync-crm.example
//    CRM_API_KEY        from EventSync CRM: Admin → Configuration → API
//  Provided automatically by the Edge runtime:
//    SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
//  Deploy:  supabase functions deploy crm-sync
//  Invoke:  from the app's "Sync CRM" button, or on a
//           schedule (see docs/CRM-SYNC-SETUP.md).
// ============================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CRM_API_URL = (Deno.env.get("CRM_API_URL") ?? "").trim();
const CRM_API_KEY = (Deno.env.get("CRM_API_KEY") ?? "").trim();
const CRM_USERNAME = (Deno.env.get("CRM_USERNAME") ?? "").trim();
const CRM_PASSWORD = (Deno.env.get("CRM_PASSWORD") ?? "").trim();
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// How far ahead to sync (6 months).
const HORIZON_DAYS = 180;

// ---- CRM room name → Tech Portal space alias map. ----
const ROOM_TO_SPACE: Record<string, string> = {
  "Main Hall": "Main Hall",
  "Main Stage": "Main Hall",
  "Auditorium": "Main Hall",
  "MH": "Main Hall",
  "Studio Theatre": "Studio Theatre",
  "Studio": "Studio Theatre",
  "Studio 1": "Studio Theatre",
  "ST": "Studio Theatre",
  "Mezzanine": "Mezzanine",
  "Mezzanine Bar": "Mezzanine",
  "MZ": "Mezzanine",
  "Screen 1": "Screen 1",
  "Screen One": "Screen 1",
  "Cinema 1": "Screen 1",
  "Cinema One": "Screen 1",
  "Cinema Lounge": "Cinema Lounge",
  "Rehearsal Lab": "Rehearsal Lab",
  "Lab": "Rehearsal Lab",
  "Screen 2": "Screen 2",
  "Screen Two": "Screen 2",
  "Cinema 2": "Screen 2",
  "Cinema Two": "Screen 2",
  "Screen 3": "Screen 3",
  "Screen Three": "Screen 3",
  "Cinema 3": "Screen 3",
  "Cinema Three": "Screen 3",
  "Foyer": "Foyer",
  "Main Foyer": "Foyer",
  "Cafe": "Foyer",
};

function resolveSpace(roomName: string): string {
  const r = (roomName || "").trim();
  if (!r) return "Main Hall";
  if (ROOM_TO_SPACE[r]) return ROOM_TO_SPACE[r];

  const lower = r.toLowerCase();
  if (lower.includes("cinema lounge") || lower.includes("cinema gallery")) return "Cinema Lounge";
  if (lower.includes("lab")) return "Rehearsal Lab";
  if (lower.includes("screen 1") || lower.includes("cinema 1") || lower.includes("screen one") || lower.includes("cinema one")) return "Screen 1";
  if (lower.includes("screen 2") || lower.includes("cinema 2") || lower.includes("screen two") || lower.includes("cinema two")) return "Screen 2";
  if (lower.includes("screen 3") || lower.includes("cinema 3") || lower.includes("screen three") || lower.includes("cinema three")) return "Screen 3";
  if (lower.includes("hall") || lower.includes("stage")) return "Main Hall";
  if (lower.includes("studio")) return "Studio Theatre";
  if (lower.includes("mezzanine") || lower.includes("bar")) return "Mezzanine";
  if (lower.includes("foyer") || lower.includes("cafe")) return "Foyer";

  return r;
}

function resolveStatus(statusStr: string): string {
  const s = (statusStr || "").toLowerCase();
  if (s.includes("cancel")) return "Cancelled";
  if (s.includes("tentative") || s.includes("provisional") || s.includes("pencil") || s.includes("enquiry") || s.includes("inquiry") || s.includes("hold")) return "Tentative";
  return "Confirmed";
}

function isAuxiliarySpace(spaceName: string): boolean {
  if (!spaceName) return false;
  const coreSet = new Set([
    "Main Hall", "Studio Theatre", "Mezzanine",
    "Screen 1", "Screen 2", "Screen 3"
  ]);
  return !coreSet.has(spaceName.trim());
}

// Extract technical, layout, and event notes from EventSync CRM response
function extractCrmNotes(r: any): string {
  const parts: string[] = [];
  const seenNotes = new Set<string>();

  const addNote = (label: string, text: any) => {
    if (text === null || text === undefined) return;
    const str = String(text).trim();
    if (!str || seenNotes.has(str)) return;
    seenNotes.add(str);
    if (label) {
      parts.push(`[${label}]: ${str}`);
    } else {
      parts.push(str);
    }
  };

  const candidateFields = [
    { key: 'notes', label: '' },
    { key: 'description', label: 'Description' },
    { key: 'event_notes', label: 'Event Notes' },
    { key: 'arrangement_notes', label: 'Arrangement Notes' },
    { key: 'internal_notes', label: 'Internal Notes' },
    { key: 'public_description', label: 'Public Description' },
    { key: 'event_description', label: 'Event Description' },
    { key: 'arrangement_description', label: 'Arrangement Description' },
    { key: 'comments', label: 'Comments' },
    { key: 'event_comments', label: 'Event Comments' },
    { key: 'arrangement_comments', label: 'Arrangement Comments' },
    { key: 'technical_requirements', label: 'Technical Requirements' },
    { key: 'tech_requirements', label: 'Tech Requirements' },
    { key: 'technical_notes', label: 'Technical Notes' },
    { key: 'tech_notes', label: 'Tech Notes' },
    { key: 'requirements', label: 'Requirements' },
    { key: 'setup_notes', label: 'Setup Notes' },
    { key: 'set_up_notes', label: 'Setup Notes' },
    { key: 'staging_notes', label: 'Staging Notes' },
    { key: 'av_notes', label: 'AV Notes' },
    { key: 'sound_notes', label: 'Sound Notes' },
    { key: 'lighting_notes', label: 'Lighting Notes' },
    { key: 'catering_notes', label: 'Catering Notes' },
    { key: 'special_instructions', label: 'Special Instructions' },
    { key: 'memo', label: 'Memo' },
    { key: 'memos', label: 'Memos' },
    { key: 'summary', label: 'Summary' },
    { key: 'details', label: 'Details' },
    { key: 'task_notes', label: 'Tasks' },
    { key: 'roster_notes', label: 'Roster Notes' },
    { key: 'Notes', label: '' },
    { key: 'Description', label: 'Description' },
    { key: 'EventNotes', label: 'Event Notes' },
    { key: 'ArrangementNotes', label: 'Arrangement Notes' },
    { key: 'TechnicalNotes', label: 'Technical Notes' },
    { key: 'Comments', label: 'Comments' },
  ];

  for (const { key, label } of candidateFields) {
    if (r[key] !== undefined && r[key] !== null) {
      if (typeof r[key] === 'string' || typeof r[key] === 'number') {
        addNote(label, r[key]);
      } else if (Array.isArray(r[key])) {
        for (const item of r[key]) {
          if (typeof item === 'string') addNote(label, item);
          else if (item && typeof item === 'object') {
            const itemText = item.text || item.note || item.content || item.description || item.value || '';
            if (itemText) addNote(item.title || item.label || label, itemText);
          }
        }
      }
    }
  }

  const forms = Array.isArray(r.custom_forms) ? r.custom_forms : (Array.isArray(r.forms) ? r.forms : []);
  for (const form of forms) {
    if (!form || typeof form !== 'object') continue;
    const formTitle = String(form.custom_form_name || form.form_name || form.name || form.title || form.label || '').trim();
    const lowerForm = formTitle.toLowerCase();

    if (/credit\s*card|bank\s*account|stripe\s*token/i.test(lowerForm)) {
      continue;
    }

    const formElements: any[] = [];
    const sections = Array.isArray(form.custom_form_sections) ? form.custom_form_sections : (Array.isArray(form.sections) ? form.sections : []);
    for (const sec of sections) {
      if (!sec) continue;
      const elements = Array.isArray(sec.custom_form_elements) ? sec.custom_form_elements : (Array.isArray(sec.elements) ? sec.elements : (Array.isArray(sec.fields) ? sec.fields : []));
      formElements.push(...elements);
    }

    const directElements = Array.isArray(form.custom_form_elements) ? form.custom_form_elements : (Array.isArray(form.elements) ? form.elements : (Array.isArray(form.fields) ? form.fields : []));
    formElements.push(...directElements);

    for (const el of formElements) {
      if (!el || typeof el !== 'object') continue;
      const elName = String(el.custom_form_element_name || el.element_name || el.name || el.label || el.title || el.prompt || el.field_name || '').trim();
      if (!elName) continue;

      let val = el.custom_form_data_text !== undefined && el.custom_form_data_text !== null && el.custom_form_data_text !== ''
        ? el.custom_form_data_text
        : (el.custom_form_data_value !== undefined && el.custom_form_data_value !== null ? el.custom_form_data_value : (el.value ?? el.data_value ?? el.text_value ?? el.display_value ?? el.selected_option_label ?? ''));

      if (val === true) val = 'Yes';
      if (val === false) val = 'No';
      if (Array.isArray(val)) val = val.join(', ');

      const valStr = String(val ?? '').trim();
      if (valStr.length === 0) continue;

      const prefix = formTitle ? `[${formTitle}] ${elName}` : elName;
      addNote(prefix, valStr);
    }
  }

  const customFields = Array.isArray(r.custom_fields) ? r.custom_fields : (Array.isArray(r.custom_form_elements) ? r.custom_form_elements : []);
  for (const cf of customFields) {
    if (!cf || typeof cf !== 'object') continue;
    const name = String(cf.name || cf.label || cf.title || cf.field_name || cf.custom_form_element_name || '').trim();
    let val = cf.value ?? cf.custom_form_data_text ?? cf.custom_form_data_value ?? cf.text ?? '';
    if (val === true) val = 'Yes';
    if (val === false) val = 'No';
    if (Array.isArray(val)) val = val.join(', ');
    const valStr = String(val ?? '').trim();
    if (name && valStr.length > 0) {
      addNote(name, valStr);
    }
  }

  if (r.custom_form_data && typeof r.custom_form_data === 'object' && !Array.isArray(r.custom_form_data)) {
    for (const [k, v] of Object.entries(r.custom_form_data)) {
      if (v !== null && v !== undefined) {
        const vStr = String(v).trim();
        if (vStr) addNote(k, vStr);
      }
    }
  }

  return parts.join('\n').trim();
}

// ---- CRM booking type/label → advancing category ----
function toCategory(type: string, title = "", room = ""): string {
  const combined = `${type || ""} ${title || ""} ${room || ""}`.toLowerCase();
  if (/cinema|film|screening|dcp|premiere|q&a/.test(combined) || /screen (one|two|three|1|2|3)|cinema (1|2|3|one|two|three)/.test(combined)) {
    return "Cinema";
  }
  if (/hire|private|wedding|corporate|conference|launch/.test(combined)) return "Private Hires";
  return "Programme";
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

function parseSafeDate(rawDate: any): string {
  if (!rawDate) return "";
  const s = String(rawDate).trim();
  if (!s) return "";

  const dmyMatch = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, "0");
    const month = dmyMatch[2].padStart(2, "0");
    const year = dmyMatch[3];
    return `${year}-${month}-${day}`;
  }

  const ymdMatch = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const month = ymdMatch[2].padStart(2, "0");
    const day = ymdMatch[3].padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }
  return "";
}

function parseSafeTime(rawTime: any): string {
  if (!rawTime) return "";
  const s = String(rawTime).trim();
  if (!s) return "";

  const m = s.match(/(\d{1,2}):(\d{2})/);
  if (m) {
    return `${m[1].padStart(2, "0")}:${m[2]}`;
  }

  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(11, 16);
  }
  return "";
}

interface CrmBookingInstance {
  id: string;
  groupId?: string;
  title: string;
  room: string;
  type?: string;
  date: string;
  startTime: string;
  finishTime: string;
  contact?: string;
  notes?: string;
  status?: string;
}

async function fetchCrmInstances(from: Date, to: Date): Promise<CrmBookingInstance[]> {
  if (!CRM_API_URL || !CRM_API_KEY || !CRM_USERNAME || !CRM_PASSWORD) {
    throw new Error("CRM credentials not fully set — see docs/CRM-EDGE-FUNCTION.md");
  }

  const baseUrl = CRM_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  const basicAuth = 'Basic ' + btoa(CRM_USERNAME + ':' + CRM_PASSWORD);

  const allRawItems: any[] = [];
  const seenIds = new Set<string>();

  const SLICE_DAYS = 28;
  const totalDays = Math.ceil((to.getTime() - from.getTime()) / 864e5);
  const numSlices = Math.max(1, Math.ceil(totalDays / SLICE_DAYS));

  for (let s = 0; s < numSlices; s++) {
    const sliceFrom = new Date(from.getTime() + s * SLICE_DAYS * 864e5);
    const sliceTo = new Date(Math.min(to.getTime(), from.getTime() + (s + 1) * SLICE_DAYS * 864e5));

    const params = new URLSearchParams({
      date: 'between',
      start_date: sliceFrom.toISOString().slice(0, 10),
      end_date: sliceTo.toISOString().slice(0, 10),
      schedule_output: "1",
    });

    const endpoint = `${baseUrl}/api/arrangements/event?${params}`;
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        "X-API-Key": CRM_API_KEY,
        "Authorization": basicAuth,
        "Accept": "application/json"
      },
    });

    if (!res.ok) {
      throw new Error(`EventSync CRM responded ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    const list: any[] = Array.isArray(data) ? data : (data.instances ?? data.results ?? data.events ?? []);
    if (!list || list.length === 0) continue;

    for (const r of list) {
      const id = String(r.id || r.instanceId || r.InstanceId || r.event_id || '');
      const key = id || `${r.arrangement_id || ''}-${r.room || ''}-${r.date || ''}-${r.start_time || ''}`;
      if (key && seenIds.has(key)) continue;
      if (key) seenIds.add(key);
      allRawItems.push(r);
    }
  }

  return allRawItems.map((r) => {
    const title = String(r.title || r.name || r.EventName || r.arrangement_description || r.arrangement_name || "Untitled");
    const groupId = String(r.arrangement_id || r.arrangementId || r.ArrangementId || r.groupId || r.GroupId || r.event_id || r.EventId || title);
    const combinedStatus = String(r.status || r.Status || r.event_status_name || r.sales_process_stage_name || "Confirmed");

    const rawDate = r.date ?? r.event_date ?? r.start_date ?? r.StartDate ?? r.Date ?? r.start ?? r.startDateTime ?? r.StartDateTime ?? r.start_date_time;
    const rawStart = r.start_time ?? r.start_time_text ?? r.time_start ?? r.StartTime ?? r.start ?? r.startDateTime ?? r.StartDateTime ?? r.start_date_time;
    const rawEnd = r.end_time ?? r.end_time_text ?? r.time_end ?? r.EndTime ?? r.end ?? r.endDateTime ?? r.EndDateTime ?? r.end_date_time;

    return {
      id: String(r.id || r.instanceId || r.InstanceId || r.event_id),
      groupId: groupId,
      title: title,
      room: String(r.room || r.roomName || r.RoomName || r.room_name || ""),
      type: String(r.type || r.arrangementType || r.ArrangementType || r.arrangement_type_name || ""),
      date: parseSafeDate(rawDate),
      startTime: parseSafeTime(rawStart),
      finishTime: parseSafeTime(rawEnd),
      contact: String(r.contact || r.contactName || r.CustomerName || r.client_name || r.arrangement_contact_entity_full_name || ""),
      notes: extractCrmNotes(r),
      status: resolveStatus(combinedStatus),
    };
  });
}

function mapInstance(i: CrmBookingInstance) {
  const space = resolveSpace(i.room);
  return {
    id: i.id,
    crmBookingId: i.id,
    groupId: i.groupId || null,
    name: i.title,
    title: i.title,
    category: toCategory(i.type || "", i.title, space),
    room: i.room,
    space,
    date: i.date || "",
    startTime: i.startTime || "",
    finishTime: i.finishTime || "",
    clientContact: i.contact || "",
    status: i.status || "Confirmed",
    notes: i.notes || "",
    techInfo: i.notes || "",
    crmNotes: i.notes || "",
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const from = new Date(Date.now() - 7 * 864e5);
    const to = new Date(Date.now() + HORIZON_DAYS * 864e5);
    const instances = await fetchCrmInstances(from, to);

    const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
    let created = 0, updated = 0, skipped = 0;

    const validBookings = instances.map(mapInstance).filter(b => {
      if (!b.space) { skipped++; return false; }
      return true;
    });

    if (validBookings.length === 0) {
      return json({ ok: true, from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10), created, updated, skipped });
    }

    const crmBookingIds = validBookings.map(b => b.crmBookingId);
    const existingMap = new Map<string, any>();
    const CHUNK_SIZE = 150;

    for (let i = 0; i < crmBookingIds.length; i += CHUNK_SIZE) {
      const chunk = crmBookingIds.slice(i, i + CHUNK_SIZE);
      const { data: chunkData, error: fetchError } = await sb
        .from("advancing")
        .select("*")
        .in("crmBookingId", chunk);

      if (fetchError) throw new Error(`Batch select failed: ${fetchError.message}`);
      for (const row of (chunkData || [])) {
        if (row.crmBookingId) existingMap.set(row.crmBookingId, row);
      }
    }
    const rowsToUpsert = [];

    for (const booking of validBookings) {
      const existing = existingMap.get(booking.crmBookingId);
      if (existing) {
        const changes: string[] = [];
        if (existing.date !== booking.date && booking.date) changes.push(`[Date Change]: Date moved to ${booking.date}`);
        if (existing.startTime !== booking.startTime && booking.startTime) changes.push(`[Time Change]: Start time updated to ${booking.startTime}`);
        if (existing.finishTime !== booking.finishTime && booking.finishTime) changes.push(`[Time Change]: Finish time updated to ${booking.finishTime}`);
        if (existing.space !== booking.space && booking.space) changes.push(`[Space Change]: Moved to ${booking.space}`);
        if (existing.name !== booking.name && booking.name) changes.push(`[Title Change]: Renamed to ${booking.name}`);
        if (existing.status !== booking.status && booking.status) changes.push(`[Status Change]: Status updated to ${booking.status}`);
        if (existing.clientContact !== booking.clientContact && booking.clientContact) changes.push(`[Contact Change]: Contact updated to ${booking.clientContact}`);

        const crmHistory = Array.isArray(existing.crmHistory)
          ? [...existing.crmHistory]
          : (existing.production_package && Array.isArray(existing.production_package.crmHistory)
              ? [...existing.production_package.crmHistory]
              : []);
        const lastNotes = crmHistory.length > 0 ? (crmHistory[crmHistory.length - 1].notes || "") : "";
        const currentNotes = booking.notes || lastNotes || "";

        if (booking.notes && booking.notes !== lastNotes) {
          changes.push(`[CRM Notes Updated]`);
        }

        if (changes.length > 0) {
          crmHistory.push({
            date: new Date().toISOString(),
            notes: currentNotes,
            changes
          });
        }

        const prodPkg = (existing && typeof existing.production_package === "object" && existing.production_package !== null)
          ? { ...existing.production_package }
          : {};
        prodPkg.crmHistory = crmHistory;

        booking.crmHistory = crmHistory;
        const existingTech = (existing.techInfo || "").trim();
        const techInfoVal = existingTech ? existingTech : currentNotes;

        const isAux = isAuxiliarySpace(booking.space);
        const hasManualDecision = existing.techRequiredManual === true || (existing.noTechNeeded !== undefined && existing.noTechNeeded !== null);
        const resolvedNoTech = hasManualDecision ? existing.noTechNeeded : isAux;

        const row: Record<string, any> = {
          ...existing,
          ...booking,
          noTechNeeded: resolvedNoTech,
          techInfo: techInfoVal,
          crmHistory: crmHistory,
          id: existing.id,
          production_package: prodPkg
        };
        delete row.notes;
        delete row.crmNotes;
        delete row.title;
        delete row.room;

        rowsToUpsert.push(row);
        updated++;
      } else {
        const currentNotes = booking.notes || "";
        const crmHistory = currentNotes ? [{
          date: new Date().toISOString(),
          notes: currentNotes,
          changes: ["Initial sync from EventSync CRM"]
        }] : [];
        booking.crmHistory = crmHistory;

        const isAux = isAuxiliarySpace(booking.space);
        const noTechNeeded = isAux;
        const techs = isAux ? [{ userId: '', role: 'None', isNoTech: true, bookingStatus: 'confirmed' }] : [];

        const row: Record<string, any> = {
          id: `evt-crm-${booking.crmBookingId}`,
          ...booking,
          noTechNeeded: noTechNeeded,
          technicians: techs,
          techInfo: currentNotes,
          crmHistory: crmHistory,
          production_package: { crmHistory, crmNotes: currentNotes, noTechNeeded }
        };
        delete row.notes;
        delete row.crmNotes;
        delete row.title;
        delete row.room;

        rowsToUpsert.push(row);
        created++;
      }
    }

    if (rowsToUpsert.length > 0) {
      const UPSERT_CHUNK = 150;
      for (let i = 0; i < rowsToUpsert.length; i += UPSERT_CHUNK) {
        let chunkRows = rowsToUpsert.slice(i, i + UPSERT_CHUNK);
        let lastError: any = null;
        for (let attempt = 0; attempt < 3; attempt++) {
          const { error: upsertError } = await sb.from("advancing").upsert(chunkRows, { onConflict: "id" });
          if (!upsertError) {
            lastError = null;
            break;
          }
          lastError = upsertError;
          const missingMatch = upsertError.message?.match(/Could not find the '([^']+)' column/i);
          const missingCol = missingMatch ? missingMatch[1] : (upsertError.message?.includes("crmHistory") ? "crmHistory" : null);
          if (missingCol) {
            console.warn(`[crm-sync] Column '${missingCol}' missing from advancing schema cache. Retrying upsert without it...`);
            chunkRows = chunkRows.map(r => {
              const copy = { ...r };
              delete copy[missingCol];
              return copy;
            });
          } else {
            break;
          }
        }
        if (lastError) throw new Error(`Batch upsert failed: ${lastError.message}`);
      }
    }

    return json({ ok: true, from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10), created, updated, skipped, total: validBookings.length, instances: validBookings });
  } catch (e) {
    return json({ ok: false, error: String((e as Error).message ?? e) }, 500);
  }
});
