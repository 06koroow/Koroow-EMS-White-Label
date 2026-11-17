-- Meridian Arts Tech Portal — load sample procedure pages into Supabase.
-- Paste into the SQL Editor and Run. Safe to re-run (updates existing rows).

insert into public.procedures ("id","category","title","body","icon") values
  ('bp-00', 'Best Practice', 'Overview & how to use this guide', $maproc$MERIDIAN ARTS — TECHNICAL BEST PRACTICE GUIDE
Live Audio  ·  Live Lighting  ·  Live AV — general principles for duty technicians
Sample Operating Standard v1.0 (Portfolio Demo Template)

This is a living template for venue technical teams. Where any note disagrees with a formal safety policy, the safety document wins; where it disagrees with a manufacturer instruction, follow the manufacturer and flag the conflict to the Technical Manager. Console features are named generically — read "scenes / groups / palettes / executors" as whatever your platform calls them.
$maproc$, 'book'),
  ('bp-01', 'Best Practice', '1 · Purpose and scope', $maproc$1 — PURPOSE AND SCOPE
Sets out baseline technical standards for anyone working in a live production role at Meridian Arts — audio, lighting or AV; permanent, casual or visiting crew. Structured discipline-agnostic at the top and room-specific underneath so any duty technician covering an unfamiliar space has a reliable starting point.

This guide supports, rather than replaces, manufacturer manuals, formal method statements, and venue risk assessments.
$maproc$, 'book'),
  ('bp-02', 'Best Practice', '2 · Universal principles (all disciplines)', $maproc$2 — UNIVERSAL PRINCIPLES (ALL DISCIPLINES)
If you only read one section, read this one.

2.1 Safety is the first deliverable
No show is worth an injury. A performance that starts ten minutes late because a rig was made safe is a success. Always stop or delay work that cannot be completed safely and escalate rather than improvising around a hazard.
- Confirm locations of first aid kits, fire exits, extinguishers, and assembly points before doors.
- Know who the Duty Manager and first aider are for the session.
- Keep gangways, fire exits, and wings clear at all times — flight cases live in storage, never in escape routes.
- Log near-misses as well as incidents so root causes get fixed.

2.2 Electrical safety and power
- Inspect before connecting. Tag and quarantine any item with damaged insulation, cracked housings, or expired PAT.
- Respect circuit ratings and balance load across phases.
- Never defeat a protective earth to solve audio hum — resolve earth loops with proper isolation.
- Power down before re-patching mains or opening enclosures; keep drinks clear of consoles, racks, and dimmers.

2.3 Working at height and rigging
- Only work at height if trained and authorised for the access equipment in use.
- Every overhead item requires a rated primary clamp and an independent rated secondary safety bond.
- Establish a clear exclusion zone below any active rigging operation.
- Tether tools and loose hardware when working overhead.

2.4 Cabling and stage management
- Dress cable runs neatly along architecture and cover any walkway crossings with cable ramps or matting.
- Label ambiguous runs at both ends and separate power from low-level signal.
- Coil cables over-under during derig and restore rooms to house default.

2.5 Documentation and handover
- Log faults cleanly, tag defective gear out of service, and save current show files to the shared archive before sign-off.
$maproc$, 'book'),
  ('bp-03', 'Best Practice', '3 · Recommended workflows', $maproc$3 — RECOMMENDED WORKFLOWS
Understand the brief, prepare offline, build methodically, verify systematically, then run.

3.1 Universal production arc
- Advance — review rider, spec, and running order; confirm gaps in writing early.
- Prep offline — build the console file from house templates and verify media playback formats.
- Setup / get-in — rig to the plot and keep physical labels aligned with paperwork.
- Systematic check — verify every input, monitor bus, fixture address, and video chain before performers arrive.
- Show & reset — save working starting states, run the show cleanly, restore standing house presets.

3.2 Audio workflow
- Build console patch from the agreed input list and colour-code channel families.
- Set preamp gain cleanly with neutral EQ before sending to monitors.
- Line-check every microphone/DI in sequence and verify every wedge/IEM send.

3.3 Lighting workflow
- Confirm fixture modes and DMX addresses against the patch sheet.
- Run a rig-check before focusing; build groups and palettes before programming cues.
- Keep a blackout and safe worklight state within immediate reach.

3.4 AV workflow
- Standardise frame rate and resolution end-to-end across switchers and projectors.
- Always test presenter media on the live playback chain and prepare a clean holding slide.
$maproc$, 'book'),
  ('bp-04', 'Best Practice', '4 · Patch management', $maproc$4 — PATCH MANAGEMENT

4.1 Principles of good patching
- Maintain one source of truth: paper patch, physical stageboxes, and console labels must match.
- Label both ends of multicores, tails, and tie-lines.
- Leave logical spare channels for late additions.

4.2 Input & patch documentation
Record channel number, source, microphone/DI model, stand type, phantom power, physical socket, and routing notes. Save updated sheets alongside dated show files in the shared folder.

4.3 Digital stageboxes & shared gain
- When two consoles share a digital stagebox, agree who owns analog preamp gain (typically Monitor World) while the second desk uses digital trim.
- Use isolated transformer splits for broadcast or recording feeds requiring independent gain.
- Verify single clock master and sample-rate lock across all networked audio nodes.

4.4 Lighting & AV routing
- Plan DMX universe boundaries and fixture footprints ahead of rigging day.
- Label switcher inputs/outputs and verify EDID/HDCP compliance end-to-end.
$maproc$, 'book'),
  ('bp-05', 'Best Practice', '5 · Live audio', $maproc$5 — LIVE AUDIO
Good live sound is discipline before taste.

5.1 Signal flow & gain structure
- Set preamp headroom against realistic peak levels with faders at unity.
- Keep house system DSP presets locked unless approved changes are required for the room configuration.
- Observe venue SPL monitoring thresholds throughout soundcheck and show.

5.2 Microphones & monitoring
- Prioritise placement and polar pattern rejection before aggressive EQ.
- Ring out monitor wedges cleanly and protect IEM performers with brickwall limiting.

5.3 Wireless & RF management
- Scan local RF spectrum before show, coordinate frequencies, and fit fresh batteries before doors.
- Maintain clear line of sight between transmitters and diversity antennas away from LED walls.
$maproc$, 'book'),
  ('bp-06', 'Best Practice', '6 · Live lighting', $maproc$6 — LIVE LIGHTING

6.1 Rigging & focusing fixtures
- Verify clamp ratings and secondary safety bonds on every overhead fixture.
- Focus cold before performers arrive and verify coverage under live stage blocking.

6.2 Data distribution & power
- Terminate the final fixture on every wired DMX leg and isolate sACN/Art-Net traffic cleanly.
- Never plug LED fixtures, intelligent movers, or console supplies into dimmed circuits.

6.3 Programming & operation
- Build palettes (position, colour, beam) referenced by cues so fast re-focusing updates the whole stack.
- Confirm haze/strobe notices are posted and fire detection isolation permits are active when approved.
$maproc$, 'book'),
  ('bp-07', 'Best Practice', '7 · Live AV / video', $maproc$7 — LIVE AV / VIDEO

7.1 Signal chain & formats
- Map source -> scaler/switcher -> distribution -> display and confirm resolution/refresh agreement.
- Use SDI or fibre for long video runs; keep passive HDMI under 5 metres.

7.2 Playback & projection
- Verify presenter laptops early (adapters, extended desktop vs mirror, embedded audio routing).
- Load a clean holding slide on a secondary switcher input as an instant fallback.

7.3 Streaming & capture
- Route an independent broadcast/stream mix rather than relying on camera audio.
- Monitor outgoing stream audio and picture continuously during live broadcasts.
$maproc$, 'book'),
  ('bp-08', 'Best Practice', '8 · Troubleshooting (all disciplines)', $maproc$8 — TROUBLESHOOTING (ALL DISCIPLINES)

8.1 Universal fault-finding method
- Stay calm and change one variable at a time.
- Work from a known-good reference point and binary-search the signal path.
- Substitute suspect cables or adapters early rather than assuming hardware failure.

8.2 Audio, RF, Lighting & AV quick checks
- Audio no-signal: verify phantom power, mute groups, DCA assignment, and stagebox clock lock.
- RF dropouts: check battery level first, then antenna line of sight and intermod spacing.
- Lighting glitches: confirm non-dim power, DMX address/mode personality, and line termination.
- Video handshake loss: re-seat HDMI, lock EDID to 1080p60/4K60, or bypass faulty scalers.
$maproc$, 'book'),
  ('bp-09', 'Best Practice', '9 · When things go wrong', $maproc$9 — WHEN THINGS GO WRONG

9.1 Priority order
1. Safety — eliminate immediate risk to audience, crew, or performers.
2. Continuity — switch to the pre-tested fallback state (holding slide, spare mic, worklight look).
3. Diagnosis — isolate and resolve once the stage is stable.
4. Restore & log — bring primary systems back cleanly and log the incident after the show.

9.2 Show-stop communication
Keep radio traffic brief and factual, alert the Duty Manager immediately if audience safety is affected, and follow venue emergency announcement procedures.
$maproc$, 'book'),
  ('bp-10', 'Best Practice', '10 · Appendices and templates', $maproc$10 — APPENDICES AND TEMPLATES

10.1 Pre-show checklist
- Technical advance reviewed and equipment staged.
- Fire exits, cable crossings, and overhead safeties verified.
- Line-check, rig-check, AV fallback, and RF fresh-cell check complete.
- Comms ring tested and show files backed up.

10.2 End-of-session handover
- Document faults found, tagged equipment, consumables used, and any temporary rig changes.
$maproc$, 'book'),
  ('venue-open', 'Opening & Closing', 'Venue opening checklist', $maproc$VENUE OPENING CHECKLIST (SAMPLE SOP)

1. Unlock technical control rooms and sign out room key fobs from the Production Office.
2. Walk each performance space to confirm fire exits, access corridors, and stage areas are clear.
3. Power mains rack sequencers from wall isolator -> DSP/processors -> amplifiers last.
4. Verify house lighting wall panels respond cleanly and restore house presets.
5. Confirm daily advancing sheet and assigned crew roster in the Tech Portal.
$maproc$, 'power'),
  ('night-close', 'Opening & Closing', 'End-of-night shutdown', $maproc$END-OF-NIGHT SHUTDOWN (SAMPLE SOP)

1. Save any updated audio/lighting show files to the shared network drive.
2. Power off loudspeakers and amplifiers BEFORE consoles and digital processors.
3. Shut down projectors cleanly and allow full cooling cycle before cutting rack mains.
4. Return portable wireless mics, IEM packs, and test cables to charging bays.
5. Log shift handover notes and any maintenance faults in the Tech Portal.
$maproc$, 'power'),
  ('studio-startup', 'Opening & Closing', 'Studio Theatre — access & start-up', $maproc$STUDIO THEATRE — ACCESS & START-UP (SAMPLE SOP)

## Step 1 — Room access & safety sweep
1. Draw the Studio Theatre key set from the Production Office key safe.
2. Check both fire exits, rigging gallery access, and clear floor cable routes.

## Step 2 — Rack & power sequence
NOTE: Power consoles on LAST, after stageboxes, dimmers, and rack breakers are online.

1. Engage the main wall isolator inside the technical control booth.
2. Switch on rack power distribution strips and dimmers.
3. Confirm digital stagebox link indicators lock cleanly.
4. Power on the Studio lighting desk and FOH mixing console.
5. Unmute PA amplifiers last and confirm house audio preset.
$maproc$, 'power'),
  ('pa-powerup', 'Sound', 'PA power-up sequence', $maproc$PA POWER-UP SEQUENCE (SAMPLE SOP)

1. Confirm console faders and master buses are down before power-on.
2. Power consoles, stageboxes, and network switches first; wait for clock lock.
3. Engage DSP processors and speaker management units.
4. Power loudspeaker amplifiers last (subwoofers, tops, then fills).
5. Reverse the order strictly on power-down (amps off first).
$maproc$, 'wave'),
  ('foh-dlive', 'Sound', 'FOH digital console startup', $maproc$FOH CONSOLE STARTUP (SAMPLE SOP)

1. Boot surface and confirm stagebox network connection and word-clock lock.
2. Recall the standard House Default Template scene — never start from a previous visiting act file.
3. Save As under today's event name and date before building patches.
4. Verify talkback, pink-noise test send, and left/right/sub routing.
$maproc$, 'wave'),
  ('monitors', 'Sound', 'Monitor world setup', $maproc$MONITOR WORLD SETUP (SAMPLE SOP)

1. Verify mix bus count and wedge/IEM assignments against the advancing spec.
2. Ring out monitor mixes safely with vocal microphones prior to artist arrival.
3. Confirm shared stagebox gain-ownership protocol with FOH engineer.
$maproc$, 'wave'),
  ('rf-management', 'Sound', 'Radio mic / IEM management', $maproc$RADIO MIC & IEM MANAGEMENT (SAMPLE SOP)

1. Run a fresh RF environment scan in the room prior to soundcheck.
2. Sync transmitters to coordinated channels and verify battery health (always fit fresh cells for show).
3. Label handhelds/packs clearly and confirm antenna distribution LEDs show healthy diversity.
$maproc$, 'wave'),
  ('lx-startup', 'Lighting', 'Lighting desk startup', $maproc$LIGHTING DESK STARTUP (SAMPLE SOP)

1. Power stage DMX splitters/nodes and non-dimmed fixture circuits first.
2. Boot lighting console and allow intelligent fixtures to complete home/calibration.
3. Load house rig template show file and verify Grand Master and Blackout response.
$maproc$, 'bulb'),
  ('house-lights', 'Lighting', 'House lights & presets', $maproc$HOUSE LIGHTS & PRESETS (SAMPLE SOP)

1. Test wall station presets (100% Work, 50% Doors, 10% Show, Blackout) before doors open.
2. Confirm architectural control override priority if operating house washes via DMX.
$maproc$, 'bulb'),
  ('haze', 'Lighting', 'Haze / smoke operation', $maproc$HAZE & SMOKE OPERATION (SAMPLE SOP)

1. Confirm Duty Manager sign-off and zone detector isolation before testing haze.
2. Check fluid reservoir level and allow heater block to reach operating temperature.
3. Ensure signage is posted at audience entrances whenever atmospheric effects are used.
$maproc$, 'bulb'),
  ('projector', 'AV & Presentation', 'Projector & screen setup', $maproc$PROJECTOR & SCREEN SETUP (SAMPLE SOP)

1. Strike projector lamp and allow warm-up; keep dowser closed until signal is verified.
2. Confirm lens preset (16:9 / Flat / Scope) matches source scaling.
3. Test blanking/blackout cue prior to audience entry.
$maproc$, 'screen'),
  ('patching', 'AV & Presentation', 'Laptop / HDMI patching', $maproc$LAPTOP / HDMI PATCHING (SAMPLE SOP)

1. Connect presenter laptop via short high-speed HDMI lead or lectern wall plate.
2. Set laptop display output to Extended Desktop at 1080p60 or 4K60 depending on switcher preset.
3. Route embedded HDMI or mini-jack audio to dedicated stereo desk channels and verify level.
$maproc$, 'screen'),
  ('hybrid', 'AV & Presentation', 'Hybrid / streamed event setup', $maproc$HYBRID / STREAMED EVENT SETUP (SAMPLE SOP)

1. Verify wired ethernet uplink speed and stream encoder bitrate 90 minutes before broadcast.
2. Build an independent matrix mix for broadcast (dialogue + room ambient mics).
3. Run a private test stream for 5 minutes to confirm audio sync and caption overlay.
$maproc$, 'screen'),
  ('screen-1-ops', 'AV & Presentation', 'Screen 1 — start-up & operation', $maproc$SCREEN 1 — START-UP & OPERATION (SAMPLE SOP)

START-UP SEQUENCE
1. Unlock Projection Booth 1 and verify extractor fan and UPS status.
2. Engage the amplifier rack main switch and power amplifiers sequentially from bottom to top.
3. Wait for the cinema audio processor to complete its boot cycle and show green input lock.
4. Set booth cleaners/work lights OFF and raise auditorium house presets to Doors level.

BASIC OPERATIONS
- Projector touch panel: control lamp strike/off, dowser open/close, and aspect macros (2D Scope / 2D Flat / HDMI Aux).
- Always lamp off when idle exceeds 60 minutes and observe full 10-minute cool-down.
- Audio processor inputs: select Digital 5.1/7.1 for DCP features, Aux Stereo for laptop playback, and Surround-Only routing for Q&A handheld microphones to maximise gain before feedback.
- Q&A mixer: wired lectern/stage inputs on channels 1-4, wireless receivers on channels 5-6.
$maproc$, 'screen'),
  ('screen-2-ops', 'AV & Presentation', 'Screen 2 — start-up & operation', $maproc$SCREEN 2 — START-UP & OPERATION (SAMPLE SOP)

START-UP SEQUENCE
1. Unlock Projection Booth 2 and verify rack cooling airflow.
2. Power the 5.1 amplifier rack sequentially from base unit upwards.
3. Confirm cinema sound processor boots cleanly and mirrors Screen 2 SPL cues.
4. Switch off booth work lights and bring house lights up to 50% Doors preset.

BASIC OPERATIONS
- Projector touch panel: toggle dowser during pre-show laptop tests and confirm 2D Flat vs Scope framing before doors.
- Audio processor: use Digital 5.1 for cinema deliverables and Surround-Only aux routing for Q&A microphones.
$maproc$, 'screen'),
  ('get-in', 'Stage & Rigging', 'Stage build & get-in', $maproc$STAGE BUILD & GET-IN (SAMPLE SOP)

1. Confirm riser footprint, access steps, and skirted edges against the advancing plot.
2. Keep loading bay doors supervised and clear fire lanes continuously.
$maproc$, 'box'),
  ('rigging', 'Stage & Rigging', 'Rigging & flying points', $maproc$RIGGING & FLYING POINTS (SAMPLE SOP)

1. Never exceed stamped SWL (Safe Working Load) on trusses, bars, or roof points.
2. Inspect shackles, steels, and safeties before lifting any truss or luminaire.
$maproc$, 'box'),
  ('get-out', 'Stage & Rigging', 'Get-out procedure', $maproc$GET-OUT PROCEDURE (SAMPLE SOP)

1. Ensure house worklights are up and audience area is clear before striking overhead gear.
2. Coil cables neatly, stack risers in dedicated storage, and leave stage swept.
$maproc$, 'box'),
  ('evac', 'Health & Safety', 'Fire & evacuation procedure', $maproc$FIRE & EVACUATION PROCEDURE (SAMPLE SOP)

1. On fire alarm activation, mute entertainment PA immediately and bring house worklights to 100%.
2. Follow Duty Manager instructions to assist stage/backstage evacuation to the primary assembly point.
$maproc$, 'shield'),
  ('height', 'Health & Safety', 'Working at height', $maproc$WORKING AT HEIGHT (SAMPLE SOP)

1. Only operate mobile towers or MEWPs if certified and signed off.
2. Maintain exclusion cones below overhead work and wear tethered tool lanyards.
$maproc$, 'shield'),
  ('handling', 'Health & Safety', 'Manual handling', $maproc$MANUAL HANDLING (SAMPLE SOP)

1. Use flight-case ramps, sack trucks, and team lifts for amplifiers, subs, and risers.
2. Wear safety footwear during load-ins and strikes.
$maproc$, 'shield'),
  ('incident', 'Health & Safety', 'Incident reporting', $maproc$INCIDENT & NEAR-MISS REPORTING (SAMPLE SOP)

1. Administer first aid or summon the Duty First Aider immediately.
2. Log equipment defects in Maintenance & Repairs and file a formal incident report before end of shift.
$maproc$, 'shield'),
  ('pat', 'Health & Safety', 'Electrical safety (PAT)', $maproc$ELECTRICAL SAFETY & PAT (SAMPLE SOP)

1. Visually inspect all visiting crew mains leads and distros before connection.
2. Quarantine any item failing visual or PAT inspection immediately.
$maproc$, 'shield'),
  ('screenwriter-guide', 'Cinema', 'TMS — running a screening', $maproc$THEATRE MANAGEMENT SYSTEM (TMS) — SAMPLE SCREENING SOP

Overview
The TMS coordinates DCP content, KDM decryption keys, Show Playlists (SPLs), and automated booth cues across Screens 1, 2, and 3.

## Key Terms
- DCP — Digital Cinema Package (feature/trailer files).
- CPL — Composition Playlist inside a DCP.
- KDM — Key Delivery Message unlocking encrypted DCPs for a specific server & date window.
- SPL — Show Playlist combining pre-show, certs, feature, and automation cues.

## Step 1 — Ingest Content
1. Connect delivery drive (CRU/USB) or pull from central storage.
2. Monitor ingest progress on the Content tab until 100% verified.

## Step 2 — Load & Verify KDM
1. Upload the distributor KDM file.
2. Confirm the green key indicator matches the target screen server serial and covers the full screening window.

## Step 3 — Build & Schedule SPL
1. Assemble adverts, trailers, certification card, and feature CPL.
2. Insert lighting, masking, sound-format, and dowser automation cues.
3. Transfer the validated SPL to the target screen server and confirm scheduled start time.

## Quick Troubleshooting
- Locked / No Key: check KDM validity dates and target server serial.
- Wrong aspect: verify Scope vs Flat macro cue in the SPL.
- No sound: verify audio processor input (Digital 5.1/7.1) matches feature tracks.
$maproc$, 'screen')
on conflict ("id") do update set "category"=excluded."category", "title"=excluded."title", "body"=excluded."body", "icon"=excluded."icon";
