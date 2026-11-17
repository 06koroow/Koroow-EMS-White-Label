# Page Guide 07 — Venues & Spaces

**Portal Route**: `#/venues`  
**Primary Users**: Technical Managers, Senior Technicians, Production Planners  
**Access Tier**: Restricted (Technical Managers and Admins only)

---

## 1. Executive Summary & Purpose

The **Venues & Spaces** module stores the master architectural, electrical, staging, and static equipment specifications for all performance and auxiliary rooms within the Meridian Arts complex.

It establishes venue capacities, stage dimensions, static audio/lighting inventories, DMX universe patch points, power supply drops (32A / 63A 3-phase), and minimum **Basic Crew Rules** required to operate each room safely.

---

## 2. Meridian Arts Venue Directory

The portal tracks 9 distinct spaces across the building:

1. **Main Hall (Main Live Venue)**:
   - *Capacity*: 350 standing / 180 seated.
   - *Console*: Behringer Wing / Midas S16 stageboxes.
   - *PA*: JBL VRX932LAP Line Array + VRX918SP Subwoofers.
   - *Lighting*: Avolites Tiger Touch II, 54-ch dimming, Prolights Studio CobFC, Diamond 19, CromoSpot500.
   - *Basic Crew Rule*: Minimum 2 Technicians (Lead Sound + Second / LX).

2. **Studio Theatre (Flexible Theatre / Rehearsal Space)**:
   - *Capacity*: 140 standing / 90 seated.
   - *Console*: Allen & Heath SQ-5 / 16x8 digital stagebox.
   - *PA*: KV2 Audio EX10 + RCF ART 705-AS subs.
   - *Lighting*: ETC Element 60, Zero88 Chilli 48-way dimming.
   - *Basic Crew Rule*: Minimum 2 Technicians.

3. **Mezzanine (Intimate Performance / Cabaret Space)**:
   - *Capacity*: 100 standing / 50 seated.
   - *Console*: Soundcraft EPM12 analogue desk.
   - *PA*: KV2 Audio EX10 active speakers.
   - *Lighting*: 6-way LED controller + ETC Junior profiles.
   - *Basic Crew Rule*: Minimum 1 Technician.

4. **Screen 1 (Cinema)**:
   - *Capacity*: 181 theatre seats.
   - *Projector*: Christie CP4220 4K DCI Cinema Projector.
   - *Audio*: Dolby AP20, Christie Vive Audio LS5S surrounds, CDA5 5000W amps, Martin Audio LCR.
   - *Screen*: 24ft x 10.2ft cinema screen.
   - *Basic Crew Rule*: Minimum 1 Cinema Technician.

5. **Screen 2 (Cinema)**:
   - *Capacity*: 132 theatre seats.
   - *Projector*: Christie CP4220 4K DCI Cinema Projector.
   - *Audio*: Dolby AP20, Christie Vive Audio LS3S surrounds, Martin Audio LCR.
   - *Screen*: 23ft x 9.8ft cinema screen.
   - *Basic Crew Rule*: Minimum 1 Cinema Technician.

6. **Screen 3 (Cinema & Event Space)**:
   - *Capacity*: 59 theatre seats.
   - *Projector*: Christie CP2215 DCI Cinema Projector.
   - *Audio*: Dolby CP750, Turbosound Impact 50 surrounds, Martin Audio LCR.
   - *Screen*: 16ft x 6.8ft white screen.
   - *Basic Crew Rule*: Minimum 1 Cinema Technician.

7. **Foyer, Cinema Lounge & Rehearsal Lab**:
   - Ground floor exhibition, lounge, and rehearsal auxiliary spaces with distributed audio and self-service AV inputs.
   - *Basic Crew Rule*: Minimum 1 Technician on-call.

---

## 3. Core Workflows (Step-by-Step)

### Workflow 3.1: Updating Venue Technical Specifications
1. Navigate to **Venues & Spaces** (`#/venues`).
2. Select the space card (e.g. *Main Hall*).
3. Click **"Edit Venue Specs"**.
4. Update:
   - `Capacity` (Standing, Seated, Cabaret).
   - `Stage Dimensions` (Width, Depth, Clearance height to grid).
   - `Basic Crew Requirement` (sets minimum crew warning in Rota and Advancing).
   - `Power Distribution Drops` (13A non-dim, 16A single-phase, 32A/63A 3-phase).
   - `Static Inventory Rigs` (kit permanently mounted in room).
5. Click **"Save Venue Profile"**.

---

## 4. Troubleshooting & FAQ

- **Q: Where does the "Under-crewed Warning" in the Rota come from?**  
  *A:* The Rota checks each event's space against the **Basic Crew** integer set here. If an event in *Main Hall* has only 1 technician assigned instead of 2, a yellow warning pill is triggered automatically.
