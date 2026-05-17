# CodeCrafter Design System

> Generated from brainstorming session — 17 May 2026

---

## 1. Brand Identity

| Element | Value |
|---------|-------|
| App Name | CodeCrafter |
| Tagline | Learn to Code, Defeat the Bugs |
| Mascot | **Cody** — AI Robot (neon eyes, antenna, expressive) |
| Vibe | Dark, neon-lit coding academy/gaming hybrid |

---

## 2. Color Palette: Neon Code

```css
--bg-primary:    #0a0a1a;   /* Deep space black-blue */
--bg-secondary:  #12122a;   /* Slightly lighter card bg */
--bg-tertiary:   #1a1a3a;   /* Hover/active states */

--accent-blue:   #00d4ff;   /* Primary CTAs, links, active states */
--accent-purple: #7c3aed;   /* Secondary accent, boss HP */
--accent-cyan:   #22d3ee;   /* Success, correct answer */
--accent-pink:   #ec4899;   /* Hearts, streak fire */

--text-primary:  #e2e8f0;   /* Main text */
--text-secondary:#94a3b8;   /* Subtitles, muted text */
--text-muted:    #64748b;   /* Disabled, hints */

--danger:        #ef4444;   /* Wrong answer, errors */
--warning:       #f59e0b;   /* XP bonuses, achievements */
--success:       #10b981;   /* Completed challenges */
```

### Gradients
```css
--gradient-hero:  linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%);
--gradient-glow:  linear-gradient(90deg, #00d4ff, #7c3aed);
--gradient-card:  linear-gradient(145deg, rgba(18,18,42,0.9), rgba(26,26,58,0.6));
```

### Glassmorphism
```css
--glass-bg:       rgba(18, 18, 42, 0.6);
--glass-border:   rgba(255, 255, 255, 0.08);
--glass-blur:     12px;
```

---

## 3. Typography

| Usage | Font | Weight | Size |
|-------|------|--------|------|
| Logo | JetBrains Mono | 800 | 2rem+ |
| H1 | JetBrains Mono | 700 | 2rem |
| H2 | JetBrains Mono | 700 | 1.5rem |
| H3 | JetBrains Mono | 600 | 1.25rem |
| Body | JetBrains Mono | 400 | 1rem |
| Small | JetBrains Mono | 400 | 0.875rem |
| Code | JetBrains Mono | 400 | 0.9rem |

Line height: 1.6 (body), 1.2 (headings)
Letter spacing: 0.02em (body), 0.05em (headings)

---

## 4. Spacing

Base unit: 4px

| Token | Px | Rem |
|-------|----|-----|
| xs | 4px | 0.25rem |
| sm | 8px | 0.5rem |
| md | 16px | 1rem |
| lg | 24px | 1.5rem |
| xl | 32px | 2rem |
| 2xl | 48px | 3rem |
| 3xl | 64px | 4rem |

---

## 5. Border Radius

| Token | Value |
|-------|-------|
| sm | 6px |
| md | 12px |
| lg | 16px |
| xl | 24px |
| full | 9999px |

---

## 6. Shadows & Glows

```css
--shadow-sm:      0 2px 8px rgba(0,0,0,0.3);
--shadow-md:      0 4px 16px rgba(0,0,0,0.4);
--shadow-lg:      0 8px 32px rgba(0,0,0,0.5);
--glow-blue:      0 0 20px rgba(0,212,255,0.3);
--glow-purple:    0 0 20px rgba(124,58,237,0.3);
--glow-cyan:      0 0 20px rgba(34,211,238,0.3);
```

---

## 7. Animations

Spring physics (framer-motion):

```ts
const spring = { type: "spring", stiffness: 300, damping: 25 }
const springBouncy = { type: "spring", stiffness: 400, damping: 15 }
const fadeIn = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
const scaleIn = { initial: { scale: 0.95 }, animate: { scale: 1 } }
```

- Buttons: hover scale 1.05, tap scale 0.95
- Cards: hover translateY(-2px) + glow
- Page transitions: 300ms fade + slide
- Correct answer: green flash + scale pulse
- Wrong answer: red flash + horizontal shake
- Streak: fire emoji bounce animation
- XP gain: floating "+X" text that drifts up and fades

---

## 8. Screens

### 8.1 Landing Page (Animated Hero)
- Full-screen gradient bg (`--gradient-hero`)
- Cody mascot center (animated idle)
- Floating code syntax lines in background
- "CodeCrafter" logo with neon glow
- "Başla" CTA button with pulse glow
- Bottom: login/register toggles in glass card

### 8.2 Main Map (Duolingo Path)
- Vertical/serpentine path with nodes
- Each node = one challenge (section or boss)
- Completed nodes: green cyan glow
- Locked nodes: gray, padlock icon
- Current node: pulsing blue glow
- Path line: gradient glow (`--gradient-glow`)
- Top bar: streak, hearts, XP, profile avatar
- Cody walks along path as player progresses

