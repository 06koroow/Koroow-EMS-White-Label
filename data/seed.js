/* ============================================================
   seed.js — starter demo content
   ------------------------------------------------------------
   Embedded as JS (not fetched JSON) so the app runs offline with
   no server. This is only the FIRST-RUN seed: once the app has
   written to localStorage it uses that copy, so edits made in
   the UI persist. To reset to this seed, clear storage or use
   "Reset local data" where available.
   ============================================================ */
/* Sample-shift dates are relative to first run so "today" always has
   something to show. iso(n) = n days from today, YYYY-MM-DD. */
(function () {
  const iso = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  RMTP._seedDates = { today: iso(0), tomorrow: iso(1), plus3: iso(3), lastWeek: iso(-6) };
})();

RMTP.seed = {

  /* ---- Process documentation / operating procedures ---- */
  procedures: [
    {
      id: "best-practice", name: "Best Practice", icon: "book",
      items: [
        { id: "bp-00", title: "Overview & how to use this guide", updated: "", body: "MERIDIAN ARTS — TECHNICAL BEST PRACTICE GUIDE\nLive Audio  ·  Live Lighting  ·  Live AV — general principles for duty technicians\nSample Operating Standard v1.0 (Portfolio Demo Template)\n\nThis is a living template for venue technical teams. Where any note disagrees with a formal safety policy, the safety document wins; where it disagrees with a manufacturer instruction, follow the manufacturer and flag the conflict to the Technical Manager. Console features are named generically — read \"scenes / groups / palettes / executors\" as whatever your platform calls them.\n" },
        { id: "bp-01", title: "1 · Purpose and scope", updated: "", body: "1 — PURPOSE AND SCOPE\nSets out baseline technical standards for anyone working in a live production role at Meridian Arts — audio, lighting or AV; permanent, casual or visiting crew. Structured discipline-agnostic at the top and room-specific underneath so any duty technician covering an unfamiliar space has a reliable starting point.\n\nThis guide supports, rather than replaces, manufacturer manuals, formal method statements, and venue risk assessments.\n" },
        { id: "bp-02", title: "2 · Universal principles (all disciplines)", updated: "", body: "2 — UNIVERSAL PRINCIPLES (ALL DISCIPLINES)\nIf you only read one section, read this one.\n\n2.1 Safety is the first deliverable\nNo show is worth an injury. A performance that starts ten minutes late because a rig was made safe is a success. Always stop or delay work that cannot be completed safely and escalate rather than improvising around a hazard.\n- Confirm locations of first aid kits, fire exits, extinguishers, and assembly points before doors.\n- Know who the Duty Manager and first aider are for the session.\n- Keep gangways, fire exits, and wings clear at all times — flight cases live in storage, never in escape routes.\n- Log near-misses as well as incidents so root causes get fixed.\n\n2.2 Electrical safety and power\n- Inspect before connecting. Tag and quarantine any item with damaged insulation, cracked housings, or expired PAT.\n- Respect circuit ratings and balance load across phases.\n- Never defeat a protective earth to solve audio hum — resolve earth loops with proper isolation.\n- Power down before re-patching mains or opening enclosures; keep drinks clear of consoles, racks, and dimmers.\n\n2.3 Working at height and rigging\n- Only work at height if trained and authorised for the access equipment in use.\n- Every overhead item requires a rated primary clamp and an independent rated secondary safety bond.\n- Establish a clear exclusion zone below any active rigging operation.\n- Tether tools and loose hardware when working overhead.\n\n2.4 Cabling and stage management\n- Dress cable runs neatly along architecture and cover any walkway crossings with cable ramps or matting.\n- Label ambiguous runs at both ends and separate power from low-level signal.\n- Coil cables over-under during derig and restore rooms to house default.\n\n2.5 Documentation and handover\n- Log faults cleanly, tag defective gear out of service, and save current show files to the shared archive before sign-off.\n" },
        { id: "bp-03", title: "3 · Recommended workflows", updated: "", body: "3 — RECOMMENDED WORKFLOWS\nUnderstand the brief, prepare offline, build methodically, verify systematically, then run.\n\n3.1 Universal production arc\n- Advance — review rider, spec, and running order; confirm gaps in writing early.\n- Prep offline — build the console file from house templates and verify media playback formats.\n- Setup / get-in — rig to the plot and keep physical labels aligned with paperwork.\n- Systematic check — verify every input, monitor bus, fixture address, and video chain before performers arrive.\n- Show & reset — save working starting states, run the show cleanly, restore standing house presets.\n\n3.2 Audio workflow\n- Build console patch from the agreed input list and colour-code channel families.\n- Set preamp gain cleanly with neutral EQ before sending to monitors.\n- Line-check every microphone/DI in sequence and verify every wedge/IEM send.\n\n3.3 Lighting workflow\n- Confirm fixture modes and DMX addresses against the patch sheet.\n- Run a rig-check before focusing; build groups and palettes before programming cues.\n- Keep a blackout and safe worklight state within immediate reach.\n\n3.4 AV workflow\n- Standardise frame rate and resolution end-to-end across switchers and projectors.\n- Always test presenter media on the live playback chain and prepare a clean holding slide.\n" },
        { id: "bp-04", title: "4 · Patch management", updated: "", body: "4 — PATCH MANAGEMENT\n\n4.1 Principles of good patching\n- Maintain one source of truth: paper patch, physical stageboxes, and console labels must match.\n- Label both ends of multicores, tails, and tie-lines.\n- Leave logical spare channels for late additions.\n\n4.2 Input & patch documentation\nRecord channel number, source, microphone/DI model, stand type, phantom power, physical socket, and routing notes. Save updated sheets alongside dated show files in the shared folder.\n\n4.3 Digital stageboxes & shared gain\n- When two consoles share a digital stagebox, agree who owns analog preamp gain (typically Monitor World) while the second desk uses digital trim.\n- Use isolated transformer splits for broadcast or recording feeds requiring independent gain.\n- Verify single clock master and sample-rate lock across all networked audio nodes.\n\n4.4 Lighting & AV routing\n- Plan DMX universe boundaries and fixture footprints ahead of rigging day.\n- Label switcher inputs/outputs and verify EDID/HDCP compliance end-to-end.\n" },
        { id: "bp-05", title: "5 · Live audio", updated: "", body: "5 — LIVE AUDIO\nGood live sound is discipline before taste.\n\n5.1 Signal flow & gain structure\n- Set preamp headroom against realistic peak levels with faders at unity.\n- Keep house system DSP presets locked unless approved changes are required for the room configuration.\n- Observe venue SPL monitoring thresholds throughout soundcheck and show.\n\n5.2 Microphones & monitoring\n- Prioritise placement and polar pattern rejection before aggressive EQ.\n- Ring out monitor wedges cleanly and protect IEM performers with brickwall limiting.\n\n5.3 Wireless & RF management\n- Scan local RF spectrum before show, coordinate frequencies, and fit fresh batteries before doors.\n- Maintain clear line of sight between transmitters and diversity antennas away from LED walls.\n" },
        { id: "bp-06", title: "6 · Live lighting", updated: "", body: "6 — LIVE LIGHTING\n\n6.1 Rigging & focusing fixtures\n- Verify clamp ratings and secondary safety bonds on every overhead fixture.\n- Focus cold before performers arrive and verify coverage under live stage blocking.\n\n6.2 Data distribution & power\n- Terminate the final fixture on every wired DMX leg and isolate sACN/Art-Net traffic cleanly.\n- Never plug LED fixtures, intelligent movers, or console supplies into dimmed circuits.\n\n6.3 Programming & operation\n- Build palettes (position, colour, beam) referenced by cues so fast re-focusing updates the whole stack.\n- Confirm haze/strobe notices are posted and fire detection isolation permits are active when approved.\n" },
        { id: "bp-07", title: "7 · Live AV / video", updated: "", body: "7 — LIVE AV / VIDEO\n\n7.1 Signal chain & formats\n- Map source → scaler/switcher → distribution → display and confirm resolution/refresh agreement.\n- Use SDI or fibre for long video runs; keep passive HDMI under 5 metres.\n\n7.2 Playback & projection\n- Verify presenter laptops early (adapters, extended desktop vs mirror, embedded audio routing).\n- Load a clean holding slide on a secondary switcher input as an instant fallback.\n\n7.3 Streaming & capture\n- Route an independent broadcast/stream mix rather than relying on camera audio.\n- Monitor outgoing stream audio and picture continuously during live broadcasts.\n" },
        { id: "bp-08", title: "8 · Troubleshooting (all disciplines)", updated: "", body: "8 — TROUBLESHOOTING (ALL DISCIPLINES)\n\n8.1 Universal fault-finding method\n- Stay calm and change one variable at a time.\n- Work from a known-good reference point and binary-search the signal path.\n- Substitute suspect cables or adapters early rather than assuming hardware failure.\n\n8.2 Audio, RF, Lighting & AV quick checks\n- Audio no-signal: verify phantom power, mute groups, DCA assignment, and stagebox clock lock.\n- RF dropouts: check battery level first, then antenna line of sight and intermod spacing.\n- Lighting glitches: confirm non-dim power, DMX address/mode personality, and line termination.\n- Video handshake loss: re-seat HDMI, lock EDID to 1080p60/4K60, or bypass faulty scalers.\n" },
        { id: "bp-09", title: "9 · When things go wrong", updated: "", body: "9 — WHEN THINGS GO WRONG\n\n9.1 Priority order\n1. Safety — eliminate immediate risk to audience, crew, or performers.\n2. Continuity — switch to the pre-tested fallback state (holding slide, spare mic, worklight look).\n3. Diagnosis — isolate and resolve once the stage is stable.\n4. Restore & log — bring primary systems back cleanly and log the incident after the show.\n\n9.2 Show-stop communication\nKeep radio traffic brief and factual, alert the Duty Manager immediately if audience safety is affected, and follow venue emergency announcement procedures.\n" },
        { id: "bp-10", title: "10 · Appendices and templates", updated: "", body: "10 — APPENDICES AND TEMPLATES\n\n10.1 Pre-show checklist\n- Technical advance reviewed and equipment staged.\n- Fire exits, cable crossings, and overhead safeties verified.\n- Line-check, rig-check, AV fallback, and RF fresh-cell check complete.\n- Comms ring tested and show files backed up.\n\n10.2 End-of-session handover\n- Document faults found, tagged equipment, consumables used, and any temporary rig changes.\n" },
      ],
    },
    {
      id: "opening-closing", name: "Opening & Closing", icon: "power",
      items: [
        { id: "venue-open", title: "Venue opening checklist", updated: "", body: "VENUE OPENING CHECKLIST (SAMPLE SOP)\n\n1. Unlock technical control rooms and sign out room key fobs from the Production Office.\n2. Walk each performance space to confirm fire exits, access corridors, and stage areas are clear.\n3. Power mains rack sequencers from wall isolator → DSP/processors → amplifiers last.\n4. Verify house lighting wall panels respond cleanly and restore house presets.\n5. Confirm daily advancing sheet and assigned crew roster in the Tech Portal.\n" },
        { id: "night-close", title: "End-of-night shutdown", updated: "", body: "END-OF-NIGHT SHUTDOWN (SAMPLE SOP)\n\n1. Save any updated audio/lighting show files to the shared network drive.\n2. Power off loudspeakers and amplifiers BEFORE consoles and digital processors.\n3. Shut down projectors cleanly and allow full cooling cycle before cutting rack mains.\n4. Return portable wireless mics, IEM packs, and test cables to charging bays.\n5. Log shift handover notes and any maintenance faults in the Tech Portal.\n" },
        { id: "studio-startup", title: "Studio Theatre — access & start-up", updated: "", body: "STUDIO THEATRE — ACCESS & START-UP (SAMPLE SOP)\n\n## Step 1 — Room access & safety sweep\n1. Draw the Studio Theatre key set from the Production Office key safe.\n2. Check both fire exits, rigging gallery access, and clear floor cable routes.\n\n## Step 2 — Rack & power sequence\nNOTE: Power consoles on LAST, after stageboxes, dimmers, and rack breakers are online.\n\n1. Engage the main wall isolator inside the technical control booth.\n2. Switch on rack power distribution strips and dimmers.\n3. Confirm digital stagebox link indicators lock cleanly.\n4. Power on the Studio lighting desk and FOH mixing console.\n5. Unmute PA amplifiers last and confirm house audio preset.\n" },
      ],
    },
    {
      id: "sound", name: "Sound", icon: "wave",
      items: [
        { id: "pa-powerup", title: "PA power-up sequence", updated: "", body: "PA POWER-UP SEQUENCE (SAMPLE SOP)\n\n1. Confirm console faders and master buses are down before power-on.\n2. Power consoles, stageboxes, and network switches first; wait for clock lock.\n3. Engage DSP processors and speaker management units.\n4. Power loudspeaker amplifiers last (subwoofers, tops, then fills).\n5. Reverse the order strictly on power-down (amps off first).\n" },
        { id: "foh-dlive", title: "FOH digital console startup", updated: "", body: "FOH CONSOLE STARTUP (SAMPLE SOP)\n\n1. Boot surface and confirm stagebox network connection and word-clock lock.\n2. Recall the standard House Default Template scene — never start from a previous visiting act file.\n3. Save As under today's event name and date before building patches.\n4. Verify talkback, pink-noise test send, and left/right/sub routing.\n" },
        { id: "monitors", title: "Monitor world setup", updated: "", body: "MONITOR WORLD SETUP (SAMPLE SOP)\n\n1. Verify mix bus count and wedge/IEM assignments against the advancing spec.\n2. Ring out monitor mixes safely with vocal microphones prior to artist arrival.\n3. Confirm shared stagebox gain-ownership protocol with FOH engineer.\n" },
        { id: "rf-management", title: "Radio mic / IEM management", updated: "", body: "RADIO MIC & IEM MANAGEMENT (SAMPLE SOP)\n\n1. Run a fresh RF environment scan in the room prior to soundcheck.\n2. Sync transmitters to coordinated channels and verify battery health (always fit fresh cells for show).\n3. Label handhelds/packs clearly and confirm antenna distribution LEDs show healthy diversity.\n" },
      ],
    },
    {
      id: "lighting", name: "Lighting", icon: "bulb",
      items: [
        { id: "lx-startup", title: "Lighting desk startup", updated: "", body: "LIGHTING DESK STARTUP (SAMPLE SOP)\n\n1. Power stage DMX splitters/nodes and non-dimmed fixture circuits first.\n2. Boot lighting console and allow intelligent fixtures to complete home/calibration.\n3. Load house rig template show file and verify Grand Master and Blackout response.\n" },
        { id: "house-lights", title: "House lights & presets", updated: "", body: "HOUSE LIGHTS & PRESETS (SAMPLE SOP)\n\n1. Test wall station presets (100% Work, 50% Doors, 10% Show, Blackout) before doors open.\n2. Confirm architectural control override priority if operating house washes via DMX.\n" },
        { id: "haze", title: "Haze / smoke operation", updated: "", body: "HAZE & SMOKE OPERATION (SAMPLE SOP)\n\n1. Confirm Duty Manager sign-off and zone detector isolation before testing haze.\n2. Check fluid reservoir level and allow heater block to reach operating temperature.\n3. Ensure signage is posted at audience entrances whenever atmospheric effects are used.\n" },
      ],
    },
    {
      id: "av", name: "AV & Presentation", icon: "screen",
      items: [
        { id: "projector", title: "Projector & screen setup", updated: "", body: "PROJECTOR & SCREEN SETUP (SAMPLE SOP)\n\n1. Strike projector lamp and allow warm-up; keep dowser closed until signal is verified.\n2. Confirm lens preset (16:9 / Flat / Scope) matches source scaling.\n3. Test blanking/blackout cue prior to audience entry.\n" },
        { id: "patching", title: "Laptop / HDMI patching", updated: "", body: "LAPTOP / HDMI PATCHING (SAMPLE SOP)\n\n1. Connect presenter laptop via short high-speed HDMI lead or lectern wall plate.\n2. Set laptop display output to Extended Desktop at 1080p60 or 4K60 depending on switcher preset.\n3. Route embedded HDMI or mini-jack audio to dedicated stereo desk channels and verify level.\n" },
        { id: "hybrid", title: "Hybrid / streamed event setup", updated: "", body: "HYBRID / STREAMED EVENT SETUP (SAMPLE SOP)\n\n1. Verify wired ethernet uplink speed and stream encoder bitrate 90 minutes before broadcast.\n2. Build an independent matrix mix for broadcast (dialogue + room ambient mics).\n3. Run a private test stream for 5 minutes to confirm audio sync and caption overlay.\n" },
        { id: "screen-1-ops", title: "Screen 1 — start-up & operation", updated: "", body: "SCREEN 1 — START-UP & OPERATION (SAMPLE SOP)\n\nSTART-UP SEQUENCE\n1. Unlock Projection Booth 1 and verify extractor fan and UPS status.\n2. Engage the amplifier rack main switch and power amplifiers sequentially from bottom to top.\n3. Wait for the cinema audio processor to complete its boot cycle and show green input lock.\n4. Set booth cleaners/work lights OFF and raise auditorium house presets to Doors level.\n\nBASIC OPERATIONS\n- Projector touch panel: control lamp strike/off, dowser open/close, and aspect macros (2D Scope / 2D Flat / HDMI Aux).\n- Always lamp off when idle exceeds 60 minutes and observe full 10-minute cool-down.\n- Audio processor inputs: select Digital 5.1/7.1 for DCP features, Aux Stereo for laptop playback, and Surround-Only routing for Q&A handheld microphones to maximise gain before feedback.\n- Q&A mixer: wired lectern/stage inputs on channels 1-4, wireless receivers on channels 5-6.\n" },
        { id: "screen-2-ops", title: "Screen 2 — start-up & operation", updated: "", body: "SCREEN 2 — START-UP & OPERATION (SAMPLE SOP)\n\nSTART-UP SEQUENCE\n1. Unlock Projection Booth 2 and verify rack cooling airflow.\n2. Power the 5.1 amplifier rack sequentially from base unit upwards.\n3. Confirm cinema sound processor boots cleanly and mirrors Screen 2 SPL cues.\n4. Switch off booth work lights and bring house lights up to 50% Doors preset.\n\nBASIC OPERATIONS\n- Projector touch panel: toggle dowser during pre-show laptop tests and confirm 2D Flat vs Scope framing before doors.\n- Audio processor: use Digital 5.1 for cinema deliverables and Surround-Only aux routing for Q&A microphones.\n" },
      ],
    },
    {
      id: "stage", name: "Stage & Rigging", icon: "box",
      items: [
        { id: "get-in", title: "Stage build & get-in", updated: "", body: "STAGE BUILD & GET-IN (SAMPLE SOP)\n\n1. Confirm riser footprint, access steps, and skirted edges against the advancing plot.\n2. Keep loading bay doors supervised and clear fire lanes continuously.\n" },
        { id: "rigging", title: "Rigging & flying points", updated: "", body: "RIGGING & FLYING POINTS (SAMPLE SOP)\n\n1. Never exceed stamped SWL (Safe Working Load) on trusses, bars, or roof points.\n2. Inspect shackles, steels, and safeties before lifting any truss or luminaire.\n" },
        { id: "get-out", title: "Get-out procedure", updated: "", body: "GET-OUT PROCEDURE (SAMPLE SOP)\n\n1. Ensure house worklights are up and audience area is clear before striking overhead gear.\n2. Coil cables neatly, stack risers in dedicated storage, and leave stage swept.\n" },
      ],
    },
    {
      id: "hs", name: "Health & Safety", icon: "shield",
      items: [
        { id: "evac", title: "Fire & evacuation procedure", updated: "", body: "FIRE & EVACUATION PROCEDURE (SAMPLE SOP)\n\n1. On fire alarm activation, mute entertainment PA immediately and bring house worklights to 100%.\n2. Follow Duty Manager instructions to assist stage/backstage evacuation to the primary assembly point.\n" },
        { id: "height", title: "Working at height", updated: "", body: "WORKING AT HEIGHT (SAMPLE SOP)\n\n1. Only operate mobile towers or MEWPs if certified and signed off.\n2. Maintain exclusion cones below overhead work and wear tethered tool lanyards.\n" },
        { id: "handling", title: "Manual handling", updated: "", body: "MANUAL HANDLING (SAMPLE SOP)\n\n1. Use flight-case ramps, sack trucks, and team lifts for amplifiers, subs, and risers.\n2. Wear safety footwear during load-ins and strikes.\n" },
        { id: "incident", title: "Incident reporting", updated: "", body: "INCIDENT & NEAR-MISS REPORTING (SAMPLE SOP)\n\n1. Administer first aid or summon the Duty First Aider immediately.\n2. Log equipment defects in Maintenance & Repairs and file a formal incident report before end of shift.\n" },
        { id: "pat", title: "Electrical safety (PAT)", updated: "", body: "ELECTRICAL SAFETY & PAT (SAMPLE SOP)\n\n1. Visually inspect all visiting crew mains leads and distros before connection.\n2. Quarantine any item failing visual or PAT inspection immediately.\n" },
      ],
    },
    {
      id: "cinema", name: "Cinema", icon: "screen",
      items: [
        { id: "screenwriter-guide", title: "TMS — running a screening", updated: "", body: "THEATRE MANAGEMENT SYSTEM (TMS) — SAMPLE SCREENING SOP\n\nOverview\nThe TMS coordinates DCP content, KDM decryption keys, Show Playlists (SPLs), and automated booth cues across Screens 1, 2, and 3.\n\n## Key Terms\n- DCP — Digital Cinema Package (feature/trailer files).\n- CPL — Composition Playlist inside a DCP.\n- KDM — Key Delivery Message unlocking encrypted DCPs for a specific server & date window.\n- SPL — Show Playlist combining pre-show, certs, feature, and automation cues.\n\n## Step 1 — Ingest Content\n1. Connect delivery drive (CRU/USB) or pull from central storage.\n2. Monitor ingest progress on the Content tab until 100% verified.\n\n## Step 2 — Load & Verify KDM\n1. Upload the distributor KDM file.\n2. Confirm the green key indicator matches the target screen server serial and covers the full screening window.\n\n## Step 3 — Build & Schedule SPL\n1. Assemble adverts, trailers, certification card, and feature CPL.\n2. Insert lighting, masking, sound-format, and dowser automation cues.\n3. Transfer the validated SPL to the target screen server and confirm scheduled start time.\n\n## Quick Troubleshooting\n- Locked / No Key: check KDM validity dates and target server serial.\n- Wrong aspect: verify Scope vs Flat macro cue in the SPL.\n- No sound: verify audio processor input (Digital 5.1/7.1) matches feature tracks.\n" },
      ],
    },
  ],

  /* ---- Inventory ----
     Each item has custody state: status 'in'|'out', heldBy, outAt.
     The `tag` is what a QR label encodes (VTP-INV:<tag>). */
  inventory: [
    { id: "inv-mh-001", tag: "MH-001", name: "Behringer Wing", category: "Sound - Console/Stageboxes", location: "Main Hall", qty: 1, condition: "Good", notes: "Digital FOH mixing console", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-002", tag: "MH-002", name: "Midas S16", category: "Sound - Console/Stageboxes", location: "Main Hall", qty: 2, condition: "Good", notes: "Digital stagebox (32 in / 16 out total across 2 units)", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-003", tag: "MH-003", name: "8-way XLR input stage box", category: "Sound - Console/Stageboxes", location: "Main Hall", qty: 4, condition: "Good", notes: "Sub-snake stage drops", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-004", tag: "MH-004", name: "JBL VRX918SP", category: "Sound - PA/Speakers", location: "Main Hall", qty: 4, condition: "Good", notes: "Powered 18\" bass-reflex subwoofer (under-stage)", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-005", tag: "MH-005", name: "JBL VRX932LAP", category: "Sound - PA/Speakers", location: "Main Hall", qty: 6, condition: "Good", notes: "Powered 12\" line-array element (3 per side)", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-006", tag: "MH-006", name: "RCF NX10-SMA", category: "Sound - PA/Speakers", location: "Main Hall", qty: 6, condition: "Good", notes: "Active coaxial stage monitor, 400W", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-007", tag: "MH-007", name: "RCF NX12-SMA", category: "Sound - PA/Speakers", location: "Main Hall", qty: 2, condition: "Good", notes: "Active drum fill / side monitor, 700W", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-sm58", tag: "MH-008", name: "Shure SM58", category: "Sound - Microphones", location: "Main Hall", qty: 8, condition: "Good", notes: "Dynamic vocal microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-009", tag: "MH-009", name: "Shure Beta 58A", category: "Sound - Microphones", location: "Main Hall", qty: 1, condition: "Good", notes: "Super-cardioid vocal dynamic microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-010", tag: "MH-010", name: "Shure SM57", category: "Sound - Microphones", location: "Main Hall", homeLocation: "Main Hall", qty: 8, condition: "Good", notes: "Dynamic instrument microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-011", tag: "MH-011", name: "Shure Beta 91A", category: "Sound - Microphones", location: "Main Hall", homeLocation: "Main Hall", qty: 1, condition: "Good", notes: "Boundary kick drum condenser", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-012", tag: "MH-012", name: "Sennheiser MD 421-II", category: "Sound - Microphones", location: "Studio Theatre", homeLocation: "Main Hall", qty: 2, condition: "Good", notes: "Large-diaphragm dynamic microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [{ from: "Main Hall", to: "Studio Theatre", at: "2026-08-26T04:15:00.000Z", by: "Alex Morgan", note: "Moved to Studio Theatre for vocal tracking" }] },
    { id: "inv-mh-013", tag: "MH-013", name: "Sennheiser E906", category: "Sound - Microphones", location: "Main Hall", homeLocation: "Main Hall", qty: 1, condition: "Good", notes: "Guitar cabinet dynamic microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-014", tag: "MH-014", name: "Sennheiser E602", category: "Sound - Microphones", location: "Main Hall", homeLocation: "Main Hall", qty: 2, condition: "Good", notes: "Kick / bass cabinet dynamic microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-015", tag: "MH-015", name: "Sennheiser E604", category: "Sound - Microphones", location: "Main Hall", homeLocation: "Main Hall", qty: 6, condition: "Good", notes: "Clip-on tom/snare dynamic microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-016", tag: "MH-016", name: "Sennheiser E614", category: "Sound - Microphones", location: "Main Hall", qty: 4, condition: "Good", notes: "Small-diaphragm instrument condenser", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-017", tag: "MH-017", name: "AKG 300B/CK91", category: "Sound - Microphones", location: "Main Hall", qty: 1, condition: "Good", notes: "Cardioid condenser capsule", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-018", tag: "MH-018", name: "Sennheiser EW-DX", category: "Sound - Microphones", location: "Main Hall", qty: 4, condition: "Good", notes: "Digital wireless microphone channels", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-019", tag: "MH-019", name: "Active DI box", category: "Sound - DI/Stands", location: "Main Hall", qty: 7, condition: "Good", notes: "Radial J48 / BSS active DI", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-020", tag: "MH-020", name: "K&M Microphone stand pack", category: "Sound - DI/Stands", location: "Main Hall", qty: 1, condition: "Good", notes: "Assorted tall & short boom stands", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-021", tag: "MH-021", name: "Yamaha Stage Custom", category: "Backline", location: "Main Hall", qty: 1, condition: "Good", notes: "House drum shell pack, 20\" kick (no breakables)", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-022", tag: "MH-022", name: "Fender Deluxe", category: "Backline", location: "Main Hall", qty: 1, condition: "Good", notes: "Guitar combo amplifier", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-023", tag: "MH-023", name: "Markbass CMD 103", category: "Backline", location: "Main Hall", qty: 1, condition: "Good", notes: "Bass combo amplifier", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-024", tag: "MH-024", name: "Pioneer DJM900NXS2", category: "DJ Equipment", location: "Main Hall", qty: 1, condition: "Good", notes: "4-channel club DJ mixer", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-025", tag: "MH-025", name: "Pioneer CDJ2000NXS2", category: "DJ Equipment", location: "Main Hall", qty: 2, condition: "Good", notes: "Multi-player DJ deck", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-026", tag: "MH-026", name: "Technics 1210 Mk5", category: "DJ Equipment", location: "Main Hall", qty: 2, condition: "Good", notes: "Direct-drive turntable", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-027", tag: "MH-027", name: "FBT Jolly 8BA", category: "DJ Equipment", location: "Main Hall", qty: 1, condition: "Good", notes: "Powered DJ booth monitor", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mh-028", tag: "MH-028", name: "Avolites Tiger Touch II", category: "Lighting - Control", location: "Main Hall", qty: 1, condition: "Good", notes: "House lighting control console", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-029", tag: "MH-029", name: "15A dimmer channel", category: "Lighting - Control", location: "Main Hall", qty: 54, condition: "Good", notes: "Installed dimmer rack channels", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-030", tag: "MH-030", name: "DMX & sACN tie-line points", category: "Lighting - Control", location: "Main Hall", qty: 2, condition: "Good", notes: "FOH & Stage Left control wall plates", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-031", tag: "MH-031", name: "House working lights", category: "Lighting - Control", location: "Main Hall", qty: 1, condition: "Good", notes: "Independent architectural working-light relay", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-032", tag: "MH-032", name: "Prolights Studio CobFC", category: "Lighting - Fixtures", location: "Main Hall", qty: 12, condition: "Good", notes: "LED RGBW 150W COB parcan", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-033", tag: "MH-033", name: "Prolights Diamond 19", category: "Lighting - Fixtures", location: "Main Hall", qty: 6, condition: "Good", notes: "LED RGBW moving wash fixture", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-034", tag: "MH-034", name: "Prolights CromoSpot500", category: "Lighting - Fixtures", location: "Main Hall", qty: 6, condition: "Good", notes: "Moving spot profile fixture", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-035", tag: "MH-035", name: "Prolights EclFresnel TW", category: "Lighting - Fixtures", location: "Main Hall", qty: 2, condition: "Good", notes: "LED tuneable white stage wash", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-036", tag: "MH-036", name: "500W Tungsten Fresnel", category: "Lighting - Fixtures", location: "Main Hall", qty: 9, condition: "Good", notes: "Rigged on FOH & mid-stage bars", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-037", tag: "MH-037", name: "Panasonic PT-DZ770EK", category: "AV - Projection/Screens", location: "Main Hall", qty: 1, condition: "Good", notes: "WUXGA 1920x1200 installation projector", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-038", tag: "MH-038", name: "Motorised 5m ceiling projection screen", category: "AV - Projection/Screens", location: "Main Hall", qty: 1, condition: "Good", notes: "Projection area 3.5m x 4.2m", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-039", tag: "MH-039", name: "55\" stage confidence display", category: "AV - Projection/Screens", location: "Main Hall", qty: 2, condition: "Good", notes: "Repeater feeds via SDI distribution", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mh-040", tag: "MH-040", name: "Extron DTP matrix switcher", category: "AV - Projection/Screens", location: "Main Hall", qty: 1, condition: "Good", notes: "Main Hall HDMI/HDBaseT routing", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-001", tag: "ST-001", name: "Allen & Heath SQ-5", category: "Sound - Console/Stageboxes", location: "Studio Theatre", qty: 1, condition: "Good", notes: "48-channel digital mixing console", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-002", tag: "ST-002", name: "Digital Stagebox 16x8", category: "Sound - Console/Stageboxes", location: "Studio Theatre", qty: 2, condition: "Good", notes: "16 XLR in / 8 XLR out via Cat5e", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-003", tag: "ST-003", name: "KV2 Audio EX10", category: "Sound - PA/Speakers", location: "Studio Theatre", qty: 2, condition: "Good", notes: "Active full-range main speaker, 500W", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-004", tag: "ST-004", name: "KV2 Audio EX10 (Wedge)", category: "Sound - PA/Speakers", location: "Studio Theatre", qty: 2, condition: "Good", notes: "Active stage monitor, 500W", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-005", tag: "ST-005", name: "RCF ART 705-AS", category: "Sound - PA/Speakers", location: "Studio Theatre", qty: 2, condition: "Good", notes: "Active 15\" subwoofer, 800W", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-006", tag: "ST-006", name: "RCF ART 312-A", category: "Sound - PA/Speakers", location: "Studio Theatre", qty: 2, condition: "Good", notes: "Active floor wedge, 400W", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-007", tag: "ST-007", name: "Sennheiser EW-D Handheld", category: "Sound - Microphones", location: "Studio Theatre", qty: 3, condition: "Good", notes: "Digital wireless handheld channel", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-008", tag: "ST-008", name: "Sennheiser EW-D Beltpack", category: "Sound - Microphones", location: "Studio Theatre", qty: 3, condition: "Good", notes: "Bodypack wireless receiver & lavalier/headset", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-009", tag: "ST-009", name: "Shure SM58", category: "Sound - Microphones", location: "Studio Theatre", qty: 4, condition: "Good", notes: "Vocal dynamic microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-010", tag: "ST-010", name: "Shure SM57", category: "Sound - Microphones", location: "Studio Theatre", qty: 4, condition: "Good", notes: "Instrument dynamic microphone", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-011", tag: "ST-011", name: "Passive Stereo DI Box", category: "Sound - DI/Stands", location: "Studio Theatre", qty: 2, condition: "Good", notes: "Studio Theatre DI kit", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-012", tag: "ST-012", name: "Tascam CD-200", category: "Sound - Playback", location: "Studio Theatre", qty: 2, condition: "Good", notes: "Rack-mounted media/CD player", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-013", tag: "ST-013", name: "Pioneer DJM-850", category: "DJ Equipment", location: "Studio Theatre", qty: 1, condition: "Good", notes: "4-channel DJ mixer", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-014", tag: "ST-014", name: "Pioneer CDJ-2000", category: "DJ Equipment", location: "Studio Theatre", homeLocation: "Studio Theatre", qty: 2, condition: "Good", notes: "Digital DJ deck", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-015", tag: "ST-015", name: "Technics 1210 Mk5", category: "DJ Equipment", location: "Main Hall", homeLocation: "Studio Theatre", qty: 2, condition: "Good", notes: "Direct-drive turntable", status: "in", heldBy: "", outAt: "", static: false, movements: [{ from: "Studio Theatre", to: "Main Hall", at: "2026-08-25T18:30:00.000Z", by: "Priya Shah", note: "DJ setup in Main Hall" }] },
    { id: "inv-st-016", tag: "ST-016", name: "ETC Element 60", category: "Lighting - Control", location: "Studio Theatre", homeLocation: "Studio Theatre", qty: 1, condition: "Good", notes: "Theatre lighting control console", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-017", tag: "ST-017", name: "Zero88 Chilli Dimmer", category: "Lighting - Control", location: "Studio Theatre", qty: 48, condition: "Good", notes: "2kW dimmer channels (36 overhead + 12 floor)", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-018", tag: "ST-018", name: "13A non-dimmed hard power", category: "Lighting - Control", location: "Studio Theatre", qty: 8, condition: "Good", notes: "Rigging grid hard power outlets", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-019", tag: "ST-019", name: "DMX grid tie-line", category: "Lighting - Control", location: "Studio Theatre", qty: 4, condition: "Good", notes: "Grid & stage floor DMX ports", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-020", tag: "ST-020", name: "Prolights EclFresnel", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 12, condition: "Good", notes: "LED stage fresnel fixture", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-021", tag: "ST-021", name: "Prolights Diamond 7", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 8, condition: "Good", notes: "Compact RGBW moving wash", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-022", tag: "ST-022", name: "Prolights Studio CobFC", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 12, condition: "Good", notes: "LED RGBW 150W parcan", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-023", tag: "ST-023", name: "ETC Source Four Jr Zoom", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 12, condition: "Good", notes: "25/50 degree profile spotlight", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-024", tag: "ST-024", name: "800W Theatre Fresnel", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 18, condition: "Good", notes: "Overhead rig fresnel", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-025", tag: "ST-025", name: "500W Compact Fresnel", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 12, condition: "Good", notes: "Grid bar fresnel", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-026", tag: "ST-026", name: "Par64 Can (CP62)", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 12, condition: "Good", notes: "Overhead wash can", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-027", tag: "ST-027", name: "Short-nose Floor Can", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 6, condition: "Good", notes: "Uplighter / shin-buster fixture", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-028", tag: "ST-028", name: "500W Symmetric Flood", category: "Lighting - Fixtures", location: "Studio Theatre", qty: 4, condition: "Good", notes: "Cyc wash unit", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-029", tag: "ST-029", name: "Tank trap with 3m aluminium boom", category: "Lighting - Rigging/Other", location: "Studio Theatre", qty: 6, condition: "Good", notes: "Vertical floor boom hardware", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-030", tag: "ST-030", name: "Floor H-stand", category: "Lighting - Rigging/Other", location: "Studio Theatre", qty: 6, condition: "Good", notes: "Single fixture floor base", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-031", tag: "ST-031", name: "15A TRS cable trunk", category: "Lighting - Rigging/Other", location: "Studio Theatre", qty: 1, condition: "Good", notes: "Assorted stage extension leads", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-st-032", tag: "ST-032", name: "Panasonic PT-DZ770EK", category: "AV - Projection/Screens", location: "Studio Theatre", qty: 1, condition: "Good", notes: "WUXGA 1920x1200 rig projector (3m x 4m back wall throw)", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-033", tag: "ST-033", name: "Harlequin dance floor roll", category: "Staging/Flooring", location: "Studio Theatre", qty: 4, condition: "Good", notes: "Black vinyl performance flooring, 2m x 10m", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-034", tag: "ST-034", name: "Modular stage deck (1m x 1m)", category: "Staging/Flooring", location: "Studio Theatre", qty: 8, condition: "Good", notes: "30cm riser height", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-st-035", tag: "ST-035", name: "Black masking flat (3.5m x 1.5m)", category: "Staging/Flooring", location: "Studio Theatre", qty: 2, condition: "Good", notes: "Freestanding wing flat", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-001", tag: "MZ-001", name: "Soundcraft EPM12", category: "Sound - Console/Stageboxes", location: "Mezzanine", qty: 1, condition: "Good", notes: "12-channel analog mixing console", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-002", tag: "MZ-002", name: "KV2 Audio EX10", category: "Sound - PA/Speakers", location: "Mezzanine", qty: 2, condition: "Good", notes: "Active main loudspeaker", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-003", tag: "MZ-003", name: "Tascam CD-200", category: "Sound - Playback", location: "Mezzanine", qty: 1, condition: "Good", notes: "Rack CD / line playback deck", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mz-004", tag: "MZ-004", name: "Sennheiser EW-D Receiver", category: "Sound - Microphones", location: "Mezzanine", qty: 2, condition: "Good", notes: "Dual wireless handheld kit", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mz-005", tag: "MZ-005", name: "Wired speech microphone pack", category: "Sound - Microphones", location: "Mezzanine", qty: 1, condition: "Good", notes: "4x handheld mics & desk stands", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mz-006", tag: "MZ-006", name: "Stereo DI Kit", category: "Sound - DI/Stands", location: "Mezzanine", qty: 2, condition: "Good", notes: "Passive laptop DI boxes", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-mz-007", tag: "MZ-007", name: "6-way LED controller", category: "Lighting - Control", location: "Mezzanine", qty: 1, condition: "Good", notes: "Simple DMX fader wing", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-008", tag: "MZ-008", name: "4-channel architectural dimmer", category: "Lighting - Control", location: "Mezzanine", qty: 3, condition: "Good", notes: "5A dimmer packs", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-009", tag: "MZ-009", name: "ETC Source Four Jr", category: "Lighting - Fixtures", location: "Mezzanine", qty: 1, condition: "Good", notes: "Lectern/spot track fixture", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-010", tag: "MZ-010", name: "LED RGBW 36W Wash Par", category: "Lighting - Fixtures", location: "Mezzanine", qty: 4, condition: "Good", notes: "Fixed architectural mood wash", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-011", tag: "MZ-011", name: "Panasonic PT-LB90NT", category: "AV - Projection/Screens", location: "Mezzanine", qty: 1, condition: "Good", notes: "Installation projector, 3500 ANSI lumens", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-012", tag: "MZ-012", name: "Portable flooring roll (2m x 6m)", category: "Staging/Flooring", location: "Mezzanine", qty: 3, condition: "Good", notes: "Black vinyl performance mat", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-mz-013", tag: "MZ-013", name: "Modular stage block (1m x 1m)", category: "Staging/Flooring", location: "Mezzanine", qty: 8, condition: "Good", notes: "30cm portable stage platform", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-001", tag: "S1-001", name: "Behringer X Air XR12", category: "Sound - Console/Stageboxes", location: "Screen 1", qty: 1, condition: "Excellent", notes: "12-channel Q&A digital mixer · Booth rack", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-002", tag: "S1-002", name: "Control Tablet 11\"", category: "Sound - Control", location: "Screen 1", qty: 1, condition: "Excellent", notes: "Wireless mixer tablet · Booth shelf", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-s1-003", tag: "S1-003", name: "Christie Vive Audio LS5S", category: "Sound - PA/Speakers", location: "Screen 1", qty: 12, condition: "Good", notes: "Passive cinema surround array · Auditorium", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-004", tag: "S1-004", name: "Martin Audio Screen 3", category: "Sound - PA/Speakers", location: "Screen 1", qty: 3, condition: "Good", notes: "Behind-screen LCR loudspeaker array", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-005", tag: "S1-005", name: "Martin Audio Sub 1A", category: "Sound - PA/Speakers", location: "Screen 1", qty: 1, condition: "Good", notes: "Cinema LFE subwoofer · Screen pit", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-amp", tag: "S1-006", name: "Christie Vive Audio CDA5 5000W", category: "Sound - PA/Speakers", location: "Screen 1", qty: 6, condition: "Good", notes: "Cinema rack amplifiers · Booth 1", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-007", tag: "S1-007", name: "Dolby AP20", category: "Sound - PA/Speakers", location: "Screen 1", qty: 1, condition: "Good", notes: "7.1 cinema sound processor · Booth 1", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-008", tag: "S1-008", name: "Sennheiser EW-D Wireless Mic", category: "Sound - Microphones", location: "Screen 1", qty: 2, condition: "Good", notes: "Q&A handheld radio mic kit · Booth 1", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-s1-009", tag: "S1-009", name: "Shure SM58", category: "Sound - Microphones", location: "Screen 1", qty: 4, condition: "Good", notes: "Wired Q&A microphones · Booth 1", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-s1-010", tag: "S1-010", name: "Transcension SDC-6 DMX Controller", category: "Lighting - Control", location: "Screen 1", qty: 1, condition: "Good", notes: "Stage bar DMX desk · Booth 1", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-011", tag: "S1-011", name: "1kW Q&A Stage Flood", category: "Lighting - Fixtures", location: "Screen 1", qty: 2, condition: "Good", notes: "Screen 1 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-012", tag: "S1-012", name: "500W Q&A Fresnel", category: "Lighting - Fixtures", location: "Screen 1", qty: 2, condition: "Good", notes: "Screen 1 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-013", tag: "S1-013", name: "LED Lectern Profile Spot", category: "Lighting - Fixtures", location: "Screen 1", qty: 1, condition: "Good", notes: "Screen 1 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-014", tag: "S1-014", name: "Christie CP4220", category: "AV - Projection/Screens", location: "Screen 1", qty: 1, condition: "Good", notes: "4K DLP digital cinema projector · Booth 1", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-015", tag: "S1-015", name: "Auxiliary Media Interface", category: "AV - Projection/Screens", location: "Screen 1", qty: 1, condition: "Good", notes: "Alternative content scaling rack unit", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-016", tag: "S1-016", name: "24ft Cinema Projection Screen", category: "AV - Projection/Screens", location: "Screen 1", qty: 1, condition: "Good", notes: "Perforated cinema screen · Auditorium 1", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s1-017", tag: "S1-017", name: "Kramer VP-444", category: "AV - Projection/Screens", location: "Screen 1", qty: 1, condition: "Good", notes: "HDMI presentation switcher · Booth 1 rack", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-001", tag: "S2-001", name: "Behringer X Air XR12", category: "Sound - Console/Stageboxes", location: "Screen 2", qty: 1, condition: "Excellent", notes: "12-channel Q&A digital mixer · Booth 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-002", tag: "S2-002", name: "Control Tablet 11\"", category: "Sound - Control", location: "Screen 2", qty: 1, condition: "Good", notes: "Wireless mixer tablet · Booth 2 shelf", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-s2-003", tag: "S2-003", name: "Christie Vive Audio LS3S", category: "Sound - PA/Speakers", location: "Screen 2", qty: 12, condition: "Good", notes: "Passive cinema surround speakers · Auditorium 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-004", tag: "S2-004", name: "Turbosound Impact 50", category: "Sound - PA/Speakers", location: "Screen 2", qty: 2, condition: "Good", notes: "Rear fill surround speakers", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-005", tag: "S2-005", name: "Martin Audio Screen 2", category: "Sound - PA/Speakers", location: "Screen 2", qty: 3, condition: "Good", notes: "Behind-screen LCR loudspeakers", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-006", tag: "S2-006", name: "Martin Audio Sub 1A", category: "Sound - PA/Speakers", location: "Screen 2", qty: 1, condition: "Good", notes: "Cinema LFE subwoofer · Auditorium 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-007", tag: "S2-007", name: "Christie Vive Audio CDA5 5000W", category: "Sound - PA/Speakers", location: "Screen 2", qty: 4, condition: "Good", notes: "Cinema rack amplifiers · Booth 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-008", tag: "S2-008", name: "Dolby AP20", category: "Sound - PA/Speakers", location: "Screen 2", qty: 1, condition: "Good", notes: "5.1 cinema sound processor · Booth 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-009", tag: "S2-009", name: "Sennheiser EW-D Wireless Mic", category: "Sound - Microphones", location: "Screen 2", qty: 2, condition: "Good", notes: "Q&A handheld radio mic kit · Booth 2", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-s2-010", tag: "S2-010", name: "Shure SM58", category: "Sound - Microphones", location: "Screen 2", qty: 4, condition: "Good", notes: "Wired Q&A microphones · Booth 2", status: "in", heldBy: "", outAt: "", static: false, movements: [] },
    { id: "inv-s2-011", tag: "S2-011", name: "Transcension SDC-6 DMX Controller", category: "Lighting - Control", location: "Screen 2", qty: 1, condition: "Good", notes: "Stage bar DMX desk · Booth 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-012", tag: "S2-012", name: "1kW Q&A Stage Flood", category: "Lighting - Fixtures", location: "Screen 2", qty: 2, condition: "Good", notes: "Screen 2 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-013", tag: "S2-013", name: "500W Q&A Fresnel", category: "Lighting - Fixtures", location: "Screen 2", qty: 2, condition: "Good", notes: "Screen 2 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-014", tag: "S2-014", name: "Christie CP4220", category: "AV - Projection/Screens", location: "Screen 2", qty: 1, condition: "Good", notes: "4K DLP digital cinema projector · Booth 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-015", tag: "S2-015", name: "Auxiliary Media Interface", category: "AV - Projection/Screens", location: "Screen 2", qty: 1, condition: "Good", notes: "Alternative content scaling rack unit", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-016", tag: "S2-016", name: "23ft Cinema Projection Screen", category: "AV - Projection/Screens", location: "Screen 2", qty: 1, condition: "Good", notes: "Perforated cinema screen · Auditorium 2", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s2-017", tag: "S2-017", name: "Kramer VP-444", category: "AV - Projection/Screens", location: "Screen 2", qty: 1, condition: "Good", notes: "HDMI presentation switcher · Booth 2 rack", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-001", tag: "S3-001", name: "Turbosound Impact 50", category: "Sound - PA/Speakers", location: "Screen 3", qty: 8, condition: "Good", notes: "Cinema surround speakers · Auditorium 3", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-002", tag: "S3-002", name: "EV EVID 6.2", category: "Sound - PA/Speakers", location: "Screen 3", qty: 2, condition: "Good", notes: "Rear surround loudspeakers", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-003", tag: "S3-003", name: "Martin Audio Screen 2", category: "Sound - PA/Speakers", location: "Screen 3", qty: 3, condition: "Good", notes: "Behind-screen LCR speakers", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-004", tag: "S3-004", name: "18\" Cinema Subwoofer", category: "Sound - PA/Speakers", location: "Screen 3", qty: 1, condition: "Good", notes: "Passive cinema LFE sub · Auditorium 3", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-005", tag: "S3-005", name: "QSC RMX Series", category: "Sound - PA/Speakers", location: "Screen 3", qty: 3, condition: "Good", notes: "Cinema rack amplifiers · Booth 3", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-006", tag: "S3-006", name: "Dolby CP750", category: "Sound - PA/Speakers", location: "Screen 3", qty: 1, condition: "Good", notes: "Digital cinema processor · Booth 3", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-007", tag: "S3-007", name: "Booth Audio Monitor", category: "Sound - PA/Speakers", location: "Screen 3", qty: 1, condition: "Good", notes: "Rack-mounted booth cue speaker", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-008", tag: "S3-008", name: "6-Channel Dimmer Pack", category: "Lighting - Control", location: "Screen 3", qty: 2, condition: "Good", notes: "Auditorium & stage dimmer · Booth 3", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-009", tag: "S3-009", name: "1kW Q&A Stage Flood", category: "Lighting - Fixtures", location: "Screen 3", qty: 4, condition: "Good", notes: "Screen 3 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-010", tag: "S3-010", name: "500W Compact Fresnel", category: "Lighting - Fixtures", location: "Screen 3", qty: 1, condition: "Good", notes: "Screen 3 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-011", tag: "S3-011", name: "LED Birdie Pinspot", category: "Lighting - Fixtures", location: "Screen 3", qty: 1, condition: "Good", notes: "Screen 3 front stage bar", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-012", tag: "S3-012", name: "Christie CP2215", category: "AV - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "2K DLP digital cinema projector · Booth 3", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-013", tag: "S3-013", name: "16ft Cinema Projection Screen", category: "AV - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "Perforated cinema screen · Auditorium 3", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-014", tag: "S3-014", name: "Kramer VP-444", category: "AV - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "HDMI presentation switcher · Booth 3 rack", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-015", tag: "S3-015", name: "TMS Server Host", category: "Network - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "Theatre Management System control workstation · Central rack", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-016", tag: "S3-016", name: "Media Storage Array (22TB RAID)", category: "Network - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "2U RAID content library & CRU ingest dock", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-017", tag: "S3-017", name: "D-Link DGS-3100-24 Managed Switch", category: "Network - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "Cinema projection VLAN switch", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-018", tag: "S3-018", name: "DVB-S2 Satellite Receiver", category: "Network - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "Live event cinema satellite IRD · Central rack", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-019", tag: "S3-019", name: "APC Smart-UPS 1500RM", category: "Power", location: "Screen 3", qty: 1, condition: "Good", notes: "2U rack uninterruptible power supply", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-020", tag: "S3-020", name: "Cinema VLAN Router", category: "Network - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "Gateway router for KDM & DCP delivery", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
    { id: "inv-s3-021", tag: "S3-021", name: "Electronic Content Delivery Node (12TB)", category: "Network - Projection/Screens", location: "Screen 3", qty: 1, condition: "Good", notes: "Automated satellite/fibre DCP ingest storage", status: "in", heldBy: "", outAt: "", static: true, movements: [] },
  ],

  /* ---- Users ----
     position: Technical Manager | Senior Tech | Duty Tech | Freelancer
     discipline: Sound | Lighting | Cinema
     admin  -> sees & edits everything (inventory catalogue, users, content)
     trainer -> can sign off other users' training
     Non-admins can move inventory (sign out/in) and edit shift reports only.
     Competencies themselves are derived from `procedures` at runtime. */
  users: [
    { id: 'user-1', firstName: 'Alex',  lastName: 'Morgan', email: 'alex@meridian.local',   password: 'h977ad04b', status: 'active', position: 'Technical Manager', discipline: 'Sound',    admin: true,  trainer: true  },
    { id: 'user-2', firstName: 'Priya', lastName: 'Shah',   email: 'priya@meridian.local',  password: 'h977ad04b', status: 'active', position: 'Senior Tech',       discipline: 'Lighting', admin: true,  trainer: true  },
    { id: 'user-3', firstName: 'Sam',   lastName: 'Okafor', email: 'sam@meridian.local',    password: 'h977ad04b', status: 'active', position: 'Duty Tech',         discipline: 'Sound',    admin: false, trainer: false },
    { id: 'user-4', firstName: 'Danny', lastName: 'Cole',   email: 'danny@meridian.local',  password: 'h977ad04b', status: 'active', position: 'Duty Tech',         discipline: 'Cinema',   admin: false, trainer: true  },
    { id: 'user-5', firstName: 'Maya',  lastName: 'Lin',    email: 'maya@meridian.local',   password: 'h977ad04b', status: 'active', position: 'Freelancer',        discipline: 'Sound',    admin: false, trainer: false },
    { id: 'user-6', firstName: 'Jordan',lastName: 'Reed',   email: 'jordan@meridian.local', password: 'h977ad04b', status: 'active', position: 'Freelancer',        discipline: 'Lighting', admin: false, trainer: false },
  ],
  signoffs: [],

  /* ---- Advancing (upcoming events) ---- */
  advancing: [
    {
      id: 'evt-1', name: 'Harbour Brass Collective — Live', category: 'Programme', space: 'Main Hall',
      date: RMTP._seedDates.today, status: 'Confirmed',
      startTime: '19:00', finishTime: '23:00', load_in: '15:00', soundcheck: '17:00', doors: '19:30', off_stage: '22:45', curfew: '23:00', load_out: '00:00',
      schedule_items: [
        { type: 'act', label: 'Act 1', customName: 'Opening Trio', time: '20:00', duration: '00:40' },
        { type: 'changeover', label: 'Changeover', customName: '', time: '', duration: '00:20' },
        { type: 'act', label: 'Act 2', customName: 'Harbour Brass Collective (Headliner)', time: '21:00', duration: '01:30' }
      ],
      technicians: [{ userId: 'user-3', role: 'Sound' }, { userId: 'user-2', role: 'Lighting' }],
      clientContact: 'Tour manager — Jess', guestEngineer: true,
      techInfo: 'Guest FOH engineer touring with the band. 32-way split needed. Backline hired in.', techSpec: null,
      lighting_notes: 'Guest LD touring with GrandMA3 show file. House rig: maintain warm tungsten front wash on dimmers 1-6 for 8-piece brass and rhythm section. Cues: blackout on encore, slow warm fade intro.',
      floor_package: 'Touring 4x moving spot fixtures on floor bases USL/USR, 2x strobes, 4x LED batten bars behind backline. 32A 3-Phase stage drop required USL.',
      floor_tags: ['Moving Heads', 'Strobes / Blinders', 'LED Battens / Bars', '32A 3-Phase', 'DMX Run to Stage'],
      specials: { hazer: true, heavy_power: true, lasers: false, video: false, pyro: false },
      special_notes: 'Hazer permit in place with Duty Manager. Fire zone isolation in Main Hall active from 16:30.',
      production_package: {
        lighting_notes: 'Guest LD touring with GrandMA3 show file. House rig: maintain warm tungsten front wash on dimmers 1-6 for 8-piece brass and rhythm section. Cues: blackout on encore, slow warm fade intro.',
        floor_package: 'Touring 4x moving spot fixtures on floor bases USL/USR, 2x strobes, 4x LED batten bars behind backline. 32A 3-Phase stage drop required USL.',
        floor_tags: ['Moving Heads', 'Strobes / Blinders', 'LED Battens / Bars', '32A 3-Phase', 'DMX Run to Stage'],
        specials: { hazer: true, heavy_power: true, lasers: false, video: false, pyro: false },
        special_notes: 'Hazer permit in place with Duty Manager. Fire zone isolation in Main Hall active from 16:30.'
      },
      checklist: {},
    },
    {
      id: 'evt-2', name: 'Private hire — product launch', category: 'Private Hires', space: 'Studio Theatre',
      date: RMTP._seedDates.today, status: 'Confirmed',
      startTime: '18:00', finishTime: '22:00', load_in: '16:00', soundcheck: '17:30', doors: '18:30', off_stage: '21:30', curfew: '22:00', load_out: '22:45',
      schedule_items: [
        { type: 'other', label: 'Welcome Drinks & Playback', customName: 'Background Audio', time: '18:30', duration: '00:45' },
        { type: 'other', label: 'Keynote & Speeches', customName: 'Main Stage Presentation', time: '19:15', duration: '01:00' },
        { type: 'other', label: 'Networking & DJ', customName: 'DJ Set', time: '20:15', duration: '01:15' }
      ],
      technicians: [{ userId: 'user-4', role: 'AV' }],
      clientContact: 'Client — Aria Events', guestEngineer: false,
      techInfo: 'Speeches + playback from a laptop. Two handhelds, a lectern mic, HDMI to the projector.', techSpec: null,
      lighting_notes: 'Corporate cool blue wash for drinks reception. High-key warm white lectern focus for keynote speeches. Video cue trigger at 19:15.',
      floor_package: '2x 75" confidence monitors downstage, 1x wireless cue clicker system, 1x 16A single phase drop for DJ setup.',
      floor_tags: ['16A Single Phase'],
      specials: { hazer: false, heavy_power: false, lasers: false, video: true, pyro: false },
      special_notes: '4K HDMI primary feed from presenter laptop at lectern + backup playback Mac at FOH.',
      production_package: {
        lighting_notes: 'Corporate cool blue wash for drinks reception. High-key warm white lectern focus for keynote speeches. Video cue trigger at 19:15.',
        floor_package: '2x 75" confidence monitors downstage, 1x wireless cue clicker system, 1x 16A single phase drop for DJ setup.',
        floor_tags: ['16A Single Phase'],
        specials: { hazer: false, heavy_power: false, lasers: false, video: true, pyro: false },
        special_notes: '4K HDMI primary feed from presenter laptop at lectern + backup playback Mac at FOH.'
      },
      checklist: {},
    },
    {
      id: 'evt-3', name: 'Short film premiere', category: 'Cinema', space: 'Screen 1',
      date: RMTP._seedDates.tomorrow, status: 'Advancing',
      startTime: '19:30', finishTime: '22:00', screening_starts_time: '20:00', soundcheck: '', doors: '19:00', curfew: '',
      media_type: 'DCP', dcp_received: true, checks_completed: false, intermission: false, qa: true,
      dcp_tester_user_id: 'user-3', dcp_test_datetime: `${RMTP._seedDates.today}T14:00`,
      technicians: [{ userId: 'user-3', role: 'Projection' }],
      clientContact: 'Producer — Sam', guestEngineer: false,
      techInfo: 'DCP arriving day before — ingest and test in Screen 1. Q&A after with two radio mics.', techSpec: null,
      checklist: {},
    },
    {
      id: 'evt-4', name: 'Summer gala reception', category: 'Private Hires', space: 'Mezzanine',
      date: RMTP._seedDates.plus3, status: 'Advancing',
      startTime: '17:00', finishTime: '00:00', load_in: '15:30', soundcheck: '', doors: '17:00', off_stage: '23:30', curfew: '00:00', load_out: '00:30',
      schedule_items: [
        { type: 'other', label: 'Speeches', customName: 'Welcome Speeches & Slideshow', time: '18:00', duration: '00:45' },
        { type: 'act', label: 'Act 1', customName: 'Live Acoustic Duo', time: '19:30', duration: '01:00' },
        { type: 'other', label: 'Evening DJ', customName: 'DJ Playback', time: '21:00', duration: '02:30' }
      ],
      technicians: [], clientContact: 'Client — Harbour Foundation', guestEngineer: false,
      techInfo: 'DJ on later, playback earlier. Needs uplighters and a couple of radio mics for speeches.', techSpec: null,
      checklist: {},
    },
    {
      id: 'evt-5', name: 'Late-night jazz quartet', category: 'Programme', space: 'Main Hall',
      date: RMTP._seedDates.lastWeek, status: 'Complete',
      startTime: '20:00', finishTime: '23:00', load_in: '17:00', soundcheck: '18:30', doors: '19:30', off_stage: '22:45', curfew: '23:00', load_out: '23:30',
      schedule_items: [
        { type: 'act', label: 'Act 1', customName: 'Trio Opening', time: '20:00', duration: '00:45' },
        { type: 'changeover', label: 'Changeover', customName: '', time: '', duration: '00:15' },
        { type: 'act', label: 'Act 2', customName: 'Main Quartet', time: '21:00', duration: '01:30' }
      ],
      technicians: [{ userId: 'user-3', role: 'Sound' }],
      clientContact: '', guestEngineer: false,
      techInfo: 'House engineer. Standard jazz input list.', techSpec: null,
      checklist: {},
    },
  ],

  /* ---- Venue Specifications & Spaces ---- */
  venues: [
    {
      id: 'Main Hall',
      name: 'Main Hall',
      capacity: '350 standing / 180 seated',
      stageDimensions: '8m x 5m x 0.8m',
      inventory: '',
      basicCrew: 2,
      crewDisciplines: [
        { role: 'Sound', count: 1 },
        { role: 'Lighting', count: 1 }
      ],
      audio: {
        inputChannels: 48,
        localInputChannels: 8,
        outputChannels: 24,
        localOutputChannels: 8,
        prefix: 'MH',
        mixingDeskProtocol: 'Dante',
        mixingDeskInvId: '',
        stageboxes: [
          { letter: 'A', name: 'SL Rack', location: 'Stage Left', sockets: 16 }
        ]
      },
      dmx: []
    },
    {
      id: 'Studio Theatre',
      name: 'Studio Theatre',
      capacity: '140 standing / 90 seated',
      stageDimensions: '6m x 4m',
      inventory: '',
      basicCrew: 2,
      crewDisciplines: [
        { role: 'Sound', count: 1 },
        { role: 'Lighting', count: 1 }
      ],
      audio: {
        inputChannels: 32,
        localInputChannels: 8,
        outputChannels: 16,
        localOutputChannels: 8,
        prefix: 'ST',
        mixingDeskProtocol: 'Dante',
        mixingDeskInvId: '',
        stageboxes: [
          { letter: 'A', name: 'Studio Rack', location: 'Upstage', sockets: 16 }
        ]
      },
      dmx: []
    },
    {
      id: 'Mezzanine',
      name: 'Mezzanine',
      capacity: '100 standing / 50 seated',
      stageDimensions: '',
      inventory: '',
      basicCrew: 1,
      crewDisciplines: [
        { role: 'Sound', count: 1 }
      ],
      audio: {
        inputChannels: 16,
        localInputChannels: 8,
        outputChannels: 8,
        localOutputChannels: 4,
        prefix: 'MZ',
        mixingDeskProtocol: 'Analog',
        mixingDeskInvId: '',
        stageboxes: []
      },
      dmx: []
    },
    {
      id: 'Screen 1',
      name: 'Screen 1',
      capacity: '181 seats',
      stageDimensions: '',
      inventory: '',
      basicCrew: 1,
      crewDisciplines: [
        { role: 'Cinema', count: 1 }
      ],
      audio: {
        inputChannels: 16,
        localInputChannels: 4,
        outputChannels: 8,
        localOutputChannels: 4,
        prefix: 'S1',
        mixingDeskProtocol: 'Analog',
        mixingDeskInvId: '',
        stageboxes: []
      },
      dmx: []
    },
    {
      id: 'Screen 2',
      name: 'Screen 2',
      capacity: '132 seats',
      stageDimensions: '',
      inventory: '',
      basicCrew: 1,
      crewDisciplines: [
        { role: 'Cinema', count: 1 }
      ],
      audio: {
        inputChannels: 16,
        localInputChannels: 4,
        outputChannels: 8,
        localOutputChannels: 4,
        prefix: 'S2',
        mixingDeskProtocol: 'Analog',
        mixingDeskInvId: '',
        stageboxes: []
      },
      dmx: []
    },
    {
      id: 'Screen 3',
      name: 'Screen 3',
      capacity: '50 seats',
      stageDimensions: '',
      inventory: '',
      basicCrew: 1,
      crewDisciplines: [
        { role: 'Cinema', count: 1 }
      ],
      audio: {
        inputChannels: 16,
        localInputChannels: 4,
        outputChannels: 8,
        localOutputChannels: 4,
        prefix: 'S3',
        mixingDeskProtocol: 'Analog',
        mixingDeskInvId: '',
        stageboxes: []
      },
      dmx: []
    }
  ],

  /* ---- End-of-shift reports (keyed by eventId; see views/advancing.js) ---- */
  reports: [],

  /* ---- Technician & Freelancer Availability ---- */
  availability: [
    {
      id: 'avail-1',
      userId: 'user-3',
      userName: 'Sam Okafor',
      date: RMTP._seedDates.today,
      type: 'available',
      dayPart: 'all_day',
      startTime: '08:00',
      finishTime: '23:30',
      notes: 'Available all day for live sound or stage patch',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'avail-2',
      userId: 'user-4',
      userName: 'Danny Cole',
      date: RMTP._seedDates.today,
      type: 'available',
      dayPart: 'evening',
      startTime: '18:00',
      finishTime: '23:30',
      notes: 'Available for cinema or AV shift',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'avail-3',
      userId: 'user-5',
      userName: 'Maya Lin',
      date: RMTP._seedDates.today,
      type: 'available',
      dayPart: 'custom',
      startTime: '16:00',
      finishTime: '23:00',
      notes: 'Freelance FOH / monitors — available from 16:00',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'avail-4',
      userId: 'user-6',
      userName: 'Jordan Reed',
      date: RMTP._seedDates.today,
      type: 'unavailable',
      dayPart: 'all_day',
      startTime: '08:00',
      finishTime: '23:30',
      notes: 'On tour elsewhere',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'avail-5',
      userId: 'user-5',
      userName: 'Maya Lin',
      date: RMTP._seedDates.tomorrow,
      type: 'available',
      dayPart: 'all_day',
      startTime: '08:00',
      finishTime: '23:30',
      notes: 'Free all day',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'avail-6',
      userId: 'user-6',
      userName: 'Jordan Reed',
      date: RMTP._seedDates.tomorrow,
      type: 'available',
      dayPart: 'evening',
      startTime: '17:30',
      finishTime: '23:30',
      notes: 'Free for lighting busking',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'avail-7',
      userId: 'user-5',
      userName: 'Maya Lin',
      date: RMTP._seedDates.plus3,
      type: 'available',
      dayPart: 'evening',
      startTime: '17:00',
      finishTime: '00:00',
      notes: 'Free for evening event',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'avail-8',
      userId: 'user-6',
      userName: 'Jordan Reed',
      date: RMTP._seedDates.plus3,
      type: 'available',
      dayPart: 'all_day',
      startTime: '08:00',
      finishTime: '23:30',
      notes: 'Available all weekend',
      updatedAt: new Date().toISOString()
    }
  ],

  /* ---- Shift Bookings & Rota Roster ----
     status: 'pencil' | 'confirmed' | 'declined' | 'cancelled' */
  bookings: [
    {
      id: 'book-1',
      eventId: 'evt-1',
      eventName: 'Harbour Brass Collective — Live',
      space: 'Main Hall',
      date: RMTP._seedDates.today,
      startTime: '15:00',
      finishTime: '00:00',
      userId: 'user-3',
      userName: 'Sam Okafor',
      role: 'Sound',
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      notes: 'FOH & patch assist with visiting tour engineer'
    },
    {
      id: 'book-2',
      eventId: 'evt-1',
      eventName: 'Harbour Brass Collective — Live',
      space: 'Main Hall',
      date: RMTP._seedDates.today,
      startTime: '16:00',
      finishTime: '00:00',
      userId: 'user-2',
      userName: 'Priya Shah',
      role: 'Lighting',
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      notes: 'House LD & touring rig support'
    },
    {
      id: 'book-3',
      eventId: 'evt-2',
      eventName: 'Private hire — product launch',
      space: 'Studio Theatre',
      date: RMTP._seedDates.today,
      startTime: '16:00',
      finishTime: '22:45',
      userId: 'user-4',
      userName: 'Danny Cole',
      role: 'AV',
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      notes: 'Presenter laptop & confidence monitors'
    },
    {
      id: 'book-4',
      eventId: 'evt-3',
      eventName: 'Short film premiere',
      space: 'Screen 1',
      date: RMTP._seedDates.tomorrow,
      startTime: '19:00',
      finishTime: '22:30',
      userId: 'user-3',
      userName: 'Sam Okafor',
      role: 'Projection',
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      notes: 'DCP ingest verification & Q&A mics'
    },
    {
      id: 'book-5',
      eventId: 'evt-4',
      eventName: 'Summer gala reception',
      space: 'Mezzanine',
      date: RMTP._seedDates.plus3,
      startTime: '16:30',
      finishTime: '00:30',
      userId: 'user-5',
      userName: 'Maya Lin',
      role: 'Sound',
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      notes: 'Acoustic duo + evening DJ transition. Rate £240.',
      swapRequested: true,
      swapOfferedBy: 'user-5',
      swapOfferedByName: 'Maya Lin',
      swapOfferedAt: new Date().toISOString(),
      swapReason: 'Double-booked with touring rehearsals — looking for Sound cover at the Mezzanine console.'
    },
    {
      id: 'book-6',
      eventId: 'evt-4',
      eventName: 'Summer gala reception',
      space: 'Mezzanine',
      date: RMTP._seedDates.plus3,
      startTime: '16:30',
      finishTime: '00:30',
      userId: 'user-6',
      userName: 'Jordan Reed',
      role: 'Lighting',
      status: 'pencil',
      penciledAt: new Date().toISOString(),
      notes: 'Penciled for mood lighting & room wash. Rate £220.'
    }
  ],
};