### 8.3 Challenge Screen
- Cody avatar shows reaction (happy/nervous/crying)
- Challenge type indicator (quiz / code / drag-drop)
- **Quiz**: Question text + 3-4 option cards (glassmorphism)
- **Code**: Code editor (monospace, syntax highlighted, dark bg)
- **Drag-Drop**: Code blocks as draggable chips
- Progress bar at top (current / total)
- Timer bar if timed challenge
- Submit button with neon glow
- Result overlay: correct (green + Cody dance) / wrong (red + Cody sad)

### 8.4 Boss Fight (Animated)
- Large boss sprite (cyber-themed enemies per section)
- Boss HP bar (purple gradient, depletes on correct answer)
- Player HP bar (green → yellow → red as health drops)
- Challenge UI overlays boss in bottom third
- Correct answer: boss takes damage + particle burst + screen shake
- Wrong answer: boss attacks + screen flash red + player HP -1
- Victory: boss explosion particles + "VICTORY" text + XP shower
- Defeat: game over screen + "Try Again" button

### 8.5 Codex (Skill Tree / Book)
- Category tabs (Variables, Functions, Arrays, etc.)
- Each category = double-page spread in book
- Left page: concept explanation with code examples
- Right page: interactive mini-challenge to test understanding
- Page turn animation (CSS 3D transform)
- Progress per category shown as bookmarks

### 8.6 Profile
- Avatar with Cody frame
- Username, level, XP bar
- Streak counter (🔥 X days)
- Heart count (💔 X/5)
- Achievement badges grid
- Stats: challenges completed, bosses defeated, total XP
- Settings gear icon (sound toggle, logout)

### 8.7 Leaderboard
- Week selector (current week / last week)
- Animated list with rank numbers
- Current user row highlighted with glow
- Top 3: gold/silver/bronze special styling
- XP amount per user
- Avatar + username

---

## 9. Components

### Buttons
- **Primary**: `--accent-blue` bg, white text, glow on hover
- **Secondary**: Glassmorphism bg, accent border
- **Ghost**: Transparent, text only
- **Danger**: Red bg for destructive actions
- Sizes: sm (32px), md (40px), lg (48px)
- All with spring animations

### Cards
- Glassmorphism (`--glass-bg`, `--glass-border`)
- Rounded `--radius-lg`
- Hover: slight lift + glow
- Optional: gradient border accent

### Modals
- Centered, glassmorphism card
- Backdrop blur overlay
- Enter/exit: fade + scale animation
- Title + content + action buttons

### Progress Bars
- Rounded, 6px height
- Animated width transition
- Colors: cyan (normal), purple (boss), red (HP low)
- Optional: shimmer animation on active

### Toast / Notification
- Slide in from top-right
- Types: success (green), error (red), info (blue), warning (yellow)
- Cody icon inline
- Auto-dismiss after 3s

### Skeleton Loading
- Glassmorphism skeleton cards
- Shimmer animation (diagonal gradient sweep)
- Color: `--bg-tertiary` base, lighter shimmer

---

## 10. Gamification Elements

| Feature | Implementation |
|---------|---------------|
| **Streak** | Fire icon + day count. Freeze option. Reset at 0. |
| **XP** | +50 per challenge, +100 per boss, +10 per correct quiz |
| **Level** | Level = floor(XP / 500) + 1. Each level: +1 heart max |
| **Hearts** | 5 base. Refill 1 every 30 min. Watch ad / practice to refill |
| **Leagues** | Bronze → Silver → Gold → Ruby → Emerald → Diamond |
| **Badges** | 15+ achievements, earnable, shown on profile |
| **Cody Reactions** | Happy (correct), sad (wrong), excited (streak), dance (level up) |

---

## 11. Audio

### Sound Effects (Web Audio API)
- `correct.mp3` — short ascending chime
- `wrong.mp3` — descending buzz
- `click.mp3` — soft UI tap
- `boss-hit.mp3` — impact thud
- `boss-attack.mp3` — swoosh + rumble
- `levelup.mp3` — triumphant fanfare
- `streak.mp3` — flame whoosh
- `victory.mp3` — extended celebratory jingle

### Background Music
- Map: Lo-fi chill beats
- Challenge: Focus/ambient
- Boss: Epic synth battle

### Settings
- Mute all toggle (persisted in localStorage)
- Separate SFX / Music volume sliders

---

## 12. Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column, bottom tab nav |
| Tablet | 640-1024px | Single column, sidebar nav |
| Desktop | > 1024px | Multi-column, expanded UI |

---

## 13. Implementation Priority

| Phase | Components | Est. Effort |
|-------|-----------|-------------|
| **P1** | Colors, typography, buttons, cards, modals | 1 day |
| **P2** | Landing page redesign, map path restyle | 2 days |
| **P3** | Challenge screen with quiz/code/drag-drop | 2 days |
| **P4** | Boss fight animations + particles | 2 days |
| **P5** | Codex book UI, profile, leaderboard | 2 days |
| **P6** | Gamification: streak, XP, hearts, leagues | 2 days |
| **P7** | Audio system + sound effects | 1 day |
| **P8** | Cody mascot integration + animations | 1 day |
| **P9** | Polish, responsive tweaks, PWA update | 1 day |
| **Total** | | **~14 days** |

---

> **Next Step**: Apply this design system to the CodeCrafter codebase.
> Start with Phase 1: CSS variables, Tailwind config, base components.
